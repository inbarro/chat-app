import { html } from 'lit';
import { PageElement } from '../helpers/page-element';
import { LitElement } from '../components/base';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-checkbox';
import '@vaadin/vaadin-radio-button/vaadin-radio-button';
import '@vaadin/vaadin-radio-button/vaadin-radio-group';
import './page-QandA'

const socket = io('http://localhost:3000', { transports: ['websocket', 'polling', 'flashsocket'] });

 class PageChat extends PageElement {

  // Dont know if needed
  static get properties() {
    return {
      curr_question: { type: Object },
      name: {type: String},
      qands: Array
    };
  }

  constructor() {
    super();
    // const socket = io('http://localhost:3000', { transports: ['websocket', 'polling', 'flashsocket'] });

    // Takes the names from the alert
    this.name = prompt('What is your name?');

    // New user connected
    // Socket emit - send event to the other side of the socket
    socket.emit('new-user', this.name);

    // What's inside the text box
    this.curr_question = '';
    // this.qands = [{question: {{id: "dsdsds", text:"ma tarotze?"}, answers: [{user:'ruti' ,text: "al titarev"},{user:'ruti2' ,text: "ahi?"}]}];
    this.qands = [];

    socket.on('user-connected', name => {
    });

    socket.on('user-disconnected', name => {

    });

    socket.on('new_answer-posted', object =>{
      this.addAnswerToChat(object);
    });

    socket.on('new_question-posted', object => {
      this.addQuestionToChat({question: object, answers: []});
    });
  }

  askNewQuestion() {
    socket.emit("new-question", {question: this.curr_question, user: this.name});
  }

  shortcutListener(e) {
    if (e.key === 'Enter') {
      this.askNewQuestion();
    }
  }

  updateTask(e) {
    this.curr_question = e.target.value;
  }

  addQuestionToChat(obj) {
    this.qands = [...this.qands, obj];
  }

  addAnswerToChat(obj)
  {
    for (let key in this.qands)
    {
      if (obj.question_id == this.qands[key].question.question_id)
      {
        // this.qands[key].answers = [...this.qands[key].answers,{answer_user: obj.answer_user, answer_text: obj.answer_text}];
        this.qands[key].answers.push({answer_user: obj.answer_user, answer_text: obj.answer_text});
      }
    }
  }

  render() {
    return html`
  ${this.qands.map(qanda => html`<page-qanda .answer_user=${this.name} .question=${qanda.question} .answers=${qanda.answers}> </page-qanda>`)}
  <div class="input-layout">
      <vaadin-text-field
    placeholder="Question"
    value="${this.curr_question}"
  @change="${this.updateTask}">
      </vaadin-text-field>
      <vaadin-button
    theme="primary"
  @click="${this.askNewQuestion}">
      Ask question
    </vaadin-button>
    </div>
`
  }

}

customElements.define('page-chat', PageChat);
