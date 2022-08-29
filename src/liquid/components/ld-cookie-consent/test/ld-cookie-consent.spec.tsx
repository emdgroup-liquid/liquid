import Cookies from 'js-cookie'

Cookies.get = jest.fn().mockImplementation(() => ({
  'some-cookie': true,
  foo: true,
  bar: true,
  'some-other-cookie': true,
}))

Cookies.remove = jest.fn().mockImplementation(jest.fn())

import { h } from '@stencil/core'
import { newSpecPage, SpecPage } from '@stencil/core/testing'
import { LdCookieConsent } from '../ld-cookie-consent'
import '../../../utils/localStorage'
import { LdModal } from '../../ld-modal/ld-modal'
import { LdToggle } from '../../ld-toggle/ld-toggle'
import '../../../utils/mutationObserver'

const categories = [
  {
    details: {
      description: 'Necessary description.',
    },
    title: 'Necessary',
    toggle: {
      disabled: true,
      checked: true,
      value: 'necessary',
    },
  },
  {
    details: {
      description: 'Functional description.',
    },
    title: 'Functional',
    toggle: {
      disabled: false,
      checked: true,
      value: 'functional',
    },
  },
  {
    details: {
      description: 'Targeting description.',
    },
    title: 'Targeting',
    toggle: {
      disabled: false,
      checked: false,
      value: 'targeting',
    },
  },
]

async function acceptInDisclaimer(page: SpecPage, acceptType: 'all' | 'none') {
  const prefsModal = getPrefsModal(page)
  const disclaimer = getDisclaimer(page)

  const ldCookieConsent = getLdCookieConsent(page)
  const btnAccept =
    ldCookieConsent.shadowRoot.querySelector<HTMLLdButtonElement>(
      `[part="disclaimer-button-accept-${acceptType}"]`
    )
  btnAccept.click()
  await page.waitForChanges()

  expect(prefsModal?.open).toBeFalsy()
  expect(disclaimer).not.toHaveClass('ld-cookie-consent__disclaimer--visible')
}

async function acceptInPrefs(
  page: SpecPage,
  acceptType: 'selected' | 'all' | 'none'
) {
  const prefsModal = getPrefsModal(page)
  const disclaimer = getDisclaimer(page)

  const ldCookieConsent = getLdCookieConsent(page)
  const consentSaveHandler = jest.fn()
  ldCookieConsent.addEventListener('ldCookieConsentSave', consentSaveHandler)

  const btnAccept =
    ldCookieConsent.shadowRoot.querySelector<HTMLLdButtonElement>(
      `[part="preferences-button-accept-${acceptType}"]`
    )
  btnAccept.click()
  await page.waitForChanges()

  expect(consentSaveHandler).toHaveBeenCalled()

  expect(prefsModal.open).toBe(false)
  expect(disclaimer).not.toHaveClass('ld-cookie-consent__disclaimer--visible')
}

async function dismissDisclaimer(page: SpecPage) {
  const prefsModal = getPrefsModal(page)
  const disclaimer = getDisclaimer(page)

  const ldCookieConsent = getLdCookieConsent(page)
  const btnDismiss =
    ldCookieConsent.shadowRoot.querySelector<HTMLLdButtonElement>(
      `[part="disclaimer-button-dismiss"]`
    )
  btnDismiss.click()
  await page.waitForChanges()

  expect(prefsModal?.open).toBeFalsy()
  expect(disclaimer).not.toHaveClass('ld-cookie-consent__disclaimer--visible')
}

function getDisclaimer(page: SpecPage) {
  const ldCookieConsent = getLdCookieConsent(page)
  return ldCookieConsent.shadowRoot.querySelector<HTMLElement>(
    '[part="disclaimer"]'
  )
}

function getLdCookieConsent(page: SpecPage) {
  return page.body.querySelector('ld-cookie-consent')
}

function getPrefsModal(page) {
  const ldModal = page.body
    .querySelector('ld-cookie-consent')
    ?.shadowRoot.querySelector('ld-modal')
  if (!ldModal) return null
  const dialog = ldModal.shadowRoot.querySelector('dialog')
  dialog['close'] = jest.fn()
  dialog['showModal'] = jest.fn()
  return ldModal
}

function getScripts() {
  return (
    <div>
      <script
        type="text/plain"
        data-ld-cookie-category="necessary"
        src="necessary.js"
      ></script>
      <script
        type="text/plain"
        data-ld-cookie-category="functional"
        src="functional.js"
        async
      ></script>
      <script
        type="text/plain"
        data-ld-cookie-category="targeting"
        src="targeting.js"
        async
      ></script>
    </div>
  )
}

async function openPrefs(page: SpecPage) {
  const disclaimer = getDisclaimer(page)
  const prefsModal = getPrefsModal(page)

  const ldCookieConsent = getLdCookieConsent(page)
  const prefsShowHandler = jest.fn()
  ldCookieConsent.addEventListener(
    'ldCookieConsentPreferencesShow',
    prefsShowHandler
  )

  if (
    !disclaimer.classList.contains('ld-cookie-consent__disclaimer--visible')
  ) {
    const ldCookieConsent = getLdCookieConsent(page)
    await ldCookieConsent.showDisclaimer()
  }
  await page.waitForChanges()

  expect(disclaimer).toHaveClass('ld-cookie-consent__disclaimer--visible')

  const btnPrefs = disclaimer.querySelector<HTMLButtonElement>(
    '[part="disclaimer-button-preferences"]'
  )
  btnPrefs.click()
  await page.waitForChanges()

  expect(prefsModal.open).toBe(true)
  expect(prefsShowHandler).toHaveBeenCalled()
}

function getToggles(page) {
  const prefsModal = getPrefsModal(page)
  return prefsModal.querySelectorAll('ld-toggle')
}

async function transitionEnd(page) {
  const disclaimer = getDisclaimer(page)
  const transitionEndHandler = disclaimer['__listeners'].find(
    (l) => l.type === 'transitionEnd'
  ).handler
  transitionEndHandler.call(disclaimer, { target: disclaimer })
  await page.waitForChanges()
}

describe('ld-cookie-consent', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    global.localStorage.clear()
  })

  describe('settings', () => {
    it('parses settings string', async () => {
      const page = await newSpecPage({
        components: [LdCookieConsent],
        template: () => (
          <ld-cookie-consent
            settings='{
              "mode": "notice-only",
              "privacyStatementURL": "legal/privacy/",
              "showOnLoadDelay": 0
            }'
          />
        ),
      })
      const ldCookieConsent = getLdCookieConsent(page)
      const disclaimer = ldCookieConsent.shadowRoot.querySelector(
        '[part="disclaimer"]'
      )
      await page.waitForChanges()

      expect(disclaimer).toHaveClass('ld-cookie-consent__disclaimer--visible')
    })
  })

  describe('show on load', () => {
    it('shows up on load with default delay', async () => {
      const page = await newSpecPage({
        components: [LdCookieConsent],
        template: () => (
          <ld-cookie-consent
            settings={{
              mode: 'notice-only',
              privacyStatementURL: '#',
            }}
          />
        ),
      })
      const disclaimer = getDisclaimer(page)

      const ldCookieConsent = getLdCookieConsent(page)
      const disclaimerShowHandler = jest.fn()
      ldCookieConsent.addEventListener(
        'ldCookieConsentDisclaimerShow',
        disclaimerShowHandler
      )

      jest.advanceTimersByTime(0)
      await page.waitForChanges()

      expect(disclaimer).not.toHaveClass(
        'ld-cookie-consent__disclaimer--visible'
      )

      jest.advanceTimersByTime(1000)
      await page.waitForChanges()

      expect(disclaimer).toHaveClass('ld-cookie-consent__disclaimer--visible')

      disclaimer.focus = jest.fn()
      await transitionEnd(page)

      expect(disclaimer.focus).toHaveBeenCalledTimes(1)
      expect(disclaimerShowHandler).toHaveBeenCalledTimes(1)
    })

    it('shows up on load without delay', async () => {
      const page = await newSpecPage({
        components: [LdCookieConsent],
        template: () => (
          <ld-cookie-consent
            settings={{
              mode: 'notice-only',
              privacyStatementURL: '#',
              showOnLoadDelay: 0,
            }}
          />
        ),
      })
      const ldCookieConsent = getLdCookieConsent(page)
      const disclaimer = ldCookieConsent.shadowRoot.querySelector(
        '[part="disclaimer"]'
      )
      await page.waitForChanges()

      expect(disclaimer).toHaveClass('ld-cookie-consent__disclaimer--visible')
    })

    it('does not show up on load if consent has already been given', async () => {
      global.localStorage.setItem(
        'ld-cookie-consent',
        JSON.stringify({
          acceptedCategories: [],
          consentDate: new Date().toISOString(),
          rejectedCategories: [],
          revision: 0,
        })
      )

      const consentLoadHandler = jest.fn()
      const page = await newSpecPage({
        components: [LdCookieConsent],
        template: () => (
          <ld-cookie-consent
            onLdCookieSavedConsentLoad={consentLoadHandler}
            settings={{
              mode: 'notice-only',
              privacyStatementURL: '#',
              showOnLoadDelay: 0,
            }}
          />
        ),
      })

      const ldCookieConsent = getLdCookieConsent(page)
      const disclaimer = ldCookieConsent.shadowRoot.querySelector(
        '[part="disclaimer"]'
      )
      await page.waitForChanges()

      expect(disclaimer).not.toHaveClass(
        'ld-cookie-consent__disclaimer--visible'
      )

      await page.waitForChanges()
      expect(consentLoadHandler).toHaveBeenCalled()
    })

    it('shows up if consent has expired', async () => {
      global.localStorage.setItem(
        'ld-cookie-consent',
        JSON.stringify({
          acceptedCategories: [],
          consentDate: new Date().toISOString(),
          rejectedCategories: [],
          revision: 0,
        })
      )

      const page = await newSpecPage({
        components: [LdCookieConsent],
        template: () => (
          <ld-cookie-consent
            settings={{
              mode: 'notice-only',
              privacyStatementURL: '#',
              revision: 1,
              showOnLoadDelay: 0,
            }}
          />
        ),
      })
      const ldCookieConsent = getLdCookieConsent(page)
      const disclaimer = ldCookieConsent.shadowRoot.querySelector(
        '[part="disclaimer"]'
      )
      await page.waitForChanges()

      expect(disclaimer).toHaveClass('ld-cookie-consent__disclaimer--visible')
    })

    it('does not show up if revision is the same', async () => {
      global.localStorage.setItem(
        'ld-cookie-consent',
        JSON.stringify({
          acceptedCategories: [],
          consentDate: new Date().toISOString(),
          rejectedCategories: [],
          revision: 1,
        })
      )

      const page = await newSpecPage({
        components: [LdCookieConsent],
        template: () => (
          <ld-cookie-consent
            settings={{
              mode: 'notice-only',
              privacyStatementURL: '#',
              revision: 1,
              showOnLoadDelay: 0,
            }}
          />
        ),
      })
      const ldCookieConsent = getLdCookieConsent(page)
      const disclaimer = ldCookieConsent.shadowRoot.querySelector(
        '[part="disclaimer"]'
      )
      await page.waitForChanges()

      expect(disclaimer).not.toHaveClass(
        'ld-cookie-consent__disclaimer--visible'
      )
    })
  })

  describe('accepted and rejected categories', () => {
    it('returns preselected as accepted in notice-only mode', async () => {
      const page = await newSpecPage({
        components: [LdCookieConsent],
        template: () => (
          <ld-cookie-consent
            settings={{
              categories,
              mode: 'notice-only',
              privacyStatementURL: '#',
            }}
          />
        ),
      })
      const ldCookieConsent = getLdCookieConsent(page)
      await page.waitForChanges()

      const acceptedAndRejected =
        await ldCookieConsent.getAcceptedAndRejectedCategories()
      const accepted = acceptedAndRejected.acceptedCategories
      const rejected = acceptedAndRejected.rejectedCategories
      expect(accepted.has('necessary')).toEqual(true)
      expect(accepted.has('functional')).toEqual(true)
      expect(accepted.has('targeting')).toEqual(false)
      expect(rejected.has('necessary')).toEqual(false)
      expect(rejected.has('functional')).toEqual(false)
      expect(rejected.has('targeting')).toEqual(true)

      expect(await ldCookieConsent.isCategoryAccepted('necessary')).toEqual(
        true
      )
      expect(await ldCookieConsent.isCategoryAccepted('functional')).toEqual(
        true
      )
      expect(await ldCookieConsent.isCategoryAccepted('targeting')).toEqual(
        false
      )
    })

    it('returns preselected as accepted in opt-out mode', async () => {
      const page = await newSpecPage({
        components: [LdCookieConsent],
        template: () => (
          <ld-cookie-consent
            settings={{
              categories,
              mode: 'opt-out',
              privacyStatementURL: '#',
            }}
          />
        ),
      })
      const ldCookieConsent = getLdCookieConsent(page)
      await page.waitForChanges()

      const acceptedAndRejected =
        await ldCookieConsent.getAcceptedAndRejectedCategories()
      const accepted = acceptedAndRejected.acceptedCategories
      const rejected = acceptedAndRejected.rejectedCategories
      expect(accepted.has('necessary')).toEqual(true)
      expect(accepted.has('functional')).toEqual(true)
      expect(accepted.has('targeting')).toEqual(false)
      expect(rejected.has('necessary')).toEqual(false)
      expect(rejected.has('functional')).toEqual(false)
      expect(rejected.has('targeting')).toEqual(true)

      expect(await ldCookieConsent.isCategoryAccepted('necessary')).toEqual(
        true
      )
      expect(await ldCookieConsent.isCategoryAccepted('functional')).toEqual(
        true
      )
      expect(await ldCookieConsent.isCategoryAccepted('targeting')).toEqual(
        false
      )
    })

    it('returns saved accepted in opt-out mode', async () => {
      global.localStorage.setItem(
        'ld-cookie-consent',
        JSON.stringify({
          acceptedCategories: ['necessary'],
          consentDate: new Date().toISOString(),
          rejectedCategories: ['functional', 'targeting'],
          revision: 0,
        })
      )

      const page = await newSpecPage({
        components: [LdCookieConsent],
        template: () => (
          <ld-cookie-consent
            settings={{
              categories,
              mode: 'opt-out',
              privacyStatementURL: '#',
            }}
          />
        ),
      })
      const ldCookieConsent = getLdCookieConsent(page)
      await page.waitForChanges()

      const acceptedAndRejected =
        await ldCookieConsent.getAcceptedAndRejectedCategories()
      const accepted = acceptedAndRejected.acceptedCategories
      const rejected = acceptedAndRejected.rejectedCategories
      expect(accepted.has('necessary')).toEqual(true)
      expect(accepted.has('functional')).toEqual(false)
      expect(accepted.has('targeting')).toEqual(false)
      expect(rejected.has('necessary')).toEqual(false)
      expect(rejected.has('functional')).toEqual(true)
      expect(rejected.has('targeting')).toEqual(true)

      expect(await ldCookieConsent.isCategoryAccepted('necessary')).toEqual(
        true
      )
      expect(await ldCookieConsent.isCategoryAccepted('functional')).toEqual(
        false
      )
      expect(await ldCookieConsent.isCategoryAccepted('targeting')).toEqual(
        false
      )
    })

    it('returns preselected in opt-out mode if consent has expired', async () => {
      global.localStorage.setItem(
        'ld-cookie-consent',
        JSON.stringify({
          acceptedCategories: ['necessary'],
          consentDate: new Date().toISOString(),
          rejectedCategories: ['functional', 'targeting'],
          revision: 0,
        })
      )

      const page = await newSpecPage({
        components: [LdCookieConsent],
        template: () => (
          <ld-cookie-consent
            settings={{
              categories,
              mode: 'opt-out',
              privacyStatementURL: '#',
              revision: 1,
            }}
          />
        ),
      })
      const ldCookieConsent = getLdCookieConsent(page)
      await page.waitForChanges()

      const acceptedAndRejected =
        await ldCookieConsent.getAcceptedAndRejectedCategories()
      const accepted = acceptedAndRejected.acceptedCategories
      const rejected = acceptedAndRejected.rejectedCategories
      expect(accepted.has('necessary')).toEqual(true)
      expect(accepted.has('functional')).toEqual(true)
      expect(accepted.has('targeting')).toEqual(false)
      expect(rejected.has('necessary')).toEqual(false)
      expect(rejected.has('functional')).toEqual(false)
      expect(rejected.has('targeting')).toEqual(true)

      expect(await ldCookieConsent.isCategoryAccepted('necessary')).toEqual(
        true
      )
      expect(await ldCookieConsent.isCategoryAccepted('functional')).toEqual(
        true
      )
      expect(await ldCookieConsent.isCategoryAccepted('targeting')).toEqual(
        false
      )
    })

    it('returns none in opt-in mode', async () => {
      const page = await newSpecPage({
        components: [LdCookieConsent],
        template: () => (
          <ld-cookie-consent
            settings={{
              categories,
              mode: 'opt-in',
              privacyStatementURL: '#',
            }}
          />
        ),
      })
      const ldCookieConsent = getLdCookieConsent(page)
      await page.waitForChanges()

      const acceptedAndRejected =
        await ldCookieConsent.getAcceptedAndRejectedCategories()
      const accepted = acceptedAndRejected.acceptedCategories
      const rejected = acceptedAndRejected.rejectedCategories
      expect(accepted.has('necessary')).toEqual(false)
      expect(accepted.has('functional')).toEqual(false)
      expect(accepted.has('targeting')).toEqual(false)
      expect(rejected.has('necessary')).toEqual(true)
      expect(rejected.has('functional')).toEqual(true)
      expect(rejected.has('targeting')).toEqual(true)

      expect(await ldCookieConsent.isCategoryAccepted('necessary')).toEqual(
        false
      )
      expect(await ldCookieConsent.isCategoryAccepted('functional')).toEqual(
        false
      )
      expect(await ldCookieConsent.isCategoryAccepted('targeting')).toEqual(
        false
      )
    })

    it('returns saved accepted in opt-in mode', async () => {
      global.localStorage.setItem(
        'ld-cookie-consent',
        JSON.stringify({
          acceptedCategories: ['necessary'],
          consentDate: new Date().toISOString(),
          rejectedCategories: ['functional', 'targeting'],
          revision: 0,
        })
      )

      const page = await newSpecPage({
        components: [LdCookieConsent],
        template: () => (
          <ld-cookie-consent
            settings={{
              categories,
              mode: 'opt-in',
              privacyStatementURL: '#',
            }}
          />
        ),
      })
      const ldCookieConsent = getLdCookieConsent(page)
      await page.waitForChanges()

      const acceptedAndRejected =
        await ldCookieConsent.getAcceptedAndRejectedCategories()
      const accepted = acceptedAndRejected.acceptedCategories
      const rejected = acceptedAndRejected.rejectedCategories
      expect(accepted.has('necessary')).toEqual(true)
      expect(accepted.has('functional')).toEqual(false)
      expect(accepted.has('targeting')).toEqual(false)
      expect(rejected.has('necessary')).toEqual(false)
      expect(rejected.has('functional')).toEqual(true)
      expect(rejected.has('targeting')).toEqual(true)

      expect(await ldCookieConsent.isCategoryAccepted('necessary')).toEqual(
        true
      )
      expect(await ldCookieConsent.isCategoryAccepted('functional')).toEqual(
        false
      )
      expect(await ldCookieConsent.isCategoryAccepted('targeting')).toEqual(
        false
      )
    })

    it('returns none in opt-out mode if consent has expired', async () => {
      global.localStorage.setItem(
        'ld-cookie-consent',
        JSON.stringify({
          acceptedCategories: ['necessary'],
          consentDate: new Date().toISOString(),
          rejectedCategories: ['functional', 'targeting'],
          revision: 0,
        })
      )

      const page = await newSpecPage({
        components: [LdCookieConsent],
        template: () => (
          <ld-cookie-consent
            settings={{
              categories,
              mode: 'opt-in',
              privacyStatementURL: '#',
              revision: 1,
            }}
          />
        ),
      })
      const ldCookieConsent = getLdCookieConsent(page)
      await page.waitForChanges()

      const acceptedAndRejected =
        await ldCookieConsent.getAcceptedAndRejectedCategories()
      const accepted = acceptedAndRejected.acceptedCategories
      const rejected = acceptedAndRejected.rejectedCategories
      expect(accepted.has('necessary')).toEqual(false)
      expect(accepted.has('functional')).toEqual(false)
      expect(accepted.has('targeting')).toEqual(false)
      expect(rejected.has('necessary')).toEqual(true)
      expect(rejected.has('functional')).toEqual(true)
      expect(rejected.has('targeting')).toEqual(true)

      expect(await ldCookieConsent.isCategoryAccepted('necessary')).toEqual(
        false
      )
      expect(await ldCookieConsent.isCategoryAccepted('functional')).toEqual(
        false
      )
      expect(await ldCookieConsent.isCategoryAccepted('targeting')).toEqual(
        false
      )
    })
  })

  describe('loading scripts conditionally', () => {
    it('loads dormant scripts for selected categories', async () => {
      const page = await newSpecPage({
        components: [LdCookieConsent, LdModal],
        template: () => (
          <div>
            {getScripts()}
            <ld-cookie-consent
              settings={{
                categories,
                mode: 'opt-in',
                privacyStatementURL: '#',
                showOnLoadDelay: 0,
              }}
            />
          </div>
        ),
      })
      const scripts = page.body.querySelectorAll('script')
      await page.waitForChanges()

      expect(scripts[0].getAttribute('type')).toEqual('text/plain')
      expect(scripts[1].getAttribute('type')).toEqual('text/plain')
      expect(scripts[2].getAttribute('type')).toEqual('text/plain')

      const ldCookieConsent = getLdCookieConsent(page)
      const activateScriptsHandler = jest.fn()
      ldCookieConsent.addEventListener(
        'ldCookieConsentActivateScripts',
        activateScriptsHandler
      )

      await openPrefs(page)
      await acceptInPrefs(page, 'selected')
      const freshScripts = page.body.querySelectorAll('script')

      expect(freshScripts[0].getAttribute('type')).toBeNull()
      freshScripts[0].onload.apply(null) // because not async

      expect(freshScripts[1].getAttribute('type')).toBeNull()
      expect(freshScripts[2].getAttribute('type')).toEqual('text/plain')
      expect(activateScriptsHandler).toHaveBeenCalledTimes(1)
    })

    it('loads dormant scripts for all categories', async () => {
      const page = await newSpecPage({
        components: [LdCookieConsent, LdModal],
        template: () => (
          <div>
            {getScripts()}
            <ld-cookie-consent
              settings={{
                categories,
                mode: 'opt-in',
                privacyStatementURL: '#',
                showOnLoadDelay: 0,
              }}
            />
          </div>
        ),
      })
      const scripts = page.body.querySelectorAll('script')
      await page.waitForChanges()

      expect(scripts[0].getAttribute('type')).toEqual('text/plain')
      expect(scripts[1].getAttribute('type')).toEqual('text/plain')
      expect(scripts[2].getAttribute('type')).toEqual('text/plain')

      await openPrefs(page)
      await acceptInPrefs(page, 'all')

      const freshScripts = page.body.querySelectorAll('script')

      expect(freshScripts[0].getAttribute('type')).toBeNull()
      freshScripts[0].onload.apply(null) // because not async

      expect(freshScripts[1].getAttribute('type')).toBeNull()
      expect(freshScripts[2].getAttribute('type')).toBeNull()
    })

    it('loads dormant scripts for all categories via disclaimer', async () => {
      const page = await newSpecPage({
        components: [LdCookieConsent, LdModal],
        template: () => (
          <div>
            {getScripts()}
            <ld-cookie-consent
              settings={{
                categories,
                mode: 'opt-in',
                privacyStatementURL: '#',
                showOnLoadDelay: 0,
              }}
            />
          </div>
        ),
      })
      const scripts = page.body.querySelectorAll('script')
      await page.waitForChanges()

      expect(scripts[0].getAttribute('type')).toEqual('text/plain')
      expect(scripts[1].getAttribute('type')).toEqual('text/plain')
      expect(scripts[2].getAttribute('type')).toEqual('text/plain')

      await acceptInDisclaimer(page, 'all')

      const freshScripts = page.body.querySelectorAll('script')

      expect(freshScripts[0].getAttribute('type')).toBeNull()
      freshScripts[0].onload.apply(null) // because not async

      expect(freshScripts[1].getAttribute('type')).toBeNull()
      expect(freshScripts[2].getAttribute('type')).toBeNull()
    })

    it('does not load dormant scripts when all categories have been rejected', async () => {
      const page = await newSpecPage({
        components: [LdCookieConsent, LdModal],
        template: () => (
          <div>
            {getScripts()}
            <ld-cookie-consent
              settings={{
                categories,
                mode: 'opt-in',
                privacyStatementURL: '#',
                showOnLoadDelay: 0,
              }}
            />
          </div>
        ),
      })
      const scripts = page.body.querySelectorAll('script')
      await page.waitForChanges()

      expect(scripts[0].getAttribute('type')).toEqual('text/plain')
      expect(scripts[1].getAttribute('type')).toEqual('text/plain')
      expect(scripts[2].getAttribute('type')).toEqual('text/plain')

      await openPrefs(page)
      await acceptInPrefs(page, 'none')

      const freshScripts = page.body.querySelectorAll('script')

      expect(freshScripts[0].getAttribute('type')).toEqual('text/plain')
      expect(freshScripts[1].getAttribute('type')).toEqual('text/plain')
      expect(freshScripts[2].getAttribute('type')).toEqual('text/plain')
    })
  })

  describe('clearing cookies automatically', () => {
    it('clears cookies in opt-out mode', async () => {
      const categoriesWithAutoclear = [...categories]
      categoriesWithAutoclear[0]['autoclear'] = [
        {
          name: 'foo',
          domain: 'example.com',
          path: '/',
        },
        {
          name: 'bar',
        },
      ]

      const page = await newSpecPage({
        components: [LdCookieConsent, LdModal],
        template: () => (
          <ld-cookie-consent
            settings={{
              categories: categoriesWithAutoclear,
              mode: 'opt-out',
              privacyStatementURL: '#',
              showOnLoadDelay: 0,
            }}
          />
        ),
      })
      await page.waitForChanges()

      const ldCookieConsent = getLdCookieConsent(page)
      const autoclearHandler = jest.fn()
      ldCookieConsent.addEventListener(
        'ldCookieConsentAutoclearCookies',
        autoclearHandler
      )

      await openPrefs(page)
      await acceptInPrefs(page, 'none')

      expect(Cookies.remove).toHaveBeenCalledTimes(2)
      expect(autoclearHandler).toHaveBeenCalledTimes(1)
    })
  })

  describe('cookie details', () => {
    it('shows a table', async () => {
      const categoriesWithTable = [...categories]
      categoriesWithTable[2].details['cookieTable'] = {
        headers: ['Name', 'Provider', 'Description', 'Lifespan'],
        rows: [
          ['foo', 'The Foo', 'Used to distinguish unique users...', '2 years'],
          [
            'bar',
            'The Bar',
            'Used to throttle the request rate...',
            '1 minute',
          ],
        ],
      }

      const page = await newSpecPage({
        components: [LdCookieConsent, LdModal],
        template: () => (
          <ld-cookie-consent
            settings={{
              categories: categoriesWithTable,
              mode: 'opt-out',
              privacyStatementURL: '#',
              showOnLoadDelay: 0,
            }}
          />
        ),
      })
      await page.waitForChanges()
      await openPrefs(page)

      const prefsModal = getPrefsModal(page)
      const table = prefsModal.querySelector(
        '[part="preferences-category-table"]'
      )

      expect(table).toMatchSnapshot()
    })
  })

  describe('toggling cookie categories', () => {
    it('toggles without saving', async () => {
      const page = await newSpecPage({
        components: [LdCookieConsent, LdModal, LdToggle],
        template: () => (
          <div>
            {getScripts()}
            <ld-cookie-consent
              settings={{
                categories,
                mode: 'opt-out',
                privacyStatementURL: '#',
                showOnLoadDelay: 0,
              }}
            />
          </div>
        ),
      })
      await page.waitForChanges()

      await openPrefs(page)

      const ldCookieConsent = getLdCookieConsent(page)
      let acceptedAndRejected =
        await ldCookieConsent.getAcceptedAndRejectedCategories()
      let accepted = acceptedAndRejected.acceptedCategories
      let rejected = acceptedAndRejected.rejectedCategories
      expect(accepted.has('functional')).toEqual(true)
      expect(rejected.has('functional')).toEqual(false)

      const toggles = getToggles(page)

      expect(toggles[1].checked).toBeTruthy()

      toggles[1].click()
      await page.waitForChanges()

      expect(toggles[1].checked).toBeFalsy()

      acceptedAndRejected =
        await ldCookieConsent.getAcceptedAndRejectedCategories()
      accepted = acceptedAndRejected.acceptedCategories
      rejected = acceptedAndRejected.rejectedCategories

      expect(accepted.has('functional')).toEqual(true)
      expect(rejected.has('functional')).toEqual(false)
    })

    it('allows rejecting and re-selecting disabled categories', async () => {
      const page = await newSpecPage({
        components: [LdCookieConsent, LdModal, LdToggle],
        template: () => (
          <div>
            {getScripts()}
            <ld-cookie-consent
              settings={{
                categories,
                mode: 'opt-in',
                privacyStatementURL: '#',
                showOnLoadDelay: 0,
              }}
            />
          </div>
        ),
      })
      await page.waitForChanges()

      await openPrefs(page)
      await acceptInPrefs(page, 'none')

      const ldCookieConsent = getLdCookieConsent(page)
      let acceptedAndRejected =
        await ldCookieConsent.getAcceptedAndRejectedCategories()
      let accepted = acceptedAndRejected.acceptedCategories
      let rejected = acceptedAndRejected.rejectedCategories
      expect(accepted.has('necessary')).toEqual(false)
      expect(rejected.has('necessary')).toEqual(true)

      await openPrefs(page)

      const toggles = getToggles(page)

      expect(toggles[0].ariaDisabled).toBeFalsy()

      toggles[0].click()
      await page.waitForChanges()

      await acceptInPrefs(page, 'selected')

      acceptedAndRejected =
        await ldCookieConsent.getAcceptedAndRejectedCategories()
      accepted = acceptedAndRejected.acceptedCategories
      rejected = acceptedAndRejected.rejectedCategories

      expect(accepted.has('necessary')).toEqual(true)
      expect(rejected.has('necessary')).toEqual(false)

      await openPrefs(page)

      expect(toggles[0].ariaDisabled).toBeTruthy()
    })
  })

  describe('notice only', () => {
    it('allows to have settings without categories', async () => {
      const page = await newSpecPage({
        components: [LdCookieConsent],
        template: () => (
          <ld-cookie-consent
            settings={{
              mode: 'notice-only',
              privacyStatementURL: '#',
              showOnLoadDelay: 0,
            }}
          />
        ),
      })
      await page.waitForChanges()
      await acceptInDisclaimer(page, 'all')

      const ldCookieConsent = getLdCookieConsent(page)
      const acceptedAndRejected =
        await ldCookieConsent.getAcceptedAndRejectedCategories()
      const accepted = acceptedAndRejected.acceptedCategories
      const rejected = acceptedAndRejected.rejectedCategories

      expect(accepted.size).toEqual(0)
      expect(rejected.size).toEqual(0)
    })
  })

  describe('dismissable', () => {
    it('allows rejecting all cookies from disclaimer', async () => {
      const page = await newSpecPage({
        components: [LdCookieConsent, LdModal],
        template: () => (
          <ld-cookie-consent
            settings={{
              categories,
              mode: 'opt-out',
              privacyStatementURL: '#',
              dismissable: true,
              showOnLoadDelay: 0,
            }}
          />
        ),
      })
      await page.waitForChanges()

      const ldCookieConsent = getLdCookieConsent(page)
      const dismissHandler = jest.fn()
      ldCookieConsent.addEventListener('ldCookieConsentDismiss', dismissHandler)
      await dismissDisclaimer(page)

      const acceptedAndRejected =
        await ldCookieConsent.getAcceptedAndRejectedCategories()
      const accepted = acceptedAndRejected.acceptedCategories
      const rejected = acceptedAndRejected.rejectedCategories

      expect(accepted.size).toEqual(2)
      expect(rejected.size).toEqual(1)

      expect(localStorage.getItem('ld-cookie-consent')).toBeFalsy()
      expect(dismissHandler).toHaveBeenCalled()
    })
  })

  describe('rejectable', () => {
    it('allows rejecting all cookies from disclaimer', async () => {
      const page = await newSpecPage({
        components: [LdCookieConsent, LdModal],
        template: () => (
          <ld-cookie-consent
            settings={{
              categories,
              mode: 'opt-out',
              privacyStatementURL: '#',
              rejectable: true,
              showOnLoadDelay: 0,
            }}
          />
        ),
      })
      await page.waitForChanges()
      await acceptInDisclaimer(page, 'none')

      const ldCookieConsent = getLdCookieConsent(page)
      const acceptedAndRejected =
        await ldCookieConsent.getAcceptedAndRejectedCategories()
      const accepted = acceptedAndRejected.acceptedCategories
      const rejected = acceptedAndRejected.rejectedCategories

      expect(accepted.size).toEqual(0)
      expect(rejected.size).toEqual(3)

      expect(localStorage.getItem('ld-cookie-consent')).toBeTruthy()
    })
  })
})
