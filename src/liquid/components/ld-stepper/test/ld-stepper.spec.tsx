import { newSpecPage } from '@stencil/core/testing';
import { LdStepper } from '../ld-stepper';

describe('ld-stepper', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [LdStepper],
      html: `<ld-stepper></ld-stepper>`,
    });
    expect(page.root).toEqualHtml(`
      <ld-stepper>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ld-stepper>
    `);
  });
});
