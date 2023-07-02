---
eleventyNavigation:
  key: FAQ
  parent: Guides
  order: 13
layout: layout.njk
title: FAQ
permalink: guides/faq/
---

# FAQ

## Do I have the legal rights to use Liquid Oxygen?

Liquid Oxygen is available under a [custom license](legal/license/) which restricts its usage to applications created for or by Merck KGaA, Darmstadt, Germany as well as its vendors. TLDR: If you develop for or have received written consent from Merck KGaA, Darmstadt, Germany, you're good to go.

## Why should I use Liquid Oxygen?

[Here is why](introduction/why-liquid/).

## Can I use Liquid Oxygen with framework X?

As long as your tech stack is based on HTML, CSS and JavaScript, you can use Liquid Oxygen, no matter what framework or library you use.

## Which browsers are supported?

In general, Liquid Oxygen supports all modern evergreen browsers. Liquid Oxygen does **not** support IE11. For details, check out the browserslist prop in the [package.json](https://github.com/emdgroup-liquid/liquid/blob/main/package.json) file.

## What is Shadow DOM?

[Shadow DOM](https://developers.google.com/web/fundamentals/web-components/shadowdom) is an API built into the browser that allows for DOM encapsulation and style encapsulation, meaning that it allows shielding Web Components from their surrounding environment. This means that when you use Liquid's Web Components, you do not need to be concerned about accidently overriding Liquid's CSS, nor worry about our internal DOM being interfered with anything you do outside the component.

## Can I customize Liquid Oxygen?

While we do not recommend customizing Liquid Oxygen components or globals for reasons related to the consistency of a design system, we also (from our own experience) understand the need to be able to tweek things. Technically you can customize all components. Even all Web Components can be customized to a certain degree, through extention, [`::part` CSS pseudo-elements](https://developer.mozilla.org/en-US/docs/Web/CSS/::part) or by leveraging existing CSS custom props. 

## What happened to liquid-design-react?

Liquid Oxygen is the successor of liquid-design-react which is still available on [GitLab](https://gitlab.com/liquid-design/liquid-design-react/) and [npm](https://www.npmjs.com/package/@liquid-design/liquid-design-react). While liquid-design-react still can be used in existing projects, we recommend Liquid Oxygen for new projects as it comes with significant improvents, especially with regard to accessibility and interoperability.

## Can Liquid Oxygen components be combined with the liquid-design-react library?

Yes, Web Components and CSS Components are both standards conform and can be used in your React app alongside the older components. Both libraries are tree-shakable. We recommend you to iteratively replace older components with those from Liquid Oxygen, if you plan on maintaining your project for a longer period of time.

## Can I personally contribute to Liquid Oxygen?

Absolutely! Liquid Oxygen is not only open for contributions and feedback but also prioritizes its backlog according to the input from the community. If you feel you need a specific component badly, you can either contribute to the project directly or create a feature request. If you'd like to get involved, check out our [contributing docs](https://github.com/emdgroup-liquid/liquid/blob/main/CONTRIBUTING.md).

<docs-page-nav prev-href="guides/troubleshooting/" next-title="Contributing" next-href="guides/contributing/"></docs-page-nav>
