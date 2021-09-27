---
eleventyNavigation:
  key: Heading
  parent: Components
layout: layout.njk
title: Heading
permalink: components/ld-heading/
---

# ld-heading

<link rel="stylesheet" href="/dist/build/css/ld-heading.css">

Headings are used as an introduction into a topic or a content section and for visual and semantic differentiation between content blocks.

> **Note**: A common navigation technique for users of screen reading software is jumping from heading to heading to quickly determine the content of the page. Because of this, it is important to not skip one or more heading levels. Doing so may create confusion, as the person navigating this way may be left wondering where the missing heading is.
> 
> If you really must place headings in a way that they are visually not following a semantic hirarchicy, use the `visual-level` property for visually styling the heading according to the design given, while still applying correct semantical heading levels using the `level` prop. 

---

## Examples

### With heading level

{% example "html", true %}
<ld-heading level="1">
  Almost before we knew it, we had left the ground.
</ld-heading>

<ld-heading level="2">
  Almost before we knew it, we had left the ground.
</ld-heading>

<ld-heading level="3">
  Almost before we knew it, we had left the ground.
</ld-heading>

<ld-heading level="4">
  Almost before we knew it, we had left the ground.
</ld-heading>

<ld-heading level="5">
  Almost before we knew it, we had left the ground.
</ld-heading>

<ld-heading level="6">
  Almost before we knew it, we had left the ground.
</ld-heading>

<!-- CSS component -->

<h1 class="ld-heading ld-heading--h1">
  Almost before we knew it, we had left the ground.
</h1>

<h2 class="ld-heading ld-heading--h2">
  Almost before we knew it, we had left the ground.
</h2>

<h3 class="ld-heading ld-heading--h3">
  Almost before we knew it, we had left the ground.
</h3>

<h4 class="ld-heading ld-heading--h4">
  Almost before we knew it, we had left the ground.
</h4>

<h5 class="ld-heading ld-heading--h5">
  Almost before we knew it, we had left the ground.
</h5>

<h6 class="ld-heading ld-heading--h6">
  Almost before we knew it, we had left the ground.
</h6>
{% endexample %}

### With deviating visual level `b*`

`b*` headings should be only a couple of words long.

{% example "html", true %}
<ld-heading level="1" visual-level="b1">
  Lorem ipsum
</ld-heading>

<ld-heading level="2" visual-level="b2">
  Lorem ipsum
</ld-heading>

<ld-heading level="3" visual-level="b3">
  Lorem ipsum
</ld-heading>

<ld-heading level="4" visual-level="b4">
  Lorem ipsum
</ld-heading>

<ld-heading level="5" visual-level="b5">
  Lorem ipsum
</ld-heading>

<ld-heading level="6" visual-level="b6">
  Lorem ipsum
</ld-heading>

<!-- CSS component -->

<h1 class="ld-heading ld-heading--b1" aria-label="Lorem ipsum">
  Lorem ipsum
</h1>

<h2 class="ld-heading ld-heading--b2" aria-label="Lorem ipsum">
  Lorem ipsum
</h2>

<h3 class="ld-heading ld-heading--b3" aria-label="Lorem ipsum">
  Lorem ipsum
</h3>

<h4 class="ld-heading ld-heading--b4" aria-label="Lorem ipsum">
  Lorem ipsum
</h4>

<h5 class="ld-heading ld-heading--b5" aria-label="Lorem ipsum">
  Lorem ipsum
</h5>

<h6 class="ld-heading ld-heading--b6" aria-label="Lorem ipsum">
  Lorem ipsum
</h6>
{% endexample %}

### With deviating visual level `xh*`

{% example "html", true %}
<ld-heading level="1" visual-level="xh1">
  Almost before we knew it, we had left the ground.
</ld-heading>

<ld-heading level="2" visual-level="xh2">
  Almost before we knew it, we had left the ground.
</ld-heading>

<ld-heading level="3" visual-level="xh3">
  Almost before we knew it, we had left the ground.
</ld-heading>

<!-- CSS component -->

<h1 class="ld-heading ld-heading--xh1">
  Almost before we knew it, we had left the ground.
</h1>

<h2 class="ld-heading ld-heading--xh2">
  Almost before we knew it, we had left the ground.
</h2>

<h3 class="ld-heading ld-heading--xh3">
  Almost before we knew it, we had left the ground.
</h3>
{% endexample %}

### With deviating visual level `xb*`

`xb*` headings should be only a couple of words long.

{% example "html", true %}
<ld-heading level="1" visual-level="xb1">
  Lipsum
</ld-heading>

<ld-heading level="2" visual-level="xb2">
  Lipsum
</ld-heading>

<ld-heading level="3" visual-level="xb3">
  Lipsum
</ld-heading>

<!-- CSS component -->

<h1 class="ld-heading ld-heading--xb1" aria-label="Lorem ipsum">
  Lipsum
</h1>

<h2 class="ld-heading ld-heading--xb2" aria-label="Lorem ipsum">
  Lipsum
</h2>

<h3 class="ld-heading ld-heading--xb3" aria-label="Lorem ipsum">
  Lipsum
</h3>
{% endexample %}

## Heading colors

You may have noticed that all `b*` and `xb*` headings use a color given by the current theme, while all `h*` and `xh*` headings inherit their color. While this is the default behaviour, you can still apply a different color on both types of headings. This may be usefull, if, for instance, you need to display a `b1` heading in "vibrant yellow" on top of a background using a "rich color".

> **Note**: With great power comes great responsibility. Make sure you follow the brand guidelines. Especially make sure that the text remains readable at all times. Check the text for accessibility issues, such as [insufficiant contrast](https://www.w3.org/TR/WCAG21/#contrast-minimum).

Here are some examples on how you can apply different colors on headings:

{% example "html", true %}
<style>
.custom-color { color: var(--ld-col-vm-default); }
</style>

<ld-heading level="1" visual-level="b1" class="custom-color">
  Lorem ipsum
</ld-heading>

<ld-heading level="2" visual-level="h1" style="color: var(--ld-col-vc4)">
  Almost before we knew it, we had left the ground.
</ld-heading>

<!-- CSS component -->

<style>
.custom-color { color: var(--ld-col-vm-default); }
</style>

<h1 class="ld-heading ld-heading--b1 custom-color" aria-label="Lorem ipsum">
  Lorem ipsum
</h1>

<h2 class="ld-heading ld-heading--h1" style="color: var(--ld-col-vc4)">
  Almost before we knew it, we had left the ground.
</h2>

{% endexample %}

<!-- Auto Generated Below -->


## Properties

| Property             | Attribute      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Type                                                                                                                                                                            | Default     |
| -------------------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `ariaLabel`          | `aria-label`   | Since b* and xb* headings are uppercase headings, screen readers need to be served a (non-uppercase) aria-label (otherwise they will read out the heading letter by letter). If you're using a b* or xb* visual level heading, an aria-label will be set automatically on the heading element. The component will use the inner HTML for the label implicitly. If you want to set an aria-label explicitly (such as when you have inner HTML that should not be part of the label), you can use this property. | `string`                                                                                                                                                                        | `undefined` |
| `key`                | `key`          | for tracking the node's identity when working with lists                                                                                                                                                                                                                                                                                                                                                                                                                                                       | `string \| number`                                                                                                                                                              | `undefined` |
| `level` _(required)_ | `level`        | The heading level.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | `"1" \| "2" \| "3" \| "4" \| "5" \| "6" \| 1 \| 2 \| 3 \| 4 \| 5 \| 6`                                                                                                          | `undefined` |
| `ref`                | `ref`          | reference to component                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | `any`                                                                                                                                                                           | `undefined` |
| `visualLevel`        | `visual-level` | The heading style. Overrides the style inferred from the heading level.                                                                                                                                                                                                                                                                                                                                                                                                                                        | `"h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6" \| "b1" \| "b2" \| "b3" \| "b4" \| "b5" \| "b6" \| "xb1" \| "xb2" \| "xb3" \| "xh1" \| "xh2" \| "xh3" \| "xh4" \| "xh5" \| "xh6"` | `undefined` |


----------------------------------------------

 
