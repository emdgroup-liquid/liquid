---
eleventyNavigation:
  key: Heading
  parent: Components
layout: layout.njk
title: Heading
permalink: liquid/components/ld-heading/
---

# Heading

Headings are used as an introduction into a topic and for visual differentiation between content blocks. Headlines require hierarchies and a placement conform with these.

---

## Web component

{% example %}
<ld-heading level="1">
  Almost before we knew it, we had left the ground.
</ld-heading>
{% endexample %}

### With deviating visual level

{% example %}
<ld-heading level="1" visual-level="h3">
  Almost before we knew it, we had left the ground.
</ld-heading>
{% endexample %}


<!-- Auto Generated Below -->


## Properties

| Property             | Attribute      | Description                                                                                                                                                                                                                                                    | Type                                                                                                                                                                            | Default     |
| -------------------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `ariaLabel`          | `aria-label`   | The aria-label prop. This prop is required if you're using a b1 to b6 visual level: Since b1 to b6 headings are uppercase headings, screen readers need to be served a (non-uppercase) aria-label (otherwise they will read out the heading letter by letter). | `string`                                                                                                                                                                        | `undefined` |
| `level` _(required)_ | `level`        | The heading level.                                                                                                                                                                                                                                             | `1 \| 2 \| 3 \| 4 \| 5 \| 6`                                                                                                                                                    | `undefined` |
| `visualLevel`        | `visual-level` | The heading style. Overrides the style inferred from the heading level.                                                                                                                                                                                        | `"h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6" \| "b1" \| "b2" \| "b3" \| "b4" \| "b5" \| "b6" \| "xb1" \| "xb2" \| "xb3" \| "xh1" \| "xh2" \| "xh3" \| "xh4" \| "xh5" \| "xh6"` | `undefined` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
