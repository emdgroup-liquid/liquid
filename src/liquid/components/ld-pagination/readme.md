---
eleventyNavigation:
  key: Pagination
  parent: Components
layout: layout.njk
title: Pagination
permalink: components/ld-pagination/
---

# ld-pagination

An pagination provides a visual hint for content or interactions. Combine it with textual information for a better user experience. When using an pagination on its own, make sure to either apply an [`aria-label`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-label_attribute) or use the [ld-sr-only](components/ld-sr-only/) component.

---

## Examples

### Default

{% example '{ "centered": true, "stacked": true }' %}
<ld-pagination length="15"></ld-pagination>
{% endexample %}

### With sticky items

{% example '{ "centered": true, "stacked": true }' %}
<ld-pagination sticky="1" length="15"></ld-pagination>
<ld-pagination sticky="3" length="15"></ld-pagination>
{% endexample %}

### Offset

{% example %}
<ld-pagination offset="1" length="15"></ld-pagination>
<ld-pagination offset="0" length="15"></ld-pagination>
{% endexample %}

### Indefinite length

{% example %}
<ld-pagination></ld-pagination>
{% endexample %}

### Item label

{% example %}
<ld-pagination item-label="Slide" length="15"></ld-pagination>
{% endexample %}

### Dots mode

{% example %}
<ld-pagination length="15" mode="dots"></ld-pagination>
{% endexample %}

### Select mode

{% example %}
<ld-pagination length="15" mode="select"></ld-pagination>
{% endexample %}

### Different sizes

{% example '{ "centered": true, "stacked": true }' %}
<ld-pagination length="15" size="sm"></ld-pagination>

<ld-pagination length="15"></ld-pagination>

<ld-pagination length="15" size="lg"></ld-pagination>
{% endexample %}

### Preselected index

{% example %}
<ld-pagination selected-index="7" length="15"></ld-pagination>
{% endexample %}

### Programmatic manipulation

{% example %}
<ld-button onclick="jump(-10);"><< 10</ld-button>
<ld-pagination id="pagination-1" length="15"></ld-pagination>
<ld-button onclick="jump(10);">>> 10</ld-button>
<ld-button onclick="add(-10);">Remove 10</ld-button>
<ld-button onclick="add(10);">Add 10</ld-button>

<script>
  const pagination1 = document.getElementById('pagination-1')
  function jump(steps) {
    pagination1.selectedIndex += steps;
  }

  function add(amount) {
    pagination1.length += amount;
  }
</script>
{% endexample %}

### Event handling

{% example %}
<ld-pagination id="pagination-2" length="15"></ld-pagination>

<script>
  const pagination2 = document.getElementById('pagination-2');
  pagination2.addEventListener("ldchange", (event) => {
    console.log("Selected index is:", event.detail)
  })
</script>
{% endexample %}

<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description                                                               | Type               | Default     |
| --------------- | ---------------- | ------------------------------------------------------------------------- | ------------------ | ----------- |
| `itemLabel`     | `item-label`     | Label to communicate the type of an item.                                 | `string`           | `'Page'`    |
| `key`           | `key`            | for tracking the node's identity when working with lists                  | `string \| number` | `undefined` |
| `length`        | `length`         | The maximum number of items.                                              | `number`           | `Infinity`  |
| `offset`        | `offset`         | Number of next/previous items visible.                                    | `number`           | `2`         |
| `ref`           | `ref`            | reference to component                                                    | `any`              | `undefined` |
| `selectedIndex` | `selected-index` | The currently selected item (an index of `-1` means nothing is selected). | `number`           | `0`         |
| `size`          | `size`           | Size of the pagination.                                                   | `"lg" \| "sm"`     | `undefined` |
| `sticky`        | `sticky`         | Number of items permanently visible at the start/end.                     | `number`           | `0`         |


## Events

| Event      | Description                                | Type                  |
| ---------- | ------------------------------------------ | --------------------- |
| `ldchange` | Dispatched, if the selected index changes. | `CustomEvent<number>` |


## Shadow Parts

| Part              | Description                                                     |
| ----------------- | --------------------------------------------------------------- |
| `"arrow"`         | all arrow items (`ld-button` elements)                          |
| `"dots"`          | list-items containing dots                                      |
| `"end"`           | arrow to jump to the last item (`ld-button` element)            |
| `"focusable"`     |                                                                 |
| `"item"`          | all pagination items containing a number (`ld-button` elements) |
| `"items"`         | list containing all slidable items and the marker               |
| `"list-wrapper"`  | list-item containing the `ul` element with slidable items       |
| `"marker"`        | marker highlighting the selected item                           |
| `"next"`          | arrow to go to the next item (`ld-button` element)              |
| `"prev"`          | arrow to go to the previous item (`ld-button` element)          |
| `"slide-wrapper"` |                                                                 |
| `"start"`         | arrow to jump to the first item (`ld-button` element)           |
| `"sticky"`        | all sticky items (`ld-button` elements)                         |
| `"wrapper"`       | list containing all pagination items                            |


## Dependencies

### Depends on

- [ld-button](../ld-button)
- [ld-icon](../ld-icon)

### Graph
```mermaid
graph TD;
  ld-pagination --> ld-button
  ld-pagination --> ld-icon
  style ld-pagination fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

 
