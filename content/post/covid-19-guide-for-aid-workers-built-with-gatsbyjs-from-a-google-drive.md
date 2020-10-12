---
title:
  COVID-19 guide for Aid Workers built with GatsbyJS from a Google Drive folder
subtitle: resources.distributeaid.org
abstract: >-
  [resources.distributeaid.org](https://resources.distributeaid.org) provides a
  browser-friendly UI for a Google Drive folder.
hero: resources.distributeaid.org.png
---

Last year in October I joined [Distribute Aid](https://distributeaid.org/) as a
volunteer. I craft software for them which helps with their mission: build tools
that help refugee aid groups discover and connect with each other, collaborate
on aid shipments, share knowledge, and engage volunteers.

End of March we launched a landing page for a collection of information about
COVID-19 and how to safely organize community aid during the outbreak which has
been reviewed by front-line medical and refugee aid workers and which was
provided for readers in
[this Google Drive folder](https://drive.google.com/drive/folders/1FpnENOl1oZXLzmvvIqrR3kJgPNsGaDTo).

Google Drive is amazing for collaborating on these resources but is a heavy web
application which includes a lot of features for _editing_ content, which is not
needed when _reading_ the content.

In April I started experimenting towards a solution that would keep the great
editing capabilities of Google Drive (which are essential for incorporating
feedback from dozens of contributors) but on the same hand improve the usability
for readers.

After implementing an exporter, which uses [pandoc](https://pandoc.org/) to
convert the HTML files which
[can be exported using the Google Drive API](https://developers.google.com/drive/api/v3/reference/files/export)
to Markdown, I fed them into [GitBook](https://www.gitbook.com/), a great
service which turns a collection of Markdown files into a nice website. GitBook
is ideal for content heavy, documentation style projects. However for use the
options to customize the design of the generated website was too limited.

I then turned to [GatsbyJS](https://www.gatsbyjs.org/), a great _static site
generator_ which allows to customize every aspect of the generated website and
helped me to build a nicely designed guide that follows Distribute Aid's
corporate identity, including a great mobile experience.

Because of the richt ecosystem of Gatsby adding full text search with
[Algolia](https://www.algolia.com/) was done very quick and could be integrated
exactly where it makes sense for a guide.

Please check out **and share** the guide:
[resources.distributeaid.org](https://resources.distributeaid.org/).

The source code for the project can be located
[on GitHub](https://github.com/distributeaid/covid-19-resources-drive-export).
