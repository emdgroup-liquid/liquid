---
eleventyNavigation:
  key: Breadcrumbs
  parent: Components
layout: layout.njk
title: Breadcrumbs
permalink: components/ld-breadcrumbs/
---

<link rel="stylesheet" href="css_components/ld-breadcrumbs.css">
<link rel="stylesheet" href="css_components/ld-crumb.css">
<link rel="stylesheet" href="css_components/ld-link.css">
<link rel="stylesheet" href="css_components/ld-icon.css">

# ld-breadcrumbs

A breadcrumb trail consists of a list of links to the parent pages of the current page in hierarchical order. It helps users find their place within a website or web application. Breadcrumbs are often placed horizontally before a page's main content.

This component is meant to be used in conjunction with the [`ld-crumb`](./ld-crumb/) component.

## Examples

### Basic

{% example %}
<ld-breadcrumbs>
  <ld-crumb href="components/">Components</ld-crumb>
  <ld-crumb href="components/ld-breadcrumbs/">Breadcrumbs</ld-crumb>
</ld-breadcrumbs>

<!-- CSS component -->

<nav class="ld-breadcrumbs" aria-label="Breadcrumbs">
  <ol>
    <li>
      <a class="ld-link ld-link--chevron-end" href="components/">Components</a>
    </li>
    <li>
      <a class="ld-link" href="components/ld-breadcrumbs/" aria-current="page">Breadcrumbs</a>
    </li>
  </ol>
</nav>
{% endexample %}

### With icons

{% example %}
<ld-breadcrumbs>
  <ld-crumb href="components/">
    <ld-icon name="placeholder" size="sm"></ld-icon>
    Components
  </ld-crumb>
  <ld-crumb href="components/ld-breadcrumbs/">
    <ld-icon name="placeholder" size="sm"></ld-icon>
    Breadcrumbs
  </ld-crumb>
</ld-breadcrumbs>

<!-- CSS component -->

<nav class="ld-breadcrumbs" aria-label="Breadcrumbs">
  <ol>
    <li>
      <a class="ld-link ld-link--chevron-end" href="components/">
        <span class="ld-icon ld-icon--sm" role="presentation">
          <svg viewBox="0 0 24 24" fill="none">
            <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3"/>
            <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3"/>
          </svg>
        </span>
        Components
      </a>
    </li>
    <li>
      <a class="ld-link" href="components/ld-breadcrumbs/" aria-current="page">
        <span class="ld-icon ld-icon--sm" role="presentation">
          <svg viewBox="0 0 24 24" fill="none">
            <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" stroke="currentColor" stroke-width="3"/>
            <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="3"/>
          </svg>
        </span>
        Breadcrumbs
      </a>
    </li>
  </ol>
</nav>
{% endexample %}

<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                              | Type               | Default     |
| -------- | --------- | -------------------------------------------------------- | ------------------ | ----------- |
| `key`    | `key`     | for tracking the node's identity when working with lists | `string \| number` | `undefined` |
| `ref`    | `ref`     | reference to component                                   | `any`              | `undefined` |


## Shadow Parts

| Part     | Description      |
| -------- | ---------------- |
| `"list"` | Breadcrumbs list |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
