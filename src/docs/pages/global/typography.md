---
eleventyNavigation:
  key: Typography
  parent: Globals
layout: layout.njk
title: Typography
permalink: global/typography/
---

# Typography

The typography globals consist of CSS custom properties, which you can use to either apply a `font-family` or a `font` value (combining `font-size`, `line-height` and `font-family`) and a text-rendering setting.

<ld-notice headline="Note" mode="warning">
  <ld-link href="https://developer.mozilla.org/en-US/docs/Web/CSS/text-rendering" target="_blank">text-rendering</ld-link> is set to <code>geometricPrecision</code> by default. If you run into performance issues on text-heavy pages, set the CSS custom property <code>--ld-text-rendering</code> to <code>auto</code> on the <code>body</code> tag.
</ld-notice>

In most cases you will probably want to simply use components though, which themselves make use of global typography CSS custom properties, such as the [`ld-typo`](components/ld-typo/) component.

The list below shows you all available typography related CSS custom properties available after [importing Liquid stylesheets](introduction/getting-started/#import-stylesheets) and the effect they have on text.

<ld-notice mode="warning">
  Please be aware of our brand guidelines regarding typography.
  <br />
  For more information visit <a href="https://brand-hub.merckgroup.com/en/design-basics/typography.html" rel="noreferrer noopener" target="_blank">Brand Hub: Typography</a>.
</ld-notice>

<ld-notice headline="Note" mode="warning">
  Using one of the properties listed below alone does not guarantee typography as intended by the Liquid Design System. For instance, you need to combine all <code>--ld-typo-b*</code> and <code>--ld-typo-xb*</code> fonts with <code>text-transform: uppercase;</code>, use a color other than black and apply an <code>aria-label</code> in order to conform with the Liquid Design System and its accessibility requirements. The examples below have been altered accordingly.
</ld-notice>

## Available CSS custom properties

<docs-typography var="--ld-font-body" prop="font-family" val="Lato, Helvetica, Arial, sans-serif"></docs-typography>
<docs-typography brand var="--ld-font-display" prop="font-family" val="MWeb, Helvetica, Arial, sans-serif"></docs-typography>
<docs-typography brand var="--ld-typo-b1" val="3rem/120% MWeb, Helvetica, Arial, sans-serif"></docs-typography>
<docs-typography brand var="--ld-typo-b2" val="2.5rem/120% MWeb, Helvetica, Arial, sans-serif"></docs-typography>
<docs-typography brand var="--ld-typo-b3" val="2.25rem/120% MWeb, Helvetica, Arial, sans-serif"></docs-typography>
<docs-typography brand var="--ld-typo-b4" val="2rem/120% MWeb, Helvetica, Arial, sans-serif"></docs-typography>
<docs-typography brand var="--ld-typo-b5" val="1.625rem/120% MWeb, Helvetica, Arial, sans-serif"></docs-typography>
<docs-typography brand var="--ld-typo-b6" val="1.375rem/120% MWeb, Helvetica, Arial, sans-serif"></docs-typography>
<docs-typography var="--ld-typo-h1" val="700 2rem/140% Lato, Helvetica, Arial, sans-serif"></docs-typography>
<docs-typography var="--ld-typo-h2" val="700 1.625rem/140% Lato, Helvetica, Arial, sans-serif"></docs-typography>
<docs-typography var="--ld-typo-h3" val="700 1.375rem/140% Lato, Helvetica, Arial, sans-serif"></docs-typography>
<docs-typography var="--ld-typo-h4" val="700 1.125rem/140% Lato, Helvetica, Arial, sans-serif"></docs-typography>
<docs-typography var="--ld-typo-h5" val="700 1rem/140% Lato, Helvetica, Arial, sans-serif"></docs-typography>
<docs-typography var="--ld-typo-h6" val="700 0.875rem/140% Lato, Helvetica, Arial, sans-serif"></docs-typography>
<docs-typography brand var="--ld-typo-xb1" val="5.75rem/120% MWeb, Helvetica, Arial, sans-serif"></docs-typography>
<docs-typography brand var="--ld-typo-xb2" val="4.5rem/120% MWeb, Helvetica, Arial, sans-serif"></docs-typography>
<docs-typography brand var="--ld-typo-xb3" val="4rem/120% MWeb, Helvetica, Arial, sans-serif"></docs-typography>
<docs-typography var="--ld-typo-xh1" val="700 5.75rem/120% Lato, Helvetica, Arial, sans-serif"></docs-typography>
<docs-typography var="--ld-typo-xh2" val="700 4.5rem/120% Lato, Helvetica, Arial, sans-serif"></docs-typography>
<docs-typography var="--ld-typo-xh3" val="700 4rem/120% Lato, Helvetica, Arial, sans-serif"></docs-typography>
<docs-typography var="--ld-typo-xh4" val="700 3rem/120% Lato, Helvetica, Arial, sans-serif"></docs-typography>
<docs-typography var="--ld-typo-xh5" val="700 2.5rem/120% Lato, Helvetica, Arial, sans-serif"></docs-typography>
<docs-typography var="--ld-typo-xh6" val="700 2.25rem/120% Lato, Helvetica, Arial, sans-serif"></docs-typography>
<docs-typography var="--ld-typo-body-l" val="1.125rem/160% Lato, Helvetica, Arial, sans-serif"></docs-typography>
<docs-typography var="--ld-typo-body-m" val="1rem/160% Lato, Helvetica, Arial, sans-serif"></docs-typography>
<docs-typography var="--ld-typo-body-s" val="0.875rem/176% Lato, Helvetica, Arial, sans-serif"></docs-typography>
<docs-typography var="--ld-typo-body-xl" val="1.375rem/160% Lato, Helvetica, Arial, sans-serif"></docs-typography>
<docs-typography var="--ld-typo-body-xs" val="0.75rem/180% Lato, Helvetica, Arial, sans-serif"></docs-typography>
<docs-typography var="--ld-typo-cap-l" val="700 1.25rem/140% Lato, Helvetica, Arial, sans-serif"></docs-typography>
<docs-typography var="--ld-typo-cap-m" val="700 0.875rem/140% Lato, Helvetica, Arial, sans-serif"></docs-typography>
<docs-typography var="--ld-typo-label-m" val="1rem/140% Lato, Helvetica, Arial, sans-serif"></docs-typography>
<docs-typography var="--ld-typo-label-s" val="700 0.875rem/140% Lato, Helvetica, Arial, sans-serif"></docs-typography>
