---
eleventyNavigation:
  key: Screen Reader Only
  parent: Components
layout: layout.njk
title: Screen Reader Only
permalink: components/ld-sr-only/
---

# ld-sr-only

Use `ld-sr-only` to hide an element visually without hiding it from screen readers.

The CSS class `ld-sr-only` works the same way as its Web Component counterpart, except that it can be applied to an HTML element directly while the Web Component wraps the element which needs to be only screen reader visible.

---

## Examples

{% example 'html', false, true %}
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


----------------------------------------------

 
