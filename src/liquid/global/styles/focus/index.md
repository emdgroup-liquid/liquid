---
eleventyNavigation:
  key: Focus
  parent: Globals
layout: layout.njk
title: Focus
permalink: liquid/global/focus/
---

# Focus

> Any keyboard operable user interface has a mode of operation where the keyboard focus indicator is visible.
> [https://www.w3.org/TR/WCAG21/#focus-visible](https://www.w3.org/TR/WCAG21/#focus-visible)

Focus handling is taken care of by Liquid's global CSS, so there's no work to do on your side, except for loading the required CSS file. Please refer to our documentation on [importing stylesheets](http://localhost:8080/#import-stylesheets) from Liquid.

The strategy used for focus handing consists of combining individual visual UI component focus states with the browser default outline based focus indicators, enabled only when the user is navigating using the keyboard. The latter is achieved using this code snippet as part of the liquid globals CSS bundle:

```css
:focus:not(:focus-visible) {
  outline: none;
}
```
