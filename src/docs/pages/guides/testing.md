---
eleventyNavigation:
  key: Testing
  parent: Guides
  order: 10
layout: layout.njk
title: Testing
permalink: guides/testing/
---

# Testing

If you want to __unit test__ code in your app, which depends on the functionality of Liquid Oxygen Web Components, without mocking their internals, then you must make sure all relevant components have _hydrated_ in your test setup, before you execute your test code. You can do so by running the `defineCustomElements()` method imported from `'@emdgroup-liquid/liquid/dist/loader'` before each test and a `await`ing a helper function, which makes sure all components involved in the test have hydrated.

The following example shows how to execute unit tests with hydrated Web Components with [vitest](https://vitest.dev/), React, and the [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).

First, [configure vitest to use a setup file](https://vitest.dev/config/#setupfiles):

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

