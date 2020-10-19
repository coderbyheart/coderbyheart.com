---
title: >-
  Relationen in Linked Data
abstract: |
  An englisch translation of this article can be found here.
date: 2012-01-17T00:00:00.000Z
---

<p><em lang="en-us">An englisch translation of this article can be found <a href="http://coderbyheart.de/blog/relations-in-linked-data">here</a>.</em></p>

<p>
  Das Thema </em><em><a href="http://linkeddata.org/">Linked Data</a></em> geistert ja nun schon eine Weile durch die Branche, noch hat sich besonders im JSON-Umfeld noch kein wirklicher Standard etabliert. <a href="http://json-ld.org/">JSON-LD</a> versucht dieser Standard zu werden und hat auch schon <a href="http://json-ld.org/spec/latest/json-ld-syntax/">sehr ausführlich</a> dessen Syntax beschrieben.
</p>

<p>
  In JSON-LD werden JSON-Daten mit Informationen zum Kontext angereichert, so dass der Verwender der Daten erkennen kann, wie diese zu interpretieren sind. Ein einfaches Beispiel eines JSON-Datensatzes mit <em>Linked Data</em>-Zusatzinformationen sieht so aus:
</p>

<pre><code>{ 
"@context": "http://purl.org/jsonld/Person",
"@subject": "http://dbpedia.org/resource/John_Lennon",
"name": "John Lennon",
"birthday": "1940-10-09",
"member": "http://dbpedia.org/resource/The_Beatles"
}</code></pre>

<p>
  Diese Beispiel beschreibt einer Person, deren Name „John Lennon“ ist. Der Unterschied zu normalem JSON und JSON-LD ist der, dass dieses Objekt sich eindeutig selbst beschreibt und so ohne Mehrdeutigkeit in jeder Anwendung verwendet werden kann, die mit <code>@context</code> ein eindeutiger „Namesraum“ angegeben wird, der die Bedeutung der Daten beschreibt. Mit <code>@subject</code> ist es dann möglich den konkreten Datensatz eindeutig zu identifizieren.
</p>

<p>
  Die Informationsanreicherung für untergeordnete Elemente, die z.B. als Liste vorliegen ist mit JSON-LD <a href="http://json-ld.org/spec/latest/json-ld-syntax/#rdf-collection">ebenfalls möglich</a>.
</p>

<p>
  Soweit, so gut &mdash; aber eben für meinen Anwendungsfall nicht ausreichend: Ich möchte nicht bei jeder Nachricht <em>alle</em> zugehörigen Objekte mitliefern, sondern den Client selber entscheiden lassen, was er benötigt.
</p>

<h3>
  Verweise definieren
</h3>

<p>
  Die Spezifiktion geht davon aus, dass eine JSON-Nachricht immer die zu einem Objekt gehörenden Kind-Elemente enthält. Sie sieht aber nicht die Möglichkeit vor, <strong>Verweise</strong> zu weiteren Datensätzen zu definieren. Mark Nottingham zeigt in seinem Blog-Eintrag „<a href="http://www.mnot.net/blog/2011/11/25/linking_in_json">Linking in JSON</a>“, dass dieses Problem auch in anderen Linked-Data-Ansätzen nicht zufriedenstellend gelöst wird, auch wenn es mit <a href="http://tools.ietf.org/html/draft-pbryan-zyp-json-ref-00">JSON Reference</a> und <a href="http://blog.stateless.co/post/13296666138/json-linking-with-hal">HAL</a> mindestens zwei Ansätze gibt, fehlt beiden jedoch die Möglichkeit den Kontext der verknüpften Daten zu definieren, denn Anhand des Kontexts einer Relation kann der Verwendern erkennen und entscheiden, ob es für ihn Sinn macht, eine Relation weiter zu verfolgen.
</p>

<p>
  In meiner Anwendung habe ich mich entschieden in der Syntax von JSON-LD zu bleiben und ein weiteres Element ein zu führen: <code>@relations</code>. Dieses Element ist eine Liste von Relation die zum jeweiligen Objekt gehören. Jede Relation beschreibt dabei mit <code>relatedcontext</code>, welchen Kontext das andere Objekt hat und unter welcher URL (<code>href</code>) dieses Objekt abgerufen werden kann; mit <code>role</code> wird die Art der Beziehung beschrieben. Optional gibt das Attribut <code>list</code> an, ob es sich um eine Liste von Objekten handelt.
</p>

<h3>
  Beispiel: John, mal wieder
</h3>

<p>
  Im Beispiel verwenden wir wieder John und definieren eine Relation zu seiner Frau Yoko Ono, sowie zu den Singles, die er geschrieben hat.
</p>

<pre><code>{ 
"@context": "http://purl.org/jsonld/Person",
"@subject": "http://dbpedia.org/resource/John_Lennon",
&lt;strong>"@relations": [
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
    "list": True,
  }
],&lt;/strong>
"name": "John Lennon",
"birthday": "1940-10-09",
"member": "http://dbpedia.org/resource/The_Beatles"
}</code></pre>

<p>
  Dem Verwender kann so mitgeteilt werden, dass wenn er dem (fiktiven) Link <code>http://dbpedia.org/resource/John_Lennon/singles/</code> folgt, er eine Liste von Singles erhält, die John geschrieben hat. Es bleibt aber Sache des Verwenders zu entscheiden, ob er in seiner Anwendung überhaupt ein Personen-Objekt definiert hat, dass Verweise auf Singles enthält.
</p>

<h3>
  Fazit
</h3>

<p>
  Der gezeigte Lösungsansatz ermöglicht es, die Menge der übertragenen Daten in einer JSON-Nachricht gering zu halten, gleichzeitig bleibt aber die Möglichkeit bestehen, zugehörige Objekte erkennen und nachladen zu können.
</p>
