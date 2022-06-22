/* istanbul ignore file */

export function getSidenavWithoutSubnavigation(options?: {
  align?: 'left' | 'right'
  collapsible?: boolean
  collapsed?: boolean
}) {
  return `
    ${
      options?.collapsible
        ? '<ld-sidenav-toggle-outside></ld-sidenav-toggle-outside>'
        : ''
    }
    <ld-sidenav open${options?.collapsible ? ' collapsible' : ''}${
    options?.collapsed ? ' collapsed' : ''
  }${options?.align ? ' align="' + options.align + '"' : ''}>
      <ld-typo style="padding: var(--ld-sidenav-padding)" slot="top" variant="cap-l">The lorem ipsum</ld-typo>
      <ld-typo style="padding: var(--ld-sidenav-padding)">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</ld-typo>
      <ld-typo style="padding: var(--ld-sidenav-padding)" slot="bottom" variant="body-s">Copyright 2022</ld-typo>
    </ld-sidenav>
  `
}

export function getSidenavWithSubnavigation(options?: {
  align?: 'left' | 'right'
  currentSubnav?: string
  collapsible?: boolean
  collapsed?: boolean
  narrow?: boolean
  neutral?: boolean
  roundedBackButton?: boolean
}) {
  return `
    ${
      options?.collapsible
        ? '<ld-sidenav-toggle-outside></ld-sidenav-toggle-outside>'
        : ''
    }
    <ld-sidenav open${options?.collapsible ? ' collapsible' : ''}${
    options?.collapsed ? ' collapsed' : ''
  }${options?.narrow ? ' narrow' : ''}${options?.neutral ? ' neutral' : ''}${
    options?.align ? ' align="' + options.align + '"' : ''
  }>
      <ld-sidenav-header href="#" slot="header">Computer Science</ld-sidenav-header>
      <ld-sidenav-back slot="top">
        <ld-sidenav-navitem ${
          options?.roundedBackButton ? ' rounded' : ''
        }>Outline of Computer Science</ld-sidenav-navitem>
      </ld-sidenav-back>
      <ld-sidenav-slider ${
        options?.currentSubnav
          ? 'current-subnav="' + options.currentSubnav + '" '
          : ''
      }label="Outline of Computer Science">
        <ld-sidenav-heading>Subfields</ld-sidenav-heading>
        <ld-sidenav-navitem to="mathematical-foundations">
          Mathematical foundations
        </ld-sidenav-navitem>
        <ld-sidenav-navitem to="algorithms-and-data-structures">
          Algorithms and data structures
        </ld-sidenav-navitem>
        <ld-sidenav-navitem to="artificial-intelligence">
          Artificial intelligence
        </ld-sidenav-navitem>
        <ld-sidenav-navitem to="communication-and-security">
          Communication and security
        </ld-sidenav-navitem>
        <ld-sidenav-navitem to="artificial-intelligence" selected>
          <svg slot="icon" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="10" fill="var(--ld-col-vm)"/>
          </svg>
          Artificial intelligence
        </ld-sidenav-navitem>
        <ld-sidenav-navitem to="communication-and-security">
          Communication and security
        </ld-sidenav-navitem>
        <ld-sidenav-navitem to="computer-architecture">
          Computer architecture
        </ld-sidenav-navitem>
        <ld-sidenav-navitem to="computer-graphics">
          Computer graphics
        </ld-sidenav-navitem>
        <ld-sidenav-navitem to="concurrent-parallel-and-distributed-systems">
          Concurrent, parallel, and distributed systems
        </ld-sidenav-navitem>
        <ld-sidenav-navitem to="databases">Databases</ld-sidenav-navitem>
        <ld-sidenav-separator></ld-sidenav-separator>
        <ld-sidenav-navitem to="programming-languages-and-compilers">
          Programming languages and compilers
        </ld-sidenav-navitem>
        <ld-sidenav-navitem to="scientific-computing">
          Scientific computing
        </ld-sidenav-navitem>
        <ld-sidenav-navitem to="software-engineering">
          Software engineering
        </ld-sidenav-navitem>
        <ld-sidenav-navitem to="theory-of-computation">
          Theory of computation
        </ld-sidenav-navitem>
        <ld-sidenav-subnav
          id="mathematical-foundations"
          label="Mathematical foundations"
        >
          <ld-sidenav-heading>Mathematical foundations</ld-sidenav-heading>
          <ld-sidenav-navitem mode="secondary">
            Coding theory
          </ld-sidenav-navitem>
          <ld-sidenav-navitem mode="secondary">Game theory</ld-sidenav-navitem>
          <ld-sidenav-navitem mode="secondary">
            Discrete Mathematics
          </ld-sidenav-navitem>
          <ld-sidenav-navitem mode="secondary">Graph theory</ld-sidenav-navitem>
          <ld-sidenav-navitem mode="secondary">
            Mathematical logic
          </ld-sidenav-navitem>
          <ld-sidenav-navitem mode="secondary">
            Number theory
          </ld-sidenav-navitem>
        </ld-sidenav-subnav>
        <ld-sidenav-subnav
          id="algorithms-and-data-structures"
          label="Algorithms and data structures"
        >
          <ld-sidenav-heading>
            Algorithms and data structures
          </ld-sidenav-heading>
          <ld-sidenav-navitem mode="secondary">Algorithms</ld-sidenav-navitem>
          <ld-sidenav-navitem mode="secondary">
            Data structures
          </ld-sidenav-navitem>
          <ld-sidenav-navitem to="mathematical-foundations">
            Mathematical Foundations
          </ld-sidenav-navitem>
        </ld-sidenav-subnav>
        <ld-sidenav-subnav
          id="artificial-intelligence"
          label="Artificial intelligence"
        >
          <ld-sidenav-heading>Artificial intelligence</ld-sidenav-heading>
          <ld-sidenav-navitem mode="secondary">
            Artificial intelligence
          </ld-sidenav-navitem>
          <ld-sidenav-navitem mode="secondary">
            Automated reasoning
          </ld-sidenav-navitem>
          <ld-sidenav-separator></ld-sidenav-separator>
          <ld-sidenav-navitem mode="secondary" href="https://en.wikipedia.org/wiki/Computer_vision" target="_blank">
            Computer vision
          </ld-sidenav-navitem>
          <ld-sidenav-navitem to="soft-computing">
            Soft computing
          </ld-sidenav-navitem>
          <ld-sidenav-separator></ld-sidenav-separator>
          <ld-sidenav-navitem mode="secondary">
            Natural language processing
          </ld-sidenav-navitem>
          <ld-sidenav-navitem mode="secondary">Robotics</ld-sidenav-navitem>
          <ld-sidenav-subnav id="soft-computing" label="Soft computing">
            <ld-sidenav-heading>Soft computing</ld-sidenav-heading>
            <ld-sidenav-navitem mode="secondary">
              Machine learning
            </ld-sidenav-navitem>
            <ld-sidenav-navitem mode="secondary">
              Evolutionary computing
            </ld-sidenav-navitem>
          </ld-sidenav-subnav>
        </ld-sidenav-subnav>
        <ld-sidenav-subnav
          id="communication-and-security"
          label="Communication and security"
        >
          <ld-sidenav-heading>Communication and security</ld-sidenav-heading>
          <ld-sidenav-navitem mode="secondary">Networking</ld-sidenav-navitem>
          <ld-sidenav-navitem mode="secondary">
            Computer security
          </ld-sidenav-navitem>
          <ld-sidenav-navitem mode="secondary">Cryptography</ld-sidenav-navitem>
        </ld-sidenav-subnav>
        <ld-sidenav-subnav
          id="computer-architecture"
          label="Computer architecture"
        >
          <ld-sidenav-heading>Computer architecture</ld-sidenav-heading>
          <ld-sidenav-navitem mode="secondary">
            Computer architecture{' '}
          </ld-sidenav-navitem>
          <ld-sidenav-navitem mode="secondary">
            Operating systems
          </ld-sidenav-navitem>
        </ld-sidenav-subnav>
        <ld-sidenav-subnav id="computer-graphics" label="Computer graphics">
          <ld-sidenav-heading>Computer graphics</ld-sidenav-heading>
          <ld-sidenav-navitem mode="secondary">
            Computer graphics
          </ld-sidenav-navitem>
          <ld-sidenav-navitem mode="secondary">
            Image processing
          </ld-sidenav-navitem>
          <ld-sidenav-navitem mode="secondary">
            Information visualization
          </ld-sidenav-navitem>
        </ld-sidenav-subnav>
        <ld-sidenav-subnav
          id="concurrent-parallel-and-distributed-systems"
          label="Concurrent parallel and distributed systems"
        >
          <ld-sidenav-heading>
            Concurrent parallel and distributed systems
          </ld-sidenav-heading>
          <ld-sidenav-navitem mode="secondary">
            Parallel computing
          </ld-sidenav-navitem>
          <ld-sidenav-navitem mode="secondary">
            Concurrency (computer science)
          </ld-sidenav-navitem>
          <ld-sidenav-navitem mode="secondary">
            Distributed computing
          </ld-sidenav-navitem>
        </ld-sidenav-subnav>
        <ld-sidenav-subnav id="databases" label="Databases">
          <ld-sidenav-heading>Databases</ld-sidenav-heading>
          <ld-sidenav-navitem mode="secondary">
            Relational databases
          </ld-sidenav-navitem>
          <ld-sidenav-navitem mode="secondary">
            Structured Storage
          </ld-sidenav-navitem>
          <ld-sidenav-navitem mode="secondary">Data mining</ld-sidenav-navitem>
        </ld-sidenav-subnav>
        <ld-sidenav-subnav
          id="programming-languages-and-compilers"
          label="Programming languages and compilers"
        >
          <ld-sidenav-heading>
            Programming languages and compilers
          </ld-sidenav-heading>
          <ld-sidenav-navitem mode="secondary">
            Compiler theory
          </ld-sidenav-navitem>
          <ld-sidenav-navitem mode="secondary">
            Programming language pragmatics
          </ld-sidenav-navitem>
          <ld-sidenav-navitem mode="secondary">
            Programming language theory
          </ld-sidenav-navitem>
          <ld-sidenav-navitem mode="secondary">
            Formal semantics
          </ld-sidenav-navitem>
          <ld-sidenav-navitem mode="secondary">Type theory</ld-sidenav-navitem>
        </ld-sidenav-subnav>
        <ld-sidenav-subnav
          id="scientific-computing"
          label="Scientific computing"
        >
          <ld-sidenav-heading>Scientific computing</ld-sidenav-heading>
          <ld-sidenav-navitem mode="secondary">
            Computational science
          </ld-sidenav-navitem>
          <ld-sidenav-navitem mode="secondary">
            Numerical analysis
          </ld-sidenav-navitem>
          <ld-sidenav-navitem mode="secondary">
            Symbolic computation
          </ld-sidenav-navitem>
          <ld-sidenav-navitem mode="secondary">
            Computational physics
          </ld-sidenav-navitem>
          <ld-sidenav-navitem mode="secondary">
            Computational chemistry
          </ld-sidenav-navitem>
          <ld-sidenav-navitem mode="secondary">
            Bioinformatics and Computational biology
          </ld-sidenav-navitem>
          <ld-sidenav-navitem mode="secondary">
            Computational neuroscience
          </ld-sidenav-navitem>
        </ld-sidenav-subnav>
        <ld-sidenav-subnav
          id="software-engineering"
          label="Software engineering"
        >
          <ld-sidenav-heading>Software engineering</ld-sidenav-heading>
          <ld-sidenav-navitem mode="secondary">
            Computational science
          </ld-sidenav-navitem>
          <ld-sidenav-navitem mode="secondary">
            Formal methods
          </ld-sidenav-navitem>
          <ld-sidenav-navitem mode="secondary">
            Software engineering
          </ld-sidenav-navitem>
          <ld-sidenav-navitem mode="secondary">
            Algorithm design
          </ld-sidenav-navitem>
          <ld-sidenav-navitem mode="secondary">
            Computer programming
          </ld-sidenav-navitem>
          <ld-sidenav-navitem mode="secondary">
            Human–computer interaction
          </ld-sidenav-navitem>
          <ld-sidenav-navitem mode="secondary">
            Reverse engineering
          </ld-sidenav-navitem>
        </ld-sidenav-subnav>
        <ld-sidenav-subnav
          id="theory-of-computation"
          label="Theory of computation"
        >
          <ld-sidenav-heading>Theory of computation</ld-sidenav-heading>
          <ld-sidenav-navitem mode="secondary">
            Automata theory
          </ld-sidenav-navitem>
          <ld-sidenav-navitem mode="secondary">
            Computability theory
          </ld-sidenav-navitem>
          <ld-sidenav-navitem mode="secondary">
            Computational complexity theory
          </ld-sidenav-navitem>
          <ld-sidenav-navitem mode="secondary">
            Quantum computing theory
          </ld-sidenav-navitem>
        </ld-sidenav-subnav>
      </ld-sidenav-slider>
      <ld-sidenav-navitem slot="bottom" rounded>
        Student profile
      </ld-sidenav-navitem>
    </ld-sidenav>
  `
}

export function getSidenavWithAccordion(options?: {
  align?: 'left' | 'right'
  currentSubnav?: string
  collapsible?: boolean
  collapsed?: boolean
  narrow?: boolean
  neutral?: boolean
  preserveAccordionState?: boolean
  roundedBackButton?: boolean
}) {
  const preserveAccordionStateProp =
    options.preserveAccordionState === undefined ||
    options.preserveAccordionState === true
      ? ''
      : ' preserve-state="false"'

  return `
    ${
      options?.collapsible
        ? '<ld-sidenav-toggle-outside></ld-sidenav-toggle-outside>'
        : ''
    }
    <ld-sidenav open${options?.collapsible ? ' collapsible' : ''}${
    options?.collapsed ? ' collapsed' : ''
  }${options?.narrow ? ' narrow' : ''}${options?.neutral ? ' neutral' : ''}${
    options?.align ? ' align="' + options.align + '"' : ''
  }>
      <ld-sidenav-header href="#" slot="header">Computer Science</ld-sidenav-header>
      <ld-sidenav-back slot="top">
        <ld-sidenav-navitem ${
          options?.roundedBackButton ? ' rounded' : ''
        }>Outline of Computer Science</ld-sidenav-navitem>
      </ld-sidenav-back>
      <ld-sidenav-slider ${
        options?.currentSubnav
          ? 'current-subnav="' + options.currentSubnav + '" '
          : ''
      }label="Outline of Computer Science">
        <ld-sidenav-heading>Subfields</ld-sidenav-heading>
        <ld-sidenav-accordion${preserveAccordionStateProp}>
          <ld-sidenav-navitem slot="toggle">Mathematical foundations</ld-sidenav-navitem>
          <ld-sidenav-navitem mode="secondary">Coding theory</ld-sidenav-navitem>
          <ld-sidenav-navitem mode="secondary">Game theory</ld-sidenav-navitem>
          <ld-sidenav-navitem mode="secondary">Discrete Mathematics</ld-sidenav-navitem>
          <ld-sidenav-navitem mode="secondary">Graph theory</ld-sidenav-navitem>
          <ld-sidenav-navitem mode="secondary">Mathematical logic</ld-sidenav-navitem>
          <ld-sidenav-navitem mode="secondary">Number theory</ld-sidenav-navitem>
        </ld-sidenav-accordion>
        <ld-sidenav-accordion split>
          <ld-sidenav-navitem slot="toggle">Algorithms and data structures</ld-sidenav-navitem>
          <ld-sidenav-navitem mode="secondary">Algorithms</ld-sidenav-navitem>
          <ld-sidenav-navitem mode="secondary">Data structures</ld-sidenav-navitem>
        </ld-sidenav-accordion>
        <ld-sidenav-navitem to="artificial-intelligence">
          Artificial intelligence
          <ld-icon slot="icon-secondary" name="arrow-right" size="sm" />
        </ld-sidenav-navitem>
        <ld-sidenav-accordion${preserveAccordionStateProp}>
          <ld-sidenav-navitem slot="toggle">Communication and security</ld-sidenav-navitem>
          <ld-sidenav-navitem mode="secondary">Networking</ld-sidenav-navitem>
          <ld-sidenav-navitem mode="secondary">Computer security</ld-sidenav-navitem>
          <ld-sidenav-navitem mode="secondary">Cryptography</ld-sidenav-navitem>
        </ld-sidenav-accordion>
        <ld-sidenav-subnav id="artificial-intelligence" label="Artificial intelligence">
          <ld-sidenav-heading>Artificial intelligence</ld-sidenav-heading>
          <ld-sidenav-navitem mode="secondary">Automated reasoning</ld-sidenav-navitem>
          <ld-sidenav-navitem mode="secondary">Computer vision</ld-sidenav-navitem>
          <ld-sidenav-accordion${preserveAccordionStateProp}>
            <ld-sidenav-navitem slot="toggle">Soft computing</ld-sidenav-navitem>
            <ld-sidenav-accordion${preserveAccordionStateProp}>
              <ld-sidenav-navitem mode="secondary" slot="toggle">Machine learning</ld-sidenav-navitem>
              <ld-sidenav-navitem mode="tertiary">Supervised learning</ld-sidenav-navitem>
              <ld-sidenav-navitem mode="tertiary">Unsupervised learning</ld-sidenav-navitem>
              <ld-sidenav-navitem mode="tertiary">Reinforcement learning</ld-sidenav-navitem>
            </ld-sidenav-accordion>
            <ld-sidenav-navitem mode="secondary">Evolutionary computing</ld-sidenav-navitem>
          </ld-sidenav-accordion>
        </ld-sidenav-subnav>
      </ld-sidenav-slider>
      <ld-sidenav-navitem slot="bottom" rounded>
        Student profile
      </ld-sidenav-navitem>
    </ld-sidenav>
  `
}
