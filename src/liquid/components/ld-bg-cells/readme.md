---
eleventyNavigation:
  key: Background Cells
  parent: Components
layout: layout.njk
title: Background Cells
permalink: components/ld-bg-cells/
---

<link rel="stylesheet" href="css_components/ld-bg-cells.css">

# ld-bg-cells

A background pattern with the Merck cells as additional visual element.

---

## Default

{% example '{ "hasPadding": false, "hasBorder": false }' %}
<ld-bg-cells></ld-bg-cells>

<style>
  ld-bg-cells {
    aspect-ratio: 16/9;
  }
</style>

<!-- CSS component -->

<div class="ld-bg-cells">
  <div class="ld-bg-cells__layer" style="--ld-bg-cells-image:url('/dist/build/assets/hexagon-cell.svg')"></div>
</div>
  
<style>
  .ld-bg-cells {
    aspect-ratio: 16/9;
  }
</style>
{% endexample %}

## Brand cell types

### BioReliance

{% example '{ "hasPadding": false, "hasBorder": false }' %}
<ld-bg-cells type="bioreliance"></ld-bg-cells>

<!-- CSS component -->

<div class="ld-bg-cells ld-bg-cells--bioreliance">
  <div class="ld-bg-cells__layer" style="--ld-bg-cells-image:url('/dist/build/assets/bioreliance-cell.svg')"></div>
</div>

{% endexample %}

### Millipore

{% example '{ "hasPadding": false, "hasBorder": false }' %}
<ld-bg-cells type="millipore"></ld-bg-cells>

<!-- CSS component -->

<div class="ld-bg-cells ld-bg-cells--millipore">
  <div class="ld-bg-cells__layer" style="--ld-bg-cells-image:url('/dist/build/assets/millipore-cell.svg')"></div>
</div>
{% endexample %}

### Milli-Q

{% example '{ "hasPadding": false, "hasBorder": false }' %}
<ld-bg-cells type="milliq"></ld-bg-cells>

<!-- CSS component -->

<div class="ld-bg-cells ld-bg-cells--milliq">
  <div class="ld-bg-cells__layer" style="--ld-bg-cells-image:url('/dist/build/assets/milliq-cell.svg')"></div>
</div>
{% endexample %}

### Supelco

{% example '{ "hasPadding": false, "hasBorder": false }' %}
<ld-bg-cells type="supelco"></ld-bg-cells>

<!-- CSS component -->

<div class="ld-bg-cells ld-bg-cells--supelco">
  <div class="ld-bg-cells__layer" style="--ld-bg-cells-image:url('/dist/build/assets/supelco-cell.svg')"></div>
</div>
{% endexample %}

### SAFC

{% example '{ "hasPadding": false, "hasBorder": false }' %}
<ld-bg-cells type="safc"></ld-bg-cells>

<!-- CSS component -->

<div class="ld-bg-cells ld-bg-cells--safc">
  <div class="ld-bg-cells__layer" style="--ld-bg-cells-image:url('/dist/build/assets/safc-cell.svg')"></div>
</div>
{% endexample %}

### Sigma-Aldrich

{% example '{ "hasPadding": false, "hasBorder": false }' %}
<ld-bg-cells type="sigma-aldrich"></ld-bg-cells>

<!-- CSS component -->

<div class="ld-bg-cells ld-bg-cells--sigma-aldrich">
  <div class="ld-bg-cells__layer" style="--ld-bg-cells-image:url('/dist/build/assets/sigma-aldrich-cell.svg')"></div>
</div>
{% endexample %}

## Themable cell types

### Functional

{% example '{ "hasPadding": false, "hasBorder": false }' %}
<ld-bg-cells type="f"></ld-bg-cells>

<!-- CSS component -->

<div class="ld-bg-cells ld-bg-cells--f">
  <div class="ld-bg-cells__layer" style="--ld-bg-cells-image:url('/dist/build/assets/f-cell.svg')"></div>
</div>
{% endexample %}

### Synthetic / Hexagon

{% example '{ "hasPadding": false, "hasBorder": false }' %}
<ld-bg-cells type="hexagon"></ld-bg-cells>

<!-- CSS component -->

<div class="ld-bg-cells ld-bg-cells--hexagon">
  <div class="ld-bg-cells__layer" style="--ld-bg-cells-image:url('/dist/build/assets/hexagon-cell.svg')"></div>
</div>
{% endexample %}

### Organic

{% example '{ "hasPadding": false, "hasBorder": false }' %}
<ld-bg-cells type="o"></ld-bg-cells>

<!-- CSS component -->

<div class="ld-bg-cells ld-bg-cells--o">
  <div class="ld-bg-cells__layer" style="--ld-bg-cells-image:url('/dist/build/assets/o-cell.svg')"></div>
</div>
{% endexample %}

### Plastic / Tile

{% example '{ "hasPadding": false, "hasBorder": false }' %}
<ld-bg-cells type="tile"></ld-bg-cells>

<!-- CSS component -->

<div class="ld-bg-cells ld-bg-cells--tile">
  <div class="ld-bg-cells__layer" style="--ld-bg-cells-image:url('/dist/build/assets/tile-cell.svg')"></div>
</div>
{% endexample %}

### Technical

{% example '{ "hasPadding": false, "hasBorder": false }' %}
<ld-bg-cells type="t"></ld-bg-cells>

<!-- CSS component -->

<div class="ld-bg-cells ld-bg-cells--t">
  <div class="ld-bg-cells__layer" style="--ld-bg-cells-image:url('/dist/build/assets/t-cell.svg')"></div>
</div>
{% endexample %}

## Custom position and size

{% example '{ "hasPadding": false, "hasBorder": false }' %}
<ld-bg-cells class="custom"></ld-bg-cells>

<style>
  .custom {
    --ld-bg-cells-layer-translation-x: 26%;
    --ld-bg-cells-layer-translation-y: -5%;
    --ld-bg-cells-layer-size: 150%;
    aspect-ratio: 1;
  }
</style>

<!-- CSS component -->

<div class="ld-bg-cells custom">
  <div class="ld-bg-cells__layer" style="--ld-bg-cells-image:url('/dist/build/assets/hexagon-cell.svg')"></div>
</div>

<style>
  .custom {
    --ld-bg-cells-layer-translation-x: 26%;
    --ld-bg-cells-layer-translation-y: -5%;
    --ld-bg-cells-layer-size: 110%;
    aspect-ratio: 1;
  }
</style>
{% endexample %}

## Custom Colors

{% example '{ "hasPadding": false, "hasBorder": false }' %}

<ld-bg-cells class="custom-colors"></ld-bg-cells>

<style>
  .custom-colors {
    --ld-bg-cells-layer-col: var(--ld-col-rr);
    --ld-bg-cells-bg-col: var(--ld-col-vy);
  }
</style>

<!-- CSS component -->

<div class="ld-bg-cells custom-colors">
  <div class="ld-bg-cells__layer" style="--ld-bg-cells-image:url('/dist/build/assets/hexagon-cell.svg')"></div>
</div>

{% endexample %}

## Three Layers

<ld-notice mode="warning">
  Please be aware that the <code>three-layers</code> property only works with themable background cells.
</ld-notice>

{% example '{ "hasPadding": false, "hasBorder": false }' %}

<ld-bg-cells three-layers></ld-bg-cells>

<!-- CSS component -->

<div class="ld-bg-cells ld-bg-cells--three-layers">
  <div class="ld-bg-cells__layer" style="--ld-bg-cells-image:url('/dist/build/assets/hexagon-cell.svg')"></div>
  <div class="ld-bg-cells__secondary-layer" style="--ld-bg-cells-image:url('/dist/build/assets/hexagon-cell.svg')"></div>
</div>

{% endexample %}


## CSS Variables

| Variable                                         | Description                                                   | Default                              |
| ------------------------------------------------ | ------------------------------------------------------------- | ------------------------------------ |
| `--ld-bg-cells-bg-col`                           | Color of background / lowest layer                            | Theme Secondary Color                |
| `--ld-bg-cells-layer-col`                        | Color of pattern layer                                        | Theme Primary Color                  |
| `--ld-bg-cells-layer-size`                       | Size / Scale of pattern layer (in %)                          | Individual per cell type             |
| `--ld-bg-cells-layer-translation-x`              | Translation on x-axis of pattern layer (in %)                 | Individual per cell type             |
| `--ld-bg-cells-layer-translation-y`              | Translation on y-axis of pattern layer (in %)                 | Individual per cell type             |
| `--ld-bg-cells-layer-rotation`                   | Rotation of pattern layer (in deg)                            | `0deg`                               |
| `--ld-bg-cells-secondary-layer-col`              | Color of secondary pattern layer                              | `transparent`                        |
| `--ld-bg-cells-secondary-layer-size`             | Size / Scale of secondary pattern layer (in %)                | `150%`                               |
| `--ld-bg-cells-secondary-layer-translation-x`    | Translation on x-axis of secondary pattern layer (in %)       | `0`                                  |
| `--ld-bg-cells-secondary-layer-translation-y`    | Translation on y-axis of secondary pattern layer (in %)       | `0`                                  |
| `--ld-bg-cells-secondary-layer-rotation`         | Rotation of secondary pattern layer (in deg)                  | `0deg`                               |


<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                              | Type                                                                                                                                                                                                                    | Default     |
| ------------- | -------------- | -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `key`         | `key`          | for tracking the node's identity when working with lists | `string \| number`                                                                                                                                                                                                      | `undefined` |
| `ref`         | `ref`          | reference to component                                   | `any`                                                                                                                                                                                                                   | `undefined` |
| `threeLayers` | `three-layers` | Use 3 color layers                                       | `boolean`                                                                                                                                                                                                               | `false`     |
| `type`        | `type`         | Cells pattern                                            | `"bioreliance" \| "f" \| "functional" \| "hexagon" \| "millipore" \| "milliq" \| "o" \| "organic" \| "plastic" \| "qa-x2f-qc" \| "safc" \| "sigma-aldrich" \| "supelco" \| "synthetic" \| "t" \| "technical" \| "tile"` | `'hexagon'` |


## Shadow Parts

| Part                | Description                                 |
| ------------------- | ------------------------------------------- |
| `"layer"`           | Element containing the cells pattern        |
| `"secondary-layer"` | Element containing the second cells pattern |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
