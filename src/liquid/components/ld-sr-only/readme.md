---
eleventyNavigation:
  key: Screen Readers
  parent: Components
layout: layout.njk
title: Screen Readers
permalink: components/ld-sr-only/
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


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
