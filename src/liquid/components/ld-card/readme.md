---
eleventyNavigation:
  key: Card
  parent: Components
layout: layout.njk
title: Card
permalink: components/ld-card/
---

<link rel="stylesheet" href="{{ env.base }}/{{ buildstamp }}css_components/ld-card.css">
<link rel="stylesheet" href="{{ env.base }}/{{ buildstamp }}css_components/ld-typo.css">

# ld-card

The `ld-card` component can be used to list content in visually clearly separated and highlighted areas.

Additionally, there is the [`ld-card-stack`](components/ld-card/ld-card-stack/) component, which allows you to display multiple `ld-card`s in a stack.

---

## Default

{% example %}
<ld-card>
  <ld-typo>Lorem ipsum dolor sit amet.</ld-typo>
</ld-card>

<!-- React component -->

<LdCard>
  <LdTypo>Lorem ipsum dolor sit amet.</LdTypo>
</LdCard>

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

<!-- React component -->

<LdCard>
  <LdTypo>Lorem ipsum dolor sit amet.</LdTypo>
</LdCard>

<LdCard size="sm">
  <LdTypo>Lorem ipsum dolor sit amet.</LdTypo>
</LdCard>

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

<!-- React component -->

<LdCard>
  <LdTypo>Lorem ipsum dolor sit amet.</LdTypo>
</LdCard>

<LdCard shadow="active">
  <LdTypo>Lorem ipsum dolor sit amet.</LdTypo>
</LdCard>

<LdCard shadow="hover">
  <LdTypo>Lorem ipsum dolor sit amet.</LdTypo>
</LdCard>

<LdCard shadow="sticky">
  <LdTypo>Lorem ipsum dolor sit amet.</LdTypo>
</LdCard>

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
  <ld-typo style="margin-bottom: 1rem">
    Lorem ipsum dolor sit amet.
  </ld-typo>
  <ld-button mode="highlight">Click me</ld-button>
</ld-card>

<ld-card shadow="sticky" shadow-interactive="stacked">
  <ld-typo style="margin-bottom: 1rem">
    Lorem ipsum dolor sit amet.
  </ld-typo>
  <ld-button mode="highlight">Click me</ld-button>
</ld-card>

<!-- React component -->

<LdCard shadowInteractive="sticky">
  <LdTypo style={ { marginBottom: '1rem' } }>
    Lorem ipsum dolor sit amet.
  </LdTypo>
  <LdButton mode="highlight">Click me</LdButton>
</LdCard>

<LdCard shadow="sticky" shadowInteractive="stacked">
  <LdTypo style={ { marginBottom: '1rem' } }>
    Lorem ipsum dolor sit amet.
  </LdTypo>
  <LdButton mode="highlight">Click me</LdButton>
</LdCard>

<!-- CSS component -->

<div class="ld-card ld-card--interactive-sticky">
  <p class="ld-typo ld-typo--body-m" style="margin-bottom: 1rem">
    Lorem ipsum dolor sit amet.
  </p>
  <button class="ld-button ld-button--highlight">
    Click me
  </button>
</div>

<div class="ld-card ld-card--sticky ld-card--interactive-stacked">
  <p class="ld-typo ld-typo--body-m" style="margin-bottom: 1rem">
    Lorem ipsum dolor sit amet.
  </p>
  <button class="ld-button ld-button--highlight">
    Click me
  </button>
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


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
