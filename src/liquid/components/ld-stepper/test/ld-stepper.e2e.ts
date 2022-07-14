import { newE2EPage } from '@stencil/core/testing';

describe('ld-stepper', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ld-stepper></ld-stepper>');

    const element = await page.find('ld-stepper');
    expect(element).toHaveClass('hydrated');
  });
});
