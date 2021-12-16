---
eleventyNavigation:
  key: Header
  parent: Components
layout: layout.njk
title: Header
permalink: components/ld-header/
---

<link rel="stylesheet" href="css_components/ld-header.css">
<link rel="stylesheet" href="css_components/ld-button.css">
<link rel="stylesheet" href="css_components/ld-icon.css">
<link rel="stylesheet" href="css_components/ld-typo.css">

# ld-header

The `ld-header` component serves as a wrapper for creating a fully customizable page header. You can add whatever content you want. The component only takes care of the following things regarding its content:

* It adds a space between all its direct children.
* It takes care of a proper styling of contained `ld-button` elements.

Also, you can easily make the header sticky and make it hide when the user is scrolling down by using the `sticky` and `hide-on-scroll` props.

---

## Examples

### Default

{% example %}
<ld-header>
  <ld-typo class="logo" tag="div" variant="b6" title="Logo">M</ld-typo>
  <ld-typo tag="div" variant="h5">Liquid Oxygen</ld-typo>
</ld-header>

<style>
  .logo {
    color: var(--ld-thm-warning);
    margin-top: calc(var(--ld-sp-8) * -1);
  }
</style>

<!-- CSS component -->

<header class="ld-header">
  <div class="ld-header__container">
    <div class="logo ld-typo--b6" title="Logo">M</div>
    <div class="ld-typo--h5">Liquid Oxygen</div>
  </div>
</header>

<style>
  .logo {
    color: var(--ld-thm-warning);
    margin-top: calc(var(--ld-sp-8) * -1);
  }
</style>
{% endexample %}

### With linked logo

{% example %}
<ld-header>
  <a href="#" title="Home">
    <ld-typo class="logo" tag="div" variant="b6">M</ld-typo>
  </a>
  <ld-typo tag="div" variant="h5">Liquid Oxygen</ld-typo>
</ld-header>

<style>
  .logo {
    color: var(--ld-thm-warning);
    margin-top: calc(var(--ld-sp-8) * -1);
  }
</style>

<!-- CSS component -->

<header class="ld-header">
  <div class="ld-header__container">
    <a href="#" title="Home">
      <div class="logo ld-typo--b6" title="Logo">M</div>
    </a>
    <div class="ld-typo--h5">Liquid Oxygen</div>
  </div>
</header>

<style>
  .logo {
    color: var(--ld-thm-warning);
    margin-top: calc(var(--ld-sp-8) * -1);
  }
</style>
{% endexample %}

### With custom logo

{% example %}
<ld-header>
  <ld-icon name="rocket" size="lg" title="Logo"></ld-icon>
  <ld-typo tag="div" variant="h5">Rocket Science</ld-typo>
</ld-header>

<!-- CSS component -->

<header class="ld-header">
  <div class="ld-header__container">
    <svg class="ld-icon ld-icon--lg" title="Logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="m16.9524 14.422.0379.0948c.6824 1.4596.3791 3.2036-.7773 4.36l-1.6492 1.6492c-.3602.3792-.9857.2654-1.2132-.2085l-1.2322-2.6729-1.4407.9099c-.3602.2086-.8152.1517-1.0995-.1327l-3.981-3.9809a.8934.8934 0 0 1-.1326-1.0995l.9099-1.4407-2.673-1.2322c-.4738-.2085-.5876-.834-.2084-1.2132L5.1423 7.806c1.1564-1.1374 2.8814-1.4597 4.36-.7773l.0759.019c4.4927-4.2463 8.7039-3.882 10.2773-3.6924A.726.726 0 0 1 20.5 4c.1896 1.5734.6987 5.9292-3.5476 10.422zm-3.7345-6.4833c-.7962.7962-.7962 2.0663 0 2.8625.7962.7773 2.0852.7773 2.8624 0 .7773-.7962.7962-2.0663 0-2.8624-.7961-.7962-2.0662-.7962-2.8624 0zm-7.6587 10.161c0 .2085.1706.3601.3602.3601.0415-.0023.0866-.0046.135-.0071.3502-.0178.8746-.0446 1.4573-.1445l1.3468.626c.0661.0308.0778.1198.0206.1651-1.5787 1.253-3.6632 1.2568-4.7117 1.2587a17.4489 17.4489 0 0 0-.3072.0022c-.2085 0-.3602-.1706-.3602-.3602l.0021-.1117c.0174-.9543.0564-3.0902 1.399-4.7683a.098.098 0 0 1 .1651.0204l.6447 1.3669c-.1138.6635-.1517 1.2511-.1517 1.5924z" fill="currentcolor"/></svg>
    <div class="ld-typo--h5">Rocket Science</div>
  </div>
</header>
{% endexample %}

### With buttons

{% example %}
<ld-header>
  <a href="#" title="Home">
    <ld-typo class="logo" tag="div" variant="b6">M</ld-typo>
  </a>
  <ld-typo tag="div" variant="h5" style="flex-grow: 1">
    Liquid<span class="hide-on-sm"> Oxygen</span>
  </ld-typo>
  <ld-button id="register" type="button">
    <ld-icon name="pen"></ld-icon>
    Register
  </ld-button>
  <ld-button id="login-sm" mode="ghost" title="Login" type="button">
    <ld-icon name="user"></ld-icon>
  </ld-button>
  <ld-button id="login-lg" mode="secondary" type="button">
    <ld-icon name="user"></ld-icon>
    Login
  </ld-button>
</ld-header>

<style>
  .logo {
    color: var(--ld-thm-warning);
    margin-top: calc(var(--ld-sp-8) * -1);
  }

  .hide-on-sm {
    display: none;
  }

  #register ld-icon {
    display: none;
  }

  #login-lg {
    display: none;
  }

  @media (min-width: 52rem) {
    .hide-on-sm {
      display: inline;
    }

    #register ld-icon {
      display: block;
    }

    #login-sm {
      display: none;
    }

    #login-lg {
      display: block;
    }
  }
</style>

<!-- CSS component -->

<header class="ld-header">
  <div class="ld-header__container">
    <div class="logo ld-typo--b6" title="Logo">M</div>
    <div class="ld-typo--h5" style="flex-grow: 1">
      Liquid<span class="hide-on-sm"> Oxygen</span>
    </div>
    <button class="ld-button ld-button--brand-color ld-button--sm" id="register" type="button">
      <svg class="ld-icon ld-icon--sm" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.6192 15.1453a3.806 3.806 0 0 1 1.5674.3358c.4564.2056 1.0133.1824 1.3673-.1716L19.4353 4.4282c.4358-.4358.3698-1.1738-.227-1.3275A3.1966 3.1966 0 0 0 18.4098 3c-.5539 0-1.074.2154-1.4654.6068L5.5567 14.9944c-.0557.0557-.0163.1509.0625.1509zm.3803 1.3126H5.154a.5.5 0 0 0-.485.3787l-.639 2.5557c-.0894.3571.0277.6916.2536.9168.2252.2259.5597.3428.916.2536l2.5565-.639a.5.5 0 0 0 .3787-.4851v-.8455c0-1.1772-.958-2.1352-2.1354-2.1352zM21.5923 6.1824c0 .5542-.2154 1.0744-.6068 1.4658L9.5979 19.036c-.0557.0556-.1508.0162-.1508-.0625a3.806 3.806 0 0 0-.3358-1.5673c-.2057-.4565-.1826-1.0135.1715-1.3675L20.1635 5.1582c.4362-.4362 1.1748-.3697 1.3285.2276a3.194 3.194 0 0 1 .1003.7966z" fill="currentcolor"/></svg>
      Register
    </button>
    <button class="ld-button ld-button--brand-color ld-button--ghost ld-button--sm" id="login-sm" title="Login" type="button">
      <svg class="ld-icon ld-icon--lg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.9315 2C9.4767 2 7.455 3.6606 7.455 6.8376c0 2.0938.9386 4.1877 2.2383 5.4873.4332 1.1552-.4332 1.8051-.5776 1.8773-2.5993.9386-5.6318 2.6714-5.6318 4.3321v.6498c0 2.2383 4.4043 2.7437 8.4476 2.8159 4.1156-.0722 8.5199-.5776 8.5199-2.8159v-.6498c0-1.6607-3.0325-3.3935-5.6318-4.3321-.2166-.0722-1.083-.7221-.5776-1.8773 1.2996-1.2996 2.2383-3.3935 2.2383-5.4873C16.4803 3.6606 14.3864 2 11.9315 2z" fill="currentcolor"/></svg>
    </button>
    <button class="ld-button ld-button--brand-color ld-button--secondary ld-button--sm" id="login-lg" type="button">
      <svg class="ld-icon ld-icon--sm" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.9315 2C9.4767 2 7.455 3.6606 7.455 6.8376c0 2.0938.9386 4.1877 2.2383 5.4873.4332 1.1552-.4332 1.8051-.5776 1.8773-2.5993.9386-5.6318 2.6714-5.6318 4.3321v.6498c0 2.2383 4.4043 2.7437 8.4476 2.8159 4.1156-.0722 8.5199-.5776 8.5199-2.8159v-.6498c0-1.6607-3.0325-3.3935-5.6318-4.3321-.2166-.0722-1.083-.7221-.5776-1.8773 1.2996-1.2996 2.2383-3.3935 2.2383-5.4873C16.4803 3.6606 14.3864 2 11.9315 2z" fill="currentcolor"/></svg>
      Login
    </button>
  </div>
</header>

<style>
  .logo {
    color: var(--ld-thm-warning);
    margin-top: calc(var(--ld-sp-8) * -1);
  }

  .hide-on-sm {
    display: none;
  }

  #register .ld-icon {
    display: none;
  }

  #login-sm {
    --ld-button-padding-x-sm: 0;
    --ld-button-padding-y-sm: 0;
    margin: 0 calc(var(--ld-sp-8) * -1) 0 var(--ld-sp-8);
  }

  #login-lg {
    display: none;
  }

  @media (min-width: 52rem) {
    .hide-on-sm {
      display: inline;
    }

    #register .ld-icon {
      display: block;
    }

    #login-sm {
      display: none;
    }

    #login-lg {
      display: grid;
    }
  }
</style>
{% endexample %}

### With burger menu button

{% example %}
<ld-header>
  <ld-button mode="ghost" type="button">
    <ld-icon name="burger-menu"></ld-icon>
  </ld-button>
  <a href="#" title="Home">
    <ld-typo class="logo" tag="div" variant="b6">M</ld-typo>
  </a>
  <ld-typo tag="div" variant="h5">Liquid Oxygen</ld-typo>
</ld-header>

<style>
  .logo {
    color: var(--ld-thm-warning);
    margin-top: calc(var(--ld-sp-8) * -1);
  }
</style>

<!-- CSS component -->

<header class="ld-header">
  <div class="ld-header__container">
    <button class="ld-button ld-button--brand-color ld-button--ghost ld-button--sm" id="burger-menu" title="Login" type="button">
      <svg class="ld-icon ld-icon--lg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><rect x="5" y="6" width="14" height="2" rx="1" fill="currentcolor"/><rect x="5" y="11" width="14" height="2" rx="1" fill="currentcolor"/><rect x="5" y="16" width="14" height="2" rx="1" fill="currentcolor"/></svg>
    </button>
    <div class="logo ld-typo--b6" title="Logo">M</div>
    <div class="ld-typo--h5">Liquid Oxygen</div>
  </div>
</header>

<style>
  .logo {
    color: var(--ld-thm-warning);
    margin-top: calc(var(--ld-sp-8) * -1);
  }

  #burger-menu {
    --ld-button-padding-x-sm: 0;
    --ld-button-padding-y-sm: 0;
    margin: 0 calc(var(--ld-sp-8) * -1);
  }
</style>
{% endexample %}

### Sticky

You can add the `sticky` property to the `ld-header` web component, to make the component stick to the top of the page.

> As the CSS property `position: sticky;` is used here to achieve this behavior, the `ld-header` "sticks" to its nearest ancestor that has a "scrolling mechanism" (created when overflow is hidden, scroll, auto, or overlay), even if that ancestor isn't the nearest actually scrolling ancestor. So you need to take care of where you place the `ld-header` in the DOM.

### Hide on scroll

If you want the header to hide (slide up behind the top of the window) when the user is scrolling down, you can add the `hide-on-scroll` prop to the `ld-header` web component. With this prop set, the header will hide when scrolling down and show again, when scrolling up.

> This prop only works in combination with the `sticky` prop.

<!-- Auto Generated Below -->


## Properties

| Property       | Attribute        | Description                                                                             | Type               | Default     |
| -------------- | ---------------- | --------------------------------------------------------------------------------------- | ------------------ | ----------- |
| `hidden`       | `hidden`         | Hides header.                                                                           | `boolean`          | `false`     |
| `hideOnScroll` | `hide-on-scroll` | Hide the header when the user scrolls down and show it again, when the user scrolls up. | `boolean`          | `false`     |
| `key`          | `key`            | for tracking the node's identity when working with lists                                | `string \| number` | `undefined` |
| `ref`          | `ref`            | reference to component                                                                  | `any`              | `undefined` |
| `sticky`       | `sticky`         | Make the header sticky.                                                                 | `boolean`          | `false`     |


## Shadow Parts

| Part          | Description                                                       |
| ------------- | ----------------------------------------------------------------- |
| `"container"` | Actual header element that limits the width of the header content |


----------------------------------------------

 
