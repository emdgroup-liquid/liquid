import { newSpecPage } from "@stencil/core/testing";
import { LdNotification } from "../ld-notification";
import { LdIcon } from "../../ld-icon/ld-icon";

const DEFAULT_NOTIFICATION_TIMEOUT = 6000;
const FADE_TRANSITION_DURATION = 200;

describe("ld-notification", () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  it("renders as empty container placed at the top by default", async () => {
    const page = await newSpecPage({
      components: [LdNotification],
      html: `<ld-notification></ld-notification>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  describe("placement", () => {
    it('renders placed at the top with prop placement set to "top"', async () => {
      const page = await newSpecPage({
        components: [LdNotification],
        html: `<ld-notification placement="top"></ld-notification>`,
      });
      const ldNotification = page.root;
      expect(
        ldNotification.classList.contains("ld-notification--bottom"),
      ).toBeFalsy();
      expect(
        ldNotification.classList.contains("ld-notification--top"),
      ).toBeTruthy();
    });

    it('renders placed at the bottom with prop placement set to "bottom"', async () => {
      const page = await newSpecPage({
        components: [LdNotification],
        html: `<ld-notification placement="bottom"></ld-notification>`,
      });
      const ldNotification = page.root;
      expect(
        ldNotification.classList.contains("ld-notification--bottom"),
      ).toBeTruthy();
      expect(
        ldNotification.classList.contains("ld-notification--top"),
      ).toBeFalsy();
    });
  });

  describe("notification types", () => {
    it('renders a notification of type "info"', async () => {
      const page = await newSpecPage({
        components: [LdNotification],
        html: `<ld-notification></ld-notification>`,
      });
      page.win.dispatchEvent(
        new CustomEvent("ldNotificationAdd", {
          detail: {
            content: "I am an info message.",
            type: "info",
          },
        }),
      );
      await page.waitForChanges();

      const notifications = page.root.shadowRoot.querySelectorAll(
        ".ld-notification__item",
      );

      expect(notifications.length).toEqual(1);

      const notification = notifications[0];
      expect(notification.textContent).toContain("I am an info message.");

      expect(
        notification.classList.contains("ld-notification__item--info"),
      ).toBeTruthy();
      expect(
        notification.classList.contains("ld-notification__item--warn"),
      ).toBeFalsy();
      expect(
        notification.classList.contains("ld-notification__item--alert"),
      ).toBeFalsy();
    });

    it('renders a notification of type "info" if type is omitted', async () => {
      const page = await newSpecPage({
        components: [LdNotification],
        html: `<ld-notification></ld-notification>`,
      });
      page.win.dispatchEvent(
        new CustomEvent("ldNotificationAdd", {
          detail: {
            content: "I am an info message.",
          },
        }),
      );
      await page.waitForChanges();

      const notification = page.root.shadowRoot.querySelectorAll(
        ".ld-notification__item",
      )[0];
      expect(
        notification.classList.contains("ld-notification__item--info"),
      ).toBeTruthy();
    });

    it('renders a notification of type "warn"', async () => {
      const page = await newSpecPage({
        components: [LdNotification],
        html: `<ld-notification></ld-notification>`,
      });
      page.win.dispatchEvent(
        new CustomEvent("ldNotificationAdd", {
          detail: {
            content: "I am a warning.",
            type: "warn",
          },
        }),
      );
      await page.waitForChanges();

      const notifications = page.root.shadowRoot.querySelectorAll(
        ".ld-notification__item",
      );

      expect(notifications.length).toEqual(1);

      const notification = notifications[0];
      expect(notification.textContent).toContain("I am a warning.");

      expect(
        notification.classList.contains("ld-notification__item--info"),
      ).toBeFalsy();
      expect(
        notification.classList.contains("ld-notification__item--warn"),
      ).toBeTruthy();
      expect(
        notification.classList.contains("ld-notification__item--alert"),
      ).toBeFalsy();
    });

    it('renders a notification of type "alert"', async () => {
      const page = await newSpecPage({
        components: [LdNotification],
        html: `<ld-notification></ld-notification>`,
      });
      page.win.dispatchEvent(
        new CustomEvent("ldNotificationAdd", {
          detail: {
            content: "Ooops.",
            type: "alert",
          },
        }),
      );
      await page.waitForChanges();

      const notifications = page.root.shadowRoot.querySelectorAll(
        ".ld-notification__item",
      );

      expect(notifications.length).toEqual(1);

      const notification = notifications[0];
      expect(notification.textContent).toContain("Ooops.");

      expect(
        notification.classList.contains("ld-notification__item--info"),
      ).toBeFalsy();
      expect(
        notification.classList.contains("ld-notification__item--warn"),
      ).toBeFalsy();
      expect(
        notification.classList.contains("ld-notification__item--alert"),
      ).toBeTruthy();
    });
  });

  describe("notification hierarchy", () => {
    it('queues potentially less important notifications behind notifications of type "alert"', async () => {
      const page = await newSpecPage({
        components: [LdNotification],
        html: `<ld-notification></ld-notification>`,
      });

      page.win.dispatchEvent(
        new CustomEvent("ldNotificationAdd", {
          detail: {
            content: "info #1",
            type: "info",
          },
        }),
      );

      page.win.dispatchEvent(
        new CustomEvent("ldNotificationAdd", {
          detail: {
            content: "warning #1",
            type: "warn",
          },
        }),
      );

      page.win.dispatchEvent(
        new CustomEvent("ldNotificationAdd", {
          detail: {
            content: "alert #1",
            type: "alert",
          },
        }),
      );

      page.win.dispatchEvent(
        new CustomEvent("ldNotificationAdd", {
          detail: {
            content: "info #2",
            type: "info",
          },
        }),
      );

      page.win.dispatchEvent(
        new CustomEvent("ldNotificationAdd", {
          detail: {
            content: "warning #2",
            type: "warn",
          },
        }),
      );

      page.win.dispatchEvent(
        new CustomEvent("ldNotificationAdd", {
          detail: {
            content: "alert #2",
            type: "alert",
          },
        }),
      );

      page.win.dispatchEvent(
        new CustomEvent("ldNotificationAdd", {
          detail: {
            content: "info #3",
            type: "info",
          },
        }),
      );
      await page.waitForChanges();

      const notifications = page.root.shadowRoot.querySelectorAll(
        ".ld-notification__item",
      );

      expect(notifications.length).toEqual(7);

      expect(notifications[6].textContent).toContain("alert #2");
      expect(notifications[5].textContent).toContain("alert #1");
      expect(notifications[4].textContent).toContain("info #3");
      expect(notifications[3].textContent).toContain("warning #2");
      expect(notifications[2].textContent).toContain("info #2");
      expect(notifications[1].textContent).toContain("warning #1");
      expect(notifications[0].textContent).toContain("info #1");
    });
  });

  describe("notification timeout", () => {
    it("dismisses current notification on notification dismiss button click", async () => {
      const page = await newSpecPage({
        components: [LdNotification],
        html: `<ld-notification></ld-notification>`,
      });
      page.win.dispatchEvent(
        new CustomEvent("ldNotificationAdd", {
          detail: {
            content: "I am an info message.",
            type: "info",
          },
        }),
      );
      await page.waitForChanges();

      let notifications = page.root.shadowRoot.querySelectorAll(
        ".ld-notification__item:not(.ld-notification__item--dismissed)",
      );
      expect(notifications.length).toEqual(1);

      const btnDismiss = notifications[0].querySelector(
        ".ld-notification__btn-dismiss",
      );
      expect(btnDismiss).toBeTruthy();

      btnDismiss.dispatchEvent(new Event("click"));
      await page.waitForChanges();

      notifications = page.root.shadowRoot.querySelectorAll(
        ".ld-notification__item:not(.ld-notification__item--dismissed)",
      );
      expect(notifications.length).toEqual(0);
    });

    it('dismisses a notifications of type "info" after default timeout', async () => {
      const page = await newSpecPage({
        components: [LdNotification],
        html: `<ld-notification></ld-notification>`,
      });
      page.win.dispatchEvent(
        new CustomEvent("ldNotificationAdd", {
          detail: {
            content: "I am an info message.",
            type: "info",
          },
        }),
      );
      await page.waitForChanges();

      let notifications = page.root.shadowRoot.querySelectorAll(
        ".ld-notification__item:not(.ld-notification__item--dismissed)",
      );
      expect(notifications.length).toEqual(1);

      // Fast-forward until the timer has been executed.
      jest.advanceTimersByTime(DEFAULT_NOTIFICATION_TIMEOUT);
      await page.waitForChanges();

      notifications = page.root.shadowRoot.querySelectorAll(
        ".ld-notification__item:not(.ld-notification__item--dismissed)",
      );
      expect(notifications.length).toEqual(0);
    });

    it('dismisses a notifications of type "info" after custom timeout', async () => {
      const page = await newSpecPage({
        components: [LdNotification],
        html: `<ld-notification></ld-notification>`,
      });
      const additionalTime = 200;
      page.win.dispatchEvent(
        new CustomEvent("ldNotificationAdd", {
          detail: {
            content: "I am an info message.",
            type: "info",
            timeout: DEFAULT_NOTIFICATION_TIMEOUT + additionalTime,
          },
        }),
      );
      await page.waitForChanges();

      let notifications = page.root.shadowRoot.querySelectorAll(
        ".ld-notification__item:not(.ld-notification__item--dismissed)",
      );
      expect(notifications.length).toEqual(1);

      // Fast-forward until the timer has been executed.
      jest.advanceTimersByTime(DEFAULT_NOTIFICATION_TIMEOUT);
      await page.waitForChanges();

      notifications = page.root.shadowRoot.querySelectorAll(
        ".ld-notification__item:not(.ld-notification__item--dismissed)",
      );
      expect(notifications.length).toEqual(1);

      // Fast-forward until the timer has been executed.
      jest.advanceTimersByTime(additionalTime);
      await page.waitForChanges();

      notifications = page.root.shadowRoot.querySelectorAll(
        ".ld-notification__item:not(.ld-notification__item--dismissed)",
      );
      expect(notifications.length).toEqual(0);
    });

    it('does not dismiss a notification of type "info" with a timeout set to 0', async () => {
      const page = await newSpecPage({
        components: [LdNotification],
        html: `<ld-notification></ld-notification>`,
      });
      page.win.dispatchEvent(
        new CustomEvent("ldNotificationAdd", {
          detail: {
            content: "I am an info message.",
            type: "info",
            timeout: 0,
          },
        }),
      );
      await page.waitForChanges();

      let notifications = page.root.shadowRoot.querySelectorAll(
        ".ld-notification__item:not(.ld-notification__item--dismissed)",
      );
      expect(notifications.length).toEqual(1);

      // Fast-forward until the timer has been executed.
      jest.advanceTimersByTime(DEFAULT_NOTIFICATION_TIMEOUT);
      await page.waitForChanges();

      notifications = page.root.shadowRoot.querySelectorAll(
        ".ld-notification__item:not(.ld-notification__item--dismissed)",
      );
      expect(notifications.length).toEqual(1);
    });

    it('does not dismiss a notification of type "alert" after default timeout', async () => {
      const page = await newSpecPage({
        components: [LdNotification],
        html: `<ld-notification></ld-notification>`,
      });
      page.win.dispatchEvent(
        new CustomEvent("ldNotificationAdd", {
          detail: {
            content: "Ooops.",
            type: "alert",
          },
        }),
      );
      await page.waitForChanges();

      let notifications = page.root.shadowRoot.querySelectorAll(
        ".ld-notification__item:not(.ld-notification__item--dismissed)",
      );
      expect(notifications.length).toEqual(1);

      // Fast-forward until the timer has been executed.
      jest.advanceTimersByTime(DEFAULT_NOTIFICATION_TIMEOUT);
      await page.waitForChanges();

      notifications = page.root.shadowRoot.querySelectorAll(
        ".ld-notification__item:not(.ld-notification__item--dismissed)",
      );
      expect(notifications.length).toEqual(1);
    });

    it('dismisses a notification of type "alert" after explicit timeout', async () => {
      const page = await newSpecPage({
        components: [LdNotification],
        html: `<ld-notification></ld-notification>`,
      });
      page.win.dispatchEvent(
        new CustomEvent("ldNotificationAdd", {
          detail: {
            content: "Ooops.",
            type: "alert",
            timeout: DEFAULT_NOTIFICATION_TIMEOUT,
          },
        }),
      );
      await page.waitForChanges();

      let notifications = page.root.shadowRoot.querySelectorAll(
        ".ld-notification__item:not(.ld-notification__item--dismissed)",
      );
      expect(notifications.length).toEqual(1);

      // Fast-forward until the timer has been executed.
      jest.advanceTimersByTime(DEFAULT_NOTIFICATION_TIMEOUT);
      await page.waitForChanges();

      notifications = page.root.shadowRoot.querySelectorAll(
        ".ld-notification__item:not(.ld-notification__item--dismissed)",
      );
      expect(notifications.length).toEqual(0);
    });

    it('does not dismiss a notification of type "info" if it is in queue behind another notification', async () => {
      const page = await newSpecPage({
        components: [LdNotification],
        html: `<ld-notification></ld-notification>`,
      });
      page.win.dispatchEvent(
        new CustomEvent("ldNotificationAdd", {
          detail: {
            content: "I am an info message.",
            type: "info",
          },
        }),
      );
      await page.waitForChanges();

      page.win.dispatchEvent(
        new CustomEvent("ldNotificationAdd", {
          detail: {
            content: "Ooops.",
            type: "alert",
          },
        }),
      );
      await page.waitForChanges();

      let notifications = page.root.shadowRoot.querySelectorAll(
        ".ld-notification__item:not(.ld-notification__item--dismissed)",
      );
      expect(notifications.length).toEqual(2);

      // Fast-forward until the timer has been executed.
      jest.advanceTimersByTime(DEFAULT_NOTIFICATION_TIMEOUT);
      await page.waitForChanges();

      notifications = page.root.shadowRoot.querySelectorAll(
        ".ld-notification__item:not(.ld-notification__item--dismissed)",
      );
      expect(notifications.length).toEqual(2);
    });
  });

  describe("dismissing notifications", () => {
    it("dismisses current notification on ldNotificationDismiss event", async () => {
      const page = await newSpecPage({
        components: [LdNotification],
        html: `<ld-notification></ld-notification>`,
      });
      page.win.dispatchEvent(
        new CustomEvent("ldNotificationAdd", {
          detail: {
            content: "info #1",
            type: "info",
          },
        }),
      );
      await page.waitForChanges();

      page.win.dispatchEvent(
        new CustomEvent("ldNotificationAdd", {
          detail: {
            content: "info #2",
            type: "info",
          },
        }),
      );
      await page.waitForChanges();

      let notifications = page.root.shadowRoot.querySelectorAll(
        ".ld-notification__item:not(.ld-notification__item--dismissed)",
      );
      expect(notifications.length).toEqual(2);

      page.win.dispatchEvent(new CustomEvent("ldNotificationDismiss"));
      await page.waitForChanges();

      notifications = page.root.shadowRoot.querySelectorAll(
        ".ld-notification__item:not(.ld-notification__item--dismissed)",
      );
      expect(notifications.length).toEqual(1);
      expect(notifications[0].textContent).toContain("info #1");
    });

    it("does not do anything on ldNotificationDismiss event if no notifications are queued", async () => {
      const page = await newSpecPage({
        components: [LdNotification],
        html: `<ld-notification></ld-notification>`,
      });
      await page.waitForChanges();

      page.win.dispatchEvent(new CustomEvent("ldNotificationDismiss"));
      await page.waitForChanges();

      expect(page.root).toEqualHtml(`
        <ld-notification aria-label="Notifications" class="ld-notification ld-notification--top" role="region">
          <mock:shadow-root></mock:shadow-root>
        </ld-notification>
      `);
    });

    it("dismisses all notifications on ldNotificationClear event", async () => {
      const page = await newSpecPage({
        components: [LdNotification],
        html: `<ld-notification></ld-notification>`,
      });
      page.win.dispatchEvent(
        new CustomEvent("ldNotificationAdd", {
          detail: {
            content: "info #1",
            type: "info",
          },
        }),
      );
      await page.waitForChanges();

      page.win.dispatchEvent(
        new CustomEvent("ldNotificationAdd", {
          detail: {
            content: "info #2",
            type: "info",
          },
        }),
      );
      await page.waitForChanges();

      let notifications = page.root.shadowRoot.querySelectorAll(
        ".ld-notification__item:not(.ld-notification__item--dismissed)",
      );
      expect(notifications.length).toEqual(2);

      page.win.dispatchEvent(new CustomEvent("ldNotificationClear"));
      await page.waitForChanges();

      notifications = page.root.shadowRoot.querySelectorAll(
        ".ld-notification__item:not(.ld-notification__item--dismissed)",
      );
      expect(notifications.length).toEqual(0);
    });
  });

  describe("transitions", () => {
    it("transitions single notifications", async () => {
      const page = await newSpecPage({
        components: [LdNotification],
        html: `<ld-notification></ld-notification>`,
      });
      page.win.dispatchEvent(
        new CustomEvent("ldNotificationAdd", {
          detail: {
            content: "info #1",
            type: "info",
          },
        }),
      );

      page.win.dispatchEvent(
        new CustomEvent("ldNotificationAdd", {
          detail: {
            content: "info #2",
            type: "info",
          },
        }),
      );

      page.win.dispatchEvent(
        new CustomEvent("ldNotificationAdd", {
          detail: {
            content: "info #3",
            type: "info",
          },
        }),
      );

      page.win.dispatchEvent(
        new CustomEvent("ldNotificationAdd", {
          detail: {
            content: "info #4",
            type: "info",
          },
        }),
      );

      await page.waitForChanges();

      let notifications = page.root.shadowRoot.querySelectorAll(
        ".ld-notification__item:not(.ld-notification__item--dismissed)",
      );
      expect(notifications.length).toEqual(4);

      let dismissedNotifications = page.root.shadowRoot.querySelectorAll(
        ".ld-notification__item--dismissed",
      );
      expect(dismissedNotifications.length).toEqual(0);

      page.win.dispatchEvent(new CustomEvent("ldNotificationDismiss"));
      await page.waitForChanges();

      page.win.dispatchEvent(new CustomEvent("ldNotificationDismiss"));
      await page.waitForChanges();

      notifications = page.root.shadowRoot.querySelectorAll(
        ".ld-notification__item:not(.ld-notification__item--dismissed)",
      );
      expect(notifications.length).toEqual(2);

      dismissedNotifications = page.root.shadowRoot.querySelectorAll(
        ".ld-notification__item--dismissed",
      );
      expect(dismissedNotifications.length).toEqual(2);

      // Fast-forward until the timer has been executed.
      jest.advanceTimersByTime(FADE_TRANSITION_DURATION);
      await page.waitForChanges();

      notifications = page.root.shadowRoot.querySelectorAll(
        ".ld-notification__item:not(.ld-notification__item--dismissed)",
      );
      expect(notifications.length).toEqual(2);

      dismissedNotifications = page.root.shadowRoot.querySelectorAll(
        ".ld-notification__item--dismissed",
      );
      expect(dismissedNotifications.length).toEqual(0);
    });

    it("transitions multiple notifications", async () => {
      const page = await newSpecPage({
        components: [LdNotification],
        html: `<ld-notification></ld-notification>`,
      });
      page.win.dispatchEvent(
        new CustomEvent("ldNotificationAdd", {
          detail: {
            content: "info #1",
            type: "info",
          },
        }),
      );

      page.win.dispatchEvent(
        new CustomEvent("ldNotificationAdd", {
          detail: {
            content: "info #2",
            type: "info",
          },
        }),
      );
      await page.waitForChanges();

      let notifications = page.root.shadowRoot.querySelectorAll(
        ".ld-notification__item:not(.ld-notification__item--dismissed)",
      );
      expect(notifications.length).toEqual(2);

      let dismissedNotifications = page.root.shadowRoot.querySelectorAll(
        ".ld-notification__item--dismissed",
      );
      expect(dismissedNotifications.length).toEqual(0);

      page.win.dispatchEvent(new CustomEvent("ldNotificationClear"));
      await page.waitForChanges();

      notifications = page.root.shadowRoot.querySelectorAll(
        ".ld-notification__item:not(.ld-notification__item--dismissed)",
      );
      expect(notifications.length).toEqual(0);

      dismissedNotifications = page.root.shadowRoot.querySelectorAll(
        ".ld-notification__item--dismissed",
      );
      expect(dismissedNotifications.length).toEqual(2);

      // Fast-forward until the timer has been executed.
      jest.advanceTimersByTime(FADE_TRANSITION_DURATION);
      await page.waitForChanges();

      notifications = page.root.shadowRoot.querySelectorAll(
        ".ld-notification__item:not(.ld-notification__item--dismissed)",
      );
      expect(notifications.length).toEqual(0);

      dismissedNotifications = page.root.shadowRoot.querySelectorAll(
        ".ld-notification__item--dismissed",
      );
      expect(dismissedNotifications.length).toEqual(0);
    });
  });

  describe("notification content", () => {
    it("ignores redundant notifications", async () => {
      const page = await newSpecPage({
        components: [LdNotification],
        html: `<ld-notification></ld-notification>`,
      });
      page.win.dispatchEvent(
        new CustomEvent("ldNotificationAdd", {
          detail: {
            content: "info #1",
            type: "info",
          },
        }),
      );

      page.win.dispatchEvent(
        new CustomEvent("ldNotificationAdd", {
          detail: {
            content: "info #1",
            type: "info",
          },
        }),
      );
      await page.waitForChanges();

      const notifications = page.root.shadowRoot.querySelectorAll(
        ".ld-notification__item:not(.ld-notification__item--dismissed)",
      );
      expect(notifications.length).toEqual(1);
    });

    it("renders notifications with HTML content", async () => {
      const page = await newSpecPage({
        components: [LdNotification, LdIcon],
        html: `<ld-notification></ld-notification>`,
      });
      page.win.dispatchEvent(
        new CustomEvent("ldNotificationAdd", {
          detail: {
            content:
              '<ld-icon name="placeholder"></ld-icon> A notification with an icon.',
            type: "info",
          },
        }),
      );
      await page.waitForChanges();

      const notifications = page.root.shadowRoot.querySelectorAll(
        ".ld-notification__item:not(.ld-notification__item--dismissed)",
      );
      expect(notifications.length).toEqual(1);

      const svg = notifications[0].querySelector("svg");
      expect(svg).toBeTruthy();
    });

    it("it sanitizes notifications with HTML content", async () => {
      const page = await newSpecPage({
        components: [LdNotification, LdIcon],
        html: `<ld-notification></ld-notification>`,
      });
      page.win.dispatchEvent(
        new CustomEvent("ldNotificationAdd", {
          detail: {
            content: '<img alt=1 src=1 href=1 onerror="javascript:alert(1)">',
            type: "info",
          },
        }),
      );
      await page.waitForChanges();

      const notifications = page.root.shadowRoot.querySelectorAll(
        ".ld-notification__item:not(.ld-notification__item--dismissed)",
      );
      expect(notifications.length).toEqual(1);

      const img = notifications[0].querySelector("img");
      expect(img).toBeTruthy();

      expect(img.hasAttribute("alt")).toBeTruthy();
      expect(img.hasAttribute("src")).toBeTruthy();
      expect(img.hasAttribute("href")).toBeTruthy();
      expect(img.hasAttribute("onerror")).toBeFalsy();
    });

    it("it sanitizes notifications with HTML content and custom sanitization options", async () => {
      const page = await newSpecPage({
        components: [LdNotification, LdIcon],
        html: `<ld-notification sanitize-config='{"FORBID_ATTR": ["href"]}'></ld-notification>`,
      });
      page.win.dispatchEvent(
        new CustomEvent("ldNotificationAdd", {
          detail: {
            content: '<img alt=1 src=1 href=1 onerror="javascript:alert(1)">',
            type: "info",
          },
        }),
      );
      await page.waitForChanges();

      const notifications = page.root.shadowRoot.querySelectorAll(
        ".ld-notification__item:not(.ld-notification__item--dismissed)",
      );
      expect(notifications.length).toEqual(1);

      const img = notifications[0].querySelector("img");
      expect(img).toBeTruthy();

      expect(img.hasAttribute("alt")).toBeTruthy();
      expect(img.hasAttribute("src")).toBeTruthy();
      expect(img.hasAttribute("href")).toBeFalsy();
      expect(img.hasAttribute("onerror")).toBeFalsy();
    });
  });

  it("does not throw when disconnecting before hydration", () => {
    const component = new LdNotification();
    component.disconnectedCallback();
  });
});
