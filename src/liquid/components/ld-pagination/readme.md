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

<!-- React component -->

<LdPagination length={15} />
{% endexample %}

### With sticky items

{% example '{ "centered": true, "stacked": true }' %}
<ld-pagination sticky="1" length="15"></ld-pagination>
<ld-pagination sticky="3" length="15"></ld-pagination>

<!-- React component -->

<LdPagination sticky={1} length={15} />
<LdPagination sticky={3} length={15} />
{% endexample %}

### Offset

{% example '{ "centered": true, "stacked": true }'  %}
<ld-pagination offset="1" length="15"></ld-pagination>
<ld-pagination offset="0" length="15"></ld-pagination>

<!-- React component -->

<LdPagination offset={1} length={15} />
<LdPagination offset={0} length={15} />
{% endexample %}

### Indefinite length

{% example %}
<ld-pagination></ld-pagination>

<!-- React component -->

<LdPagination />
{% endexample %}

### Item label

{% example %}
<ld-pagination item-label="Slide" length="15"></ld-pagination>

<!-- React component -->

<LdPagination itemLabel="Slide" length={15} />
{% endexample %}

### Hide arrow buttons

{% example '{ "centered": true, "stacked": true }'  %}
<ld-pagination hide-prev-next hide-start-end length="15"></ld-pagination>
<ld-pagination hide-prev-next length="15"></ld-pagination>
<ld-pagination hide-start-end length="15"></ld-pagination>

<!-- React component -->

<LdPagination hidePrevNext hideStartEnd length={15} />
<LdPagination hidePrevNext length={15} />
<LdPagination hideStartEnd length={15} />
{% endexample %}

### Text instead of arrow buttons

{% example '{ "centered": true, "stacked": true }'  %}
<ld-pagination end-label="Last" length="15" next-label="Next" prev-label="Prev" start-label="First"></ld-pagination>
<ld-pagination hide-prev-next length="15" start-label="First" end-label="Last"></ld-pagination>
<ld-pagination hide-start-end length="15" next-label="Next" prev-label="Prev"></ld-pagination>

<!-- React component -->

<LdPagination endLabel="Last" length={15} nextLabel="Next" prevLabel="Prev" start-label="First" />
<LdPagination hidePrevNext length={15} startLabel="First" endLabel="Last" />
<LdPagination hideStartEnd length={15} nextLabel="Next" prevLabel="Prev" />
{% endexample %}

### Size

{% example '{ "centered": true, "stacked": true }' %}
<ld-pagination length="15" size="sm"></ld-pagination>
<ld-pagination length="15"></ld-pagination>
<ld-pagination length="15" size="lg"></ld-pagination>

<!-- React component -->

<LdPagination length={15} size="sm" />
<LdPagination length={15} />
<LdPagination length={15} size="lg" />
{% endexample %}

### Preselected index

{% example %}
<ld-pagination selected-index="7" length="15"></ld-pagination>

<!-- React component -->

<LdPagination selectedIndex={7} length={15} />
{% endexample %}

### Programmatic manipulation

{% example %}
<ld-button onclick="jump(-10);">&lt;&lt; 10</ld-button>
<ld-pagination id="pagination-1" length="15"></ld-pagination>
<ld-button onclick="jump(10);">&gt;&gt; 10</ld-button>
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

<!-- React component -->

const paginationRef = useRef(null)
const jump = useCallback((steps) => {
  paginationRef.current.selectedIndex += steps
}, [])
const add = useCallback((amount) => {
  paginationRef.current.length += amount
}, [])

return (
  <>
    <LdButton onClick={() => jump(-10)}>&lt;&lt; 10</LdButton>
    <LdPagination length={15} ref={paginationRef} />
    <LdButton onClick={() => jump(10)}>&gt;&gt; 10</LdButton>
    <LdButton onClick={() => add(-10)}>Remove 10</LdButton>
    <LdButton onClick={() => add(10)}>Add 10</LdButton>
  </>
)
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

<!-- React component -->

<LdPagination
  length={15}
  onLdchange={(event) => {
    console.log('Selected index is:', event.detail)
  }}
 />
{% endexample %}

### Dots mode

{% example %}
<ld-pagination mode="dots" hide-prev-next hide-start-end selected-index="3" size="sm" length="7"></ld-pagination>
<ld-pagination mode="dots" hide-prev-next hide-start-end selected-index="3" length="15"></ld-pagination>
<ld-pagination mode="dots" hide-prev-next hide-start-end selected-index="3" size="lg" length="7"></ld-pagination>

<!-- React component -->

<LdPagination mode="dots" hidePrevNext hideStartEnd selectedIndex={3} size="sm" length={7} />
<LdPagination mode="dots" hidePrevNext hideStartEnd selectedIndex={3} length={15} />
<LdPagination mode="dots" hidePrevNext hideStartEnd selectedIndex={3} size="lg" length={7} />
{% endexample %}

### Dots mode with custom space

{% example %}
<ld-pagination space="1.5rem" mode="dots" hide-prev-next hide-start-end length="7"></ld-pagination>

<!-- React component -->

<LdPagination space="1.5rem" mode="dots" hidePrevNext hideStartEnd length={7} />
{% endexample %}

### On brand color

{% example '{ "background": "brand", "hasBorder": false }' %}
<ld-pagination brand-color mode="dots" hide-prev-next hide-start-end length="7"></ld-pagination>
<ld-pagination brand-color length="7"></ld-pagination>

<!-- React component -->

<LdPagination brandColor mode="dots" hidePrevNext hideStartEnd length={7} />
<LdPagination brandColor length={7} />
{% endexample %}

<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description                                                                                               | Type                  | Default     |
| --------------- | ---------------- | --------------------------------------------------------------------------------------------------------- | --------------------- | ----------- |
| `brandColor`    | `brand-color`    | Switch colors for brand background.                                                                       | `boolean`             | `undefined` |
| `endLabel`      | `end-label`      | Label text for the end button (replaces the icon).                                                        | `string`              | `undefined` |
| `hidePrevNext`  | `hide-prev-next` | Hide the buttons to navigate forward/backward.                                                            | `boolean`             | `false`     |
| `hideStartEnd`  | `hide-start-end` | Hide the buttons to navigate to the first/last item.                                                      | `boolean`             | `false`     |
| `itemLabel`     | `item-label`     | Label to communicate the type of an item.                                                                 | `string`              | `'Page'`    |
| `key`           | `key`            | for tracking the node's identity when working with lists                                                  | `string \| number`    | `undefined` |
| `length`        | `length`         | The number of items/pages available for pagination (required to let the user jump to the last item/page). | `number`              | `Infinity`  |
| `mode`          | `mode`           | Items display mode, default as numbers.                                                                   | `"dots" \| "numbers"` | `'numbers'` |
| `nextLabel`     | `next-label`     | Label text for the forward button (replaces the icon).                                                    | `string`              | `undefined` |
| `offset`        | `offset`         | Number of next/previous items visible.                                                                    | `number`              | `2`         |
| `prevLabel`     | `prev-label`     | Label text for the backward button (replaces the icon).                                                   | `string`              | `undefined` |
| `ref`           | `ref`            | reference to component                                                                                    | `any`                 | `undefined` |
| `selectedIndex` | `selected-index` | The currently selected item (an index of `-1` means nothing is selected).                                 | `number`              | `0`         |
| `size`          | `size`           | Size of the pagination.                                                                                   | `"lg" \| "sm"`        | `undefined` |
| `space`         | `space`          | Space between dots (dots mode only, default depending on `size` prop).                                    | `string`              | `undefined` |
| `startLabel`    | `start-label`    | Label text for the start button (replaces the icon).                                                      | `string`              | `undefined` |
| `sticky`        | `sticky`         | Number of items permanently visible at the start/end.                                                     | `number`              | `0`         |


## Events

| Event      | Description                                | Type                  |
| ---------- | ------------------------------------------ | --------------------- |
| `ldchange` | Dispatched, if the selected index changes. | `CustomEvent<number>` |


## Shadow Parts

| Part               | Description                                                     |
| ------------------ | --------------------------------------------------------------- |
| `"arrow"`          | all arrow items (`ld-button` elements)                          |
| `"end"`            | arrow to jump to the last item (`ld-button` element)            |
| `"focusable"`      |                                                                 |
| `"item"`           | all pagination items containing a number (`ld-button` elements) |
| `"items"`          | list containing all slidable items and the marker               |
| `"list-wrapper"`   | list-item containing the `ul` element with slidable items       |
| `"marker"`         | marker highlighting the selected item                           |
| `"more-indicator"` | list-items containing more-indicator                            |
| `"next"`           | arrow to go to the next item (`ld-button` element)              |
| `"prev"`           | arrow to go to the previous item (`ld-button` element)          |
| `"slide-wrapper"`  |                                                                 |
| `"start"`          | arrow to jump to the first item (`ld-button` element)           |
| `"sticky"`         | all sticky items (`ld-button` elements)                         |
| `"wrapper"`        | list containing all pagination items                            |


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

*Built with [StencilJS](https://stenciljs.com/)*
