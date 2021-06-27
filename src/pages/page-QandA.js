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
    // this.question = "ma tarotze?";
    // this.answers = [{user:'ruti' ,text: "al titarev"},{user:'ruti2' ,text: "ahi?"},{user:'ruti3' ,text: "ahiiii?"} ];
  }

  render(){
    return html`
    <page-question .question=${this.question}> </page-question>
    ${this.answers.map(answer => html `<page-answer .user=${answer.user} .text=${answer.text}> </page-answer>`)}`

  }
}

customElements.define('page-qanda', PageQandA);

