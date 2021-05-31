---
eleventyNavigation:
  key: Theme
  parent: Components
layout: layout.njk
title: Theme
permalink: liquid/components/ld-theme/
---

# Theme

Liquid comes with multiple themes for theming its UI components. Most of the examples in the documentation have a theme switch built in, which you can use to switch between the available themes. In the following examples this switch is turned off. Instead, the examples show how you can apply a theme yourself.

## How to apply a theme

You apply a theme by wrapping whatever needs to be themed in an `ld-theme` component, or an element with a CSS theme class.

{% example 'html', false, false, false, false %}
<ld-theme name="bubblegum">
  <ld-button>Text</ld-button>
</ld-theme>

<!-- CSS component -->

<div class="ld-theme-bubblegum">
  <button class="ld-button">Text</button>
</div>
{% endexample %}

## Theme inception

In rare cases you will want to have a theming element wrapped by another theming element. Liquid supports a one level theme inception, which should be sufficiant for most edge cases. You can **not** wrap a theme in a theme in a theme... So, here is an example of a one level theme inception:

{% example 'html', false, false, false, false %}
<ld-theme name="bubblegum">
  <ld-theme name="tea">
    <ld-button>Text</ld-button>
  </ld-theme>
</ld-theme>

<!-- CSS component -->

<div class="ld-theme-bubblegum">
  <div class="ld-theme-tea">
    <button class="ld-button">Text</button>
  </div>
</div>
{% endexample %}


<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description     | Type                                                      | Default   |
| -------- | --------- | --------------- | --------------------------------------------------------- | --------- |
| `name`   | `name`    | The theme name. | `"bubblegum" \| "ocean" \| "shake" \| "solvent" \| "tea"` | `'ocean'` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
