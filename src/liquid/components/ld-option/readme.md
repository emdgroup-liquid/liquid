# ld-option



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                                                                                                                                                     | Type      | Default     |
| ---------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ----------- |
| `disabled` | `disabled` | Disables the option.                                                                                                                                                                                            | `boolean` | `false`     |
| `selected` | `selected` | If present, this boolean attribute indicates that the option is selected.                                                                                                                                       | `boolean` | `false`     |
| `value`    | `value`    | The content of this attribute represents the value to be submitted with the form, should this option be selected. If this attribute is omitted, the value is taken from the text content of the option element. | `string`  | `undefined` |


## Events

| Event            | Description                                                | Type                   |
| ---------------- | ---------------------------------------------------------- | ---------------------- |
| `ldOptionSelect` | Emitted on either selection or de-selection of the option. | `CustomEvent<boolean>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
