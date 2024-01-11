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

{% example '{ "background": "light" }' %}
<ld-tabs>
  <ld-tablist>
    <ld-tab selected>Fruits</ld-tab>
    <ld-tab>Vegetables</ld-tab>
    <ld-tab>Nuts</ld-tab>
  </ld-tablist>
  <ld-tabpanellist>
    <ld-tabpanel>
      <ld-typo style="margin-top: 1rem">
        <a href="#apple">Apple</a>, orange, banana
      </ld-typo>
    </ld-tabpanel>
    <ld-tabpanel>
      <ld-typo style="margin-top: 1rem">
        Potato, <a href="#cucumber">cucumber</a>, tomato
      </ld-typo>
    </ld-tabpanel>
    <ld-tabpanel>
      <ld-typo style="margin-top: 1rem">
        Walnut, chestnut, <a href="#strawberry">strawberry</a>
      </ld-typo>
    </ld-tabpanel>
  </ld-tabpanellist>
</ld-tabs>

<!-- React component -->

<LdTabs>
  <LdTablist>
    <LdTab selected>Fruits</LdTab>
    <LdTab>Vegetables</LdTab>
    <LdTab>Nuts</LdTab>
  </LdTablist>
  <LdTabpanellist>
    <LdTabpanel>
      <LdTypo style={ { marginTop: '1rem' } }>
        <a href="#apple">Apple</a>, orange, banana
      </LdTypo>
    </LdTabpanel>
    <LdTabpanel>
      <LdTypo style={ { marginTop: '1rem' } }>
        Potato, <a href="#cucumber">cucumber</a>, tomato
      </LdTypo>
    </LdTabpanel>
    <LdTabpanel>
      <LdTypo style={ { marginTop: '1rem' } }>
        Walnut, chestnut, <a href="#strawberry">strawberry</a>
      </LdTypo>
    </LdTabpanel>
  </LdTabpanellist>
</LdTabs>
{% endexample %}

### Disabled

{% example '{ "background": "light" }' %}
<ld-tabs>
  <ld-tablist>
    <ld-tab selected>Fruits</ld-tab>
    <ld-tab disabled>Vegetables</ld-tab>
    <ld-tab>Nuts</ld-tab>
  </ld-tablist>
</ld-tabs>

<!-- React component -->

<LdTabs>
  <LdTablist>
    <LdTab selected>Fruits</LdTab>
    <LdTab disabled>Vegetables</LdTab>
    <LdTab>Nuts</LdTab>
  </LdTablist>
</LdTabs>
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

<!-- React component -->

<LdTabs>
  <LdTablist mode="ghost">
    <LdTab selected>Fruits</LdTab>
    <LdTab>Vegetables</LdTab>
    <LdTab>Nuts</LdTab>
  </LdTablist>
</LdTabs>
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

<!-- React component -->

<LdTabs>
  <LdTablist mode="brand-color">
    <LdTab selected>Fruits</LdTab>
    <LdTab>Vegetables</LdTab>
    <LdTab>Nuts</LdTab>
  </LdTablist>
</LdTabs>
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

<!-- React component -->

<LdTabs>
  <LdTablist mode="brand-color" rounded="all">
    <LdTab selected>Fruits</LdTab>
    <LdTab>Vegetables</LdTab>
    <LdTab>Nuts</LdTab>
  </LdTablist>
</LdTabs>

<LdTabs>
  <LdTablist mode="brand-color" rounded="all-lg">
    <LdTab selected>Fruits</LdTab>
    <LdTab>Vegetables</LdTab>
    <LdTab>Nuts</LdTab>
  </LdTablist>
</LdTabs>

<LdTabs>
  <LdTablist mode="brand-color" rounded="top">
    <LdTab selected>Fruits</LdTab>
    <LdTab>Vegetables</LdTab>
    <LdTab>Nuts</LdTab>
  </LdTablist>
</LdTabs>

<LdTabs>
  <LdTablist mode="brand-color" rounded="top-lg">
    <LdTab selected>Fruits</LdTab>
    <LdTab>Vegetables</LdTab>
    <LdTab>Nuts</LdTab>
  </LdTablist>
</LdTabs>
{% endexample %}

### Floating

{% example '{ "background": "light" }' %}
<ld-tabs>
  <ld-tablist mode="floating">
    <ld-tab selected>Fruits</ld-tab>
    <ld-tab>Vegetables</ld-tab>
    <ld-tab disabled>Scrap Metal</ld-tab>
    <ld-tab>Nuts</ld-tab>
  </ld-tablist>
</ld-tabs>

<!-- React component -->

<LdTabs>
  <LdTablist mode="floating">
    <LdTab selected>Fruits</LdTab>
    <LdTab>Vegetables</LdTab>
    <LdTab disabled>Scrap Metal</LdTab>
    <LdTab>Nuts</LdTab>
  </LdTablist>
</LdTabs>
{% endexample %}

### Floating on brand color

{% example '{ "background": "brand", "hasBorder": false }' %}
<ld-tabs>
  <ld-tablist mode="floating-on-brand-color">
    <ld-tab selected>Fruits</ld-tab>
    <ld-tab>Vegetables</ld-tab>
    <ld-tab disabled>Scrap Metal</ld-tab>
    <ld-tab>Nuts</ld-tab>
  </ld-tablist>
</ld-tabs>

<!-- React component -->

<LdTabs>
  <LdTablist mode="floating-on-brand-color">
    <LdTab selected>Fruits</LdTab>
    <LdTab>Vegetables</LdTab>
    <LdTab disabled>Scrap Metal</LdTab>
    <LdTab>Nuts</LdTab>
  </LdTablist>
</LdTabs>
{% endexample %}

### Size

{% example '{ "background": "light" }' %}
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

<!-- React component -->

<LdTabs>
  <LdTablist size="sm">
    <LdTab selected>Fruits</LdTab>
    <LdTab>Vegetables</LdTab>
    <LdTab>Nuts</LdTab>
  </LdTablist>
</LdTabs>

<LdTabs>
  <LdTablist>
    <LdTab selected>Fruits</LdTab>
    <LdTab>Vegetables</LdTab>
    <LdTab>Nuts</LdTab>
  </LdTablist>
</LdTabs>

<LdTabs>
  <LdTablist size="lg">
    <LdTab selected>Fruits</LdTab>
    <LdTab>Vegetables</LdTab>
    <LdTab>Nuts</LdTab>
  </LdTablist>
</LdTabs>
{% endexample %}

### With icons

{% example '{ "background": "light" }' %}
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

<!-- React component -->

<LdTabs>
  <LdTablist>
    <LdTab selected><LdIcon name="placeholder" aria-label="Fruits" /></LdTab>
    <LdTab><LdIcon name="placeholder" aria-label="Vegetables" /></LdTab>
    <LdTab><LdIcon name="placeholder" aria-label="Nuts" /></LdTab>
  </LdTablist>
</LdTabs>

<LdTabs>
  <LdTablist mode="ghost">
    <LdTab selected><LdIcon name="placeholder" />Fruits</LdTab>
    <LdTab><LdIcon name="placeholder" />Vegetables</LdTab>
    <LdTab><LdIcon name="placeholder" />Nuts</LdTab>
  </LdTablist>
</LdTabs>

{% endexample %}

### With many tabs

You should try to avoid using tab bars with more than five tab items. But if you really must, the `ld-tabs` component has got you covered:

{% example '{ "background": "light" }' %}
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

<!-- React component -->

<LdTabs>
  <LdTablist>
    <LdTab selected>Classical</LdTab>
    <LdTab>Rock</LdTab>
    <LdTab>Indie</LdTab>
    <LdTab>Jazz</LdTab>
    <LdTab>Blues</LdTab>
    <LdTab>Soul</LdTab>
    <LdTab>Gospel</LdTab>
    <LdTab>Pop</LdTab>
    <LdTab>Hip Hop</LdTab>
    <LdTab>Raggea</LdTab>
    <LdTab>Raggeaton</LdTab>
    <LdTab>R&B</LdTab>
    <LdTab>Electric</LdTab>
    <LdTab>Country</LdTab>
    <LdTab>Punk</LdTab>
    <LdTab>Latin</LdTab>
    <LdTab>Funk</LdTab>
    <LdTab>Ambient</LdTab>
    <LdTab>Bossa Nova</LdTab>
    <LdTab>Flamenco</LdTab>
  </LdTablist>
</LdTabs>
{% endexample %}

### Full width

{% example '{ "background": "light" }' %}
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

<!-- React component -->

<LdTabs style={ { width: '100%' } }>
  <LdTablist mode="ghost">
    <LdTab selected>Fruits</LdTab>
    <LdTab disabled>Vegetables</LdTab>
    <LdTab>Nuts</LdTab>
  </LdTablist>
</LdTabs>

<LdTabs style={ { width: '100%' } }>
  <LdTablist>
    <LdTab selected>Fruits</LdTab>
    <LdTab disabled>Vegetables</LdTab>
    <LdTab>Nuts</LdTab>
  </LdTablist>
</LdTabs>

<LdTabs style={ { width: '100%' } }>
  <LdTablist mode="brand-color">
    <LdTab selected>Fruits</LdTab>
    <LdTab disabled>Vegetables</LdTab>
    <LdTab>Nuts</LdTab>
  </LdTablist>
</LdTabs>

{% endexample %}

## Events

The `ld-tabs` component emits the `ldtabchange` event which you can use to bind custom event handlers. The event is only emmitted on clicks on non-disabled and non-selected tabs.

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
  document.getElementById('tabs_events').addEventListener('ldtabchange', ev => {
    window.alert(`Current tab index is: ${ev.detail}`)
  })
</script>

<!-- React component -->

<LdTabs
  onLdtabchange={(ev) => {
    window.alert(`Current tab index is: ${ev.detail}`)
  }}
>
  <LdTablist mode="ghost">
    <LdTab selected>Fruits</LdTab>
    <LdTab>Vegetables</LdTab>
    <LdTab>Nuts</LdTab>
    <LdTab disabled>Grain</LdTab>
  </LdTablist>
</LdTabs>

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
      <ld-typo style="margin-top: 1rem">
        Apple, orange, banana
      </ld-typo>
    </ld-tabpanel>
    <ld-tabpanel>
      <ld-typo style="margin-top: 1rem">
        Potato, cucumber, tomato
      </ld-typo>
    </ld-tabpanel>
    <ld-tabpanel>
      <ld-typo style="margin-top: 1rem">
        Walnut, chestnut, strawberry
      </ld-typo>
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

<!-- React component -->

const tabsRef = useRef(null)

return (
  <LdTabs ref={ tabsRef }>
    <LdTablist mode="ghost">
      <LdTab selected>Fruits</LdTab>
      <LdTab>Vegetables</LdTab>
      <LdTab>Nuts</LdTab>
    </LdTablist>
    <LdTabpanellist>
      <LdTabpanel>
        <LdTypo style={ { marginTop: '1rem' } }>
          Apple, orange, banana
        </LdTypo>
      </LdTabpanel>
      <LdTabpanel>
        <LdTypo style={ { marginTop: '1rem' } }>
          Potato, cucumber, tomato
        </LdTypo>
      </LdTabpanel>
      <LdTabpanel>
        <LdTypo style={ { marginTop: '1rem' } }>
          Walnut, chestnut, strawberry
        </LdTypo>
      </LdTabpanel>
    </LdTabpanellist>
  </LdTabs>
  <LdButton onClick={ () => tabsRef.current?.switchTab(2) }>
        Select Nuts
  </LdButton>
)
{% endexample %}

1. By using the `select`-method exposed by the `ld-tab` element:

{% example %}
<ld-tabs id="tabs_programmatic_2">
  <ld-tablist mode="ghost">
    <ld-tab selected>Fruits</ld-tab>
    <ld-tab>Vegetables</ld-tab>
    <ld-tab>Nuts</ld-tab>
  </ld-tablist>
  <ld-tabpanellist>
    <ld-tabpanel>
      <ld-typo style="margin-top: 1rem">
        Apple, orange, banana
      </ld-typo>
    </ld-tabpanel>
    <ld-tabpanel>
      <ld-typo style="margin-top: 1rem">
        Potato, cucumber, tomato
      </ld-typo>
    </ld-tabpanel>
    <ld-tabpanel>
      <ld-typo style="margin-top: 1rem">
        Walnut, chestnut, strawberry
      </ld-typo>
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

<!-- React component -->

const nutTabRef = useRef(null)

return (
  <LdTabs>
    <LdTablist mode="ghost">
      <LdTab selected>Fruits</LdTab>
      <LdTab>Vegetables</LdTab>
      <LdTab ref={ nutTabRef }>Nuts</LdTab>
    </LdTablist>
    <LdTabpanellist>
      <LdTabpanel>
        <LdTypo style={ { marginTop: '1rem' } }>
          Apple, orange, banana
        </LdTypo>
      </LdTabpanel>
      <LdTabpanel>
        <LdTypo style={ { marginTop: '1rem' } }>
          Potato, cucumber, tomato
        </LdTypo>
      </LdTabpanel>
      <LdTabpanel>
        <LdTypo style={ { marginTop: '1rem' } }>
          Walnut, chestnut, strawberry
        </LdTypo>
      </LdTabpanel>
    </LdTabpanellist>
  </LdTabs>
  <LdButton onClick={ () => nutTabRef.current?.select() }>
    Select Nuts
  </LdButton>
)
{% endexample %}


<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                              | Type               | Default     |
| -------- | --------- | -------------------------------------------------------- | ------------------ | ----------- |
| `key`    | `key`     | for tracking the node's identity when working with lists | `string \| number` | `undefined` |
| `ref`    | `ref`     | reference to component                                   | `any`              | `undefined` |


## Events

| Event         | Description                              | Type                  |
| ------------- | ---------------------------------------- | --------------------- |
| `ldtabchange` | Emitted with the id of the selected tab. | `CustomEvent<string>` |


## Methods

### `switchTab(identifier: number | string) => Promise<void>`

Set selected tab to a certain index

#### Parameters

| Name         | Type               | Description |
| ------------ | ------------------ | ----------- |
| `identifier` | `string \| number` |             |

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
