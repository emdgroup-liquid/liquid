import { newSpecPage } from '@stencil/core/testing'
import { LdHeading } from '../ld-heading'

describe('ld-heading', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [LdHeading],
      html: `<ld-heading level="1">Text</ld-heading>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-heading level="1">
        <h1 class="ld-heading ld-heading--h1">Text</h1>
      </ld-heading>
    `)
  })
  it('throws if no level is provided', async () => {
    try {
      await newSpecPage({
        components: [LdHeading],
        html: `<ld-heading>Text</ld-heading>`,
      })
      expect(true).toBe(false)
    } catch (err) {
      expect(err).toStrictEqual(
        TypeError('ld-heading level prop invalid; got undefined')
      )
    }
  })
  it('throws if invalid level is provided', async () => {
    try {
      await newSpecPage({
        components: [LdHeading],
        html: `<ld-heading level="7">Text</ld-heading>`,
      })
      expect(true).toBe(false)
    } catch (err) {
      expect(err).toStrictEqual(
        TypeError('ld-heading level prop invalid; got 7')
      )
    }
  })
  it('with visual level', async () => {
    const page = await newSpecPage({
      components: [LdHeading],
      html: `<ld-heading level="1" visual-level="h3">Text</ld-heading>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-heading level="1" visual-level="h3">
        <h1 class="ld-heading ld-heading--h3">Text</h1>
      </ld-heading>
    `)
  })
  it('with visual b level and aria-label', async () => {
    const page = await newSpecPage({
      components: [LdHeading],
      html: `<ld-heading level="1" visual-level="b3" aria-label="Text">Text</ld-heading>`,
    })
    expect(page.root).toEqualHtml(`
      <ld-heading aria-label="Text" level="1" visual-level="b3">
        <h1 aria-label="Text" class="ld-heading ld-heading--b3">Text</h1>
      </ld-heading>
    `)
  })
  it('throws with visual b level but without aria-label', async () => {
    try {
      await newSpecPage({
        components: [LdHeading],
        html: `<ld-heading level="1" visual-level="b3">Text</ld-heading>`,
      })
      expect(true).toBe(false)
    } catch (err) {
      expect(err).toStrictEqual(
        TypeError(
          'ld-heading with visualLevel prop b* requires an ariaLabel prop'
        )
      )
    }
  })
  it('throws with invalid visual level prop', async () => {
    try {
      await newSpecPage({
        components: [LdHeading],
        html: `<ld-heading level="1" visual-level="asdf" aria-label="Text">Text</ld-heading>`,
      })
      expect(true).toBe(false)
    } catch (err) {
      expect(err).toStrictEqual(
        TypeError('ld-heading visualLevel prop invalid; got asdf')
      )
    }
  })
})
