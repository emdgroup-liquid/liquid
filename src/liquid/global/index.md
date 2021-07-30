---
eleventyNavigation:
  key: Globals
  order: 2
layout: layout.njk
title: Globals
permalink: global/
---

# Globals

[//]: # "Note to Liquid contributors: Currently changes to global styles do not trigger a rebuild via Stencil (see https://github.com/ionic-team/stencil/issues/1795). For this reason we use a separate watcher on global styles which triggers the rebuild during development of Liquid (see scripts in package.json)."

Globals consist of cascading style sheets that are shared by all Liquid components (including shared CSS custom properties, shared utils, font imports etc.). Thus, you need to [import these global style sheets](liquid/getting-started/#import-stylesheets) in order for Liquid to work as intended. 