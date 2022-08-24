---
eleventyNavigation:
  key: CSS vs. Web Components
  parent: Guides
  order: 1
layout: layout.njk
title: CSS vs. Web Components
permalink: guides/css-vs-web-components/
---

# CSS vs. Web Components

Liquid ships both, CSS Components and Web Components. For instance, you can use the [`ld-button`](components/ld-button/) Web Component or its CSS Component counterpart:

<link rel="stylesheet" href="css_components/ld-button.css">

{% example '{ "opened": true }' %}
<ld-button>Text</ld-button>
<button class="ld-button">Text</button>
{% endexample %}

Both look the same, so which one should you use?

## When to use what

There are a few points to concider, when deciding on one of the two options or a mix of both:

- **Convenience**: Most Liquid Web Components are much more "compact" when it comes to the amount of code that you have to write than with their CSS counterparts. Your code becomes more readable. Additionally, you may benefit from [type checking and intellisense](guides/type-checking-and-intellisense/).

- **Accessibility**: Some Web Components handle accessibility issues under the hood. For instance, the [`ld-typo`](components/ld-typo/) Web Component applies an `aria-label` automatically when used with uppercase heading variants. With CSS Components you have to deal with such things yourself.

- **Encapsulation**: Shadow DOM shields Web Components from their surrounding environment. This means that when you use Liquid's Web Components, you do not need to be concerned about exidently overriding Liquid's CSS (except for CSS custom props), nor worry about our internal DOM being interfered with anything outside the component. CSS Components on the other hand give a bit more freedom when it comes to customization.

- **Functionality / feature set**: We always try to offer both, a Web Component and an equivalent CSS Component, but it is not always possible to achieve the same feature set when not having JavaScript to our disposal. CSS can do only so much. Therefore, some more complex components offer more features as Web Components, while coming with a lighweight / less feature rich CSS Component fallback. 

- **Performance**: Web Components always come with a performance cost, because they require JavaScript to load and execute in the browser. If you are experiencing performance issues because you are using lots of Web Components on one single page (i.e. rendering a long list / table with components in each row and cell), you may concider either re-thinking your UI or using CSS Components.

With all that in mind, you'll need to make a choice case by case.

<docs-page-nav prev-href="guides/" next-title="Component assets" next-href="guides/component-assets/"></docs-page-nav>