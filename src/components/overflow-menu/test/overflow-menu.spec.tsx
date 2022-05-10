import { newSpecPage } from '@stencil/core/testing';
import { OverflowMenu } from '../overflow-menu';

describe('overflow-menu', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [OverflowMenu],
      html: `<overflow-menu></overflow-menu>`,
    });
    expect(page.root).toEqualHtml(`
      <overflow-menu>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </overflow-menu>
    `);
  });
});
