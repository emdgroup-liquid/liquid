---
eleventyNavigation:
  key: Tooltip
  parent: Components
layout: layout.njk
title: Tooltip
permalink: components/ld-tooltip/
---

<link rel="stylesheet" href="css_components/ld-button.css">

# ld-tooltip

Tooltips provide additional information, mostly short paragraphs, and can be placed beside all sorts of interface elements.

<ld-notice headline="Note" mode="warning">
  If your application is mounted to a different element than the <code>body</code> element, or you have <em>z-order</em> related issues, you may need to configure the <code>bodyElement</code> option using the <code>tetherOptions</code> property. For more details check out the <a href="guides/troubleshooting/#popped-out-element-is-rendered-in-wrong-container">related troubleshooting section</a>.
</ld-notice>

## Default

{% example %}
<ld-tooltip>
  <ld-typo variant="h4" style="margin-bottom: 0.625rem">Headline</ld-typo>
  <ld-typo>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  </ld-typo>
</ld-tooltip>
{% endexample %}

## With arrow

{% example %}
<ld-tooltip arrow>
  <ld-typo variant="h4" style="margin-bottom: 0.625rem">Headline</ld-typo>
  <ld-typo>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  </ld-typo>
</ld-tooltip>
{% endexample %}

## Size

{% example %}
<ld-tooltip arrow>
  <ld-typo>I'm the default size tooltip.</ld-typo>
</ld-tooltip>
<ld-tooltip arrow size="sm">
  <ld-typo>I'm the small size tooltip.</ld-typo>
</ld-tooltip>
{% endexample %}

## With custom trigger

{% example %}
<p>
  I am an
  <ld-tooltip arrow>
    <span slot="trigger" style="text-decoration: underline">inline</span>
    <ld-typo variant="h4" style="margin-bottom: 0.625rem">Headline</ld-typo>
    <ld-typo>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </ld-typo>
  </ld-tooltip>
  trigger!
</p>
{% endexample %}

## Open on click

{% example %}
<ld-tooltip trigger-type="click">
  <div class="ld-button" slot="trigger">click me</div>
  <ld-typo variant="h4" style="margin-bottom: 0.625rem">Headline</ld-typo>
  <ld-typo>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  </ld-typo>
</ld-tooltip>
{% endexample %}

## Positioning

{% example %}
<div style="display: grid; grid-template-columns: repeat(3, 1fr); grid-gap: 0.625rem">
  <ld-tooltip arrow position="top left" style="text-align: end">
    <div class="ld-button" slot="trigger" style="width: 9.375rem">top left</div>
    <ld-typo variant="h4" style="margin-bottom: 0.625rem">Headline</ld-typo>
    <ld-typo>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </ld-typo>
  </ld-tooltip>

  <ld-tooltip arrow position="top center" style="text-align: center">
    <div class="ld-button" slot="trigger" style="width: 9.375rem">top center</div>
    <ld-typo variant="h4" style="margin-bottom: 0.625rem">Headline</ld-typo>
    <ld-typo>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </ld-typo>
  </ld-tooltip>

  <ld-tooltip arrow position="top right">
    <div class="ld-button" slot="trigger" style="width: 9.375rem">top right</div>
    <ld-typo variant="h4" style="margin-bottom: 0.625rem">Headline</ld-typo>
    <ld-typo>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </ld-typo>
  </ld-tooltip>

  <ld-tooltip arrow position="left top" style="text-align: end">
    <div class="ld-button" slot="trigger" style="width: 9.375rem">left top</div>
    <ld-typo variant="h4" style="margin-bottom: 0.625rem">Headline</ld-typo>
    <ld-typo>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </ld-typo>
  </ld-tooltip>

  <div></div>

  <ld-tooltip arrow position="right top">
    <div class="ld-button" slot="trigger" style="width: 9.375rem">right top</div>
    <ld-typo variant="h4" style="margin-bottom: 0.625rem">Headline</ld-typo>
    <ld-typo>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </ld-typo>
  </ld-tooltip>

  <ld-tooltip arrow position="left middle" style="text-align: end">
    <div class="ld-button" slot="trigger" style="width: 9.375rem">left middle</div>
    <ld-typo variant="h4" style="margin-bottom: 0.625rem">Headline</ld-typo>
    <ld-typo>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </ld-typo>
  </ld-tooltip>

  <div></div>

  <ld-tooltip arrow position="right middle">
    <div class="ld-button" slot="trigger" style="width: 9.375rem">right middle</div>
    <ld-typo variant="h4" style="margin-bottom: 0.625rem">Headline</ld-typo>
    <ld-typo>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </ld-typo>
  </ld-tooltip>

  <ld-tooltip arrow position="left bottom" style="text-align: end">
    <div class="ld-button" slot="trigger" style="width: 9.375rem">left bottom</div>
    <ld-typo variant="h4" style="margin-bottom: 0.625rem">Headline</ld-typo>
    <ld-typo>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </ld-typo>
  </ld-tooltip>

  <div></div>

  <ld-tooltip arrow position="right bottom">
    <div class="ld-button" slot="trigger" style="width: 9.375rem">right bottom</div>
    <ld-typo variant="h4" style="margin-bottom: 0.625rem">Headline</ld-typo>
    <ld-typo>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </ld-typo>
  </ld-tooltip>

  <ld-tooltip arrow position="bottom left" style="text-align: end">
    <div class="ld-button" slot="trigger" style="width: 9.375rem">bottom left</div>
    <ld-typo variant="h4" style="margin-bottom: 0.625rem">Headline</ld-typo>
    <ld-typo>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </ld-typo>
  </ld-tooltip>

  <ld-tooltip arrow position="bottom center" style="text-align: center">
    <div class="ld-button" slot="trigger" style="width: 9.375rem">bottom center</div>
    <ld-typo variant="h4" style="margin-bottom: 0.625rem">Headline</ld-typo>
    <ld-typo>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </ld-typo>
  </ld-tooltip>

  <ld-tooltip arrow position="bottom right">
    <div class="ld-button" slot="trigger" style="width: 9.375rem">bottom right</div>
    <ld-typo variant="h4" style="margin-bottom: 0.625rem">Headline</ld-typo>
    <ld-typo>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </ld-typo>
  </ld-tooltip>
</div>
{% endexample %}

## Show/hide delay

{% example %}
<ld-tooltip hide-delay="1000" show-delay="1000">
  <div class="ld-button" slot="trigger">show/hide 1s</div>
  <ld-typo>
    I show and hide after 1s
  </ld-typo>
</ld-tooltip>

<ld-tooltip show-delay="1000">
  <div class="ld-button" slot="trigger">show 1s</div>
  <ld-typo>
    I show after 1s, but hide immediately
  </ld-typo>
</ld-tooltip>

<ld-tooltip hide-delay="1000">
  <div class="ld-button" slot="trigger">hide 1s</div>
  <ld-typo>
    I show immediately, but hide after 1s
  </ld-typo>
</ld-tooltip>

<ld-tooltip show-delay="500" hide-delay="1000">
  <div class="ld-button" slot="trigger">show 500ms / hide 1s</div>
  <ld-typo>
    I show after 500ms and hide after 1s
  </ld-typo>
</ld-tooltip>
{% endexample %}

## CSS Variables

| Variable                             | Description                                                                            | Default                |
| ------------------------------------ | -------------------------------------------------------------------------------------- | ---------------------- |
| `--ld-tooltip-animation-duration`    | Duration of the tooltip show/hide animation                                            | `var(--ld-ad-default)` |
| `--ld-tooltip-arrow-offset`          | Offset of the arrow from the tooltip border, if arrow is aligned left/right/top/bottom | `var(--ld-sp-16)`      |
| `--ld-tooltip-arrow-size`            | Size of the arrow                                                                      | `0.5rem` (8px)         |
| `--ld-tooltip-distance-from-trigger` | Space between the trigger and the tooltip (including the arrow)                        | `var(--ld-sp-8)`       |
| `--ld-tooltip-max-width`             | Max width of the tooltip                                                               | `20rem` (320px)        |
| `--ld-tooltip-offset-x`              | Offset of the tooltip on the x-axis (If the tooltip is aligned to the right/left border of the trigger, a positive value always means increasing the space between trigger and tooltip.) | `0px`                  |
| `--ld-tooltip-offset-y`              | Offset of the tooltip on the y-axis (If the tooltip is aligned to the top/bottom border of the trigger, a positive value always means increasing the space between trigger and tooltip.) | `0px`                  |


<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description                                                                               | Type                                                                                                                                                                                                                                                                                                                                             | Default        |
| --------------- | ---------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------- |
| `arrow`         | `arrow`          | Show arrow                                                                                | `boolean`                                                                                                                                                                                                                                                                                                                                        | `undefined`    |
| `disabled`      | `disabled`       | Disable tooltip trigger                                                                   | `boolean`                                                                                                                                                                                                                                                                                                                                        | `undefined`    |
| `hideDelay`     | `hide-delay`     | Delay in ms until tooltip hides (only when trigger type is 'hover')                       | `number`                                                                                                                                                                                                                                                                                                                                         | `0`            |
| `key`           | `key`            | for tracking the node's identity when working with lists                                  | `string \| number`                                                                                                                                                                                                                                                                                                                               | `undefined`    |
| `position`      | `position`       | Position of the tooltip relative to the trigger element (also affects the arrow position) | `"bottom center" \| "bottom left" \| "bottom right" \| "left bottom" \| "left middle" \| "left top" \| "right bottom" \| "right middle" \| "right top" \| "top center" \| "top left" \| "top right"`                                                                                                                                             | `'top center'` |
| `ref`           | `ref`            | reference to component                                                                    | `any`                                                                                                                                                                                                                                                                                                                                            | `undefined`    |
| `showDelay`     | `show-delay`     | Delay in ms until tooltip shows (only when trigger type is 'hover')                       | `number`                                                                                                                                                                                                                                                                                                                                         | `0`            |
| `size`          | `size`           | The tooltip size (effects tooltip padding only)                                           | `"sm"`                                                                                                                                                                                                                                                                                                                                           | `undefined`    |
| `tag`           | `tag`            | The rendered HTML tag for the tooltip trigger.                                            | `string`                                                                                                                                                                                                                                                                                                                                         | `'button'`     |
| `tetherOptions` | `tether-options` | Tether options object to be merged with the default options (optionally stringified).     | `string \| { attachment?: string; bodyElement?: HTMLElement; classes?: { [className: string]: string \| boolean; }; classPrefix?: string; constraints?: ITetherConstraint[]; element?: any; enabled?: boolean; offset?: string; optimizations?: any; target?: any; targetAttachment?: string; targetOffset?: string; targetModifier?: string; }` | `undefined`    |
| `triggerType`   | `trigger-type`   | Event type that triggers the tooltip                                                      | `"click" \| "hover"`                                                                                                                                                                                                                                                                                                                             | `'hover'`      |


## Methods

### `hideTooltip() => Promise<void>`

Hide tooltip

#### Returns

Type: `Promise<void>`



### `showTooltip() => Promise<void>`

Show tooltip

#### Returns

Type: `Promise<void>`




## Shadow Parts

| Part          | Description                                                               |
| ------------- | ------------------------------------------------------------------------- |
| `"focusable"` |                                                                           |
| `"icon"`      | Default icon when no trigger is supplied                                  |
| `"popper"`    | Popper element (can only be styled as long as tooltip is not initialized) |
| `"trigger"`   | Trigger button                                                            |


## Dependencies

### Used by

 - [ld-sidenav-header](../ld-sidenav/ld-sidenav-header)
 - [ld-sidenav-navitem](../ld-sidenav/ld-sidenav-navitem)
 - [ld-sidenav-toggle-outside](../ld-sidenav/ld-sidenav-toggle-outside)

### Depends on

- [ld-sr-only](../ld-sr-only)
- ld-tooltip-popper

### Graph
```mermaid
graph TD;
  ld-tooltip --> ld-sr-only
  ld-tooltip --> ld-tooltip-popper
  ld-sidenav-header --> ld-tooltip
  ld-sidenav-navitem --> ld-tooltip
  ld-sidenav-toggle-outside --> ld-tooltip
  style ld-tooltip fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
