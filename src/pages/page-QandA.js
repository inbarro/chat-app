import { html } from 'lit';
import { PageElement } from '../helpers/page-element';
import './page-question'
import './page-answer'

const socket = io('http://localhost:3000', { transports: ['websocket', 'polling', 'flashsocket'] });

class PageQandA extends PageElement {

  static get properties() {
    return {
      question: Object,
      answers: Array,
      curr_answer: String
    }
  }

  constructor(){
    super();
    this.curr_answer = '';

  }

  shortcutListener(e) {
    if (e.key === 'Enter') {
      // this.askNewQuestion();
    }
  }
  apdateCurrAnswer(e) {
    this.curr_answer = e.target.value;
  }

  addNewAnswer(){
      socket.emit("new-answer", {question: this.question, answer: this.curr_answer, user: this.name});

  }

  // askNewQuestion() {
  //   socket.emit("new-question", {question: this.curr_question, user: this.name});
  //   this.addQuestionToChat({question: this.curr_question, answers: [{user:'server' ,text: "server_ans"}]})
  // }

  render(){
    return html `
    <page-question .question=${this.question}></page-question>
    ${this.answers.map(answer => html `<page-answer .user=${answer.user} .text=${answer.text}></page-answer>`)}
     <div class="input-layout"
  @keyup="${this.shortcutListener}">
      <vaadin-text-field
    placeholder="answer..."
    value="${this.curr_answer}"
  @change="${this.apdateCurrAnswer}">
      </vaadin-text-field>
      <vaadin-button
    theme="secondary"
  @click="${this.addNewAnswer}">
        add answer
    </vaadin-button>
    </div>
`}

}

customElements.define('page-qanda', PageQandA);

