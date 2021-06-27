import { html } from 'lit';
import { PageElement } from '../helpers/page-element';

class PageQuestion extends PageElement {

  static get properties() {
    return {
      question: String,
    }
  }

  constructor(){
    super();
    this.question = "ma tarotze?";
  }

  render(){
    return html`
   <h1 color="green">${this.question}</h1>`
  }
}

customElements.define('page-question', PageQuestion);
