import { newE2EPage } from '@stencil/core/testing';

describe('ld-icon', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ld-icon></ld-icon>');

    const element = await page.find('ld-icon');
    expect(element).toHaveClass('hydrated');
  });
});
