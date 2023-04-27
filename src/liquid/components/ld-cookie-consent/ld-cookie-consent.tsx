import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Method,
  Prop,
  State,
} from '@stencil/core'
import Cookies from 'js-cookie'
import { LdCookieConsentConfig } from './ld-cookie-consent.types'
import { getClassNames } from '../../utils/getClassNames'

/**
 * @slot disclaimer-description - Slot for description in cookie consent disclaimer.
 * @slot disclaimer-logo - Slot for logo in cookie consent disclaimer.
 * @slot disclaimer-title - Slot for title in cookie consent disclaimer.
 * @slot preferences-description - Slot for description in preferences modal layer.
 * @slot preferences-logo - Slot for logo in preferences modal layer.
 * @slot preferences-privacy-policy-notice - Slot for privacy policy notice in preferences modal layer.
 * @slot preferences-title - Slot for title in preferences modal layer.
 * @virtualProp ref - reference to component
 * @virtualProp {string | number} key - for tracking the node's identity when working with lists
 * @part disclaimer - consent disclaimer container
 * @part disclaimer-buttons - consent disclaimer buttons container
 * @part disclaimer-button-accept-all - accept all cookies button in consent disclaimer
 * @part disclaimer-button-accept-none - reject all cookies button in consent disclaimer
 * @part disclaimer-button-dismiss - x button to hide the disclaimer until next page load
 * @part disclaimer-button-preferences - show cookie consent preferences button
 * @part disclaimer-description - consent disclaimer description typography element
 * @part disclaimer-description-container - consent disclaimer description container
 * @part disclaimer-header - disclaimer header containing logo and title
 * @part disclaimer-logo-container - logo container in the disclaimer header
 * @part disclaimer-scroll-container - scrollable container in consent disclaimer
 * @part disclaimer-title - consent disclaimer title typography element
 * @part preferences - the preferences modal layer
 * @part preferences-accordion - cookie category specific accordion
 * @part preferences-accordion-panel - cookie category specific accordion panel
 * @part preferences-accordion-section - cookie category specific accordion section
 * @part preferences-accordion-toggle - cookie category specific accordion toggle
 * @part preferences-button-accept-all - accept all button in preferences
 * @part preferences-button-accept-none - accept none button in preferences
 * @part preferences-button-accept-selected - accept selected button in preferences
 * @part preferences-buttons - preferences buttons container
 * @part preferences-category-description - description of category specific category
 * @part preferences-category-table - cookie table
 * @part preferences-category-table-container - cookie table container
 * @part preferences-category-table-td - cookie table data cell
 * @part preferences-category-table-th - cookie table header cell
 * @part preferences-category-table-tr - cookie table row
 * @part preferences-category-title - title of category specific category
 * @part preferences-category-toggle - toggle of category specific category
 * @part preferences-description - preferences description container
 * @part preferences-header - preferences header containing logo and title
 * @part preferences-logo-container - logo container in the preferences header
 * @part preferences-privacy-policy-notice - privacy notice in modal layer footer
 * @part preferences-privacy-policy-notice-container - container for privacy notice slot
 * @part preferences-title - the preferences title displayed in the modal layer header
 */
@Component({
  tag: 'ld-cookie-consent',
  styleUrl: 'ld-cookie-consent.shadow.css',
  shadow: true,
})
export class LdCookieConsent {
  @Element() el: HTMLElement

  /** Component settings object to be merged with the default options (optionally stringified). */
  @Prop() settings!: Partial<LdCookieConsentConfig> | string

  /** Emitted when the cookie consent disclaimer is shown. */
  @Event() ldCookieConsentDisclaimerShow: EventEmitter<undefined>

  /** Emitted after loading saved consent from local storage. */
  @Event() ldCookieSavedConsentLoad: EventEmitter<{
    acceptedCategories: Set<string>
    consentDate: Date
    rejectedCategories: Set<string>
    revision: number
  }>

  /** Emitted when the cookie consent preferences modal layer is shown. */
  @Event() ldCookieConsentPreferencesShow: EventEmitter<undefined>

  /** Emitted after clearing cookies which happens after saving setting. */
  @Event() ldCookieConsentAutoclearCookies: EventEmitter<undefined>

  /** Emitted after saving cookies preferences to local storage with accepted categories. */
  @Event() ldCookieConsentSave: EventEmitter<{
    acceptedCategories: Set<string>
    consentDate: Date
    rejectedCategories: Set<string>
    revision: number
  }>

  /** Emitted after the cookie consent disclaimer has been dismissed (no consent has been saved in this case). */
  @Event() ldCookieConsentDismiss: EventEmitter<undefined>

  /** Emitted after activating scripts (only emitted if at least one script has been activated). */
  @Event() ldCookieConsentActivateScripts: EventEmitter<undefined>

  @State() private isDisclaimerVisible = false
  @State() private allCategories: Set<string> = new Set()
  @State() private preselectedCategories: Set<string> = new Set()
  @State() private savedConsent: {
    acceptedCategories: Set<string>
    consentDate: Date
    rejectedCategories: Set<string>
    revision: number
  } | null
  @State() private selectedCategories: Set<string> = new Set()

  private disclaimerRef: HTMLDivElement
  private modalRef: HTMLLdModalElement
  private config: LdCookieConsentConfig = {
    backdropBlur: true,
    buttonAcceptAll: 'Accept all',
    buttonAcceptCookies: 'Accept cookies',
    buttonAcceptNone: 'Accept only necessary',
    buttonAcceptSelected: 'Accept selected',
    buttonAcknowledge: 'Acknowledge',
    buttonDismiss: 'Dismiss',
    buttonPreferences: 'Cookie settings',
    disclaimerAlignement: 'center',
    dismissable: false,
    localStorageKey: 'ld-cookie-consent',
    mode: 'opt-in',
    privacyStatementURL: undefined,
    rejectable: false,
    revision: 0,
    scriptSelector: 'data-ld-cookie-category',
    showOnLoad: true,
    showOnLoadDelay: 1000,
  }

  /** Returns accepted categories. */
  @Method()
  async getAcceptedAndRejectedCategories(): Promise<{
    acceptedCategories: Set<string>
    rejectedCategories: Set<string>
  }> {
    let acceptedCategories
    switch (this.config.mode) {
      case 'notice-only':
        acceptedCategories = this.preselectedCategories
        break
      case 'opt-in':
        if (this.isConsentGivenForCurrentRevision()) {
          acceptedCategories = this.savedConsent.acceptedCategories
        } else {
          acceptedCategories = new Set()
        }
        break
      case 'opt-out':
        if (this.isConsentGivenForCurrentRevision()) {
          acceptedCategories = this.savedConsent.acceptedCategories
        } else {
          acceptedCategories = this.preselectedCategories
        }
        break
    }
    const rejectedCategories = new Set(
      [...this.allCategories].filter(
        (category) => !acceptedCategories.has(category)
      )
    )
    return {
      acceptedCategories,
      rejectedCategories,
    }
  }

  /** Returns true if cookie category has been accepted. */
  @Method()
  async isCategoryAccepted(cookieCategory: string): Promise<boolean> {
    return (
      await this.getAcceptedAndRejectedCategories()
    ).acceptedCategories.has(cookieCategory)
  }

  /** Shows cookie consent disclaimer. */
  @Method()
  async showDisclaimer(delay?: number) {
    const cb = () => {
      this.isDisclaimerVisible = true
      this.disclaimerRef?.focus()
      this.ldCookieConsentDisclaimerShow.emit()
    }
    if (delay) {
      setTimeout(cb, delay)
    } else {
      cb()
    }
  }

  /** Hides cookie consent disclaimer and preferences. */
  @Method()
  async hideDisclaimerAndPreferences() {
    this.isDisclaimerVisible = false
    this.modalRef?.close()
  }

  private showPreferences() {
    this.modalRef.showModal()
    this.ldCookieConsentPreferencesShow.emit()
  }

  /** Tries to delete cookies as per configuration if consent is not yet expressed. */
  private autoclearCookies(rejectedCategories: Set<string>) {
    const allCookieNames = Object.keys(Cookies.get())
    this.config.categories
      ?.filter(
        (category) =>
          category.autoclear && rejectedCategories.has(category.toggle.value)
      )
      .flatMap((category) => category.autoclear)
      .forEach(({ domain, name, path }) => {
        if (allCookieNames.includes(name)) {
          Cookies.remove(name, {
            path,
            domain,
          })
        }
      })
    this.ldCookieConsentAutoclearCookies.emit()
  }

  private saveConsent(consentType: 'all' | 'none' | 'selected') {
    let acceptedCategories: Set<string>
    switch (consentType) {
      case 'all':
        acceptedCategories = new Set(
          this.config.categories?.map((category) => category.toggle.value)
        )
        break
      case 'none':
        acceptedCategories = new Set(
          this.config.categories
            ?.filter(({ toggle }) => toggle.disabled && toggle.checked)
            .map(({ toggle }) => toggle.value)
        )
        break
      case 'selected':
        acceptedCategories = this.selectedCategories
        break
    }

    this.selectedCategories = new Set([...acceptedCategories])

    const rejectedCategories = new Set(
      [...this.allCategories].filter(
        (category) => !acceptedCategories.has(category)
      )
    )

    this.savedConsent = {
      acceptedCategories,
      consentDate: new Date(),
      rejectedCategories,
      revision: this.config.revision,
    }

    localStorage.setItem(
      this.config.localStorageKey,
      JSON.stringify({
        acceptedCategories: [...this.savedConsent.acceptedCategories],
        consentDate: this.savedConsent.consentDate.toISOString(),
        rejectedCategories: [...this.savedConsent.rejectedCategories],
        revision: this.savedConsent.revision,
      })
    )

    this.ldCookieConsentSave.emit(this.savedConsent)

    this.autoclearCookies(rejectedCategories)

    this.loadScripts()
  }

  /** Loads scripts based on expressed consent. */
  private async loadScripts() {
    const { rejectedCategories } = await this.getAcceptedAndRejectedCategories()
    const scripts = Array.from(
      document.querySelectorAll<HTMLScriptElement>(
        `script[${this.config.scriptSelector}]`
      )
    ).filter(
      (script) =>
        this.config.mode === 'notice-only' ||
        !rejectedCategories.has(script.getAttribute(this.config.scriptSelector))
    )
    if (!scripts.length) return

    const loadScript = (script: HTMLScriptElement) => {
      // Reactivate by replacing "dormant" script with copied version of itself,
      // with the correct type and the data script selector attribute removed.
      script.removeAttribute(this.config.scriptSelector)
      script.removeAttribute('type')
      const freshScript = document.createElement('script')
      freshScript.textContent = script.innerHTML
      Array.from(script.attributes).forEach((attr) => {
        const attrNodeName = attr.nodeName
        freshScript.setAttribute(
          attrNodeName,
          script[attrNodeName] || script.getAttribute(attrNodeName)
        )
      })

      const onDone = () => {
        const nextScript = scripts.shift()
        if (nextScript) {
          loadScript(nextScript)
        } else {
          this.ldCookieConsentActivateScripts.emit()
        }
      }

      script.parentNode.replaceChild(freshScript, script)
      if (script.hasAttribute('async')) {
        onDone()
      } else {
        freshScript.onload = onDone
      }
    }
    loadScript(scripts.shift())
  }

  private isConsentGivenForCurrentRevision() {
    // if no consent is given
    if (!this.savedConsent) return false

    // if revision handling is not enabled in settings
    if (!this.config.revision) return true

    // if saved consent has the same revision as the one in the settings
    if (this.savedConsent.revision === this.config.revision) return true

    return false
  }

  private getInitialM() {
    return <ld-icon class="ld-cookie-consent__initial-m" name="initial-m" />
  }

  private renderDisclaimer() {
    const { config } = this
    return (
      <div
        aria-labelledby="ld-cookie-consent-disclaimer-header"
        class={getClassNames([
          'ld-cookie-consent__disclaimer',
          `ld-cookie-consent__disclaimer--${config.disclaimerAlignement}`,
          config.rejectable && 'ld-cookie-consent__disclaimer--rejectable',
          this.isDisclaimerVisible && 'ld-cookie-consent__disclaimer--visible',
        ])}
        onTransitionEnd={function () {
          this.focus()
        }}
        part="disclaimer"
        ref={(ref) => (this.disclaimerRef = ref)}
        role="dialog"
        tabIndex={this.isDisclaimerVisible ? -1 : undefined}
      >
        <div
          class="ld-cookie-consent__disclaimer-header"
          part="disclaimer-header"
        >
          <div
            class="ld-cookie-consent__disclaimer-logo-container"
            part="disclaimer-logo-container"
          >
            <slot name="disclaimer-logo">{this.getInitialM()}</slot>
          </div>

          <slot name="disclaimer-title">
            <ld-typo
              class="ld-cookie-consent__disclaimer-title"
              part="disclaimer-title"
              tag="p"
              variant="h5"
            >
              Cookie Disclaimer
            </ld-typo>
          </slot>

          {config.dismissable && (
            <button
              aria-label={this.config.buttonDismiss}
              class="ld-cookie-consent__disclaimer-x"
              onClick={() => {
                this.hideDisclaimerAndPreferences()
                this.ldCookieConsentDismiss.emit()
              }}
              part="disclaimer-button-dismiss"
            ></button>
          )}
        </div>

        <div
          class="ld-cookie-consent__disclaimer-scroll-container"
          id="ld-cookie-consent-disclaimer-header"
          part="disclaimer-scroll-container"
        >
          <div
            class="ld-cookie-consent__disclaimer-description-container"
            part="disclaimer-description-container"
          >
            <slot name="disclaimer-description">
              {config.mode === 'notice-only' && (
                <ld-typo
                  class="ld-cookie-consent__disclaimer-description"
                  part="disclaimer-description"
                >
                  This website uses cookies so that you have the best user
                  experience. By continuing your browsing on this website, you
                  accept the conditions described in our{' '}
                  <ld-link href={config.privacyStatementURL} target="_blank">
                    Cookie Policy / Privacy Statement
                  </ld-link>
                  . Cookies can be managed using your browser preferences.
                </ld-typo>
              )}
              {config.mode === 'opt-in' && (
                <ld-typo part="disclaimer-description">
                  We use cookies so that we can offer you the best possible
                  website experience. This includes cookies which are necessary
                  for the operation of the app and the website, as well as other
                  cookies which are used solely for anonymous statistical
                  purposes, for more comfortable website settings, or for the
                  display of personalized content. You are free to decide in the
                  Cookie Settings which categories you would like to permit,
                  except for the necessary cookies. Please note that depending
                  on what you select, the full functionality of the website may
                  no longer be available. You may review and change your choices
                  at any time. Further information can be found in our{' '}
                  <ld-link href={config.privacyStatementURL} target="_blank">
                    Privacy Statement
                  </ld-link>
                  .
                </ld-typo>
              )}
              {config.mode === 'opt-out' && (
                <ld-typo part="disclaimer-description">
                  We use cookies in our website to give you the most relevant
                  experience. By clicking or navigating the site, you are
                  accepting the use of all our cookies according to our Cookie
                  Policy / Privacy Statement. You are free to decide in the
                  Cookie Settings which categories you would like to permit.
                  Please note that depending on what you select, the full
                  functionality of the website may no longer be available. You
                  may review and change your choices at any time. Further
                  information can be found in our{' '}
                  <ld-link href={config.privacyStatementURL} target="_blank">
                    Privacy Statement
                  </ld-link>
                  .
                </ld-typo>
              )}
            </slot>
          </div>
        </div>

        <div
          class="ld-cookie-consent__disclaimer-buttons"
          part="disclaimer-buttons"
        >
          {config.mode !== 'notice-only' && (
            <ld-button
              class="ld-cookie-consent__btn ld-cookie-consent__btn--preferences"
              mode="secondary"
              onClick={() => {
                this.showPreferences()
              }}
              part="disclaimer-button-preferences"
              size="sm"
            >
              {config.buttonPreferences}
            </ld-button>
          )}
          {config.mode !== 'notice-only' && config.rejectable && (
            <ld-button
              class="ld-cookie-consent__btn ld-cookie-consent__btn--accept-none"
              mode="secondary"
              onClick={() => {
                this.hideDisclaimerAndPreferences()
                this.saveConsent('none')
              }}
              part="disclaimer-button-accept-none"
              size="sm"
            >
              {config.buttonAcceptNone}
            </ld-button>
          )}
          <ld-button
            class={getClassNames([
              'ld-cookie-consent__btn',
              config.mode === 'notice-only'
                ? 'ld-cookie-consent__btn--acknowledge'
                : 'ld-cookie-consent__btn--accept-all',
            ])}
            onClick={() => {
              this.hideDisclaimerAndPreferences()
              this.saveConsent('all')
            }}
            part="disclaimer-button-accept-all"
            size="sm"
          >
            {config.mode === 'notice-only'
              ? config.buttonAcknowledge
              : config.buttonAcceptCookies}
          </ld-button>
        </div>
      </div>
    )
  }

  private renderPreferences() {
    const { config } = this
    return (
      <ld-modal
        blurry-backdrop={config.backdropBlur}
        class="ld-cookie-consent__preferences"
        part="preferences"
        ref={(ref) => (this.modalRef = ref)}
      >
        <div
          slot="header"
          class="ld-cookie-consent__preferences-header"
          part="preferences-header"
        >
          <div
            class="ld-cookie-consent__preferences-logo-container"
            part="preferences-logo-container"
          >
            <slot name="preferences-logo">{this.getInitialM()}</slot>
          </div>

          <slot name="preferences-title">
            <ld-typo
              class="ld-cookie-consent__preferences-title"
              part="preferences-title"
              tag="p"
              variant="h5"
            >
              Cookie Settings
            </ld-typo>
          </slot>
        </div>

        <div
          class="ld-cookie-consent__preferences-description"
          part="preferences-description"
        >
          <slot name="preferences-description" />
        </div>

        <ld-accordion
          brand-color
          class="ld-cookie-consent__preferences-accordion"
          detached
          part="preferences-accordion"
          rounded
          single
        >
          {config.categories.map(this.renderCategory.bind(this))}
        </ld-accordion>
        <div
          class="ld-cookie-consent__preferences-buttons"
          part="preferences-buttons"
          slot="footer"
        >
          {config.buttonAcceptNone && (
            <ld-button
              class="ld-cookie-consent__btn ld-cookie-consent__btn--accept-none"
              mode="secondary"
              onClick={() => {
                this.hideDisclaimerAndPreferences()
                this.saveConsent('none')
              }}
              part="preferences-button-accept-none"
              size="sm"
            >
              {config.buttonAcceptNone}
            </ld-button>
          )}
          {config.buttonAcceptSelected && (
            <ld-button
              class="ld-cookie-consent__btn ld-cookie-consent__btn--accept-selected"
              mode="secondary"
              onClick={() => {
                this.hideDisclaimerAndPreferences()
                this.saveConsent('selected')
              }}
              part="preferences-button-accept-selected"
              size="sm"
            >
              {config.buttonAcceptSelected}
            </ld-button>
          )}
          {config.buttonAcceptAll && (
            <ld-button
              class="ld-cookie-consent__btn ld-cookie-consent__btn--accept-all"
              onClick={() => {
                this.hideDisclaimerAndPreferences()
                this.saveConsent('all')
              }}
              part="preferences-button-accept-all"
              size="sm"
            >
              {config.buttonAcceptAll}
            </ld-button>
          )}
        </div>

        <div
          class="ld-cookie-consent__preferences-privacy-policy-notice-container"
          part="preferences-privacy-policy-notice-container"
          slot="footer"
        >
          <slot name="preferences-privacy-policy-notice">
            <ld-typo
              class="ld-cookie-consent__preferences-privacy-policy-notice"
              part="preferences-privacy-policy-notice"
              variant="body-s"
            >
              Further information can be found in our{' '}
              <ld-link href={config.privacyStatementURL} target="_blank">
                Privacy Statement
              </ld-link>
              .
            </ld-typo>
          </slot>
        </div>
      </ld-modal>
    )
  }

  private renderCategory(category: LdCookieConsentConfig['categories'][0]) {
    return (
      <ld-accordion-section
        class="ld-cookie-consent__preferences-accordion-section"
        part="preferences-accordion-section"
      >
        <ld-accordion-toggle
          class="ld-cookie-consent__preferences-accordion-toggle"
          part="preferences-accordion-toggle"
        >
          <span
            class="ld-cookie-consent__preferences-category-title"
            part="preferences-category-title"
          >
            {category.title}
          </span>
        </ld-accordion-toggle>
        <ld-accordion-panel
          class="ld-cookie-consent__preferences-accordion-panel"
          part="preferences-accordion-panel"
        >
          <ld-typo
            class="ld-cookie-consent__preferences-category-description"
            part="preferences-category-description"
            variant="body-s"
          >
            {category.details.description}
          </ld-typo>
          {category.details.cookieTable && (
            <div
              class="ld-cookie-consent__preferences-category-table-container"
              part="preferences-category-table-container"
            >
              <table
                class="ld-cookie-consent__preferences-category-table"
                part="preferences-category-table"
              >
                {category.details.cookieTable.headers && (
                  <tr
                    class="ld-cookie-consent__preferences-category-table-tr"
                    part="preferences-category-table-tr"
                  >
                    {category.details.cookieTable.headers.map((th) => (
                      <th
                        class="ld-cookie-consent__preferences-category-table-th"
                        part="preferences-category-table-th"
                      >
                        {th}
                      </th>
                    ))}
                  </tr>
                )}
                {category.details.cookieTable.rows.map((tr) => (
                  <tr
                    class="ld-cookie-consent__preferences-category-table-tr"
                    part="preferences-category-table-tr"
                  >
                    {tr.map((td) => (
                      <td
                        class="ld-cookie-consent__preferences-category-table-td"
                        part="preferences-category-table-td"
                      >
                        {td}
                      </td>
                    ))}
                  </tr>
                ))}
              </table>
            </div>
          )}
        </ld-accordion-panel>
        <ld-toggle
          aria-disabled={category.toggle.disabled ? 'true' : undefined}
          class="ld-cookie-consent__preferences-category-toggle"
          checked={this.selectedCategories.has(category.toggle.value)}
          onClick={(ev) => {
            ev.stopImmediatePropagation()
          }}
          onLdchange={() => {
            this.selectedCategories.has(category.toggle.value)
              ? this.selectedCategories.delete(category.toggle.value)
              : this.selectedCategories.add(category.toggle.value)

            this.selectedCategories = new Set(this.selectedCategories)
          }}
          part="preferences-category-toggle"
          value={category.toggle.value}
        />
      </ld-accordion-section>
    )
  }

  componentWillLoad() {
    const parsedSettings: Partial<LdCookieConsentConfig> =
      typeof this.settings === 'string'
        ? JSON.parse(this.settings)
        : this.settings

    this.config = Object.assign(this.config, parsedSettings)

    const savedParsedConsent = JSON.parse(
      localStorage.getItem(this.config.localStorageKey)
    )
    this.savedConsent = savedParsedConsent && {
      acceptedCategories: new Set(savedParsedConsent.acceptedCategories),
      consentDate: new Date(savedParsedConsent.consentDate),
      rejectedCategories: new Set(savedParsedConsent.rejectedCategories),
      revision: savedParsedConsent.revision,
    }

    this.allCategories = new Set(
      this.config.categories?.map((category) => category.toggle.value)
    )
    this.preselectedCategories = new Set(
      this.config.categories
        ?.filter((category) => {
          return category.toggle.checked
        })
        .map((category) => category.toggle.value)
    )
    this.selectedCategories = new Set(
      ...[this.savedConsent?.acceptedCategories || this.preselectedCategories]
    )

    if (this.savedConsent) this.ldCookieSavedConsentLoad.emit(this.savedConsent)

    this.loadScripts()

    if (this.config.showOnLoad && !this.isConsentGivenForCurrentRevision()) {
      this.showDisclaimer(this.config.showOnLoadDelay)
    }
  }

  render() {
    return (
      <Host class="ld-cookie-consent">
        {this.renderDisclaimer()}

        {this.config.mode !== 'notice-only' && this.renderPreferences()}
      </Host>
    )
  }
}
