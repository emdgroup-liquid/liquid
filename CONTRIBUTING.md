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
* [Requesting new features](#requesting-new-features)
* [Your first code contribution](#your-first-code-contribution)
* [Pull requests](#pull-requests)

[Additional notes](#additional-notes)
* [Issue and pull request labels](#issue-and-pull-request-labels)

## Code of conduct

This project and everyone who participates in it is governed by our [Code of Conduct][code of conduct]. By participating, you are expected to uphold this code. Please report unacceptable behavior to [liquid@emdgroup.com](liquid@emdgroup.com).

## I don't want to read this whole thing I just have a question!!!

> **Note:** Please don't file an issue to ask a question. You'll get faster results by using the resources below.

We have official channels where the community chimes in with helpful advice if you have questions.

* [Liquid on GitHub discussions][discussions]
* [Liquid on Teams][teams]

## What should I know before I get started?

### Project structure

This project consists of different parts and pieces, each with its own purpose. Let's get you familiar with those parts and pieces, so that you find your way quicker to the relevant spot that you would like to contribute to.

```
.
├── README.md
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md               # You are looking at it.
├── LICENSE.md
├── package.json                  # Please have a look at the scripts section inside the package.json file.
│                                 # You can also run `npm run` to get a list of all available commands.
├── .devcontainer
│   └── devcontainer.json         # GitHub codespaces dev container configuration.
├── .github
│   └── workflows/ci-cd.yml       # CI/CD pipeline config file.
├── .vscode
│   └── task.json                 # Task configurations for Visual Studio Code.
├── .env                          # The .env file is not under version control. It contains sensitive
│                                 # data, such as credentials used to authenticate oneself against
│                                 # an API. We currenly do this for fetching design tokens from Figma.
├── bin                           # Contains scripts to be included in the bundle for execution with npx.
├── config                        # Folder containing all sorts of configuration files.
│   ├── .eleventy.cjs             # Liquid's docs site is powered by 11ty. See https://www.11ty.dev/
│   ├── .eslintrc.cjs             # eslint is used for linting ts and tsx files. Please make sure to
│   │                             # enable eslint in your code editor of choice.
│   ├── .prettierrc.json          # prettier ensures a consistent code style. Please make sure to
│   │                             # enable prettier in your code editor of choice.
│   ├── .releaserc.cjs            # Config file for semantic-release.
│   │                             # See https://semantic-release.gitbook.io/semantic-release/
│   ├── commitlint.config.cjs     # We use conventional commits and semantic release.
│   ├── postcss.config.docs.cjs   # PostCSS config file for the docs site CSS processing.
│   ├── postcss.config.cjs        # PostCSS config file for Liquid CSS processing.
│   ├── stencil.config.docs.ts    # Stencil config file for the docs site.
│   ├── stylelint.config.cjs      # Stylelint config file. See section about linting further below.
│   ├── tsconfig.docs.json        # Typescript config file for components used for the docs site.
│   ├── tsconfig.react.json       # Typescript config file for react component bindings.
│   └── tsconfig.vue.json         # Typescript config file for vue component bindings.
├── .npmignore                    # The .npmignore file is used to keep package size to a minimum.
│                                 # More about this below.
├── dist                          # Here is the main juice which gets published to npm.
├── dist_docs                     # This folder is served during development. It contains the docs site
│                                 # as well as the necessary liquid distribution.
├── screenshot                    # This directory contains files related to visual regression testing
│                                 # with Stencil. See https://stenciljs.com/docs/screenshot-visual-diff
├── scripts                       # Contains bash or node script files executed via npm script commands.
├── src                           # Well, that's the source folder. You probably guessed it.
│   ├── _data                     # This folder contains data files. See https://www.11ty.dev/docs/data-global/
│   │   └── env.cjs               # Environment variables injected during generation of the docs site.
│   ├── docs                      # Everything inside this folder is for developing the docs site.
│   │   ├── assets                # Static assets for the docs page reside here.
│   │   ├── components            # Docs components live here.
│   │   ├── global                # Docs global styles live here.
│   │   ├── includes
│   │   │  ├── layout.njk         # The docs site is powered by 11ty. This is the default
│   │   │  │                      # 11ty layout file for the docs site. See https://www.11ty.dev/docs/layouts/
│   │   │  └── redirect.njk       # This layout file handles redirects on pages behind authentication.
│   │   ├── layouts               # There is one layout component which lives inside this folder.
│   │   ├── pages                 # This folder contains markdown files for general documentation pages,
│   │   │                         # legal stuff and the 404 page.
│   │   └── utils                 # Docs util files shared by the docs components live here.
│   └── liquid                    # Everything inside this folder is for developing Liquid components.
│       ├── components            # This folder contains all Liquid components including tests and docs.
│       ├── global                # Here we have global styles. Mainly CSS custom properties, such as
│       │                         # variables for colors, theming, typography, spacings, shadows etc.
│       │                         # Note that most of these files are auto-generated using design tokens.
│       └── utils                 # Contains utilities shared between components.
├── stencil.config.ts             # Stencil config file for Liquid components.
├── tsconfig.json                 # Typescript config file for Liquid components.
├── yarn.lock                     # Oh, yes, we use yarn.
└── .yarnrc.yml                   # The yarn configuration file (only necessary in CI environment).
```

That's all. As you can see, Liquid currenly has a straight forward project structure:
One repo, one package.json, no workspaces, no learna, just two main directories inside the `src/` folder, `src/docs/` for the docs site and `src/liquid/` for the component library.

### Conventions

#### Code style

You probably noticed by now that we use [eslint](https://eslint.org/), [prettier](https://prettier.io/) and [stylelint](https://stylelint.io/) in this project to enforce some code style conventions. Please make sure to enable these tools in your code editor of choice.

Some things are not linted but still are important:

- We prefix Liquid components with `ld-` and docs components with `docs-`.
- We use [BEM](http://getbem.com/introduction/) as a methodology for organizing CSS rules.
- We use relative length units in CSS, mostly `rem`; absolute length units should be avoided (borders and outlines may count as an exception to the rule).
- We use Shadow DOM wherever possible, especially in components which use slots: not using Shadow DOM in such components resutls in a worse performance (due to Stencil's custom _slot_ implementation performing expensive DOM operations) and quirks in React apps. We allow for custom styling of Web Component by applying [part](https://developer.mozilla.org/en-US/docs/Web/CSS/::part) attributes to component internal elements and using component specific CSS custom properties where applicable.
- When ever possible, try to provide CSS Components alongside WebComponents using the same CSS file; prefix CSS classes with `ld-` and use BEM.
- Stylesheet files of WebComponents which have no CSS Component counterpart must include a `.shadow` suffix in the file name (for instance `ld-sidenav.shadow.css`). This will ensure the CSS does not end up in the CSS components bundle.
- When writing CSS, we follow common best practices. We try to keep the CSS specificity to a minimum, in order to simplify component customization, but we also make sure that it's not low to an extent, where styles get overwritten by other libraries' reset or normalize styles (such as Tailwind's [Preflight](https://tailwindcss.com/docs/preflight)). In other words: If you're using the CSS `:where` trick to reduce CSS speceficity to zero, make sure the properties affected are not potential candidates for reset and normalize styles.
- Due to an issue in stencil type declarations need to be either inlined or exported, as otherwise undefined types end up in the generated components.d.ts file. 
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
^((feat|fix|hotfix|build|chore|ci|docs|style|refactor|perf|test)\/([a-z0-9._-]+)|main|rc)$
```

### How to run tests

There are multiple commands available as npm scripts for running different kinds of tests:
Unit tests, functional (e2e) tests as well as visual regression tests (using screenshots) are [handled by Stencil](https://stenciljs.com/docs/testing-overview). We also run accessibility tests within the functional test suits using [axe-core](https://github.com/dequelabs/axe-core).

One note regarding automated accessibility testing:

> Automated accessibility testing helps comply with accessibility guidelines but does not guarantee that a website or app is accessible. You still need to perform manual testing using screen readers and involve disabled users in user testings. 

You execute tests either by running one of the npm scripts which start with `test` (see package.json) or by executing the respective test commands directly with the options needed. Please refer to the docs of each test runner in question for available options.

### Relevant resources

If you want to dive deeper into the technology stack used in this project,
here is a list of links to selected documentation sites and articles we found valuable:

- https://stenciljs.com
- https://www.11ty.dev
- https://postcss.org
- https://jestjs.io
- https://pptr.dev
- https://github.com/dequelabs/axe-core
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

Before creating bug reports, please check [this list](#before-submitting-a-bug-report) as you might find out that you don't need to create one. When you are creating a bug report, please [include as many details as possible](#how-do-i-submit-a-good-bug-report). Fill out [the required template][bug report template], the information it asks for helps us resolve issues faster.

> **Note:** If you find a **closed** issue that seems like it is describing the same thing that you're experiencing, open a new issue and include a link to the original issue in the body of your new one. **Please don't comment on closed issues.** Instead, create a new bug report issue. If you prefer to discuss with others before, you can start a discussion on [GitHub discussions][discussions] or our
> [Teams channel][teams].

#### Before submitting a bug report

* Most importantly, check if you can reproduce the problem **in the latest version of Liquid**.
* **Perform a search in [existing issues](https://github.com/emdgroup-liquid/liquid/issues)** to see if the problem has already been reported. If it has **and the issue is still open**, upvote the issue report or add a comment to the existing issue, if you think it contains relevant information which will help resolve it, instead of opening a new one.

#### How do I submit a (good) bug report?

Bugs are tracked as [GitHub issues](https://guides.github.com/features/issues/). Create an issue and provide the following information by filling in [the template][bug report template].

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
* **Which other framework/libraries are you using that may be involved in the issue?** Please check https://stenciljs.com/docs/overview for possible known quirks.

### Requesting new features

This section guides you through submitting a feature request for Liquid, including completely new components, new features to existing components and minor improvements to existing functionality. Following these guidelines helps maintainers and the community understand your request :pencil: and find related requests :mag_right:.

Before creating feature requests, please check [this list](#before-submitting-a-feature-request) as you might find out that you don't need to create one. When you are creating a feature request, please [include as many details as possible](#how-do-i-submit-a-good-feature-request). Fill in [the template][feature request template].

#### Before submitting a feature request

- Most importantly, check if you're using **the latest version of Liquid**.
- **Perform a search in the [feature backlog]** to see if a similar feature has already been requested. If it has and the issue is still open or if it has the **needed: votes** label, upvote the requested feature or add a comment, if you think it contains relevant information that will help drive it forward, instead of opening a new one. If you prefer to discuss with others first, you can start a discussion on [GitHub discussions][discussions] or in our [Teams channel][teams].

#### How do I vote on an existing feature request?

You can upvote a feature request, if it has the `needed: votes` label, with a 👍 reaction on the top comment of the issue. The more votes, the higher we prioritize the request (i.g. using `is:issue label:"needed: votes" sort:reactions-+1-desc` as the issue search query).

#### How do I submit a (good) feature request?

Feature requests are tracked as [GitHub issues](https://guides.github.com/features/issues/). Create an issue providing the following information:

* **Use a clear and descriptive title** for the issue to identify the suggestion.
* **Provide a step-by-step description of the requested feature** in as many details as possible.
* **Provide specific examples to demonstrate the steps**. Include copy/pasteable snippets which you use in those examples, as [Markdown code blocks](https://help.github.com/articles/markdown-basics/#multiple-lines).
* **Describe the current behavior** and **explain which behavior you expected to see instead** and why.
* **Include screenshots and animated GIFs** which help you demonstrate the steps or point out the part of Liquid which the suggestion is related to. You can use [this tool](https://www.cockos.com/licecap/) to record GIFs on macOS and Windows, and [this tool](https://github.com/colinkeenan/silentcast) or [this tool](https://github.com/GNOME/byzanz) on Linux.
* **Explain why this feature would be useful** to most Liquid users and isn't something that can or should be implemented as a separate community package.
* **List some other UI libraries or applications where this feature already exists.**
* **Specify which version of Liquid you're using.** You can get the exact version by running `npm list @emdgroup-liquid/liquid` inside the working directory of your project.
* **Specify the name and version of the browser you're using.**
* **Specify the name and version of the OS you're using.**

### Your first code contribution

Unsure where to begin contributing to Liquid? You can start by looking through `beginner` and `help wanted` issues:

* [Beginner issues](https://github.com/emdgroup-liquid/liquid/issues?q=label%3Abeginner+-label%3Adone+sort%3Areactions-%2B1-desc) - issues which should only require a few lines of code, and a test or two.
* [Help wanted issues](https://github.com/emdgroup-liquid/liquid/issues?q=label%3A"help+wanted"+-label%3Adone+sort%3Areactions-%2B1-desc) - issues which should be a bit more involved than `beginner` issues.

Both issue lists are sorted by total number of comments. While not perfect, number of comments is a reasonable proxy for impact a given change will have.

#### Local development

1. [Node.js](https://nodejs.org/en/) and [Git](https://git-scm.com/) and [Yarn](https://yarnpkg.com/) (version 3 - head over to https://yarnpkg.com/getting-started/install for instructions on how to install the latest yarn version).
need to be installed on your machine.
2. Install dependencies by executing `yarn` inside the project folder.
3. Run `yarn build`. This step is necessary before first start up of the local dev server (it generates required type definitions within the src/liquid folder).
4. Start up the local development server with `yarn start`.
5. Now head over to [localhost:8080](http://localhost:8080) - you shoud see the Liquid docs site.  

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

A lists of all labels we use in order to help us track and manage issues and pull requests can be found [here](https://github.com/emdgroup-liquid/liquid/labels).

[code of conduct]: https://www.merckgroup.com/company/responsibility/en/regulations-and-guidelines/code-of-conduct.pdf
[discussions]: https://github.com/emdgroup-liquid/liquid/discussions
[teams]: https://teams.microsoft.com/l/channel/19%3ab5381a933c6c413ea0ae41c3b424acd8%40thread.skype/Liquid%2520Design%2520System?groupId=babb6c18-c13f-43ef-baf2-ce1617f228cd&tenantId=db76fb59-a377-4120-bc54-59dead7d39c9
[feature backlog]: https://github.com/emdgroup-liquid/liquid/issues?q=is%3Aissue+sort%3Areactions-%2B1-desc+label%3Afeature+-label%3Aduplicate+is%3Aopen
[bug report template]: https://github.com/emdgroup-liquid/liquid/issues/new?assignees=&labels=&template=bug_report.yml&title=bug%3A+
[feature request template]: https://github.com/emdgroup-liquid/liquid/issues/new?assignees=&labels=&template=feature_request.yml&title=feat%3A+