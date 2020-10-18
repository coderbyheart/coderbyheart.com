---
title: >-
  Hübsche Dummy-Bilder erzeugen
abstract: |
  Der Dummy-Image-Generator erzeugt auf Wunsch die passenden Bilder. Wenn man aber auch mal lokal ein paar Dateien braucht, um z.B. einen Uploader oder eine Galerie zu testen, kann man sich mit ein paar Zeilen Python schnell ein paar Testbilder erzeugen:
date: 2011-07-11
---

Der [Dummy-Image-Generator][1] erzeugt auf Wunsch die passenden Bilder. Wenn man
aber auch mal lokal ein paar Dateien braucht, um z.B. einen Uploader oder eine
Galerie zu testen, kann man sich mit ein paar Zeilen Python schnell [ein paar
Testbilder][2] erzeugen:

<pre>from itertools import cycle
from urllib.request import urlretrieve

words = cycle("Lorem ipsum dolor sit amet consectetur adipiscing elit Etiam 
sit amet tortor velit id consectetur ipsum Morbi id nulla diam sit amet".split(" "))

colors = cycle(["1b9e77","d95f02","7570b3","e7298a",
"66a61e","e6ab02","a6761d","666666","a6cee3","1f78b4",
"b2df8a","33a02c","fb9a99","e31a1c","fdbf6f","ff7f0",
"cab2d6","6a3d9a","ffff99","b15928"])

for i in range(10):
    word = next(words)
    url = "http://dummyimage.com/1280x1024/%s/000000.jpg&#038;text=%s" 
        % (next(colors), word)
    print(urlretrieve(url, "%s.jpg" % word))

</pre>

[1]: http://dummyimage.com/
[2]:
  http://www.flickr.com/photos/tacker/sets/72157627170208596/
  "Lorem ipsum Set auf flickr"
