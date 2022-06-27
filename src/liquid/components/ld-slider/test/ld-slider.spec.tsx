import { h } from '@stencil/core'
import { newSpecPage } from '@stencil/core/testing'
import { LdSlider } from '../ld-slider'

describe('ld-slider', () => {
  describe('renders', () => {
    it('default', async () => {
      const page = await newSpecPage({
        components: [LdSlider],
        template: () => <ld-slider />,
      })
      expect(page.root).toMatchSnapshot()
    })

    it('custom edges', async () => {
      const page = await newSpecPage({
        components: [LdSlider],
        template: () => <ld-slider max={50} min={-50} stops="-25,0,25" />,
      })
      expect(page.root).toMatchSnapshot()
    })

    it('2 thumbs', async () => {
      const page = await newSpecPage({
        components: [LdSlider],
        template: () => <ld-slider value="10,50" />,
      })
      expect(page.root).toMatchSnapshot()
    })

    it('2 thumbs with custom thumb labels', async () => {
      const page = await newSpecPage({
        components: [LdSlider],
        template: () => (
          <ld-slider value="10,50" labelFrom="Von" labelTo="Bis" />
        ),
      })
      expect(page.root).toMatchSnapshot()
    })

    it('more than 2 thumbs with custom thumb labels', async () => {
      const page = await newSpecPage({
        components: [LdSlider],
        template: () => <ld-slider value="10,50,80" labelValue="Thumb" />,
      })
      expect(page.root).toMatchSnapshot()
    })

    it('with values always visible', async () => {
      const page = await newSpecPage({
        components: [LdSlider],
        template: () => <ld-slider alwaysShowValues />,
      })
      expect(page.root).toMatchSnapshot()
    })

    it('disabled', async () => {
      const page = await newSpecPage({
        components: [LdSlider],
        template: () => <ld-slider disabled />,
      })
      expect(page.root).toMatchSnapshot()
    })

    it('aria-disabled', async () => {
      const page = await newSpecPage({
        components: [LdSlider],
        template: () => <ld-slider ariaDisabled="true" />,
      })
      expect(page.root).toMatchSnapshot()
    })

    it('with inverted color indicators', async () => {
      const page = await newSpecPage({
        components: [LdSlider],
        template: () => <ld-slider negative />,
      })
      expect(page.root).toMatchSnapshot()
    })

    it('with custom radix', async () => {
      const page = await newSpecPage({
        components: [LdSlider],
        template: () => <ld-slider radix={16} />,
      })
      expect(page.root).toMatchSnapshot()
    })

    it('with custom width', async () => {
      const page = await newSpecPage({
        components: [LdSlider],
        template: () => <ld-slider width="500px" />,
      })
      expect(page.root).toMatchSnapshot()
    })
  })

  it('re-renders on prop changes', async () => {
    const page = await newSpecPage({
      components: [LdSlider],
      template: () => <ld-slider radix={16} />,
    })

    const slider = page.root as HTMLLdSliderElement
    slider.alwaysShowValues = true
    slider.ariaDisabled = 'true'
    slider.disabled = true
    slider.labelFrom = 'Von'
    slider.labelTo = 'Bis'
    slider.labelValue = 'Thumb'
    slider.max = 99
    slider.min = 1
    slider.negative = true
    slider.radix = 10
    slider.stops = '30,50,70'
    slider.value = '15,85'
    slider.width = '500px'
    await page.waitForChanges()

    expect(page.root).toMatchSnapshot()
  })

  it('updates css props on value changes', async () => {
    const page = await newSpecPage({
      components: [LdSlider],
      template: () => <ld-slider />,
    })
    const input = page.root.shadowRoot.querySelector('input')

    input.value = '50'
    input.dispatchEvent(new Event('input'))
    await page.waitForChanges()

    expect(page.root).toMatchSnapshot()
  })

  it('emits ldchange event on value changes', async () => {
    const page = await newSpecPage({
      components: [LdSlider],
      template: () => <ld-slider />,
    })
    const input = page.root.shadowRoot.querySelector('input')
    const changeHandler = jest.fn()

    page.root.addEventListener('ldchange', changeHandler)
    input.value = '50'
    input.dispatchEvent(new Event('input'))

    expect(changeHandler).toHaveBeenCalledWith(
      expect.objectContaining({ detail: [50] })
    )
  })

  it('prevents invalid values', async () => {
    const page = await newSpecPage({
      components: [LdSlider],
      template: () => <ld-slider value="-1,101" />,
    })

    expect(page.root).toMatchSnapshot()
  })

  describe('strict mode', () => {
    it('prevents thumbs from being swapped', async () => {
      const page = await newSpecPage({
        components: [LdSlider],
        template: () => <ld-slider strict value="40,60" />,
      })
      const firstInput = page.root.shadowRoot.querySelector('input')

      firstInput.value = '70'
      firstInput.dispatchEvent(new Event('input'))
      await page.waitForChanges()

      expect(page.root).toMatchSnapshot()
    })

    it('corrects invalid initial values', async () => {
      const page = await newSpecPage({
        components: [LdSlider],
        template: () => <ld-slider strict value="100,50,90,40" />,
      })

      expect(page.root).toMatchSnapshot()
    })

    it('prevents invalid value changes without re-rendering', async () => {
      const page = await newSpecPage({
        components: [LdSlider],
        template: () => <ld-slider strict value="0,100" />,
      })
      const slider = page.root as HTMLLdSliderElement

      slider.value = '51,50'
      await page.waitForChanges()

      expect(page.root).toMatchSnapshot()
    })

    it('emits ldchange event after correcting invalid value changes', async () => {
      const page = await newSpecPage({
        components: [LdSlider],
        template: () => <ld-slider strict value="40,60" />,
      })
      const firstInput = page.root.shadowRoot.querySelector('input')
      const changeHandler = jest.fn()

      page.root.addEventListener('ldchange', changeHandler)
      firstInput.value = '70'
      firstInput.dispatchEvent(new Event('input'))

      expect(changeHandler).toHaveBeenCalledTimes(1)
      expect(changeHandler).toHaveBeenCalledWith(
        expect.objectContaining({ detail: [60, 60] })
      )
    })

    it('does not emit ldchange event on invalid value changes', async () => {
      const page = await newSpecPage({
        components: [LdSlider],
        template: () => <ld-slider strict value="0,100" />,
      })
      const slider = page.root as HTMLLdSliderElement
      const changeHandler = jest.fn()

      page.root.addEventListener('ldchange', changeHandler)
      slider.value = '51,50'

      expect(changeHandler).not.toHaveBeenCalled()
    })
  })
})
