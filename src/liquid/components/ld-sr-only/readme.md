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

## sr-only Web component

Use sr-only to hide an element visually without hiding it from screen readers:

{% example %}
<ld-sr-only>Hello screen reader</ld-sr-only>
{% endexample %}

## sr-only CSS class

The CSS class sr-only works the same way as its web component counterpart, except that it can be applied to an HTML element directly while the web component wraps the element which needs to be only screen reader visible:

<link rel="stylesheet" href="ld-sr-only.css">
{% example %}
<span class="ld-sr-only">Hello screen reader</span>
{% endexample %}

These are the styles applied with screen-reader-only:

|              |                  |
|--------------|------------------|
| position     | absolute         |
| width        | 1px              |
| height       | 1px              |
| padding      | 0                |
| margin       | -1px             |
| overflow     | hidden           |
| clip         | rect(0, 0, 0, 0) |
| white-space  | nowrap           |
| border-width | 0                | 

<!-- Auto Generated Below -->


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
