---
eleventyNavigation:
  key: Notice
  parent: Components
layout: layout.njk
title: Notice
permalink: components/ld-notice/
tags:
  - banner
---

# ld-notice

<link rel="stylesheet" href="{{ env.base }}/{{ buildstamp }}css_components/ld-notice.css">
<link rel="stylesheet" href="{{ env.base }}/{{ buildstamp }}css_components/ld-icon.css">
<link rel="stylesheet" href="{{ env.base }}/{{ buildstamp }}css_components/ld-typo.css">

This component is meant to be used in conjunction with the [`ld-input`](components/ld-input/) and the [`ld-label`](components/ld-label/) component. Please reffer to the [`ld-input`](components/ld-input/) docs for further usage examples.

## Examples

### As success message

{% example %}
<ld-notice headline="Success message" mode="success">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Metus
  pellentesque facilisi nunc iaculis. Laoreet eget eu lacus cursus odio
  quam ut elementum. Faucibus cursus in placerat enim non senectus. In
  molestie volutpat at sem bibendum ac id. Suspendisse erat malesuada
  vulputate et congue blandit in erat ornare. Rhoncus interdum.
</ld-notice>

<!-- React component -->

<LdNotice headline="Success message" mode="success">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Metus
  pellentesque facilisi nunc iaculis. Laoreet eget eu lacus cursus odio
  quam ut elementum. Faucibus cursus in placerat enim non senectus. In
  molestie volutpat at sem bibendum ac id. Suspendisse erat malesuada
  vulputate et congue blandit in erat ornare. Rhoncus interdum.
</LdNotice>

<!-- CSS component -->

<div class="ld-notice ld-notice--success">
  <!-- Note that you can use an img element with the class ld-notice__icon here, as well. -->
  <svg class="ld-notice__icon ld-icon ld-icon--lg" width="24" height="25" viewBox="0 0 24 25" fill="none">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 24.5C18.6274 24.5 24 19.1274 24 12.5C24 5.87258 18.6274 0.5 12 0.5C5.37258 0.5 0 5.87258 0 12.5C0 19.1274 5.37258 24.5 12 24.5Z" fill="currentColor"/>
    <path d="M16.898 9.56123L10.4404 15.4388L7.10205 12.147" stroke="var(--ld-icon-secondary-col)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  <p class="ld-notice__headline ld-typo--h4">Success message</p>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Metus
  pellentesque facilisi nunc iaculis. Laoreet eget eu lacus cursus odio
  quam ut elementum. Faucibus cursus in placerat enim non senectus. In
  molestie volutpat at sem bibendum ac id. Suspendisse erat malesuada
  vulputate et congue blandit in erat ornare. Rhoncus interdum.
</div>
{% endexample %}

### As error message

{% example %}
<ld-notice headline="An error occurred" mode="error">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Metus
  pellentesque facilisi nunc iaculis. Laoreet eget eu lacus cursus odio
  quam ut elementum. Faucibus cursus in placerat enim non senectus. In
  molestie volutpat at sem bibendum ac id. Suspendisse erat malesuada
  vulputate et congue blandit in erat ornare. Rhoncus interdum.
</ld-notice>

<!-- React component -->

<LdNotice headline="An error occurred" mode="error">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Metus
  pellentesque facilisi nunc iaculis. Laoreet eget eu lacus cursus odio
  quam ut elementum. Faucibus cursus in placerat enim non senectus. In
  molestie volutpat at sem bibendum ac id. Suspendisse erat malesuada
  vulputate et congue blandit in erat ornare. Rhoncus interdum.
</LdNotice>

<!-- CSS component -->

<div class="ld-notice ld-notice--error">
  <!-- Note that you can use an img element with the class ld-notice__icon here, as well. -->
  <svg class="ld-notice__icon ld-icon ld-icon--lg" width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z" fill="currentColor"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.18234 11.0254C6.79228 11.0254 6.48657 10.9147 6.26518 10.6933C6.0438 10.472 5.93311 10.1662 5.93311 9.77618V6.12335C5.93311 5.99685 6.0069 5.93359 6.15449 5.93359H6.89771C7.28776 5.93359 7.59348 6.04428 7.81487 6.26567C8.03625 6.48705 8.14694 6.79277 8.14694 7.18283V10.8357C8.14694 10.9622 8.07315 11.0254 7.92556 11.0254H7.18234Z" fill="var(--ld-icon-secondary-col)"/>
    <ellipse cx="6.99977" cy="3.80007" rx="1.06667" ry="1.06667" fill="var(--ld-icon-secondary-col)"/>
  </svg>
  <p class="ld-notice__headline ld-typo--h4">An error occurred</p>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Metus
  pellentesque facilisi nunc iaculis. Laoreet eget eu lacus cursus odio
  quam ut elementum. Faucibus cursus in placerat enim non senectus. In
  molestie volutpat at sem bibendum ac id. Suspendisse erat malesuada
  vulputate et congue blandit in erat ornare. Rhoncus interdum.
</div>
{% endexample %}

### As info message

{% example %}
<ld-notice headline="Information">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Metus
  pellentesque facilisi nunc iaculis. Laoreet eget eu lacus cursus odio
  quam ut elementum. Faucibus cursus in placerat enim non senectus. In
  molestie volutpat at sem bibendum ac id. Suspendisse erat malesuada
  vulputate et congue blandit in erat ornare. Rhoncus interdum.
</ld-notice>

<!-- React component -->

<LdNotice headline="Information">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Metus
  pellentesque facilisi nunc iaculis. Laoreet eget eu lacus cursus odio
  quam ut elementum. Faucibus cursus in placerat enim non senectus. In
  molestie volutpat at sem bibendum ac id. Suspendisse erat malesuada
  vulputate et congue blandit in erat ornare. Rhoncus interdum.
</LdNotice>

<!-- CSS component -->

<div class="ld-notice ld-notice--info">
  <!-- Note that you can use an img element with the class ld-notice__icon here, as well. -->
  <svg class="ld-notice__icon ld-icon ld-icon--lg" width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z" fill="currentColor"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.18234 11.0254C6.79228 11.0254 6.48657 10.9147 6.26518 10.6933C6.0438 10.472 5.93311 10.1662 5.93311 9.77618V6.12335C5.93311 5.99685 6.0069 5.93359 6.15449 5.93359H6.89771C7.28776 5.93359 7.59348 6.04428 7.81487 6.26567C8.03625 6.48705 8.14694 6.79277 8.14694 7.18283V10.8357C8.14694 10.9622 8.07315 11.0254 7.92556 11.0254H7.18234Z" fill="var(--ld-icon-secondary-col)"/>
    <ellipse cx="6.99977" cy="3.80007" rx="1.06667" ry="1.06667" fill="var(--ld-icon-secondary-col)"/>
  </svg>
  <p class="ld-notice__headline ld-typo--h4">Information</p>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Metus
  pellentesque facilisi nunc iaculis. Laoreet eget eu lacus cursus odio
  quam ut elementum. Faucibus cursus in placerat enim non senectus. In
  molestie volutpat at sem bibendum ac id. Suspendisse erat malesuada
  vulputate et congue blandit in erat ornare. Rhoncus interdum.
</div>
{% endexample %}

### As warning message

{% example %}
<ld-notice headline="Warning!" mode="warning">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Metus
  pellentesque facilisi nunc iaculis. Laoreet eget eu lacus cursus odio
  quam ut elementum. Faucibus cursus in placerat enim non senectus. In
  molestie volutpat at sem bibendum ac id. Suspendisse erat malesuada
  vulputate et congue blandit in erat ornare. Rhoncus interdum.
</ld-notice>

<!-- React component -->

<LdNotice headline="Warning!" mode="warning">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Metus
  pellentesque facilisi nunc iaculis. Laoreet eget eu lacus cursus odio
  quam ut elementum. Faucibus cursus in placerat enim non senectus. In
  molestie volutpat at sem bibendum ac id. Suspendisse erat malesuada
  vulputate et congue blandit in erat ornare. Rhoncus interdum.
</LdNotice>

<!-- CSS component -->

<div class="ld-notice ld-notice--warning">
  <!-- Note that you can use an img element with the class ld-notice__icon here, as well. -->
  <svg class="ld-notice__icon ld-icon ld-icon--lg" width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z" fill="currentColor"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.18234 11.0254C6.79228 11.0254 6.48657 10.9147 6.26518 10.6933C6.0438 10.472 5.93311 10.1662 5.93311 9.77618V6.12335C5.93311 5.99685 6.0069 5.93359 6.15449 5.93359H6.89771C7.28776 5.93359 7.59348 6.04428 7.81487 6.26567C8.03625 6.48705 8.14694 6.79277 8.14694 7.18283V10.8357C8.14694 10.9622 8.07315 11.0254 7.92556 11.0254H7.18234Z" fill="var(--ld-icon-secondary-col)"/>
    <ellipse cx="6.99977" cy="3.80007" rx="1.06667" ry="1.06667" fill="var(--ld-icon-secondary-col)"/>
  </svg>
  <p class="ld-notice__headline ld-typo--h4">Warning!</p>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Metus
  pellentesque facilisi nunc iaculis. Laoreet eget eu lacus cursus odio
  quam ut elementum. Faucibus cursus in placerat enim non senectus. In
  molestie volutpat at sem bibendum ac id. Suspendisse erat malesuada
  vulputate et congue blandit in erat ornare. Rhoncus interdum.
</div>
{% endexample %}

### With custom icon

{% example %}
<ld-notice headline="With custom icon" mode="success">
  <ld-icon slot="custom-icon" name="placeholder" size="lg"></ld-icon>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Metus
  pellentesque facilisi nunc iaculis. Laoreet eget eu lacus cursus odio
  quam ut elementum. Faucibus cursus in placerat enim non senectus. In
  molestie volutpat at sem bibendum ac id. Suspendisse erat malesuada
  vulputate et congue blandit in erat ornare. Rhoncus interdum.
</ld-notice>

<!-- React component -->

<LdNotice headline="With custom icon" mode="success">
  <LdIcon slot="custom-icon" name="placeholder" size="lg" />
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Metus
  pellentesque facilisi nunc iaculis. Laoreet eget eu lacus cursus odio
  quam ut elementum. Faucibus cursus in placerat enim non senectus. In
  molestie volutpat at sem bibendum ac id. Suspendisse erat malesuada
  vulputate et congue blandit in erat ornare. Rhoncus interdum.
</LdNotice>

<!-- CSS component -->

<div class="ld-notice ld-notice--success">
  <!-- Note that you can use an img element with the class ld-notice__icon here, as well. -->
  <svg class="ld-notice__icon ld-icon ld-icon--lg" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="14" height="14" rx="3" stroke="currentcolor" stroke-width="2"/><circle cx="8" cy="8" r="3" stroke="currentColor" stroke-width="2"/></svg>
  <p class="ld-notice__headline ld-typo--h4">With custom icon</p>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Metus
  pellentesque facilisi nunc iaculis. Laoreet eget eu lacus cursus odio
  quam ut elementum. Faucibus cursus in placerat enim non senectus. In
  molestie volutpat at sem bibendum ac id. Suspendisse erat malesuada
  vulputate et congue blandit in erat ornare. Rhoncus interdum.
</div>
{% endexample %}


<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                              | Type                                          | Default     |
| ---------- | ---------- | -------------------------------------------------------- | --------------------------------------------- | ----------- |
| `headline` | `headline` | Headline of the notice.                                  | `string`                                      | `undefined` |
| `key`      | `key`      | for tracking the node's identity when working with lists | `string \| number`                            | `undefined` |
| `mode`     | `mode`     | Mode of the notice.                                      | `"error" \| "info" \| "success" \| "warning"` | `'info'`    |
| `ref`      | `ref`      | reference to component                                   | `any`                                         | `undefined` |


## Shadow Parts

| Part         | Description                             |
| ------------ | --------------------------------------- |
| `"headline"` | `ld-typo` element used for the headline |
| `"icon"`     | Image tag used for the icon             |


## Dependencies

### Used by

 - [ld-file-upload](../ld-file-upload)

### Depends on

- [ld-icon](../ld-icon)
- [ld-typo](../ld-typo)

### Graph
```mermaid
graph TD;
  ld-notice --> ld-icon
  ld-notice --> ld-typo
  ld-file-upload --> ld-notice
  style ld-notice fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
