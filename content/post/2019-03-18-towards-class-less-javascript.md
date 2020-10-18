---
title: >-
  Towards class-less JavaScript
subtitle: >-
  Ongoing Exploration
abstract: |
  I am getting more and more convinced that classes in JavaScript or TypeScript are an anti-pattern. At least in the way I use them.
date: 2019-03-18
---

![Sunset over Gråkallbanen](../media/2019-03-18-towards-class-less-javascript.jpg)

I am getting more and more convinced that classes in JavaScript or TypeScript
are an anti-pattern. At least in the way I use them.

I guess this will be a familiar example to you:

```javascript
class PetStoreManager {
  constructor(petRepository: PetRepository, account: CheckingAccount) {
    this.petRepository = petRepository;
    this.account = account;
  }

  buyPet(name, price) {
    const pet = this.petRepository.findByName(name);
    if (!pet) throw new Error(`Pet ${name} not found!`);
    this.petRepository.remove(pet);
    this.account.addFunds(price);
    return pet;
  }
}
```

`PetStoreManager` is a class, which when instantiated receives dependencies, and
upon calling the `butPet` method, will interact with these collaborators
according to the business logic (_When a pet is bought, add the paid price to
the funds._)

`petRepository` is an instance of another class:

```javascript
interface PetRepository {
  create(name: string): void
  findByName(name: string): Pet | undefined
  remove(pet: Pet): void
}

class FileSystemPetRepository extends PetRepository {
  constructor(storageDir) {
    this.storageDir = storageDir
  }
  create(name) {
    writeFile(
      path.resolve(storageDir, `${name}.json`),
      JSON.stringify({
        name
      })
    )
  }
  findByName(name) {
    return JSON.parse(readFile(path.resolve(storageDir, `${name}.json`)))
  }
  remove(pet) {
    unlink(readFile(path.resolve(storageDir, `${pet.name}.json`)))
  }
}
```

We use these classes to achieve the **S**, **L** and **D** of the
[S.O.L.I.D.](<[https://en.wikipedia.org/wiki/SOLID](https://en.wikipedia.org/wiki/SOLID)>)
principles:

- [Single responsibility principle](https://en.wikipedia.org/wiki/Single_responsibility_principle):
  we separate the concerns of handling the transaction and storing pets in two
  separate classes, which makes it easier to understand what they do and also it
  simplifies testing this code.
- [Liskov substitution principle](https://en.wikipedia.org/wiki/Liskov_substitution_principle "Liskov substitution principle"):
  the `PetStoreManager` class does not care how the pets are stored, one can
  swap out the instance of the `FileSystemPetRepository` with a
  `MySQLPerRepository` without needing to modify the managers implementation.
  The `PetStoreManager` is getting passed an instance of the repository, it does
  not use `new ...` to create an instance. This is important so we can test the
  implementation and can effectively configure our software depending on the
  environment.
- [Dependency inversion principle](https://en.wikipedia.org/wiki/Dependency_inversion_principle "Dependency inversion principle"):
  The `PetStoreManager` depends on _a_ repository interface, not on the concrete
  implementation.

My observation however has been that by following this pattern we eventually end
up violation the _Single responsibility principle_ because classes give us and
arbitrary boundary which is hard to pierce **because there is no easy and
obvious way to slice a class**. We end up adding more and more methods to
classes who roughly interact with the same dependencies. I have seen multiple
instances where class methods were added which introduced new dependencies, and
they were added to the constructor:

```diff
class FileSystemPetRepository extends PetRepository {
-  constructor(storageDir) {
+  constructor(storageDir, storageQuota) {
    this.storageDir = storageDir
+   this.storageQuota = storageQuota
  }
  create(name) {
+   this.storageQuota.hasQuota(storageDir)
    writeFile(
      path.resolve(storageDir, `${name}.json`),
      JSON.stringify({
        name
      })
    )
  }
}
```

Now `create` needs to check if there is enough quota in the storage before
adding a new entry. But `findByName` and `remove` can be kept unchanged, since
for them the quote information is not relevant or respectively implicit.

We keep growing the class further and further and this bugs me for multiple
reasons:

- for every dependency we are also adding an import statement, a constructor
  argument, and a class property. This adds additional noise in the beginning of
  the file.
- it gets harder to reason which method needs which dependency
- class files become longer and longer, easily stretching above 500 lines

## What if we had no classes in the first place?

The most obvious reasons for using classes is as _collaboration holders_,
meaning they provide the dependencies which the business logic needs to
interact. There are basically no classes in my code that have _state_ in the
classically sense: storing computation results to be reused later. Because this
is hard to test I avoid having state in my classes and methods will only have
local state and return results. **They are already functional.**

Classes were not meant to be used for that, that's why _using Classes for the
purpose of dependency management_ is an anti-pattern.

Now, where do we go from here? How does a better version of that code looks
like, that addresses the concerns listed above:

- only provide the dependencies for a method that are needed
- shorter files

My current practice is to convert interfaces to TypeScript types for each
method:

```javascript
// petRepository.ts
export type create = (name: string) => void;
export type findByName = (name: string) => Pet | undefined;
export type remove = (pet: Pet) => void;
```

The concrete implementation for e.g. the file-system backed pet repository looks
like this:

```javascript
// petRepository/fileSystem/remove.ts
export const remove: petRepository.remove = (pet: Pet) => {
  unlink(readFile(path.resolve(storageDir, `${pet.name}.json`)));
};
```

and convert all class methods to functions which receive the _implementations_
of these types.

```javascript
// petstoreManager/buyPet.ts
export const buyPet: (
  findPetByName: petRepository.findByName,
  removePet: petRepository.remove,
  addFunds: checkingAccount.addFunds
  name: string,
  price: number
) => {
    const pet = findPetByName(name);
    if (!pet) throw new Error(`Pet ${name} not found!`);
    removePet(pet);
    addFunds(price);
    return pet
  }
```

In cases were an implementation has a dependency but the consumer does not know
about this dependency I return the implementation with the bound dependency.

Here is the example of the file-system backed pet repository method `create`
which needs to ask for the quota.

```javascript
// storageQuota.ts
export type hasQuota = (location: string) => boolean
// petRepository/fileSystem/remove.ts
export const create = (hasQuota: storageQuota.hasQuota) => (name: string) => {
  writeFile(...)
}
```

When I need a `petStore.create` method somewhere in the code it is constructed
like this:

```javascript
import * as petStore from "petStore";
import { create } from "petRepository/fileSystem/create";
import { hasQuota } from "storageQuota/fileSystem/hasQuota";
const createPet: petStore.create = create(hasQuota);

// The code that creats a new pet does not know
// about the quota dependency
createPet("Kitty");
```

This approach solves the issues I listed, but feels a little clunky. Especially
passing dependencies to methods is, at least for me, a thing I would need to get
used to.

---

I'd love to hear your feedback and thoughts on this topic, this is an ongoing
exploration of mine, so keep checking back here or on
[my Twitter](https://twitter.com/coderbyheart) for updates.
