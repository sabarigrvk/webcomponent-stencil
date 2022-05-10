import { newE2EPage } from '@stencil/core/testing';

describe('overflow-menu', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<overflow-menu></overflow-menu>');

    const element = await page.find('overflow-menu');
    expect(element).toHaveClass('hydrated');
  });
});
