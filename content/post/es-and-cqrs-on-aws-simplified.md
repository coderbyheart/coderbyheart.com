---
title: "ES+CQRS on AWS: the simplest version yet"
abstract: >-
  I have been iterating on Event Sourcing and CQRS architectures for nearly a
  decade. When I first started with this pattern around 2016 and 2017, the
  implementation was considerably more complex — a lot of ceremony, a lot of
  infrastructure, and a lot of things that could go wrong. Over the years I have
  stripped it back again and again, and what I have arrived at now is something
  I'm genuinely happy with: a small, focused TypeScript library backed by
  DynamoDB that does exactly what it needs to and nothing more.
date: 2026-05-17T15:00:00+02:00
---

![A clear glass icon-based diagram within a teal-blue framed, rounded rectangle, with text and arrows illustrating a transaction flow. The diagram, titled "Transaction" at the top in dark gray text, features two identical glass documents side-by-side. Beneath the left document, a small down arrow points to a reflective cylindrical object labeled "Events." Beneath the right document, an identical down arrow points to an identical cylindrical object labeled "Aggregate." The entire transparent glass setup is placed on a reflective white surface against a blurred, light studio background.](../media/ES-and-CQRS-on-AWS-simplified.png)

I have been iterating on Event Sourcing and CQRS architectures for nearly a
decade. When I first started with this pattern around 2016 and 2017, the
implementation was considerably more complex — a lot of ceremony, a lot of
infrastructure, and a lot of things that could go wrong. Over the years I have
stripped it back again and again, and what I have arrived at now is something
I'm genuinely happy with: a small, focused TypeScript library backed by DynamoDB
that does exactly what it needs to and nothing more.

The code is available at
[github.com/coderbyheart/aws-dynamodb-es-cqrs](https://github.com/coderbyheart/aws-dynamodb-es-cqrs).

## What ES+CQRS gives you

The core idea is simple: instead of storing the current state of a thing, you
store the sequence of events that produced that state. Event Sourcing (ES) is
the "store events" part. CQRS (Command Query Responsibility Segregation) is the
recognition that writing and reading are fundamentally different concerns that
benefit from being handled separately.

In practice this means that when someone publishes a blog post, you don't update
a `published = true` column. You append a `BlogPostPublished` event to the event
log. The current state — the aggregate — is derived by replaying those events.
This gives you a full audit trail for free, the ability to rebuild projections,
and a natural boundary for business logic.

## The anatomy of an event

Every event in the system is an `AggregateEvent`. The type is intentionally
minimal:

```typescript
export type AggregateEvent = {
  eventId: ULID;
  eventName: string;
  aggregateName: string;
  aggregateId: ULID;
  aggregateVersion: AggregateVersion;
  actorId: string;
};
```

A few things worth noting here. `eventId` and `aggregateId` use
[ULIDs](https://github.com/ulid/spec) — universally unique, lexicographically
sortable identifiers. This means events stored in DynamoDB are naturally ordered
by creation time without needing a separate timestamp index. `aggregateVersion`
is an incrementing integer that starts at `1` and tracks how many events have
been applied to a given aggregate. `actorId` records who or what triggered the
event.

Domain events extend this base type and add their own payload fields. A
`BlogPostCreatedEvent`, for example, adds `title` and whatever else the domain
needs.

## Reducing events to state

The event sourcing half of the pattern lives in `reduceEvents`. It takes an
`applyEvent` function and returns a function that folds a list of events into an
aggregate:

```typescript
export const reduceEvents =
  <A extends Record<string, any> & { $meta: AggregateMeta }>(
    applyEvent: ApplyEventFn<A>,
  ): ApplyEventsFn<A> =>
  (events: Array<AggregateEvent>, aggregate?: A) => {
    if (events.length === 0) throw new Error("No events to reduce!");
    return events.reduce<A | undefined>((agg, event) => {
      const result = applyEvent(event, agg);
      if (result === undefined)
        throw new Error(
          `Unhandled event: ${event.eventName} (aggregateVersion: ${event.aggregateVersion})`,
        );
      return result;
    }, aggregate) as A;
  };
```

The domain-specific reducer wires this together. The blog post reducer handles
three events — created, published, and title changed — using typed event guards
(`isNamedEvent`) and assertions (`assertAggregateEvent`) to make the TypeScript
types precise:

```typescript
export const blogpostReducer = reduceEvents<BlogPostAggregate>(
  (event, aggregate) => {
    if (isBlogPostCreatedEvent(event)) {
      return {
        $meta: fromEvent(event),
        authorId: event.actorId,
        title: event.title,
      };
    }
    if (isBlogPostPublishedEvent(event)) {
      assertAggregateEvent(aggregate, event);
      return {
        ...aggregate,
        $meta: updateFromEvent(aggregate.$meta, event),
        isPublic: true,
      };
    }
    if (isBlogPostTitleChangedEvent(event)) {
      assertAggregateEvent(aggregate, event);
      return {
        ...aggregate,
        $meta: updateFromEvent(aggregate.$meta, event),
        title: event.title,
      };
    }
    return undefined;
  },
);
```

The `assertAggregateEvent` call on the update and publish handlers is doing
something important: it verifies that an aggregate already exists before trying
to apply a state-changing event. You cannot publish a blog post that was never
created.

## Commands: the write side

Commands live on the write side of the CQRS split. They are plain async
functions that take some input and a persistence function, validate
preconditions against the current aggregate state, produce an event, apply it
through the reducer, persist both the resulting aggregate and the event, and
return the updated aggregate.

Here is what creating a blog post looks like:

```typescript
export const createBlogPostCommand =
  (
    persistBlogPost: PersistBlogPostFn,
    reducer: ApplyEventsFn<BlogPostAggregate>,
  ) =>
  async (
    data: Omit<BlogPostAggregate, "$meta" | "authorId">,
    actorId: string,
  ): Promise<BlogPostAggregate> => {
    const id = ulid() as ULID;
    const event: BlogPostCreatedEvent = {
      eventId: ulid() as ULID,
      eventName: EventNames.BlogPostCreated,
      aggregateName: AggregateNames.BlogPost,
      aggregateId: id,
      aggregateVersion: v1,
      actorId,
      ...data,
    };
    const applied = reducer([event]);
    await persistBlogPost(applied, event);
    return applied;
  };
```

The reducer is injected alongside the persist function rather than imported
directly. This keeps commands decoupled from any specific reducer implementation
and makes them straightforward to test in isolation. A command for updating an
existing aggregate (like `publishBlogPostCommand`) follows the same pattern:
inject both the persist function and the reducer, load the current state, verify
preconditions, produce a new event at the next version. Concurrency conflicts
are detected at the persistence layer using optimistic locking, so you get a
`ConflictError` if two commands race on the same aggregate.

## Persistence: one transaction, two tables

The most interesting part of this design is the persistence layer. Everything
happens in a single DynamoDB `TransactWriteItems` call that touches two tables
atomically:

1. The **aggregate table** is upserted with an optimistic concurrency check. For
   a new aggregate, the condition is `attribute_not_exists(aggregateId)`. For an
   update, it is `#version = :prevVersion`. If either condition fails, DynamoDB
   cancels the whole transaction and the application surfaces a conflict error.

2. The **events table** receives a new `Put` item containing the full event
   payload, plus a derived `eventTs` (an ISO timestamp decoded from the ULID)
   for convenience.

The error handling checks cancellation reasons across both transaction slots — a
`DuplicateItem` on the events table (index `1`) is just as meaningful as a
`ConditionalCheckFailed` on the aggregate (index `0`), and both produce an
actionable error rather than a raw SDK exception:

```typescript
await db.send(
  new TransactWriteItemsCommand({
    TransactItems: [
      { Update: toUpdate(aggregate, aggregateTableName) },
      {
        Put: {
          TableName: eventsTableName,
          Item: marshall(
            {
              ...event,
              eventTs: new Date(decodeTime(event.eventId)).toISOString(),
            },
            { removeUndefinedValues: true },
          ),
        },
      },
    ],
  }),
);
// ...
if (err instanceof TransactionCanceledException) {
  if (err.CancellationReasons?.[0]?.Code === "ConditionalCheckFailed") {
    throw new Error(
      `Failed to persist "${aggregate.$meta.id}" due to version conflict!`,
    );
  }
  if (
    err.CancellationReasons?.[0]?.Code === "DuplicateItem" ||
    err.CancellationReasons?.[1]?.Code === "DuplicateItem"
  ) {
    throw new Error(
      `Failed to persist "${aggregate.$meta.id}" due to duplicate item!`,
    );
  }
}
```

Because the aggregate and the event are written in one transaction, they are
always in sync. You never end up in a state where an event was recorded but the
aggregate was not updated, or vice versa.

## The read side

Queries are entirely separate from commands — that is the whole point of the CQR
split. The read side has two shapes:

**Current state** — fetch the latest aggregate projection directly from the
aggregate table. Because `persistDynamoDB` keeps the aggregate table current on
every write, reads are a simple `GetItem` or `Query` against a well-known key
schema. No event replay needed at query time.

**Event stream** — use `listAggregateEventsDynamoDB` to retrieve all events for
a given aggregate in order. This is useful for rebuilding projections, feeding
downstream consumers, or debugging. DynamoDB Streams integration is also
covered: `extractEventsFromDynamoDBEvent` parses stream records back into typed
`AggregateEvent` objects so they can be forwarded to Lambda functions or other
processors.

## What makes this simpler than the 2016 version

The earlier versions of this pattern wrote the event to the event store first,
then relied on a separate asynchronous step — typically a DynamoDB Stream
feeding a Lambda — to update the aggregate projection. This worked, but it
created three problems that I kept having to work around.

The first was a **window of inconsistency**. Between the moment an event was
written and the moment the Lambda finished updating the aggregate, the two
stores were out of sync. In practice this window was small, but it was real. If
the Lambda failed — a cold start timeout, a throttle, a transient DynamoDB error
— the aggregate could end up permanently behind the event log. You needed
dead-letter queues, retry logic, and monitoring to catch and recover from these
failures.

The second was **latency on the read side**. Because the aggregate projection
was updated asynchronously, a caller that wrote an event and immediately read
back the aggregate might get stale data. You had to either accept eventual
consistency or build compensating logic to handle it.

The third was **CDK infrastructure overhead**. Every aggregate needed a Stream
enabled on its events table, a Lambda to consume it, an event source mapping,
IAM roles, a DLQ, and CloudWatch alarms. This was not a huge amount of code, but
it added up and it was all load-bearing — getting any of it wrong meant silent
data loss.

The current approach sidesteps all of this with a single `TransactWriteItems`
call. The event and the aggregate projection are written atomically. Either both
succeed or neither does. There is no async gap, no eventual consistency on the
write path, and no extra CDK constructs to manage. The aggregate table is always
in sync with the event store by construction.

The tradeoff is that you give up the ability to fan out to multiple projections
in the same write path — but in practice I have found that DynamoDB Streams off
the events table is still the right mechanism for that, and you can add it when
you actually need it rather than building it upfront for every aggregate.

---

The full source, including a working test suite that runs against DynamoDB
Local, is at
[github.com/coderbyheart/aws-dynamodb-es-cqrs](https://github.com/coderbyheart/aws-dynamodb-es-cqrs).
The package is also published to npm as
[`@coderbyheart/aws-dynamodb-es-cqrs`](https://www.npmjs.com/package/@coderbyheart/aws-dynamodb-es-cqrs)
if you want to use it directly.
