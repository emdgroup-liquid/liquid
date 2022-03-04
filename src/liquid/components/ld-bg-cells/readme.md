---
eleventyNavigation:
  key: Background Cells
  parent: Components
layout: layout.njk
title: Background Cells
permalink: components/ld-bg-cells/
---

<!-- <link rel="stylesheet" href="css_components/ld-bg-cells.css"> -->
<!-- <link rel="stylesheet" href="css_components/ld-typo.css"> -->

# ld-bg-cells

A background pattern with the Merck cells as additional visual element.

---

## Default

{% example '{ "hasPadding": false, "hasBorder": false }' %}
<ld-bg-cells class="box1-16/9"></ld-bg-cells>

<style>
  .box1-16\/9 {
    padding-top: 56.25%;
  }
</style>
{% endexample %}

## Cell types

### bioreliance

{% example '{ "hasPadding": false, "hasBorder": false }' %}
<ld-bg-cells type="bioreliance" style="height: 16rem;">
</ld-bg-cells>
{% endexample %}

### f

{% example '{ "hasPadding": false, "hasBorder": false }' %}
<ld-bg-cells type="f" style="height: 16rem;"></ld-bg-cells>
{% endexample %}

### hexagon

{% example '{ "hasPadding": false, "hasBorder": false }' %}
<ld-bg-cells type="hexagon" style="height: 16rem;"></ld-bg-cells>
{% endexample %}

### millipore

{% example '{ "hasPadding": false, "hasBorder": false }' %}
<ld-bg-cells type="millipore" style="height: 16rem;"></ld-bg-cells>
{% endexample %}

### qa

{% example '{ "hasPadding": false, "hasBorder": false }' %}
<ld-bg-cells type="qa-x2f-qc" style="height: 16rem;"></ld-bg-cells>
{% endexample %}

### safc

{% example '{ "hasPadding": false, "hasBorder": false }' %}
<ld-bg-cells type="safc" style="height: 16rem;"></ld-bg-cells>
{% endexample %}

### sigma

{% example '{ "hasPadding": false, "hasBorder": false }' %}
<ld-bg-cells type="sigma-aldrich" style="height: 16rem;"></ld-bg-cells>
{% endexample %}

### t

{% example '{ "hasPadding": false, "hasBorder": false }' %}
<ld-bg-cells type="t" style="height: 16rem;"></ld-bg-cells>
{% endexample %}

### tile

{% example '{ "hasPadding": false, "hasBorder": false }' %}
<ld-bg-cells type="tile" style="height: 16rem;"></ld-bg-cells>
{% endexample %}

## Custom position, size and colors

{% example '{ "hasPadding": false, "hasBorder": false }' %}
<ld-bg-cells class="box3-16/9"></ld-bg-cells>

<style>
  .box3-16\/9 {
    --ld-bg-cells-bg-col: var(--ld-col-vm-300);
    --ld-bg-cells-pattern-col: var(--ld-col-vm-600);
    --ld-bg-cells-position: bottom left;
    --ld-bg-cells-size: 150%;

    padding-top: 56.25%;
  }
</style>
{% endexample %}

## CSS Variables

| Variable                         | Description                                                   | Default                              |
| -------------------------------- | ------------------------------------------------------------- | ------------------------------------ |
| `--ld-bg-cells-bg-col` | Background color                                              | Primary color of the current theme   |
| `--ld-bg-cells-pattern-col` | Pattern color (cells)                                      | Secondary color of the current theme |
| `--ld-bg-cells-position`         | Position of the cells                                         | Individual per cell type             |
| `--ld-bg-cells-size`             | Size of the cells                                             | Individual per cell type             |


<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                              | Type                                                                                                            | Default     |
| -------- | --------- | -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ----------- |
| `key`    | `key`     | for tracking the node's identity when working with lists | `string \| number`                                                                                              | `undefined` |
| `ref`    | `ref`     | reference to component                                   | `any`                                                                                                           | `undefined` |
| `type`   | `type`    | Cells pattern                                            | `"bioreliance" \| "f" \| "hexagon" \| "millipore" \| "qa-x2f-qc" \| "safc" \| "sigma-aldrich" \| "t" \| "tile"` | `'safc'`    |


## Shadow Parts

| Part        | Description                          |
| ----------- | ------------------------------------ |
| `"content"` | Element wrapping the slot            |
| `"pattern"` | Element containing the cells pattern |


----------------------------------------------

 
