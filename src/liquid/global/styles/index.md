---
layout: layout.njk
eleventyNavigation:
  key: Styles
  parent: Global
---

Note: Currently changes to global styles do not trigger a rebuild via Stencil (see https://github.com/ionic-team/stencil/issues/1795). For this reason we use a separate watcher on global styles which triggers the rebuild during development of liquid (see scripts in package.json).