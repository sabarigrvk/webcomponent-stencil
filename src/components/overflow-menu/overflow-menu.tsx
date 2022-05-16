import { Component, h, Element, State, Listen, Host } from '@stencil/core';

@Component({
  tag: 'overflow-menu',
  styleUrl: 'overflow-menu.css',
  shadow: true,
})
export class OverflowMenu {
  
  moreButton!: HTMLDivElement;
  primaryMenu: HTMLUListElement;
  primaryMenuItems: NodeListOf<HTMLLIElement>;
  secondaryMenuItems: NodeListOf<HTMLLIElement>;
  itemGap: any;
  @Element() element: HTMLElement;
  @State() isOverflown = false;

  connectedCallback() {
  }

  disconnectedCallback() {

  }

  componentDidLoad() {
    this.primaryMenu = this.element.querySelector('ul');
    this.primaryMenuItems = this.primaryMenu.querySelectorAll('li');
    this.moreButton.appendChild(this.primaryMenu.cloneNode(true));
    this.secondaryMenuItems = this.element.shadowRoot.querySelectorAll('li');
    let styles = getComputedStyle(this.element);
    this.itemGap = styles.getPropertyValue('--gap');
    this.adaptMenu();
  }

  adaptMenu() {
    
    [...Array.from(this.primaryMenuItems), ...Array.from(this.secondaryMenuItems), this.moreButton].forEach((item) => {
      item.hidden = false;
    });
    console.log(this.itemGap);
    let stopWidth = this.moreButton.offsetWidth;
    let hiddenItems = [];
    const primaryWidth = this.primaryMenu.offsetWidth;
    this.primaryMenuItems.forEach((item, i) => {
      if(primaryWidth >= stopWidth + item.offsetWidth) {
        stopWidth += item.offsetWidth
      } else {
        item.hidden = true;
        hiddenItems.push(i);
      }
    });

    if(!hiddenItems.length) {
      this.moreButton.hidden = true;
      this.isOverflown = false;
    }
    else {  
      this.secondaryMenuItems.forEach((item, i) => {
        if(!hiddenItems.includes(i)) {
          item.hidden = true;
        }
      })
    }
  }

  @Listen('resize', { target: 'window' })
  handleResize(event: Event) {
    this.adaptMenu();
    console.log(event);
  }

  render() {
    let moreMenu = (
      <div class='more' ref={(el) => this.moreButton = el as HTMLDivElement}>
        <button type="button" aria-haspopup="true" aria-expanded="false">
          More <span>&darr;</span>
        </button>
      </div>
    )
    return (
      <Host>
        <nav class={this.isOverflown ? 'show-secondary': ''}>
          <slot />
          {moreMenu}
        </nav>
      </Host>
    );
  }
}
