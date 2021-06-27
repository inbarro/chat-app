import { html } from 'lit';
import { Logo, Feature } from '../components';
import { urlForName } from '../router';
import { PageElement } from '../helpers/page-element';
import './page-chat'


export class PageHome extends PageElement {

  render() {
    return html` 
        <page-chat class="page-chat"></page-chat>
       `;
  }
}

customElements.define('page-home', PageHome);
