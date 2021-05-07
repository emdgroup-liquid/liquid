/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')

// Web-types build require docs to be built first
const docs = require('../dist/web-components.json')

const components = []

function toCamelCase(name) {
  return name
    .split('-')
    .map((n) => n[0].toUpperCase() + n.substr(1))
    .join('')
}

for (const component of docs.components) {
  const attributes = []
  const slots = []
  const events = []
  const componentName = toCamelCase(component.tag)
  const docUrl = `https://liquid.merck.design/docs/components/${component.tag}`

  for (const prop of component.props || []) {
    attributes.push({
      name: prop.attr || prop.name,
      description: prop.docs,
      required: prop.required,
      default: prop.default,
      value: {
        kind: 'expression',
        type: prop.type,
      },
    })
  }

  for (const event of component.events || []) {
    let eventName = event.event
    if (eventName.toLowerCase().startsWith(componentName.toLowerCase())) {
      eventName = 'on' + eventName.substr(componentName.length)
    }
    events.push({
      name: eventName,
      description: event.docs,
      arguments: [
        {
          name: 'detail',
          type: event.detail,
        },
      ],
    })
  }

  for (const slot of component.slots || []) {
    slots.push({
      name: slot.name === '' ? 'default' : slot.name,
      description: slot.docs,
    })
  }

  components.push({
    name: componentName,
    'doc-url': docUrl,
    description: '# ' + component.readme.split('---')[2],
    source: {
      module:
        '@emdgroup-liquid/liquid/' +
        component.filePath
          .replace('./src/liquid/', 'dist/types/')
          .replace('.tsx', '.d.ts'),
      symbol: componentName.substr(2),
    },
    attributes,
    slots,
    events,
  })
}

const webTypes = {
  $schema: 'http://json.schemastore.org/web-types',
  framework: 'vue',
  name: '@ionic/vue',
  version: require('../package.json').version,
  contributions: {
    html: {
      'types-syntax': 'typescript',
      'description-markup': 'markdown',
      tags: components,
    },
  },
}

fs.writeFileSync('dist/web-types.json', JSON.stringify(webTypes, null, 2))
