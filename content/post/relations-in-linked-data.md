---
title: Relations in Linked Data
abstract: >-
  An introduction to JSON-LD
date: 2012-01-17T00:00:00.000Z
---

_This is the translation of [this german blog entry][1]._

Even if _[Linked Data][2]_ has been around for a while a solid standard for a
JSON driven environment is yet to surface. [JSON-LD][3] has set its course to
becoming this standard and goes [great length][4] in explaining their take on
linked data in JSON.

In JSON-LD JSON data is enriched with information about its context enabling the
client to explicitly know how to interpret this data. A simple example of
JSON-Data with embedded linking information looks like this.:

```json
{
  "@context": "http://purl.org/jsonld/Person",
  "@subject": "http://dbpedia.org/resource/John_Lennon",
  "name": "John Lennon",
  "birthday": "1940-10-09",
  "member": "http://dbpedia.org/resource/The_Beatles"
}
```

This example describes a person named „John Lennon“. By adding a namespace via
the `@context` attribute the data becomes self-describing. The `@subject`
enables the client to identify an this specific entry.

It is also possible to [describe subsidiary entries][5] of this object which
could be given e.g. in a list.

This is good but not sufficient for my use case.

### Defining relations

By following this design I have to include all related objects in the JSON
messages. But I want to let the client decide which subsidiary objects he needs.
What I really need is the possibility to define **relations**. In his blog entry
„[Linking in JSON][6]“ Mark Nottingham shows that this need is not addressed
properly or at all. [JSON Reference][7] and [HAL][8] do provide solutions but
they are both lacking a way to define the context of the related objects. Only
by knowing the context of a relation the client can decide which relation to
follow and which to discard.

In my applictaion I&#8217;ve decided to stick with the JSON-LD syntax and add
another property: `@relations`. This property is a list of relations for the
object. Every relations describes the context of the related object in
`relatedcontext` and states under which URL (`href`) this object can be fetched.
The `role` attribute defines the kind of relation. Optionally the attribute
`list` states, if the relation is actually a list of objects.

### Example: Again, John.

In this example we use John again and define a relation to his wife Yoko Ono and
to the singles he has written.

```json
{
  "@context": "http://purl.org/jsonld/Person",
  "@subject": "http://dbpedia.org/resource/John_Lennon",
  "@relations": [
    {
      "@context": "http://coderbyheart.de/jsonld/Relation",
      "relatedcontext": "http://purl.org/jsonld/Person",
      "role": "http://gmpg.org/xfn/11#spouse",
      "href": "http://dbpedia.org/page/Yoko_Ono"
    },
    {
      "@context": "http://coderbyheart.de/jsonld/Relation",
      "relatedcontext": "http://dbpedia.org/ontology/Single",
      "role": "http://dbpedia.org/ontology/writer",
      "href": "http://dbpedia.org/resource/John_Lennon/singles/",
      "list": True
    }
  ],
  "name": "John Lennon",
  "birthday": "1940-10-09",
  "member": "http://dbpedia.org/resource/The_Beatles"
}
```

In this way the client can be told that if he follows the (fictive) link
`http://dbpedia.org/resource/John_Lennon/singles/` he&#8217;ll receive a list of
Singles written by John. It&#8217;s up to the client to decide a person object
exists in his application with a relation to singles.

### Conclusion

The solution presented above enables us to transfer just the minimum amount of
required data but still gives the client the possibility to discover and fetch
related objects.

[1]: /relationen-in-linked-data
[2]: http://linkeddata.org/
[3]: http://json-ld.org/
[4]: http://json-ld.org/spec/latest/json-ld-syntax/
[5]: http://json-ld.org/spec/latest/json-ld-syntax/#rdf-collection
[6]: http://www.mnot.net/blog/2011/11/25/linking_in_json
[7]: http://tools.ietf.org/html/draft-pbryan-zyp-json-ref-00
[8]: http://blog.stateless.co/post/13296666138/json-linking-with-hal
