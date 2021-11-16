---
eleventyNavigation:
  key: Theming
  parent: Globals
layout: layout.njk
title: Theming
permalink: global/theming/
---

<link rel="stylesheet" href="css_components/ld-button.css">

# Theming

Liquid comes with multiple themes for theming its UI components. Most of the examples in the documentation have a theme switch built in, which you can use to switch between the available themes. In the following examples this switch is turned off. Instead, the examples show how you can apply a theme yourself.

---

## How to apply a theme

You apply a theme by wrapping whatever needs to be themed in an element with a `ld-theme-<themename>` CSS class.

{% example 'html', false, true, false, false %}
<div class="ld-theme-bubblegum">
  <ld-button>Text</ld-button>
</div>

<!-- CSS component -->

<div class="ld-theme-bubblegum">
  <button class="ld-button">Text</button>
</div>
{% endexample %}

## Theme inception

In rare cases you may want to have a theming element wrapped by another theming element. Liquid supports unlimited theme inception (nested themes). Here is an example of a two-level theme inception:

{% example 'html', false, true, false, false %}
<div class="ld-theme-bubblegum" style="display: flex;">
  <ld-button>Text</ld-button>
  <div class="ld-theme-tea" style="display: flex;">
    <ld-button style="margin: 0 var(--ld-sp-16);">Text</ld-button>
    <div class="ld-theme-ocean">
      <ld-button>Text</ld-button>
    </div>
  </div>
</div>

<!-- CSS component -->

<div class="ld-theme-bubblegum" style="display: flex;">
  <button class="ld-button">Text</button>
  <div class="ld-theme-tea" style="display: flex;">
    <button class="ld-button" style="margin: 0 var(--ld-sp-16);">Text</button>
    <div class="ld-theme-ocean">
      <button class="ld-button">Text</button>
    </div>
  </div>
</div>
{% endexample %}

## CSS Custom Properties

You have access to CSS custom properties with a color value depending on the current theme:

```html
--ld-thm-primary
--ld-thm-primary-active
--ld-thm-primary-focus
--ld-thm-primary-highlight
--ld-thm-primary-hover
--ld-thm-primary-alpha-low
--ld-thm-primary-alpha-lowest
--ld-thm-secondary
--ld-thm-secondary-active
--ld-thm-secondary-focus
--ld-thm-secondary-highlight
--ld-thm-secondary-hover
--ld-thm-success
--ld-thm-success-active
--ld-thm-success-focus
--ld-thm-success-highlight
--ld-thm-success-hover
--ld-thm-warning
--ld-thm-warning-active
--ld-thm-warning-focus
--ld-thm-warning-highlight
--ld-thm-warning-hover
--ld-thm-error
--ld-thm-error-active
--ld-thm-error-focus
--ld-thm-error-highlight
--ld-thm-error-hover
```

### Examples

The following examples illustrate the variables applied to background color within each theme:

#### Bubblegum

<div class="ld-theme-bubblegum">
    <docs-color var="--ld-thm-primary-focus"></docs-color>
    <docs-color var="--ld-thm-primary"></docs-color>
    <docs-color var="--ld-thm-primary-hover"></docs-color>
    <docs-color var="--ld-thm-primary-active"></docs-color>
    <docs-color is-transparent var="--ld-thm-primary-alpha-low"></docs-color>
    <docs-color is-transparent var="--ld-thm-primary-alpha-lowest"></docs-color>
    <docs-color var="--ld-thm-secondary-focus"></docs-color>
    <docs-color var="--ld-thm-secondary"></docs-color>
    <docs-color var="--ld-thm-secondary-hover"></docs-color>
    <docs-color var="--ld-thm-secondary-active"></docs-color>
    <docs-color var="--ld-thm-success-focus"></docs-color>
    <docs-color var="--ld-thm-success"></docs-color>
    <docs-color var="--ld-thm-success-hover"></docs-color>
    <docs-color var="--ld-thm-success-active"></docs-color>
    <docs-color var="--ld-thm-warning-focus"></docs-color>
    <docs-color var="--ld-thm-warning"></docs-color>
    <docs-color var="--ld-thm-warning-hover"></docs-color>
    <docs-color var="--ld-thm-warning-active"></docs-color>
    <docs-color var="--ld-thm-error-focus"></docs-color>
    <docs-color var="--ld-thm-error"></docs-color>
    <docs-color var="--ld-thm-error-hover"></docs-color>
    <docs-color var="--ld-thm-error-active"></docs-color>
</div>

#### Ocean

<div class="ld-theme-ocean">
  <docs-color var="--ld-thm-primary-focus"></docs-color>
  <docs-color var="--ld-thm-primary"></docs-color>
  <docs-color var="--ld-thm-primary-hover"></docs-color>
  <docs-color var="--ld-thm-primary-active"></docs-color>
  <docs-color is-transparent var="--ld-thm-primary-alpha-low"></docs-color>
  <docs-color is-transparent var="--ld-thm-primary-alpha-lowest"></docs-color>
  <docs-color var="--ld-thm-secondary-focus"></docs-color>
  <docs-color var="--ld-thm-secondary"></docs-color>
  <docs-color var="--ld-thm-secondary-hover"></docs-color>
  <docs-color var="--ld-thm-secondary-active"></docs-color>
  <docs-color var="--ld-thm-success-focus"></docs-color>
  <docs-color var="--ld-thm-success"></docs-color>
  <docs-color var="--ld-thm-success-hover"></docs-color>
  <docs-color var="--ld-thm-success-active"></docs-color>
  <docs-color var="--ld-thm-warning-focus"></docs-color>
  <docs-color var="--ld-thm-warning"></docs-color>
  <docs-color var="--ld-thm-warning-hover"></docs-color>
  <docs-color var="--ld-thm-warning-active"></docs-color>
  <docs-color var="--ld-thm-error-focus"></docs-color>
  <docs-color var="--ld-thm-error"></docs-color>
  <docs-color var="--ld-thm-error-hover"></docs-color>
  <docs-color var="--ld-thm-error-active"></docs-color>
</div>

#### Shake

<div class="ld-theme-shake">
  <docs-color var="--ld-thm-primary-focus"></docs-color>
  <docs-color var="--ld-thm-primary"></docs-color>
  <docs-color var="--ld-thm-primary-hover"></docs-color>
  <docs-color var="--ld-thm-primary-active"></docs-color>
  <docs-color is-transparent var="--ld-thm-primary-alpha-low"></docs-color>
  <docs-color is-transparent var="--ld-thm-primary-alpha-lowest"></docs-color>
  <docs-color var="--ld-thm-secondary-focus"></docs-color>
  <docs-color var="--ld-thm-secondary"></docs-color>
  <docs-color var="--ld-thm-secondary-hover"></docs-color>
  <docs-color var="--ld-thm-secondary-active"></docs-color>
  <docs-color var="--ld-thm-success-focus"></docs-color>
  <docs-color var="--ld-thm-success"></docs-color>
  <docs-color var="--ld-thm-success-hover"></docs-color>
  <docs-color var="--ld-thm-success-active"></docs-color>
  <docs-color var="--ld-thm-warning-focus"></docs-color>
  <docs-color var="--ld-thm-warning"></docs-color>
  <docs-color var="--ld-thm-warning-hover"></docs-color>
  <docs-color var="--ld-thm-warning-active"></docs-color>
  <docs-color var="--ld-thm-error-focus"></docs-color>
  <docs-color var="--ld-thm-error"></docs-color>
  <docs-color var="--ld-thm-error-hover"></docs-color>
  <docs-color var="--ld-thm-error-active"></docs-color>
</div>

#### Solvent

<div class="ld-theme-solvent">
  <docs-color var="--ld-thm-primary-focus"></docs-color>
  <docs-color var="--ld-thm-primary"></docs-color>
  <docs-color var="--ld-thm-primary-hover"></docs-color>
  <docs-color var="--ld-thm-primary-active"></docs-color>
  <docs-color is-transparent var="--ld-thm-primary-alpha-low"></docs-color>
  <docs-color is-transparent var="--ld-thm-primary-alpha-lowest"></docs-color>
  <docs-color var="--ld-thm-secondary-focus"></docs-color>
  <docs-color var="--ld-thm-secondary"></docs-color>
  <docs-color var="--ld-thm-secondary-hover"></docs-color>
  <docs-color var="--ld-thm-secondary-active"></docs-color>
  <docs-color var="--ld-thm-success-focus"></docs-color>
  <docs-color var="--ld-thm-success"></docs-color>
  <docs-color var="--ld-thm-success-hover"></docs-color>
  <docs-color var="--ld-thm-success-active"></docs-color>
  <docs-color var="--ld-thm-warning-focus"></docs-color>
  <docs-color var="--ld-thm-warning"></docs-color>
  <docs-color var="--ld-thm-warning-hover"></docs-color>
  <docs-color var="--ld-thm-warning-active"></docs-color>
  <docs-color var="--ld-thm-error-focus"></docs-color>
  <docs-color var="--ld-thm-error"></docs-color>
  <docs-color var="--ld-thm-error-hover"></docs-color>
  <docs-color var="--ld-thm-error-active"></docs-color>
</div>

#### Tea

<div class="ld-theme-tea">
  <docs-color var="--ld-thm-primary-focus"></docs-color>
  <docs-color var="--ld-thm-primary"></docs-color>
  <docs-color var="--ld-thm-primary-hover"></docs-color>
  <docs-color var="--ld-thm-primary-active"></docs-color>
  <docs-color is-transparent var="--ld-thm-primary-alpha-low"></docs-color>
  <docs-color is-transparent var="--ld-thm-primary-alpha-lowest"></docs-color>
  <docs-color var="--ld-thm-secondary-focus"></docs-color>
  <docs-color var="--ld-thm-secondary"></docs-color>
  <docs-color var="--ld-thm-secondary-hover"></docs-color>
  <docs-color var="--ld-thm-secondary-active"></docs-color>
  <docs-color var="--ld-thm-success-focus"></docs-color>
  <docs-color var="--ld-thm-success"></docs-color>
  <docs-color var="--ld-thm-success-hover"></docs-color>
  <docs-color var="--ld-thm-success-active"></docs-color>
  <docs-color var="--ld-thm-warning-focus"></docs-color>
  <docs-color var="--ld-thm-warning"></docs-color>
  <docs-color var="--ld-thm-warning-hover"></docs-color>
  <docs-color var="--ld-thm-warning-active"></docs-color>
  <docs-color var="--ld-thm-error-focus"></docs-color>
  <docs-color var="--ld-thm-error"></docs-color>
  <docs-color var="--ld-thm-error-hover"></docs-color>
  <docs-color var="--ld-thm-error-active"></docs-color>
</div>
