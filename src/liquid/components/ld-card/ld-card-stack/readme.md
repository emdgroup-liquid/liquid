---
eleventyNavigation:
  key: Card Stack
  parent: Card
layout: layout.njk
title: Card Stack
permalink: components/ld-card/ld-card-stack/
---

<link rel="stylesheet" href="css_components/ld-card-stack.css">
<link rel="stylesheet" href="css_components/ld-card.css">

# ld-card-stack

Use the `ld-card-stack` component to display multiple [`ld-card`](components/ld-card/)s in a stack.

<ld-notice headline="Note" mode="warning">
  A maximum of three cards are displayed in the stack, even if there are more cards in it.
</ld-notice>

---

## Default

{% example %}
<ld-card-stack>
  <ld-card>Card A</ld-card>
  <ld-card>Card B</ld-card>
  <ld-card>Card C</ld-card>
  <ld-card>Card D</ld-card>
  <ld-card>Card E</ld-card>
</ld-card-stack>

<!-- CSS component -->

<ol class="ld-card-stack">
  <li class="ld-card">Card A</li>
  <li class="ld-card">Card B</li>
  <li class="ld-card">Card C</li>
  <li class="ld-card">Card D</li>
  <li class="ld-card">Card E</li>
</ol>
{% endexample %}

## Stack direction

### Left-to-right

{% example %}
<ld-card-stack direction="ltr">
  <ld-card>Card A</ld-card>
  <ld-card>Card B</ld-card>
  <ld-card>Card C</ld-card>
  <ld-card>Card D</ld-card>
  <ld-card>Card E</ld-card>
</ld-card-stack>

<!-- CSS component -->

<ol class="ld-card-stack ld-card-stack--ltr">
  <li class="ld-card">Card A</li>
  <li class="ld-card">Card B</li>
  <li class="ld-card">Card C</li>
  <li class="ld-card">Card D</li>
  <li class="ld-card">Card E</li>
</ol>
{% endexample %}

### Right-to-left

{% example %}
<ld-card-stack direction="rtl">
  <ld-card>Card A</ld-card>
  <ld-card>Card B</ld-card>
  <ld-card>Card C</ld-card>
  <ld-card>Card D</ld-card>
  <ld-card>Card E</ld-card>
</ld-card-stack>

<!-- CSS component -->

<ol class="ld-card-stack ld-card-stack--rtl">
  <li class="ld-card">Card A</li>
  <li class="ld-card">Card B</li>
  <li class="ld-card">Card C</li>
  <li class="ld-card">Card D</li>
  <li class="ld-card">Card E</li>
</ol>
{% endexample %}

### Vertical

{% example %}
<ld-card-stack direction="vertical">
  <ld-card>Card A</ld-card>
  <ld-card>Card B</ld-card>
  <ld-card>Card C</ld-card>
  <ld-card>Card D</ld-card>
  <ld-card>Card E</ld-card>
</ld-card-stack>

<!-- CSS component -->

<ol class="ld-card-stack ld-card-stack--vertical">
  <li class="ld-card">Card A</li>
  <li class="ld-card">Card B</li>
  <li class="ld-card">Card C</li>
  <li class="ld-card">Card D</li>
  <li class="ld-card">Card E</li>
</ol>
{% endexample %}

<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description                                              | Type                           | Default     |
| ----------- | ----------- | -------------------------------------------------------- | ------------------------------ | ----------- |
| `direction` | `direction` | The stack direction.                                     | `"ltr" \| "rtl" \| "vertical"` | `undefined` |
| `key`       | `key`       | for tracking the node's identity when working with lists | `string \| number`             | `undefined` |
| `ref`       | `ref`       | reference to component                                   | `any`                          | `undefined` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
