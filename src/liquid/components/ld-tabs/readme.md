---
eleventyNavigation:
  key: Tabs
  parent: Components
layout: layout.njk
title: Tabs
permalink: components/ld-tabs/
---

# ld-tabs

The `ld-tabs` component hides content behind selectable items and thereby helps to place content in a space-saving manner.

---

## Usage

Use `ld-tabs` as a container for a list of tabs - the `ld-tablist` which in turn contains a number of `ld-tab` items - and a container `ld-tabpanellist` which contains the same number of corresponding `ld-tabpanel` items.

{% example 'html', false, false, 'light' %}
<ld-tabs>
  <ld-tablist>
    <ld-tab selected>Fruits</ld-tab>
    <ld-tab>Vegetables</ld-tab>
    <ld-tab>Nuts</ld-tab>
  </ld-tablist>
  <ld-tabpanellist>
    <ld-tabpanel>
      <ld-paragraph style="margin-top: 1rem">
        <a href="#apple">Apple</a>, orange, banana
      </ld-paragraph>
    </ld-tabpanel>
    <ld-tabpanel>
      <ld-paragraph style="margin-top: 1rem">
        Potato, <a href="#cucumber">cucumber</a>, tomato
      </ld-paragraph>
    </ld-tabpanel>
    <ld-tabpanel>
      <ld-paragraph style="margin-top: 1rem">
        Walnut, chestnut, <a href="#strawberry">strawberry</a>
      </ld-paragraph>
    </ld-tabpanel>
  </ld-tabpanellist>
</ld-tabs>
{% endexample %}

### Disabled

{% example 'html', false, false, 'light' %}
<ld-tabs>
  <ld-tablist>
    <ld-tab selected>Fruits</ld-tab>
    <ld-tab disabled>Vegetables</ld-tab>
    <ld-tab>Nuts</ld-tab>
  </ld-tablist>
</ld-tabs>
{% endexample %}

### Ghost

{% example %}
<ld-tabs>
  <ld-tablist mode="ghost">
    <ld-tab selected>Fruits</ld-tab>
    <ld-tab>Vegetables</ld-tab>
    <ld-tab>Nuts</ld-tab>
  </ld-tablist>
</ld-tabs>
{% endexample %}

### Brand color

{% example %}
<ld-tabs>
  <ld-tablist mode="brand-color">
    <ld-tab selected>Fruits</ld-tab>
    <ld-tab>Vegetables</ld-tab>
    <ld-tab>Nuts</ld-tab>
  </ld-tablist>
</ld-tabs>
{% endexample %}

### Rounded corners

{% example %}
<ld-tabs>
  <ld-tablist mode="brand-color" rounded="all">
    <ld-tab selected>Fruits</ld-tab>
    <ld-tab>Vegetables</ld-tab>
    <ld-tab>Nuts</ld-tab>
  </ld-tablist>
</ld-tabs>

<ld-tabs>
  <ld-tablist mode="brand-color" rounded="all-lg">
    <ld-tab selected>Fruits</ld-tab>
    <ld-tab>Vegetables</ld-tab>
    <ld-tab>Nuts</ld-tab>
  </ld-tablist>
</ld-tabs>

<ld-tabs>
  <ld-tablist mode="brand-color" rounded="top">
    <ld-tab selected>Fruits</ld-tab>
    <ld-tab>Vegetables</ld-tab>
    <ld-tab>Nuts</ld-tab>
  </ld-tablist>
</ld-tabs>

<ld-tabs>
  <ld-tablist mode="brand-color" rounded="top-lg">
    <ld-tab selected>Fruits</ld-tab>
    <ld-tab>Vegetables</ld-tab>
    <ld-tab>Nuts</ld-tab>
  </ld-tablist>
</ld-tabs>
{% endexample %}

### Size

{% example 'html', false, false, 'light' %}
<ld-tabs>
  <ld-tablist size="sm">
    <ld-tab selected>Fruits</ld-tab>
    <ld-tab>Vegetables</ld-tab>
    <ld-tab>Nuts</ld-tab>
  </ld-tablist>
</ld-tabs>

<ld-tabs>
  <ld-tablist>
    <ld-tab selected>Fruits</ld-tab>
    <ld-tab>Vegetables</ld-tab>
    <ld-tab>Nuts</ld-tab>
  </ld-tablist>
</ld-tabs>

<ld-tabs>
  <ld-tablist size="lg">
    <ld-tab selected>Fruits</ld-tab>
    <ld-tab>Vegetables</ld-tab>
    <ld-tab>Nuts</ld-tab>
  </ld-tablist>
</ld-tabs>
{% endexample %}

### With icons

{% example 'html', false, false, 'light' %}
<ld-tabs>
  <ld-tablist>
    <ld-tab selected><ld-icon name="placeholder" aria-label="Fruits"></ld-icon></ld-tab>
    <ld-tab><ld-icon name="placeholder" aria-label="Vegetables"></ld-icon></ld-tab>
    <ld-tab><ld-icon name="placeholder" aria-label="Nuts"></ld-icon></ld-tab>
  </ld-tablist>
</ld-tabs>

<ld-tabs>
  <ld-tablist mode="ghost">
    <ld-tab selected><ld-icon name="placeholder"></ld-icon>Fruits</ld-tab>
    <ld-tab><ld-icon name="placeholder"></ld-icon>Vegetables</ld-tab>
    <ld-tab><ld-icon name="placeholder"></ld-icon>Nuts</ld-tab>
  </ld-tablist>
</ld-tabs>
{% endexample %}

### With many tabs

You should try to avoid using tab bars with more than five tab items. But if you really must, the `ld-tabs` component has got you covered:

{% example 'html', false, false, 'light' %}
<ld-tabs>
  <ld-tablist>
    <ld-tab selected>Classical</ld-tab>
    <ld-tab>Rock</ld-tab>
    <ld-tab>Indie</ld-tab>
    <ld-tab>Jazz</ld-tab>
    <ld-tab>Blues</ld-tab>
    <ld-tab>Soul</ld-tab>
    <ld-tab>Gospel</ld-tab>
    <ld-tab>Pop</ld-tab>
    <ld-tab>Hip Hop</ld-tab>
    <ld-tab>Raggea</ld-tab>
    <ld-tab>Raggeaton</ld-tab>
    <ld-tab>R&B</ld-tab>
    <ld-tab>Electric</ld-tab>
    <ld-tab>Country</ld-tab>
    <ld-tab>Punk</ld-tab>
    <ld-tab>Latin</ld-tab>
    <ld-tab>Funk</ld-tab>
    <ld-tab>Ambient</ld-tab>
    <ld-tab>Bossa Nova</ld-tab>
    <ld-tab>Flamenco</ld-tab>
  </ld-tablist>
</ld-tabs>
{% endexample %}

### Full width

{% example 'html', false, false, 'light' %}
<ld-tabs style="width: 100%">
  <ld-tablist mode="ghost">
    <ld-tab selected>Fruits</ld-tab>
    <ld-tab disabled>Vegetables</ld-tab>
    <ld-tab>Nuts</ld-tab>
  </ld-tablist>
</ld-tabs>

<ld-tabs style="width: 100%">
  <ld-tablist>
    <ld-tab selected>Fruits</ld-tab>
    <ld-tab disabled>Vegetables</ld-tab>
    <ld-tab>Nuts</ld-tab>
  </ld-tablist>
</ld-tabs>

<ld-tabs style="width: 100%">
  <ld-tablist mode="brand-color">
    <ld-tab selected>Fruits</ld-tab>
    <ld-tab disabled>Vegetables</ld-tab>
    <ld-tab>Nuts</ld-tab>
  </ld-tablist>
</ld-tabs>
{% endexample %}

## Events

The `ld-tabs` component emits the `tabChange` event which you can use to bind custom event handlers. The event is only emmitted on clicks on non-disabled and non-selected tabs.

{% example %}
<ld-tabs id="tabs_events">
  <ld-tablist mode="ghost">
    <ld-tab selected>Fruits</ld-tab>
    <ld-tab>Vegetables</ld-tab>
    <ld-tab>Nuts</ld-tab>
    <ld-tab disabled>Grain</ld-tab>
  </ld-tablist>
</ld-tabs>

<script>
  document.getElementById('tabs_events').addEventListener('tabChange', ev => {
    window.alert(`Current tab index is: ${ev.detail}`)
  })
</script>
{% endexample %}

## Select a tab programmatically

There are two ways to programmatically select a tab: 

1. By using the `switchTab`-method exposed by the `ld-tabs` element:

{% example %}
<ld-tabs id="tabs_programmatic_1">
  <ld-tablist mode="ghost">
    <ld-tab selected>Fruits</ld-tab>
    <ld-tab>Vegetables</ld-tab>
    <ld-tab>Nuts</ld-tab>
  </ld-tablist>
  <ld-tabpanellist>
    <ld-tabpanel>
      <ld-paragraph style="margin-top: 1rem">
        Apple, orange, banana
      </ld-paragraph>
    </ld-tabpanel>
    <ld-tabpanel>
      <ld-paragraph style="margin-top: 1rem">
        Potato, cucumber, tomato
      </ld-paragraph>
    </ld-tabpanel>
    <ld-tabpanel>
      <ld-paragraph style="margin-top: 1rem">
        Walnut, chestnut, strawberry
      </ld-paragraph>
    </ld-tabpanel>
  </ld-tabpanellist>
</ld-tabs>

<ld-button id="nuts_button_1">Select nuts</ld-button>

<script>
  document.getElementById('nuts_button_1').addEventListener('click', async (ev) => {
    await document.getElementById('tabs_programmatic_1').switchTab(2)

    console.log(`Tab successfully set to tab at index 2 using ld-tabs' "switchTab"-method.`)
  })
</script>
{% endexample %}

2. By using the `select`-method exposed by the `ld-tab` element:

{% example %}
<ld-tabs id="tabs_programmatic_2">
  <ld-tablist mode="ghost">
    <ld-tab selected>Fruits</ld-tab>
    <ld-tab>Vegetables</ld-tab>
    <ld-tab>Nuts</ld-tab>
  </ld-tablist>
  <ld-tabpanellist>
    <ld-tabpanel>
      <ld-paragraph style="margin-top: 1rem">
        Apple, orange, banana
      </ld-paragraph>
    </ld-tabpanel>
    <ld-tabpanel>
      <ld-paragraph style="margin-top: 1rem">
        Potato, cucumber, tomato
      </ld-paragraph>
    </ld-tabpanel>
    <ld-tabpanel>
      <ld-paragraph style="margin-top: 1rem">
        Walnut, chestnut, strawberry
      </ld-paragraph>
    </ld-tabpanel>
  </ld-tabpanellist>
</ld-tabs>

<ld-button id="nuts_button_2">Select nuts</ld-button>

<script>
  document.getElementById('nuts_button_2').addEventListener('click', async (ev) => {
    await document.getElementById('tabs_programmatic_2').querySelectorAll('ld-tab')[2].select()

    console.log(`Tab successfully set to tab at index 2 using ld-tab's "select"-method.`)
  })
</script>
{% endexample %}


<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                              | Type               | Default     |
| -------- | --------- | -------------------------------------------------------- | ------------------ | ----------- |
| `key`    | `key`     | for tracking the node's identity when working with lists | `string \| number` | `undefined` |
| `ref`    | `ref`     | reference to component                                   | `any`              | `undefined` |


## Events

| Event       | Description                              | Type                  |
| ----------- | ---------------------------------------- | --------------------- |
| `tabChange` | Emitted with the id of the selected tab. | `CustomEvent<string>` |


## Methods

### `switchTab(identifier: number | string) => Promise<void>`

Set selected tab to a certain index

#### Returns

Type: `Promise<void>`




----------------------------------------------

 
