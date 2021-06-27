import { html } from 'lit';
import { PageElement } from '../helpers/page-element';
import './page-question'
import './page-answer'

class PageQandA extends PageElement {

  static get properties() {
    return {
      question: String,
      answers: Array
    }
  }

  constructor(){
    super();
  }

  render(){
    return html`
    <page-question .question=${this.question}> </page-question>
    ${this.answers.map(answer => html `<page-answer .user=${answer.user} .text=${answer.text}> </page-answer>`)}`

  }
}

customElements.define('page-qanda', PageQandA);

