---
eleventyNavigation:
  key: Screen Readers
  parent: Components
layout: layout.njk
title: Screen Readers
permalink: liquid/components/ld-sr-only/
---

# Screen Readers
Utilities for improving accessibility with screen readers.

## ld-sr-only

Use `ld-sr-only` to hide an element visually without hiding it from screen readers.

The CSS class `ld-sr-only` works the same way as its web component counterpart, except that it can be applied to an HTML element directly while the web component wraps the element which needs to be only screen reader visible.

{% example 'html', false, true %}
<ld-sr-only>Hello screen reader</ld-sr-only>

<!-- CSS component -->

<span class="ld-sr-only">Hello screen reader</span>
{% endexample %}


<!-- Auto Generated Below -->


## Dependencies

### Used by

 - docs-copy-to-cb
 - docs-pick-theme
 - docs-switch-web-css
 - docs-toggle-code

### Graph
```mermaid
graph TD;
  docs-copy-to-cb --> ld-sr-only
  docs-pick-theme --> ld-sr-only
  docs-switch-web-css --> ld-sr-only
  docs-toggle-code --> ld-sr-only
  style ld-sr-only fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
