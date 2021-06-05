---
eleventyNavigation:
  key: Paragraph
  parent: Components
layout: layout.njk
title: Paragraph
permalink: components/ld-paragraph/
---

# Paragraph

Paragraphs are usually represented in visual media as blocks of text separated from adjacent blocks by blank lines and/or first-line indentation.

---

## Examples

{% example "html", true %}
<ld-paragraph size="xs">
Almost before we knew it, we had left the ground.
</ld-paragraph>

<ld-paragraph size="s">
  Almost before we knew it, we had left the ground.
</ld-paragraph>

<ld-paragraph>
  Almost before we knew it, we had left the ground.
</ld-paragraph>

<ld-paragraph size="l">
  Almost before we knew it, we had left the ground.
</ld-paragraph>

<ld-paragraph size="xl">
  Almost before we knew it, we had left the ground.
</ld-paragraph>

<!-- CSS component -->

<p class="ld-paragraph ld-paragraph--xs">
  Almost before we knew it, we had left the ground.
</p>

<p class="ld-paragraph ld-paragraph--s">
  Almost before we knew it, we had left the ground.
</p>

<p class="ld-paragraph">
  Almost before we knew it, we had left the ground.
</p>

<p class="ld-paragraph ld-paragraph--l">
  Almost before we knew it, we had left the ground.
</p>

<p class="ld-paragraph ld-paragraph--xl">
  Almost before we knew it, we had left the ground.
</p>
{% endexample %}


<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                        | Type                                | Default |
| -------- | --------- | ---------------------------------- | ----------------------------------- | ------- |
| `size`   | `size`    | Defines font size and line height. | `"l" \| "m" \| "s" \| "xl" \| "xs"` | `'m'`   |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
