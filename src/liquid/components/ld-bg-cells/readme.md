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
  <div class="ld-bg-cells__pattern" style="--ld-bg-cells-image:url('/dist/build/assets/hexagon-cell.svg')"></div>
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
  <div class="ld-bg-cells__pattern" style="--ld-bg-cells-image:url('/dist/build/assets/bioreliance-cell.svg')"></div>
</div>
{% endexample %}

### Millipore

{% example '{ "hasPadding": false, "hasBorder": false }' %}
<ld-bg-cells type="millipore"></ld-bg-cells>

<!-- CSS component -->

<div class="ld-bg-cells ld-bg-cells--millipore">
  <div class="ld-bg-cells__pattern" style="--ld-bg-cells-image:url('/dist/build/assets/millipore-cell.svg')"></div>
</div>
{% endexample %}

### Supelco

{% example '{ "hasPadding": false, "hasBorder": false }' %}
<ld-bg-cells type="supelco"></ld-bg-cells>

<!-- CSS component -->

<div class="ld-bg-cells ld-bg-cells--supelco">
  <div class="ld-bg-cells__pattern" style="--ld-bg-cells-image:url('/dist/build/assets/supelco-cell.svg')"></div>
</div>
{% endexample %}

### SAFC

{% example '{ "hasPadding": false, "hasBorder": false }' %}
<ld-bg-cells type="safc"></ld-bg-cells>

<!-- CSS component -->

<div class="ld-bg-cells ld-bg-cells--safc">
  <div class="ld-bg-cells__pattern" style="--ld-bg-cells-image:url('/dist/build/assets/safc-cell.svg')"></div>
</div>
{% endexample %}

### Sigma-Aldrich

{% example '{ "hasPadding": false, "hasBorder": false }' %}
<ld-bg-cells type="sigma-aldrich"></ld-bg-cells>

<!-- CSS component -->

<div class="ld-bg-cells ld-bg-cells--sigma-aldrich">
  <div class="ld-bg-cells__pattern" style="--ld-bg-cells-image:url('/dist/build/assets/sigma-aldrich-cell.svg')"></div>
</div>
{% endexample %}

## Themable cell types

### F

{% example '{ "hasPadding": false, "hasBorder": false }' %}
<ld-bg-cells type="f"></ld-bg-cells>

<!-- CSS component -->

<div class="ld-bg-cells ld-bg-cells--f">
  <div class="ld-bg-cells__pattern" style="--ld-bg-cells-image:url('/dist/build/assets/f-cell.svg')"></div>
</div>
{% endexample %}

### Hexagon

{% example '{ "hasPadding": false, "hasBorder": false }' %}
<ld-bg-cells type="hexagon"></ld-bg-cells>

<!-- CSS component -->

<div class="ld-bg-cells ld-bg-cells--hexagon">
  <div class="ld-bg-cells__pattern" style="--ld-bg-cells-image:url('/dist/build/assets/hexagon-cell.svg')"></div>
</div>
{% endexample %}

### T

{% example '{ "hasPadding": false, "hasBorder": false }' %}
<ld-bg-cells type="t"></ld-bg-cells>

<!-- CSS component -->

<div class="ld-bg-cells ld-bg-cells--t">
  <div class="ld-bg-cells__pattern" style="--ld-bg-cells-image:url('/dist/build/assets/t-cell.svg')"></div>
</div>
{% endexample %}

### Tile

{% example '{ "hasPadding": false, "hasBorder": false }' %}
<ld-bg-cells type="tile"></ld-bg-cells>

<!-- CSS component -->

<div class="ld-bg-cells ld-bg-cells--tile">
  <div class="ld-bg-cells__pattern" style="--ld-bg-cells-image:url('/dist/build/assets/tile-cell.svg')"></div>
</div>
{% endexample %}

## Custom position and size

{% example '{ "hasPadding": false, "hasBorder": false }' %}
<ld-bg-cells class="custom"></ld-bg-cells>

<style>
  .custom {
    --ld-bg-cells-position: bottom left;
    --ld-bg-cells-size: 150%;
    aspect-ratio: 1;
  }
</style>

<!-- CSS component -->

<div class="ld-bg-cells custom">
  <div class="ld-bg-cells__pattern" style="--ld-bg-cells-image:url('/dist/build/assets/hexagon-cell.svg')"></div>
</div>

<style>
  .custom {
    --ld-bg-cells-position: bottom left;
    --ld-bg-cells-size: 150%;
    aspect-ratio: 1;
  }
</style>
{% endexample %}

## CSS Variables

| Variable                         | Description                                                   | Default                              |
| -------------------------------- | ------------------------------------------------------------- | ------------------------------------ |
| `--ld-bg-cells-position`         | Position of the cells                                         | Individual per cell type             |
| `--ld-bg-cells-size`             | Size of the cells                                             | Individual per cell type             |


<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                              | Type                                                                                                                         | Default     |
| -------- | --------- | -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `key`    | `key`     | for tracking the node's identity when working with lists | `string \| number`                                                                                                           | `undefined` |
| `ref`    | `ref`     | reference to component                                   | `any`                                                                                                                        | `undefined` |
| `type`   | `type`    | Cells pattern                                            | `"bioreliance" \| "f" \| "hexagon" \| "millipore" \| "qa-x2f-qc" \| "safc" \| "sigma-aldrich" \| "supelco" \| "t" \| "tile"` | `'hexagon'` |


## Shadow Parts

| Part        | Description                          |
| ----------- | ------------------------------------ |
| `"content"` | Element wrapping the slot            |
| `"pattern"` | Element containing the cells pattern |


----------------------------------------------

 
