---
eleventyNavigation:
  key: CSS vs. Web Components
  parent: Liquid
  order: 2
layout: layout.njk
title: CSS vs. Web Components
permalink: liquid/css-vs-web-components/
---

# CSS vs. Web Components

Liquid ships both, CSS Components and Web Components. For instance, you can use the [`ld-button`](components/ld-button/) Web Component or its CSS Component counterpart:

{% example 'html', false, true %}
<ld-button>Text</ld-button>
<button class="ld-button">Text</button>
{% endexample %}

Both look the same, so which one should you use?

## When to use what

There are a few points to concider, when deciding on one of the two options or a mix of both:

- **Convenience**: Most Liquid Web Components are much more "compact" when it comes to the amount of code that you have to write than with their CSS counterparts. Your code becomes more readable. Additionally, you may benefit from [type checking and intellisense](liquid/type-checking-and-intellisense/).

- **Accessibility**: Some components handle accessibility issues under the hood. For instance, the [`ld-heading`](components/ld-heading/) component applies an `aria-label` automatically when used with uppercase heading levels. With CSS Components you have to deal with such things yourself.

- **Functionality / feature set**: We always try to offer both, a Web Component and an equivalent CSS Component, but it is not always possible to achieve the same feature set when not having JavaScript to our disposal. CSS can do only so much. Therefore, some more complex components offer more features as Web Components, while coming with a lighweight / less feature rich CSS Component fallback. 

- **Performance**: Web Components always come with a performance cost, because they require JavaScript to load and execute in the browser. If you are experiencing performance issues because you are using lots of Web Components on one single page (i.e. rendering a long list / table with components in each row and cell), you may concider either re-thinking your UI or using CSS Components.

With all that in mind, you'll need to make a choice case by case.

<docs-page-nav prev-href="liquid/getting-started/" next-title="Component assets" next-href="liquid/components-assets/"></docs-page-nav>