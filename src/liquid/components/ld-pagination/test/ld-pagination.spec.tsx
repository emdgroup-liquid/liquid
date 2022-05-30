import { h } from '@stencil/core'
import { newSpecPage } from '@stencil/core/testing'
import { LdPagination } from '../ld-pagination'

describe('ld-pagination', () => {
  describe('renders', () => {
    it('default', async () => {
      const page = await newSpecPage({
        components: [LdPagination],
        template: () => <ld-pagination />,
      })
      expect(page.root).toMatchSnapshot()
    })

    it('with custom item label', async () => {
      const page = await newSpecPage({
        components: [LdPagination],
        template: () => <ld-pagination itemLabel="Slide" />,
      })
      expect(page.body).toMatchSnapshot()
    })

    it('with determined length', async () => {
      const page = await newSpecPage({
        components: [LdPagination],
        template: () => <ld-pagination length={15} />,
      })
      expect(page.root).toMatchSnapshot()
    })

    it('with pre-selected index', async () => {
      const page = await newSpecPage({
        components: [LdPagination],
        template: () => <ld-pagination selectedIndex={7} />,
      })
      expect(page.root).toMatchSnapshot()
    })

    it('with custom offset', async () => {
      const page = await newSpecPage({
        components: [LdPagination],
        template: () => <ld-pagination offset={1} />,
      })
      expect(page.root).toMatchSnapshot()
    })

    it('without offset', async () => {
      const page = await newSpecPage({
        components: [LdPagination],
        template: () => (
          <ld-pagination offset={0} selectedIndex={2} length={5} />
        ),
      })
      expect(page.root).toMatchSnapshot()
    })

    it('with different size', async () => {
      const page = await newSpecPage({
        components: [LdPagination],
        template: () => <ld-pagination size="lg" />,
      })
      expect(page.root).toMatchSnapshot()
    })

    it('with sticky items', async () => {
      const page = await newSpecPage({
        components: [LdPagination],
        template: () => <ld-pagination sticky={2} length={15} />,
      })
      expect(page.root).toMatchSnapshot()
    })

    it('with sticky items only on one side', async () => {
      const page = await newSpecPage({
        components: [LdPagination],
        template: () => <ld-pagination sticky={2} />,
      })
      expect(page.root).toMatchSnapshot()
    })

    it('without more-indicators', async () => {
      const page = await newSpecPage({
        components: [LdPagination],
        template: () => <ld-pagination length={5} />,
      })
      expect(page.root).toMatchSnapshot()
    })

    it('with sticky items but without more-indicators', async () => {
      const page = await newSpecPage({
        components: [LdPagination],
        template: () => <ld-pagination sticky={2} length={11} />,
      })
      expect(page.root).toMatchSnapshot()
    })

    it('without slidable elements', async () => {
      const page = await newSpecPage({
        components: [LdPagination],
        template: () => <ld-pagination length={6} sticky={3} />,
      })
      expect(page.root).toMatchSnapshot()
    })

    it('with one item only', async () => {
      const page = await newSpecPage({
        components: [LdPagination],
        template: () => <ld-pagination length={1} />,
      })
      expect(page.root).toMatchSnapshot()
    })

    it('with one sticky item only', async () => {
      const page = await newSpecPage({
        components: [LdPagination],
        template: () => <ld-pagination length={1} sticky={3} />,
      })
      expect(page.root).toMatchSnapshot()
    })

    it('without arrows', async () => {
      const page = await newSpecPage({
        components: [LdPagination],
        template: () => <ld-pagination hidePrevNext hideStartEnd length={15} />,
      })
      expect(page.root).toMatchSnapshot()
    })

    it('with text navigation', async () => {
      const page = await newSpecPage({
        components: [LdPagination],
        template: () => (
          <ld-pagination
            endLabel="Last"
            length={15}
            nextLabel="Next"
            prevLabel="Prev"
            startLabel="First"
          />
        ),
      })
      expect(page.root).toMatchSnapshot()
    })

    it('a buffer of next items and the last items in the slider', async () => {
      const page = await newSpecPage({
        components: [LdPagination],
        template: () => <ld-pagination length={99} />,
      })
      expect(page.root).toMatchSnapshot()
    })

    it('a buffer of previous items and the first items in the slider', async () => {
      const page = await newSpecPage({
        components: [LdPagination],
        template: () => <ld-pagination length={99} selectedIndex={98} />,
      })
      expect(page.root).toMatchSnapshot()
    })

    it('with transition class while transitioning', async () => {
      const page = await newSpecPage({
        components: [LdPagination],
        template: () => <ld-pagination length={99} selectedIndex={98} />,
      })

      page.root.shadowRoot
        .querySelector<HTMLLIElement>('.ld-pagination__slide-wrapper')
        .dispatchEvent(new Event('transitionstart'))
      await page.waitForChanges()

      expect(page.root).toMatchSnapshot()
    })

    it('without transition class after transitioning', async () => {
      const page = await newSpecPage({
        components: [LdPagination],
        template: () => <ld-pagination length={99} selectedIndex={98} />,
      })

      page.root.shadowRoot
        .querySelector<HTMLLIElement>('.ld-pagination__slide-wrapper')
        .dispatchEvent(new Event('transitionstart'))
      page.root.shadowRoot
        .querySelector<HTMLLIElement>('.ld-pagination__slide-wrapper')
        .dispatchEvent(new Event('transitionend'))
      await page.waitForChanges()

      expect(page.root).toMatchSnapshot()
    })

    it('with dots mode', async () => {
      const page = await newSpecPage({
        components: [LdPagination],
        template: () => (
          <ld-pagination
            mode="dots"
            hidePrevNext
            hideStartEnd
            selectedIndex={3}
            length={7}
          />
        ),
      })
      expect(page.root).toMatchSnapshot()
    })

    it('with dots mode on brand color', async () => {
      const page = await newSpecPage({
        components: [LdPagination],
        template: () => (
          <ld-pagination mode="dots" brandColor selectedIndex={3} length={7} />
        ),
      })
      expect(page.root).toMatchSnapshot()
    })

    it('with default mode on brand color', async () => {
      const page = await newSpecPage({
        components: [LdPagination],
        template: () => (
          <ld-pagination brandColor selectedIndex={3} length={7} />
        ),
      })
      expect(page.root).toMatchSnapshot()
    })

    it('with dots mode small space', async () => {
      const page = await newSpecPage({
        components: [LdPagination],
        template: () => (
          <ld-pagination
            mode="dots"
            space="0.5rem"
            selectedIndex={3}
            length={7}
          />
        ),
      })
      expect(page.root).toMatchSnapshot()
    })

    it('with dots mode big space', async () => {
      const page = await newSpecPage({
        components: [LdPagination],
        template: () => (
          <ld-pagination
            mode="dots"
            space="1.5rem"
            selectedIndex={3}
            length={7}
          />
        ),
      })
      expect(page.root).toMatchSnapshot()
    })
  })

  describe('renders with more-indicators', () => {
    it('hidden at the start before sliding begins', async () => {
      const page = await newSpecPage({
        components: [LdPagination],
        template: () => <ld-pagination selectedIndex={3} length={15} />,
      })
      expect(page.root).toMatchSnapshot()
    })

    it('shown at the start after sliding once', async () => {
      const page = await newSpecPage({
        components: [LdPagination],
        template: () => <ld-pagination selectedIndex={4} length={15} />,
      })
      expect(page.root).toMatchSnapshot()
    })

    it('shown at the end on penultimate sliding position', async () => {
      const page = await newSpecPage({
        components: [LdPagination],
        template: () => <ld-pagination selectedIndex={10} length={15} />,
      })
      expect(page.root).toMatchSnapshot()
    })

    it('hidden at the end on last sliding position', async () => {
      const page = await newSpecPage({
        components: [LdPagination],
        template: () => <ld-pagination selectedIndex={11} length={15} />,
      })
      expect(page.root).toMatchSnapshot()
    })

    it('hidden at the start before sliding begins (with sticky items)', async () => {
      const page = await newSpecPage({
        components: [LdPagination],
        template: () => (
          <ld-pagination sticky={2} selectedIndex={5} length={15} />
        ),
      })
      expect(page.root).toMatchSnapshot()
    })

    it('shown at the start after sliding once (with sticky items)', async () => {
      const page = await newSpecPage({
        components: [LdPagination],
        template: () => (
          <ld-pagination sticky={2} selectedIndex={6} length={15} />
        ),
      })
      expect(page.root).toMatchSnapshot()
    })

    it('shown at the end on penultimate sliding position (with sticky items)', async () => {
      const page = await newSpecPage({
        components: [LdPagination],
        template: () => (
          <ld-pagination sticky={2} selectedIndex={8} length={15} />
        ),
      })
      expect(page.root).toMatchSnapshot()
    })

    it('hidden at the end on last sliding position (with sticky items)', async () => {
      const page = await newSpecPage({
        components: [LdPagination],
        template: () => (
          <ld-pagination sticky={2} selectedIndex={9} length={15} />
        ),
      })
      expect(page.root).toMatchSnapshot()
    })
  })

  it('re-renders on item selection', async () => {
    const page = await newSpecPage({
      components: [LdPagination],
      template: () => <ld-pagination length={7} />,
    })
    const changeHandler = jest.fn()

    page.root.addEventListener('ldchange', changeHandler)
    // :nth-child(4) = item no 2, because of the marker at index 1
    const item = page.root.shadowRoot.querySelector<HTMLLdButtonElement>(
      'li:nth-child(4) > ld-button'
    )
    item.click()

    expect(page.root).toMatchSnapshot()
  })

  it('corrects initial length < 1', async () => {
    const page = await newSpecPage({
      components: [LdPagination],
      template: () => <ld-pagination length={0} />,
    })
    const ldPagination = page.root as HTMLLdPaginationElement
    expect(ldPagination.length).toBe(1)
  })

  it('corrects initially selected index >= length', async () => {
    const page = await newSpecPage({
      components: [LdPagination],
      template: () => <ld-pagination length={7} selectedIndex={7} />,
    })
    const ldPagination = page.root as HTMLLdPaginationElement
    expect(ldPagination.selectedIndex).toBe(6)
  })

  it('corrects initially selected index < 0', async () => {
    const page = await newSpecPage({
      components: [LdPagination],
      template: () => <ld-pagination length={7} selectedIndex={-1} />,
    })
    const ldPagination = page.root as HTMLLdPaginationElement
    expect(ldPagination.selectedIndex).toBe(0)
  })

  it('corrects changed length < 1', async () => {
    const page = await newSpecPage({
      components: [LdPagination],
      template: () => <ld-pagination length={7} />,
    })
    const ldPagination = page.root as HTMLLdPaginationElement

    ldPagination.length = 0
    expect(ldPagination.length).toBe(1)
  })

  it('corrects changed selected index >= length', async () => {
    const page = await newSpecPage({
      components: [LdPagination],
      template: () => <ld-pagination length={7} />,
    })
    const ldPagination = page.root as HTMLLdPaginationElement

    ldPagination.selectedIndex = 7
    expect(ldPagination.selectedIndex).toBe(6)
  })

  it('corrects changed selected index < 0', async () => {
    const page = await newSpecPage({
      components: [LdPagination],
      template: () => <ld-pagination length={7} />,
    })
    const ldPagination = page.root as HTMLLdPaginationElement

    ldPagination.selectedIndex = -1
    expect(ldPagination.selectedIndex).toBe(0)
  })

  it('emits custom event', async () => {
    const page = await newSpecPage({
      components: [LdPagination],
      template: () => <ld-pagination length={7} />,
    })
    const changeHandler = jest.fn()

    page.root.addEventListener('ldchange', changeHandler)
    // :nth-child(4) = item no 2, because of the marker at index 1
    const item = page.root.shadowRoot.querySelector<HTMLLdButtonElement>(
      'li:nth-child(4) > ld-button'
    )
    item.click()

    expect(changeHandler).toHaveBeenCalledWith(
      expect.objectContaining({ detail: 2 })
    )
  })

  it('emits custom event only once when correcting changed selected index', async () => {
    const page = await newSpecPage({
      components: [LdPagination],
      template: () => <ld-pagination length={7} />,
    })
    const changeHandler = jest.fn()
    const ldPagination = page.root as HTMLLdPaginationElement

    ldPagination.addEventListener('ldchange', changeHandler)
    ldPagination.selectedIndex = -1

    expect(changeHandler).toHaveBeenCalledTimes(1)
    expect(changeHandler).toHaveBeenCalledWith(
      expect.objectContaining({ detail: 0 })
    )
  })
})
