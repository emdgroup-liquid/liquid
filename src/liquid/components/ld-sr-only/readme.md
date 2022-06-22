---
eleventyNavigation:
  key: Screen Reader Only
  parent: Components
layout: layout.njk
title: Screen Reader Only
permalink: components/ld-sr-only/
---

<link rel="stylesheet" href="css_components/ld-sr-only.css">

# ld-sr-only

Use `ld-sr-only` to hide an element visually without hiding it from screen readers.

The CSS class `ld-sr-only` works the same way as its Web Component counterpart, except that it can be applied to an HTML element directly while the Web Component wraps the element which needs to be only screen reader visible.

---

## Examples

{% example '{ "opened": true }' %}
<ld-sr-only>Hello screen reader</ld-sr-only>

<!-- CSS component -->

<span class="ld-sr-only">Hello screen reader</span>
{% endexample %}


<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                              | Type               | Default     |
| -------- | --------- | -------------------------------------------------------- | ------------------ | ----------- |
| `key`    | `key`     | for tracking the node's identity when working with lists | `string \| number` | `undefined` |
| `ref`    | `ref`     | reference to component                                   | `any`              | `undefined` |


## Dependencies

### Used by

 - [ld-sidenav-header](../ld-sidenav/ld-sidenav-header)
 - [ld-sidenav-toggle-outside](../ld-sidenav/ld-sidenav-toggle-outside)
 - [ld-sr-live](../ld-sr-live)
 - [ld-tooltip](../ld-tooltip)

### Graph
```mermaid
graph TD;
  ld-sidenav-header --> ld-sr-only
  ld-sidenav-toggle-outside --> ld-sr-only
  ld-sr-live --> ld-sr-only
  ld-tooltip --> ld-sr-only
  style ld-sr-only fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

 
