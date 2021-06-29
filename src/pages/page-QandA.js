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
  updateCurrAnswer(e) {
    this.curr_answer = e.target.value;
  }

  addNewAnswer(){
    this.curr_answer = document.getElementById("answer").value;
      socket.emit("new-answer", {question_id: this.question.question_id, answer_text: this.curr_answer, answer_user: this.answer_user});

  }

  // askNewQuestion() {
  //   socket.emit("new-question", {question: this.curr_question, user: this.name});
  //   this.addQuestionToChat({question: this.curr_question, answers: [{user:'server' ,text: "server_ans"}]})
  // }

  render(){
    return html `
    <vaadin-vertical-layout class="block">
    <page-question class="question" .question=${this.question.question}></page-question>
    ${this.answers.map(answer => html `<page-answer .answer_user=${answer.answer_user} .answer_text=${answer.answer_text}></page-answer>`)}
     <div class="input-layout">
      <vaadin-text-field id="answer"
    placeholder="answer..."
    value="${this.curr_answer}">
      </vaadin-text-field>
      <vaadin-button
    theme="secondary"
  @click="${this.addNewAnswer}">
        add answer
    </vaadin-button>
    </div>
    </vaadin-vertical-layout>
`}

}

customElements.define('page-qanda', PageQandA);
