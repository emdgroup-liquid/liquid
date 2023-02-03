import { newSpecPage } from '@stencil/core/testing';
import { LdMenuitemGroup } from '../ld-menuitem-group';

describe('ld-menuitem-group', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [LdMenuitemGroup],
      html: `<ld-menuitem-group></ld-menuitem-group>`,
    });
    expect(page.root).toEqualHtml(`
      <ld-menuitem-group>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ld-menuitem-group>
    `);
  });
});
