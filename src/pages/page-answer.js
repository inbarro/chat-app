import { html } from 'lit';
import { PageElement } from '../helpers/page-element';

class PageAnswer extends PageElement {
  static get properties() {
    return {
      answer_user: String,
      text: String
    }
  }

  render(){
    return html`
   <h1 color="blue">${this.answer_user}: ${this.text}</h1>`
  }
}

customElements.define('page-answer', PageAnswer);
