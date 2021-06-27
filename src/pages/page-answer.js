import { html } from 'lit';
import { PageElement } from '../helpers/page-element';

class PageAnswer extends PageElement {
  static get properties() {
    return {
      user: String,
      text: String
    }
  }

  render(){
    return html`
   <h1 color="blue">${this.user}: ${this.text}</h1>`
  }
}

customElements.define('page-answer', PageAnswer);
