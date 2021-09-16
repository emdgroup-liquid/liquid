# Contributing to Liquid

First off, thanks for considering making a contribution to Liquid! 👍

The following is a set of guidelines for contributing to Liquid.
They are not rules. So use your best judgment, and feel free to propose changes to this document in a pull request.

## Table of contents

[Code of Conduct](#code-of-conduct)

[I don't want to read this whole thing, I just have a question!!!](#i-dont-want-to-read-this-whole-thing-i-just-have-a-question)

[What should I know before I get started?](#what-should-i-know-before-i-get-started)
* [Project structure](#project-structure)
* [Conventions](#conventions)
* [How to run tests](#how-to-run-tests)
* [Relevant resources](#relevant-resources)

[How can I contribute?](#how-can-i-contribute)
* [Reporting bugs](#reporting-bugs)
* [Suggesting enhancements](#suggesting-enhancements)
* [Your first code contribution](#your-first-code-contribution)
* [Pull requests](#pull-requests)

[Additional notes](#additional-notes)
* [Issue and pull request labels](#issue-and-pull-request-labels)

## Code of conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [liquid@emdgroup.com](liquid@emdgroup.com).

## I don't want to read this whole thing I just have a question!!!

> **Note:** Please don't file an issue to ask a question. You'll get faster results by using the resources below.

We have official channels where the community chimes in with helpful advice if you have questions.

* [Liquid on GitHub discussions](https://github.com/emdgroup-liquid/liquid/discussions)
* [Liquid on Teams](https://teams.microsoft.com/l/channel/19%3ab5381a933c6c413ea0ae41c3b424acd8%40thread.skype/Liquid%2520Design%2520System?groupId=babb6c18-c13f-43ef-baf2-ce1617f228cd&tenantId=db76fb59-a377-4120-bc54-59dead7d39c9)

## What should I know before I get started?

### Project structure

This project consists of different parts and pieces, each with its own purpose. Let's get you familiar with those parts and pieces, so that you find your way quicker to the relevant spot that you would like to contribute to.

```
.
├── README.md
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md           # You are looking at it.
├── LICENSE.md
├── .eleventy.js              # Liquid's docs site is powered by 11ty. See https://www.11ty.dev/
├── .eleventyignore           # We only want docs to be generate for the src folder, so we ignore
│                             # everything else using this file.
├── .env                      # The .env file is not under version control. It contains sensitive
│                             # data, such as credentials used to authenticate oneself against
│                             # an API. We currenly do this for fetching design tokens from Figma.
├── .eslintrc.js              # eslint is used for linting ts and tsx files. Please make sure to
│                             # enable eslint in your code editor of choice.
├── .github
│   └── workflows/ci-cd.yml   # CI/CD pipeline config file.
├── .npmignore                # The .npmignore file is used to keep package size to a minimum.
├── .prettierrc.json          # prettier ensures a consistent code style. Please make sure to
│                             # enable prettier in your code editor of choice.
├── .releaserc.js             # Config file for semantic-release.
│                             # See https://semantic-release.gitbook.io/semantic-release/
├── Dockerfile                # You can startup your dev environment in a Docker container.
│                             # This may come in handy for Windows users who encounter problems.
│                             # More about this below.
├── commitlint.config.js      # We use conventional commits and semantic release.
│                             # More about this below.
├── dist                      # Here is the main juice which gets published to npm.
├── dist_docs                 # This folder is served during development. It contains the docs site
│                             # as well as the necessary liquid distribution.
├── jest.config.a11y.js       # This Jest config file is used for accessibility testing with pa11y.
│                             # Note that accessibility tests run in their own process and not
│                             # in the same process as regular Stencil unit or e2e tests.
├── pa11y.json                # Config file for accessibility testing with pa11y.
├── package.json              # Please have a look at the scripts section inside the package.json file.
│                             # You can also run `npm run` to get a list of all available commands.
├── postcss.config.docs.js    # PostCSS config file for the docs site CSS processing.
├── postcss.config.js         # PostCSS config file for Liquid CSS processing.
├── screenshot                # This directory contains files related to visual regression testing
│                             # with Stencil. See https://stenciljs.com/docs/screenshot-visual-diff
├── scripts                   # Contains bash or node script files executed via npm script commands.
├── src                       # Well, that's the source folder. You probably guessed it.
│   ├── docs                  # Everything inside this folder is for developing the docs site.
│   │   ├── assets            # Static assets for the docs page reside here.
│   │   ├── components        # Docs components live here.
│   │   ├── global            # Docs global styles live here.
│   │   ├── includes
│   │   │  └── layout.njk     # The docs site is powered by 11ty. This is the default (and only)
│   │   │                     # 11ty layout file for the docs site. See https://www.11ty.dev/docs/layouts/
│   │   ├── layouts           # There is one layout component which lives inside this folder.
│   │   ├── pages             # This folder contains markdown files for general documentation pages, 
│   │   │                     # legal stuff and the 404 page.
│   │   └── utils             # Docs util files shared by the docs components live here.
│   └── liquid                # Everything inside this folder is for developing Liquid components.
│       ├── components        # This folder contains all Liquid components including tests and docs.
│       ├── global            # Here we have global styles. Mainly CSS custom properties, such as
│       │                     # variables for colors, typography, spacings, shadows etc.
│       │                     # Note that most of these files are auto-generated using design tokens.
│       └── utils             # Contains utilities shared between components.
├── stencil.config.docs.ts    # Stencil config file for the docs site.
├── stencil.config.ts         # Stencil config file for Liquid components.
├── stylelint.config.js       # Stylelint config file. See section about linting further below.
├── tsconfig.docs.json        # Typescript config file for components used for the docs site.
├── tsconfig.json             # Typescript config file for Liquid components.
└── yarn.lock                 # Oh, yes, we use yarn.
```

That's all. As you can see, Liquid currenly has a straight forward project structure:
One repo, one package.json, no workspaces, no learna, just two folders inside ./src/, one for the docs site and another for the components.

### Conventions

#### Code style

You probably noticed by now that we use [eslint](https://eslint.org/), [prettier](https://prettier.io/) and [stylelint](https://stylelint.io/) in this project to enforce some code style conventions. Please make sure to enable these tools in your code editor of choice.

Some things are not linted but still are important:

- We prefix Liquid components with `ld-` and docs components with `docs-`.
- We use [BEM](http://getbem.com/introduction/) as a methodology for organizing CSS rules.
- We use relative length units in CSS, mostly `rem`; absolute length units should be avoided (borders and outlines may count as an exception to the rule).
- We mostly do not make use of Shadow DOM because it introduces quirks in regard to accessibiliy, makes pure CSS theming difficult, does not allow for a straight forward customization and makes it hard to purge unused CSS; hense we depend on namespacing. Though, not using Shadow DOM comes as well with disadvanteges we cannot neglegt: When rendering a `<slot>` with Shadow DOM disabled, Stencil needs to move slotted content around in the DOM, which is costly (performance-wise). Therefore, if a Web Component is using slots, but not Shadow DOM, it should at least come with a CSS Component fallback for cases where performance matters; if it is not possible to mimic the Web Component with a CSS counterpart, we use Shadow DOM.
- Components which **do** use Shadow DOM should have their CSS file suffixed with .shadow.css so that PostCSS is aware of it and does not include them into the liquid.css dist file.
- When ever possible, try to provide CSS components alongside Web components using the same CSS file; again, prefix the classes with `ld-`, use BEM and do **not** use Shadow DOM. Here is an example: 
  ```tsx
  import { Component, h } from '@stencil/core'
  @Component({
    tag: 'ld-my-component',
    styleUrl: 'ld-my-component.css',
    shadow: false,
  })
  export class LdMyComponent {
    render() {
      return (
        <div class="ld-my-component">
          <slot />
        </div>
      )
    }
  }
  ```
  It applies the CSS class `ld-button` to its root element. Now the consuming developer can decide on either using the WebComponent `<ld-button>Submit</ld-button>` or the CSS class directly `<button class="ld-button">Submit</ld-button>`.
- When writing CSS, we follow common best practices. We try to keep the CSS specificity to a minimum, in order to simplify component customization, but we also make sure that it's not low to an extent, where styles get overwritten by other libraries' reset or normalize styles (such as Tailwind's [Preflight](https://tailwindcss.com/docs/preflight)). In other words: If you're using the CSS `:where` trick to reduce CSS speceficity to zero, make sure the properties affected are not potential candidates for reset and normalize styles.
- Themable components should support at least one level of [theme inception](/liquid/components/ld-theme/#theme-inception).
- Due to an issue in stencil type declarations need to be either inlined or exported, as otherwise undefined types end up in the generated components.d.ts file. 
- In order for camelcase props to work in React based apps, we create lowercase aliases in components, which have camelcase props, by adding the `@Element()` decorator to the component, making all camelcase props mutable and calling the utility function `applyPropAliases` in the `componentWillLoad` hook: 
  ```tsx
  import { Component, h } from '@stencil/core'
  import { applyPropAliases } from '../../utils/applyPropAliases'
  @Component({
    tag: 'ld-my-component',
    styleUrl: 'ld-my-component.css',
    shadow: false,
  })
  export class LdMyComponent {
    @Element() el: HTMLDivElement
    @Prop({ mutable: true })
    myCamelcaseProp: string
    componentWillLoad() {
      applyPropAliases.apply(this)
    }
    render() {
      return (
        <div class="ld-my-component">
          <slot />
        </div>
      )
    }
  }
  ```
- We enable type checking and intelliSense for Web Component attributes by importing the autogenerated components type definitions file (src/components.d.ts) at the top of all imports in each component: 
  ```tsx
  import '../../components' // type definitions for type checks and intelliSense
  ```

We also use [husky](https://typicode.github.io/husky/) for running Git hooks which in turn run lint tasks
before you commit or push something. Which brings us to the next point...

#### Commit messages

Commit messages are linted with [commitlint](https://commitlint.js.org/) and should adhere to
the [Conventional Commits](https://www.conventionalcommits.org/) specification. This ensures that
[semantic release](https://semantic-release.gitbook.io), which we use for automated release management,
works as it is supposed to. Please [squash commits](https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History#_squashing) which together solve a specific task before submitting a pull request. This not only ensures a clean Git history, but also a clean changelog which is generated by semantic release automatically upon release. 
#### Branch names

Branch names are linted using the following regular expression before push:

```
^((feat|fix|hotfix|build|chore|ci|docs|style|refactor|perf|test)\/([a-z0-9._-]+)|develop|main|rc)$
```

### How to run tests

There are multiple commands available as npm scripts for running different kinds of tests:
Unit tests and functional (e2e) tests and visual regression tests (using screenshots) are [handled by Stencil](https://stenciljs.com/docs/testing-overview).

Accessibility tests are a bit special: You recognize accessibility test files by their suffix `.a11y.ts`. These tests are executed in a separate process using [puppeteer](https://pptr.dev) and [pa11y](https://pa11y.org) and require the docs to be built beforhand. If you look at pa11y.json, you will find an option which is responsible for hiding irrelevant stuff from the docs which shall not be tested using CSS selectors. One note regarding automated accessibility testing:

> Automated accessibility testing helps comply with accessibility guidelines but does not guarantee that a website or app is accessible. You still need to perform manual testing using screen readers and involve disabled users in user testings. 
You execute tests either by running one of the npm scripts which start with `test` (see package.json) or by executing the respective test commands directly with the options needed. Please refer to the docs of each test runner in question for available options.

### Relevant resources

If you want to dive deeper into the technology stack used in this project,
here is a list of links to selected documentation sites and articles we found valuable:

- https://stenciljs.com
- https://www.11ty.dev
- https://postcss.org
- https://pa11y.org
- https://jestjs.io
- https://pptr.dev
- https://yarnpkg.com
- https://semantic-release.gitbook.io
- https://www.conventionalcommits.org
- https://developer.mozilla.org/en-US/docs/Web/Web_Components
- https://dev.to/richharris/why-i-don-t-use-web-components-2cia
- https://custom-elements-everywhere.com
- http://getbem.com/introduction
- https://webaim.org/articles/screenreader_testing

Let us know if we should add something! 🤓

## How can I contribute?

### Reporting bugs

This section guides you through submitting a bug report for Liquid. Following these guidelines helps maintainers and the community understand your report :pencil:, reproduce the behavior :computer: :computer:, and find related reports :mag_right:.

Before creating bug reports, please check [this list](#before-submitting-a-bug-report) as you might find out that you don't need to create one. When you are creating a bug report, please [include as many details as possible](#how-do-i-submit-a-good-bug-report). Fill out [the required template](https://github.com/emdgroup-liquid/liquid/blob/main/.github/ISSUE_TEMPLATE/bug_report.md), the information it asks for helps us resolve issues faster.

> **Note:** If you find a **closed** issue that seems like it is describing the same thing that you're experiencing, open a new issue and include a link to the original issue in the body of your new one. **Please don't comment on closed issues.** Instead, create a new bug report issue. If you prefer to discuss with others before, you can start a discussion on [GitHub discussions](https://github.com/emdgroup-liquid/liquid/discussions) or our
> [Teams channel](https://teams.microsoft.com/l/channel/19%3ab5381a933c6c413ea0ae41c3b424acd8%40thread.skype/Liquid%2520Design%2520System?groupId=babb6c18-c13f-43ef-baf2-ce1617f228cd&tenantId=db76fb59-a377-4120-bc54-59dead7d39c9).

#### Before submitting a bug report

* Most importantly, check if you can reproduce the problem **in the latest version of Liquid**.
* **Perform a search in [existing issues](https://github.com/emdgroup-liquid/liquid/issues)** to see if the problem has already been reported. If it has **and the issue is still open**, upvote the issue report or add a comment to the existing issue, if you think it contains relevant information which will help resolve it, instead of opening a new one.

#### How do I submit a (good) bug report?

Bugs are tracked as [GitHub issues](https://guides.github.com/features/issues/). Create an issue and provide the following information by filling in [the template](https://github.com/emdgroup-liquid/liquid/blob/main/.github/ISSUE_TEMPLATE/bug_report.md).

Explain the problem and include additional details to help maintainers reproduce the problem:

* **Use a clear and descriptive title** for the issue to identify the problem.
* **Describe the exact steps which reproduce the problem** in as many details as possible. When listing steps, **don't just say what you did, but explain how you did it**. * **Provide specific examples to demonstrate the steps**. Include links to files or GitHub projects, or copy/pasteable snippets, which you use in those examples. If you're providing snippets in the issue, use [Markdown code blocks](https://help.github.com/articles/markdown-basics/#multiple-lines).
* **Describe the behavior you observed after following the steps** and point out what exactly is the problem with that behavior.
* **Explain which behavior you expected to see instead and why.**
* **Include screenshots and animated GIFs** which show you following the described steps and clearly demonstrate the problem. If you use the keyboard while following the steps, **record the GIF with the [Keybinding Resolver](https://github.com/atom/keybinding-resolver) shown**. You can use [this tool](https://www.cockos.com/licecap/) to record GIFs on macOS and Windows, and [this tool](https://github.com/colinkeenan/silentcast) or [this tool](https://github.com/GNOME/byzanz) on Linux.
* **If the problem wasn't triggered by a specific action**, describe what you were doing before the problem happened and share more information using the guidelines below.

Provide more context by answering these questions:

* **Did the problem start happening recently** (e.g. after updating to a new version of Liquid)?
* If the problem started happening recently, **can you reproduce the problem in an older version of Liquid?** What's the most recent version in which the problem doesn't happen?
* **Can you reliably reproduce the issue?** If not, provide details about how often the problem happens and under which conditions it normally happens.

Include details about your configuration and environment:

* **Which version of Liquid are you using?** You can get the exact version by running `npm list @emdgroup-liquid/liquid` inside the working directory of your project.
* **Which browser are you using?**
* **Which browser extensions are installed? Can you reproduce the issue in incognito mode?**
* **What's the name and version of the OS you're using**?
* **Are you running Liquid docs using the provided Dockerfile in a docker container?**
* **Which other framework/libraries are you using that may be involved in the issue?** Please check https://stenciljs.com/docs/overview for possible known quirks.

### Suggesting enhancements

This section guides you through submitting an enhancement suggestion for Liquid, including completely new features and minor improvements to existing functionality. Following these guidelines helps maintainers and the community understand your suggestion :pencil: and find related suggestions :mag_right:.

Before creating enhancement suggestions, please check [this list](#before-submitting-an-enhancement-suggestion) as you might find out that you don't need to create one. When you are creating an enhancement suggestion, please [include as many details as possible](#how-do-i-submit-a-good-enhancement-suggestion). Fill in [the template](https://github.com/emdgroup-liquid/liquid/blob/main/.github/ISSUE_TEMPLATE/feature_request.md).

> **Note:** This repository is using __lodash style issue management for enhancements__. This means:
> 
> - Feature requests are closed issues with `feature` label and `votes needed` label.
> - Bugs are open issues tagged with the `bug` label.
> 
> View the enhancement backlog [here](https://github.com/emdgroup-liquid/liquid/issues?utf8=✓&q=label%3Aneeds-votes+sort%3Areactions-%2B1-desc+). Upvote the top comment of an issue with 👍 if you want the enhancement to be prioritised higher.

#### Before submitting an enhancement suggestion

* Most importantly, check if you're using **the latest version of Liquid**.
* **Perform a search in the [enhancement backlog](https://github.com/emdgroup-liquid/liquid/issues?utf8=✓&q=label%3Aneeds-votes+sort%3Areactions-%2B1-desc+)** to see if a similar enhancement has already been suggested. If it has and the issue is still open or if it's closed and has the **votes needed** label, upvote the suggested enhancement or add a comment, if you think it contains relevant information which will help drive it forward, instead of opening a new one. If you prefer to discuss with others before, you can start a discussion on [GitHub discussions](https://github.com/emdgroup-liquid/liquid/discussions) or our [Teams channel](https://teams.microsoft.com/l/channel/19%3ab5381a933c6c413ea0ae41c3b424acd8%40thread.skype/Liquid%2520Design%2520System?groupId=babb6c18-c13f-43ef-baf2-ce1617f228cd&tenantId=db76fb59-a377-4120-bc54-59dead7d39c9).

#### How do I vote on an existing enhancement suggestion?

Click on the reaction icon in the upper right corner of the enhancement suggestion. Pick the 👍 or the 👎 reaction. The maintainers of the repository will use reactions as a metric for prioritising their tasks (i.g. using `is:issue label:needs-votes sort:reactions-+1-desc ` as the issue search query).

#### How do I submit a (good) enhancement suggestion?

Enhancement suggestions are tracked as [GitHub issues](https://guides.github.com/features/issues/). Create an issue provide the following information:

* **Use a clear and descriptive title** for the issue to identify the suggestion.
* **Provide a step-by-step description of the suggested enhancement** in as many details as possible.
* **Provide specific examples to demonstrate the steps**. Include copy/pasteable snippets which you use in those examples, as [Markdown code blocks](https://help.github.com/articles/markdown-basics/#multiple-lines).
* **Describe the current behavior** and **explain which behavior you expected to see instead** and why.
* **Include screenshots and animated GIFs** which help you demonstrate the steps or point out the part of Liquid which the suggestion is related to. You can use [this tool](https://www.cockos.com/licecap/) to record GIFs on macOS and Windows, and [this tool](https://github.com/colinkeenan/silentcast) or [this tool](https://github.com/GNOME/byzanz) on Linux.
* **Explain why this enhancement would be useful** to most Liquid users and isn't something that can or should be implemented as a separate community package.
* **List some other UI libraries or applications where this enhancement exists.**
* **Specify which version of Liquid you're using.** You can get the exact version by running `npm list @emdgroup-liquid/liquid` inside the working directory of your project.
* **Specify the name and version of the browser you're using.**
* **Specify the name and version of the OS you're using.**

### Your first code contribution

Unsure where to begin contributing to Liquid? You can start by looking through `beginner` and `help wanted` issues:

* [Beginner issues](https://github.com/emdgroup-liquid/liquid/issues?q=is%3Aopen+label%3Abeginner+sort%3Acomments-desc) - issues which should only require a few lines of code, and a test or two.
* [Help wanted issues](https://github.com/emdgroup-liquid/liquid/issues?q=is%3Aopen+label%3A"help+wanted"+sort%3Acomments-desc) - issues which should be a bit more involved than `beginner` issues.

Both issue lists are sorted by total number of comments. While not perfect, number of comments is a reasonable proxy for impact a given change will have.

#### Local development

1. [Node.js](https://nodejs.org/en/) and [Git](https://git-scm.com/) and [Yarn](https://yarnpkg.com/)
need to be installed on your machine.
2. Install dependencies by executing `yarn` inside the project folder.
3. Start up the local development server with `yarn start`.
4. Now head over to [localhost:8080](http://localhost:8080) - you shoud see the Liquid docs site (on first build it may take a while until it shows up - relax and be patient).  
> **If you are on a Windows machine**, you might need to startup the dev environment in a Docker container due to an [unresolved issue in Stencil](https://github.com/ionic-team/stencil/issues/2319) seeing _"Component tag name must be unique"_ in your command line app. So install [Docker](https://www.docker.com/products/docker-desktop) and execute the following command once inside the project folder to build a container for your dev environment: `docker build -t liquid .` Now you can start up the dev environment inside the Docker container: `docker run -p 8080:8080 liquid` If you can not or do not want to use Docker, you can still work around the _"Component tag name must be unique"_ issue by deleting the dist folder. Note though, that it may eventually be recreated, for instance if you run tests.

### Pull requests

The process described here has several goals:

- Maintain Liquid's quality
- Fix problems that are important to users
- Engage the community in working toward the best possible Liquid
- Enable a sustainable system for Liquid's maintainers to review contributions

Please follow these steps to have your contribution considered by the maintainers:

1. Follow all instructions in [the template](https://github.com/emdgroup-liquid/liquid/blob/main/.github/PULL_REQUEST_TEMPLATE/pull_request_template.md)
2. Follow the [conventions](#conventions)
3. After you submit your pull request, verify that all [status checks](https://help.github.com/articles/about-status-checks/) are passing. <details><summary>
What if the status checks are failing?</summary> If a status check is failing, and you believe that the failure is unrelated to your change, please leave a comment on the pull request explaining why you believe the failure is unrelated. A maintainer will re-run the status check for you. If we conclude that the failure was a false positive, then we will open an issue to track that problem with our status check suite.</details>

While the prerequisites above must be satisfied prior to having your pull request reviewed, the reviewer(s) may ask you to complete additional design work, tests, or other changes before your pull request can be ultimately accepted.

## Additional notes

### Issue and pull request labels

This section lists the labels we use in order to help us track and manage issues and pull requests.

| Label                    | Description                    |
|--------------------------|--------------------------------|
| accepted                 | Issues with this label are issues that the core team has accepted on to the roadmap. |
| accessibility            | An issue concerning accessibility. |
| beginner                 | Good for newcomers to the project. |
| blocked                  | The issue cannot be resolved until some other issue has been closed. |
| bug                      | An issue describing unexpected or malicious behaviour. |
| confirmed                | This label indicates that the issue has been reproduced and verified by the core team. |
| design                   | Issues related to the visual design of liquid. |
| discussion               | Discussions should not happen in issues. If they do... well, we have a label for that. |
| documentation            | Improvements or additions to documentation |
| duplicate                | This issue or pull request already exists. |
| feature                  | Issues that describe new features. |
| help wanted              | Core maintainers are asking for help from the community. |
| improvement              | Not a bug nor a feature. Refactoring of code would likely have this label. |
| needed: design decision  | Issues that need a design decision are blocked for development. |
| needed: documentation    | If something is lacking documentation, this label will be assigned. |
| needed: more information | This label indicates that a reply with more information is required from the issue reporter. |
| needed: replication      | This label indicates that a bug has been reported, but has not been successfully replicated yet. |
| needed: tests            | This label indicates that a better test coverage is required to resolve the issue. |
| priority: high           | Issues with this label should be resolved as quickly as possible. |
| priority: low            | Issues with this label won’t have the immediate focus of the core team. |
| question                 | Not really an issue but more a question. |
| semantic-release         | Added by semantic-release bot. |
| stale                    | There's been no activity for 60 days. The issue will be closed after 2 weeks unless active again. |
| umbrella issue           | An umbrella issue contains multiple issues and needs to be split into separate issues eventually. |
| upstream                 | Used to label issues which require a fix upstream (fixing an issue of a dependency). |
| votes needed             | Enhancement suggestion which needs votes, before it gets addressed by the contributors. |
| won't fix                | This will not be worked on. |
