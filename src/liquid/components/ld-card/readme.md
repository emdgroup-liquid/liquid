---
eleventyNavigation:
  key: Card
  parent: Components
layout: layout.njk
title: Card
permalink: components/ld-card/
---

<link rel="stylesheet" href="css_components/ld-card.css">
<link rel="stylesheet" href="css_components/ld-typo.css">

# ld-card

The `ld-card` component can be used to list content in visually clearly separated and highlighted areas.

---

## Default

{% example %}
<ld-card>
  <ld-typo>Lorem ipsum dolor sit amet.</ld-typo>
</ld-card>

<!-- CSS component -->

<div class="ld-card">
  <p class="ld-typo ld-typo--body-m">Lorem ipsum dolor sit amet.</p>
</div>
{% endexample %}

## Size

The `size` prop effects the card padding only.

{% example %}
<ld-card>
  <ld-typo>Lorem ipsum dolor sit amet.</ld-typo>
</ld-card>

<ld-card size="sm">
  <ld-typo>Lorem ipsum dolor sit amet.</ld-typo>
</ld-card>

<!-- CSS component -->

<div class="ld-card">
  <p class="ld-typo ld-typo--body-m">Lorem ipsum dolor sit amet.</p>
</div>

<div class="ld-card ld-card--sm">
  <p class="ld-typo ld-typo--body-m">Lorem ipsum dolor sit amet.</p>
</div>
{% endexample %}

## Shadow

{% example %}
<ld-card>
  <ld-typo>Lorem ipsum dolor sit amet.</ld-typo>
</ld-card>

<ld-card shadow="active">
  <ld-typo>Lorem ipsum dolor sit amet.</ld-typo>
</ld-card>

<ld-card shadow="hover">
  <ld-typo>Lorem ipsum dolor sit amet.</ld-typo>
</ld-card>

<ld-card shadow="sticky">
  <ld-typo>Lorem ipsum dolor sit amet.</ld-typo>
</ld-card>

<!-- CSS component -->

<div class="ld-card">
  <p class="ld-typo ld-typo--body-m">Lorem ipsum dolor sit amet.</p>
</div>

<div class="ld-card ld-card--active">
  <p class="ld-typo ld-typo--body-m">Lorem ipsum dolor sit amet.</p>
</div>

<div class="ld-card ld-card--hover">
  <p class="ld-typo ld-typo--body-m">Lorem ipsum dolor sit amet.</p>
</div>

<div class="ld-card ld-card--sticky">
  <p class="ld-typo ld-typo--body-m">Lorem ipsum dolor sit amet.</p>
</div>
{% endexample %}

## Shadow interactive

Use the `shadow-interactive` prop for a transition to a different shadow on hover and focus-within.

{% example %}
<ld-card shadow-interactive="sticky">
  <ld-typo style="margin-bottom: 1rem">Lorem ipsum dolor sit amet.</ld-typo>
  <ld-button mode="highlight">Click me</ld-button>
</ld-card>

<ld-card shadow="sticky" shadow-interactive="stacked">
  <ld-typo style="margin-bottom: 1rem">Lorem ipsum dolor sit amet.</ld-typo>
  <ld-button mode="highlight">Click me</ld-button>
</ld-card>

<!-- CSS component -->

<div class="ld-card ld-card--interactive-sticky">
  <p class="ld-typo ld-typo--body-m" style="margin-bottom: 1rem">Lorem ipsum dolor sit amet.</p>
  <button class="ld-button ld-button--highlight">Click me</button>
</div>

<div class="ld-card ld-card--sticky ld-card--interactive-stacked">
  <p class="ld-typo ld-typo--body-m" style="margin-bottom: 1rem">Lorem ipsum dolor sit amet.</p>
  <button class="ld-button ld-button--highlight">Click me</button>
</div>
{% endexample %}

<!-- Auto Generated Below -->


## Properties

| Property            | Attribute            | Description                                                                                                        | Type                                           | Default     |
| ------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------- | ----------- |
| `key`               | `key`                | for tracking the node's identity when working with lists                                                           | `string \| number`                             | `undefined` |
| `ref`               | `ref`                | reference to component                                                                                             | `any`                                          | `undefined` |
| `shadow`            | `shadow`             | Simulates card elevation by setting the size of the card box shadow.                                               | `"active" \| "hover" \| "stacked" \| "sticky"` | `'stacked'` |
| `shadowInteractive` | `shadow-interactive` | Adds hover and focus-within states using an elevation transition from `shadow` (see above) to `shadowInteractive`. | `"active" \| "hover" \| "stacked" \| "sticky"` | `undefined` |
| `size`              | `size`               | The size prop effects the card padding only.                                                                       | `"sm"`                                         | `undefined` |
| `tag`               | `tag`                | The rendered HTML tag for the card. Use `li` to group cards in a list.                                             | `string`                                       | `'div'`     |


## Shadow Parts

| Part     | Description |
| -------- | ----------- |
| `"card"` |             |


----------------------------------------------

 
