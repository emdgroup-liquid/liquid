---
eleventyNavigation:
  key: Vue bindings
  parent: Framework integrations
  order: 2
layout: layout.njk
title: React bindings
permalink: guides/framework-integrations/vue-bindings/
---

# Vue bindings

In order to enable type checking and intellisense for Liquid components in your Vue project, simply import the Vue binding and use it as you would use any other Vue component.

<ld-notice mode="warning">
  While type checking and intellisense work well when using Visual Studio Code in combination with the <a href="https://github.com/johnsoncodehk/volar" rel="noreferrer noopener" target="_blank">Volar plugin</a>, we found that JetBrains' bundled <a href="https://plugins.jetbrains.com/plugin/9442-vue-js" rel="noreferrer noopener" target="_blank">Vue plugin</a> is not yet capable of providing equivalent features.
</ld-notice>

```js
import { LdButton } from '@emdgroup-liquid/liquid/dist/vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    LdButton,
  },
})
```

For more details on Vue integration check out our [sandbox apps](guides/sandbox-applications/) or read the [Stencil documentation](https://stenciljs.com/docs/vue).
