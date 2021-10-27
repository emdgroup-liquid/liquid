---
eleventyNavigation:
  key: Loading Indicator
  parent: Components
layout: layout.njk
title: Loading Indicator
permalink: components/ld-loading/
---

<link rel="stylesheet" href="/css_components/ld-loading.css">

# ld-loading

Use the `ld-loading` component to indicate that the user should wait for a process to complete. Combine it with textual information on what is going on for a better user experience. 

{% example %}
<ld-loading></ld-loading>

<!-- CSS component -->

<span class="ld-loading"></span>
{% endexample %}

## CSS Variables

| Variable             | Description                   | Default  |
| -------------------- | ----------------------------- | -------- |
| `--ld-loading-size`  | Size of the loading indicator | `1.5rem` |

<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                              | Type               | Default     |
| -------- | --------- | -------------------------------------------------------- | ------------------ | ----------- |
| `key`    | `key`     | for tracking the node's identity when working with lists | `string \| number` | `undefined` |
| `ref`    | `ref`     | reference to component                                   | `any`              | `undefined` |


----------------------------------------------

 
