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

    it('with custom width', async () => {
      const page = await newSpecPage({
        components: [LdSlider],
        template: () => <ld-slider width="500px" />,
      })
      expect(page.root).toMatchSnapshot()
    })

    it('step indicators', async () => {
      const page = await newSpecPage({
        components: [LdSlider],
        template: () => <ld-slider indicators step={20} />,
      })
      expect(page.root).toMatchSnapshot()
    })

    it('stop indicators', async () => {
      const page = await newSpecPage({
        components: [LdSlider],
        template: () => <ld-slider indicators stops="20,45,85" />,
      })
      expect(page.root).toMatchSnapshot()
    })

    it('different size', async () => {
      const page = await newSpecPage({
        components: [LdSlider],
        template: () => <ld-slider size="sm" />,
      })
      expect(page.root).toMatchSnapshot()
    })

    it('with unit', async () => {
      const page = await newSpecPage({
        components: [LdSlider],
        template: () => <ld-slider unit="%" stops="20,45,85" />,
      })
      expect(page.root).toMatchSnapshot()
    })

    it('without indicators, if step/stops parameter not given', async () => {
      const page = await newSpecPage({
        components: [LdSlider],
        template: () => <ld-slider indicators />,
      })
      expect(page.root).toMatchSnapshot()
    })

    it('without values', async () => {
      const page = await newSpecPage({
        components: [LdSlider],
        template: () => <ld-slider hide-values />,
      })
      expect(page.root).toMatchSnapshot()
    })

    it('without value labels', async () => {
      const page = await newSpecPage({
        components: [LdSlider],
        template: () => <ld-slider hide-value-labels />,
      })
      expect(page.root).toMatchSnapshot()
    })

    it('without stop labels', async () => {
      const page = await newSpecPage({
        components: [LdSlider],
        template: () => <ld-slider hide-stop-labels stops="20,45,85" />,
      })
      expect(page.root).toMatchSnapshot()
    })
  })

  it('re-renders on prop changes', async () => {
    const page = await newSpecPage({
      components: [LdSlider],
      template: () => <ld-slider />,
    })

    const slider = page.root as HTMLLdSliderElement
    slider.ariaDisabled = 'true'
    slider.disabled = true
    slider.hideStopLabels = true
    slider.hideValueLabels = true
    slider.hideValues = true
    slider.indicators = true
    slider.labelFrom = 'Von'
    slider.labelTo = 'Bis'
    slider.labelValue = 'Thumb'
    slider.max = 99
    slider.min = 1
    slider.negative = true
    slider.stops = '30,50,70'
    slider.value = '30,70'
    slider.width = '500px'
    await page.waitForChanges()

    expect(slider).toMatchSnapshot()
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

    expect(page.root.value).toBe('0,100')
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

      expect(firstInput.value).toBe('60')
      expect(page.root.value).toBe('60,60')
    })

    it('corrects invalid initial values', async () => {
      const page = await newSpecPage({
        components: [LdSlider],
        template: () => <ld-slider strict value="100,50,90,40" />,
      })

      expect(page.root.value).toBe('40,50,90,100')
    })

    it('prevents invalid value changes without re-rendering', async () => {
      const page = await newSpecPage({
        components: [LdSlider],
        template: () => <ld-slider strict value="0,100" />,
      })
      const slider = page.root as HTMLLdSliderElement

      slider.value = '51,50'
      await page.waitForChanges()

      expect(slider).toMatchSnapshot()
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

      slider.addEventListener('ldchange', changeHandler)
      slider.value = '51,50'

      expect(changeHandler).not.toHaveBeenCalled()
    })
  })

  describe('steps', () => {
    it('enforces the closest step value', async () => {
      const page = await newSpecPage({
        components: [LdSlider],
        template: () => <ld-slider step={20} />,
      })
      const firstInput = page.root.shadowRoot.querySelector('input')
      const changeHandler = jest.fn()

      page.root.addEventListener('ldchange', changeHandler)
      firstInput.value = '11'
      firstInput.dispatchEvent(new Event('input'))

      expect(page.root.value).toBe('20')
    })

    it('corrects invalid initial values to the closest step value', async () => {
      const page = await newSpecPage({
        components: [LdSlider],
        template: () => <ld-slider step={20} value="100,17,51,84" />,
      })

      expect(page.root.value).toBe('100,20,60,80')
    })

    it('does not correct invalid value changes', async () => {
      const page = await newSpecPage({
        components: [LdSlider],
        template: () => <ld-slider step={20} value="20" />,
      })

      const slider = page.root as HTMLLdSliderElement
      slider.value = '21'

      expect(slider.value).toBe('21')
    })
  })

  describe('stops', () => {
    it('enforces the closest stop', async () => {
      const page = await newSpecPage({
        components: [LdSlider],
        template: () => <ld-slider stops="20" />,
      })
      const firstInput = page.root.shadowRoot.querySelector('input')
      const changeHandler = jest.fn()

      page.root.addEventListener('ldchange', changeHandler)
      firstInput.value = '11'
      firstInput.dispatchEvent(new Event('input'))

      expect(page.root.value).toBe('20')
    })

    it('corrects invalid initial values to the closest stops', async () => {
      const page = await newSpecPage({
        components: [LdSlider],
        template: () => <ld-slider stops="20,60,90" value="100,17,50,94" />,
      })

      expect(page.root.value).toBe('100,20,60,90')
    })

    it('does not correct invalid value changes', async () => {
      const page = await newSpecPage({
        components: [LdSlider],
        template: () => <ld-slider stops="20" value="20" />,
      })

      const slider = page.root as HTMLLdSliderElement
      slider.value = '21'

      expect(slider.value).toBe('21')
    })
  })

  describe('snapping', () => {
    it('snaps to the closest step value', async () => {
      const page = await newSpecPage({
        components: [LdSlider],
        template: () => <ld-slider step={20} snapOffset={2} />,
      })
      const firstInput = page.root.shadowRoot.querySelector('input')
      const changeHandler = jest.fn()

      page.root.addEventListener('ldchange', changeHandler)
      firstInput.value = '38'
      firstInput.dispatchEvent(new Event('input'))

      expect(page.root.value).toBe('40')
    })

    it('does not snap to the closest step value, if outside snap-offset', async () => {
      const page = await newSpecPage({
        components: [LdSlider],
        template: () => <ld-slider step={20} snapOffset={2} />,
      })
      const firstInput = page.root.shadowRoot.querySelector('input')
      const changeHandler = jest.fn()

      page.root.addEventListener('ldchange', changeHandler)
      firstInput.value = '37'
      firstInput.dispatchEvent(new Event('input'))

      expect(page.root.value).toBe('37')
    })

    it('snaps to the closest stop', async () => {
      const page = await newSpecPage({
        components: [LdSlider],
        template: () => <ld-slider stops="20" snapOffset={2} />,
      })
      const firstInput = page.root.shadowRoot.querySelector('input')
      const changeHandler = jest.fn()

      page.root.addEventListener('ldchange', changeHandler)
      firstInput.value = '18'
      firstInput.dispatchEvent(new Event('input'))

      expect(page.root.value).toBe('20')
    })

    it('does not snap to the closest stop, if outside snap-offset', async () => {
      const page = await newSpecPage({
        components: [LdSlider],
        template: () => <ld-slider stops="20" snapOffset={2} />,
      })
      const firstInput = page.root.shadowRoot.querySelector('input')
      const changeHandler = jest.fn()

      page.root.addEventListener('ldchange', changeHandler)
      firstInput.value = '17'
      firstInput.dispatchEvent(new Event('input'))

      expect(page.root.value).toBe('17')
    })

    it('does not change initial values to the closest step value', async () => {
      const page = await newSpecPage({
        components: [LdSlider],
        template: () => <ld-slider step={20} value="21" snapOffset={2} />,
      })

      expect(page.root.value).toBe('21')
    })

    it('does not change initial values to the closest stop', async () => {
      const page = await newSpecPage({
        components: [LdSlider],
        template: () => <ld-slider stops="20" value="21" snapOffset={2} />,
      })

      expect(page.root.value).toBe('21')
    })

    it('does not alter value changes to the closest step value', async () => {
      const page = await newSpecPage({
        components: [LdSlider],
        template: () => <ld-slider step={20} value="20" snapOffset={2} />,
      })
      const slider = page.root as HTMLLdSliderElement
      slider.value = '21'

      expect(slider.value).toBe('21')
    })

    it('does not alter value changes to the closest stop', async () => {
      const page = await newSpecPage({
        components: [LdSlider],
        template: () => <ld-slider stops="20" value="20" snapOffset={2} />,
      })
      const slider = page.root as HTMLLdSliderElement
      slider.value = '21'

      expect(slider.value).toBe('21')
    })
  })

  describe('keyboard usage', () => {
    it('jumps to the next stop', async () => {
      const page = await newSpecPage({
        components: [LdSlider],
        template: () => <ld-slider stops="20,40" value="0" />,
      })
      const input = page.root.shadowRoot.querySelector('input')

      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }))
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }))

      expect(page.root.value).toBe('40')
    })

    it('jumps to the previous stop', async () => {
      const page = await newSpecPage({
        components: [LdSlider],
        template: () => <ld-slider stops="20,40" value="100" />,
      })
      const input = page.root.shadowRoot.querySelector('input')

      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }))
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }))

      expect(page.root.value).toBe('20')
    })

    it('does not snap to the closest step value', async () => {
      const page = await newSpecPage({
        components: [LdSlider],
        template: () => <ld-slider step={20} value="17" snapOffset={2} />,
      })
      const input = page.root.shadowRoot.querySelector('input')

      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }))
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }))

      expect(page.root.value).toBe('19')
    })

    it('does not snap to the closest stop', async () => {
      const page = await newSpecPage({
        components: [LdSlider],
        template: () => <ld-slider stops="20" value="23" snapOffset={2} />,
      })
      const input = page.root.shadowRoot.querySelector('input')

      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }))
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }))

      expect(page.root.value).toBe('21')
    })

    it('does not go below min value, when snap-offset is set', async () => {
      const page = await newSpecPage({
        components: [LdSlider],
        template: () => <ld-slider value="0" snapOffset={2} />,
      })
      const input = page.root.shadowRoot.querySelector('input')

      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }))
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }))

      expect(page.root.value).toBe('0')
    })

    it('does not go above max value, when snap-offset is set', async () => {
      const page = await newSpecPage({
        components: [LdSlider],
        template: () => <ld-slider value="100" snapOffset={2} />,
      })
      const input = page.root.shadowRoot.querySelector('input')

      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }))
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }))

      expect(page.root.value).toBe('100')
    })

    it('does not go below min value, when stops are set', async () => {
      const page = await newSpecPage({
        components: [LdSlider],
        template: () => <ld-slider stops="20" value="0" />,
      })
      const input = page.root.shadowRoot.querySelector('input')

      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }))
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }))

      expect(page.root.value).toBe('0')
    })

    it('does not go above max value, when stops are set', async () => {
      const page = await newSpecPage({
        components: [LdSlider],
        template: () => <ld-slider stops="20" value="100" />,
      })
      const input = page.root.shadowRoot.querySelector('input')

      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }))
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }))

      expect(page.root.value).toBe('100')
    })
  })

  it('allows to set inner focus', async () => {
    const page = await newSpecPage({
      components: [LdSlider],
      template: () => <ld-slider />,
    })
    const slider = page.root as HTMLLdSliderElement
    const input = slider.shadowRoot.querySelector('input')

    input.focus = jest.fn()
    await slider.focusInner()

    expect(input.focus).toHaveBeenCalled()
  })
})
