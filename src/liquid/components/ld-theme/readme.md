---
eleventyNavigation:
  key: Theme
  parent: Components
layout: layout.njk
title: Theme
permalink: components/ld-theme/
---

# ld-theme

Liquid comes with multiple themes for theming its UI components. Most of the examples in the documentation have a theme switch built in, which you can use to switch between the available themes. In the following examples this switch is turned off. Instead, the examples show how you can apply a theme yourself.

---

## How to apply a theme

You apply a theme by wrapping whatever needs to be themed in an `ld-theme` component, or an element with a CSS theme class.

{% example 'html', false, true, false, false %}
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

{% example 'html', false, true, false, false %}
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

## CSS Custom Properties

You have access to CSS custom properties with a color value depending on the current theme:

```html
--ld-thm-accent
--ld-thm-bg-primary
--ld-thm-bg-secondary
--ld-thm-highlight
```

### Examples

The following examples illustrate the variables applied to background color within each theme:

#### Theme Ocean

<div class="ld-theme-ocean">
  <docs-color var="--ld-thm-accent"></docs-color>
  <docs-color var="--ld-thm-bg-primary"></docs-color>
  <docs-color var="--ld-thm-bg-secondary"></docs-color>
  <docs-color var="--ld-thm-highlight"></docs-color>
</div>

#### Theme Bubblegum

<div class="ld-theme-bubblegum">
  <docs-color var="--ld-thm-accent"></docs-color>
  <docs-color var="--ld-thm-bg-primary"></docs-color>
  <docs-color var="--ld-thm-bg-secondary"></docs-color>
  <docs-color var="--ld-thm-highlight"></docs-color>
</div>

#### Theme Shake

<div class="ld-theme-shake">
  <docs-color var="--ld-thm-accent"></docs-color>
  <docs-color var="--ld-thm-bg-primary"></docs-color>
  <docs-color var="--ld-thm-bg-secondary"></docs-color>
  <docs-color var="--ld-thm-highlight"></docs-color>
</div>

#### Theme Solvent

<div class="ld-theme-solvent">
  <docs-color var="--ld-thm-accent"></docs-color>
  <docs-color var="--ld-thm-bg-primary"></docs-color>
  <docs-color var="--ld-thm-bg-secondary"></docs-color>
  <docs-color var="--ld-thm-highlight"></docs-color>
</div>

#### Theme Tea

<div class="ld-theme-tea">
  <docs-color var="--ld-thm-accent"></docs-color>
  <docs-color var="--ld-thm-bg-primary"></docs-color>
  <docs-color var="--ld-thm-bg-secondary"></docs-color>
  <docs-color var="--ld-thm-highlight"></docs-color>
</div>

<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                              | Type                                                      | Default     |
| -------- | --------- | -------------------------------------------------------- | --------------------------------------------------------- | ----------- |
| `key`    | `key`     | for tracking the node's identity when working with lists | `string \| number`                                        | `undefined` |
| `name`   | `name`    | The theme name.                                          | `"bubblegum" \| "ocean" \| "shake" \| "solvent" \| "tea"` | `'ocean'`   |
| `ref`    | `ref`     | reference to component                                   | `any`                                                     | `undefined` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
