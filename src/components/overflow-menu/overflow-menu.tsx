import { Component, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'overflow-menu',
  styleUrl: 'overflow-menu.css',
  shadow: true,
})
export class OverflowMenu {

  @State() isOverflown = false;
  
  connectedCallback() {
      this.isOverflown = true
  }

  render() {
    let moreMenu = (
      <div class='more'>more options</div>
    )
    return (
      <nav class='navbar'>
        <p>ewrer</p>
        <slot />
        {this.isOverflown ? moreMenu : null}
      </nav>
    );
  }
}
