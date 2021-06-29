import { html } from 'lit';
import { Logo, Feature } from '../components';
import { urlForName } from '../router';
import { PageElement } from '../helpers/page-element';
import './page-chat'

export class PageHome extends PageElement {

  constructor()
  {
    super()
    this.items = [{name: 1, val: 1}, {name:2, val:2}]
  }


//   render() {
//     return html`
//        <vaadin-vertical-layout>
//          ${this.items.map(item => html`<div class="block">${item.name}: ${item.val}</div>`)}
//        </vaadin-vertical-layout>
//
//
// `;
//   }


  render() {
    return html`
        <page-chat colour = black class="page-chat"></page-chat>
       `;
  }


}

customElements.define('page-home', PageHome);
