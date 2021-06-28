import { html } from 'lit';
import { PageElement } from '../helpers/page-element';
import './page-question'
import './page-answer'

// const socket = io('http://localhost:3000', { transports: ['websocket', 'polling', 'flashsocket'] });

class PageQandA extends PageElement {

  static get properties() {
    return {
      question: Object,
      answers: Array,
      curr_answer: String,
      socket: Object,
      answer_user: String
    }
  }

  constructor(){
    super();
    this.curr_answer = '';
    // this.socket = socket

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
      this.socket.emit("new-answer", {question_id: this.question.question_id, answer_text: this.curr_answer, user: this.answer_user});
  }

  // askNewQuestion() {
  //   socket.emit("new-question", {question: this.curr_question, user: this.name});
  //   this.addQuestionToChat({question: this.curr_question, answers: [{user:'server' ,text: "server_ans"}]})
  // }

  render(){
    return html `
    <page-question .question=${this.question.question}></page-question>
    ${this.answers.map(answer => html `<page-answer .answer_user=${answer.answer_user} .text=${answer.text}></page-answer>`)}
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

