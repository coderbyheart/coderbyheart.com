---
title: >-
  JAXP DOM: Whitespace aus XML entfernen
abstract: |
  In Java 1.6 gibt es einen Bug im Dom-XML-Parser, der Whitespaces trotz aktiviertem Hinweis nicht entfernt.
date: 2010-06-16T00:00:00.000Z
---

In Java 1.6 gibt es einen Bug im Dom-XML-Parser, der Whitespaces trotz
aktiviertem Hinweis nicht entfernt.

    DocumentBuilderFactory domBuilderFactory = DocumentBuilderFactory.newInstance();
    domBuilderFactory.setIgnoringElementContentWhitespace(true);

Abhilfe schafft da diese Methode:

    /**
     * Entfernt whitespace aus dem Document
     *
     * @see http://forums.java.net/jive/thread.jspa?messageID=345459
     * @param e
     */
    private static void removeWhitespaceNodes(Element e) {
        NodeList children = e.getChildNodes();
        for (int i = children.getLength() - 1; i &gt;= 0; i--) {
            Node child = children.item(i);
            if (child instanceof Text && ((Text) child).getData().trim().length() == 0) {
                e.removeChild(child);
            } else if (child instanceof Element) {
                removeWhitespaceNodes((Element) child);
            }
        }
    }
