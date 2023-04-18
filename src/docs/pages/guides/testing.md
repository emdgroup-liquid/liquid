---
eleventyNavigation:
  key: Testing
  parent: Guides
  order: 10
layout: layout.njk
title: Testing
permalink: guides/testing/
tags:
  - unit
  - spec
  - vitest
  - jest
---

# Testing

If you run __unit tests__ in your application, which depend on the functionality of Liquid Oxygen Web Components, and you do not want to mock that functionality, you must ensure that the components have been _hydrated_ before you execute your test code:

1. Call `defineCustomElements()` imported from `'@emdgroup-liquid/liquid/dist/loader'` before each test.
2. `await` all components to be hydrated. You can use a helper function similar to the one in the example test code below.

The following example shows how to execute unit tests with hydrated Web Components with [vitest](https://vitest.dev/), React, and the [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).

Configure vitest to use a  [setup file](https://vitest.dev/config/#setupfiles):

```js
// vite.config.ts
import { defineConfig } from 'vitest/config'
export default defineConfig({
  // ...
  test: {
    // ...
    setupFiles: './src/setupTests.ts',
  },
})
```

The `setupTests.ts` file looks like this:

```js
// src/setupTests.ts
import { defineCustomElements } from '@emdgroup-liquid/liquid/dist/loader'
import '@testing-library/jest-dom'
import matchers from '@testing-library/jest-dom/matchers'
import { cleanup } from '@testing-library/react'
import { vi } from 'vitest'

// Extend Vitest's expect method with methods from react-testing-library.
expect.extend(matchers)

beforeAll(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  global.__LD_ASSET_PATH__ = '/' // removes CDN warning
  defineCustomElements()

  global.fetch = vi
    .fn()
    .mockReturnValue(Promise.resolve({ text: () => Promise.resolve('') }))
})

// Run a cleanup after each test case.
afterEach(() => {
  cleanup()
})
```

In your test file, you can now wait for the Web Components to hydrate before executing your actual test code.

```tsx
// src/App.test.tsx
import App from './App'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

async function waitForLiquidToHydrate() {
  return waitFor(() => {
    Array.from(document.querySelectorAll('*'))
      .filter((e) => e.tagName.startsWith('LD-'))
      .forEach((component) => {
        expect(component).toHaveClass('hydrated')
      })
  })
}

test('validates input', async () => {
  render(<App />)

  await waitForLiquidToHydrate()

  const ldInputName = screen.getByPlaceholderText('e.g. Jason Parse')
  expect(ldInputName).toBeInTheDocument()

  const ldButtonSubmit = screen.getByText('Submit')
  expect(ldButtonSubmit).toBeInTheDocument()
  userEvent.click(ldButtonSubmit)

  const form = await screen.findByTestId('form')
  expect(form).toBeInTheDocument()

  fireEvent.submit(form)

  await screen.findByText('Your full name is required.')
})
```

Check out our [React sandbox app](https://stackblitz.com/github/emdgroup-liquid/liquid-sandbox-react-tailwind?file=src%2FApp.test.tsx) for a full working example.

<docs-page-nav prev-href="guides/design-tokens/" next-title="Sandbox applications" next-href="guides/sandbox-applications/"></docs-page-nav>

