---
eleventyNavigation:
  key: Tab
  parent: Tabs
layout: layout.njk
title: Tab
permalink: components/ld-tab/
---

# ld-tab

The `ld-tab` component is a sub-component for `ld-tabs`.

Please refer to the [`ld-tabs` documentation](components/ld-tabs) for usage examples.

---


<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                            | Type               | Default     |
| ---------- | ---------- | ---------------------------------------------------------------------- | ------------------ | ----------- |
| `disabled` | `disabled` | Disables the tab.                                                      | `boolean`          | `undefined` |
| `key`      | `key`      | for tracking the node's identity when working with lists               | `string \| number` | `undefined` |
| `ref`      | `ref`      | reference to component                                                 | `any`              | `undefined` |
| `selected` | `selected` | If present, this boolean attribute indicates that the tab is selected. | `boolean`          | `undefined` |


## Events

| Event       | Description                              | Type                  |
| ----------- | ---------------------------------------- | --------------------- |
| `tabSelect` | Emitted with the id of the selected tab. | `CustomEvent<string>` |


## Methods

### `focusTab() => Promise<void>`

asdf

#### Returns

Type: `Promise<void>`




----------------------------------------------

 
