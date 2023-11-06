import { Component, Prop, h } from "@stencil/core";

/** @internal **/
@Component({
  tag: "docs-contributors",
  styleUrl: "docs-contributors.css",
  shadow: false,
})
export class DocsContributors {
  /** stringified array of GitHub user ids */
  @Prop() contributors: string;

  render() {
    const contributors = JSON.parse(this.contributors);
    if (!contributors || contributors.length === 0) {
      return null;
    }

    return (
      <section class="docs-contributors">
        <hr />
        <ld-typo class="docs-contributors__heading" variant="h4" tag="h2">
          Contributors
        </ld-typo>
        <ul>
          {contributors.map((contributor) => (
            <li>
              <a
                href={`https://github.com/${contributor}`}
                target="_blank"
                rel="noreferrer noopener"
              >
                <img
                  class="docs-contributors__img"
                  src={`https://github.com/${contributor}.png?size=90`}
                  loading="lazy"
                  width="32"
                  height="32"
                  alt={`Contributor ${contributor}`}
                  importance="low"
                />
              </a>
            </li>
          ))}
        </ul>
      </section>
    );
  }
}
