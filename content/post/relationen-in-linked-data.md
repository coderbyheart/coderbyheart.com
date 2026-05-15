---
title: >-
  Relationen in Linked Data
abstract: >-
  Eine Einführung in JSON-LD
date: 2012-01-17T00:00:00.000Z
lang: de
---

_An englisch translation of this article can be found
[here](/relations-in-linked-data)._

Das Thema _[Linked Data](http://linkeddata.org/)_ geistert ja nun schon eine
Weile durch die Branche, noch hat sich besonders im JSON-Umfeld noch kein
wirklicher Standard etabliert. [JSON-LD](http://json-ld.org/) versucht dieser
Standard zu werden und hat auch schon
[sehr ausführlich](http://json-ld.org/spec/latest/json-ld-syntax/) dessen Syntax
beschrieben.

In JSON-LD werden JSON-Daten mit Informationen zum Kontext angereichert, so dass
der Verwender der Daten erkennen kann, wie diese zu interpretieren sind. Ein
einfaches Beispiel eines JSON-Datensatzes mit _Linked Data_-Zusatzinformationen
sieht so aus:

```json
{
  "@context": "http://purl.org/jsonld/Person",
  "@subject": "http://dbpedia.org/resource/John_Lennon",
  "name": "John Lennon",
  "birthday": "1940-10-09",
  "member": "http://dbpedia.org/resource/The_Beatles"
}
```

Diese Beispiel beschreibt einer Person, deren Name „John Lennon“ ist. Der
Unterschied zu normalem JSON und JSON-LD ist der, dass dieses Objekt sich
eindeutig selbst beschreibt und so ohne Mehrdeutigkeit in jeder Anwendung
verwendet werden kann, die mit `@context` ein eindeutiger „Namesraum“ angegeben
wird, der die Bedeutung der Daten beschreibt. Mit `@subject` ist es dann möglich
den konkreten Datensatz eindeutig zu identifizieren.

Die Informationsanreicherung für untergeordnete Elemente, die z.B. als Liste
vorliegen ist mit JSON-LD
[ebenfalls möglich](http://json-ld.org/spec/latest/json-ld-syntax/#rdf-collection).

Soweit, so gut — aber eben für meinen Anwendungsfall nicht ausreichend: Ich
möchte nicht bei jeder Nachricht _alle_ zugehörigen Objekte mitliefern, sondern
den Client selber entscheiden lassen, was er benötigt.

### Verweise definieren

Die Spezifiktion geht davon aus, dass eine JSON-Nachricht immer die zu einem
Objekt gehörenden Kind-Elemente enthält. Sie sieht aber nicht die Möglichkeit
vor, **Verweise** zu weiteren Datensätzen zu definieren. Mark Nottingham zeigt
in seinem Blog-Eintrag
„[Linking in JSON](http://www.mnot.net/blog/2011/11/25/linking_in_json)“, dass
dieses Problem auch in anderen Linked-Data-Ansätzen nicht zufriedenstellend
gelöst wird, auch wenn es mit
[JSON Reference](http://tools.ietf.org/html/draft-pbryan-zyp-json-ref-00) und
[HAL](http://blog.stateless.co/post/13296666138/json-linking-with-hal)
mindestens zwei Ansätze gibt, fehlt beiden jedoch die Möglichkeit den Kontext
der verknüpften Daten zu definieren, denn Anhand des Kontexts einer Relation
kann der Verwendern erkennen und entscheiden, ob es für ihn Sinn macht, eine
Relation weiter zu verfolgen.

In meiner Anwendung habe ich mich entschieden in der Syntax von JSON-LD zu
bleiben und ein weiteres Element ein zu führen: `@relations`. Dieses Element ist
eine Liste von Relation die zum jeweiligen Objekt gehören. Jede Relation
beschreibt dabei mit `relatedcontext`, welchen Kontext das andere Objekt hat und
unter welcher URL (`href`) dieses Objekt abgerufen werden kann; mit `role` wird
die Art der Beziehung beschrieben. Optional gibt das Attribut `list` an, ob es
sich um eine Liste von Objekten handelt.

### Beispiel: John, mal wieder

Im Beispiel verwenden wir wieder John und definieren eine Relation zu seiner
Frau Yoko Ono, sowie zu den Singles, die er geschrieben hat.

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

Dem Verwender kann so mitgeteilt werden, dass wenn er dem (fiktiven) Link
`http://dbpedia.org/resource/John_Lennon/singles/` folgt, er eine Liste von
Singles erhält, die John geschrieben hat. Es bleibt aber Sache des Verwenders zu
entscheiden, ob er in seiner Anwendung überhaupt ein Personen-Objekt definiert
hat, dass Verweise auf Singles enthält.

### Fazit

Der gezeigte Lösungsansatz ermöglicht es, die Menge der übertragenen Daten in
einer JSON-Nachricht gering zu halten, gleichzeitig bleibt aber die Möglichkeit
bestehen, zugehörige Objekte erkennen und nachladen zu können.
