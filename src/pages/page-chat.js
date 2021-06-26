import { html } from 'lit';
import { PageElement } from '../helpers/page-element';
import { LitElement } from '../components/base';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-checkbox';
import '@vaadin/vaadin-radio-button/vaadin-radio-button';
import '@vaadin/vaadin-radio-button/vaadin-radio-group';

const socket = io('http://localhost:3000', { transports: ['websocket', 'polling', 'flashsocket'] });

const VisibilityFilters = {
  SHOW_ALL: 'All',
  SHOW_ACTIVE: 'Active',
  SHOW_COMPLETED: 'Completed'
};

class PageChat extends PageElement {

  //TODO: 1. Write who wrote the message
  // 2. change names of vars
  // 3. In the server: Add elasticsearch

  // Dont know if needed
  static get properties() {
    return {
      messagesList: { type: Array },
      filter: { type: String },
      message: { type: Object },
      name: {type: String}
    };
  }

  constructor() {
    super();
    // Takes the names from the alert
    this.name = prompt('What is your name?');

    // New user connected
    // Socket emit - send event to the other side of the socket
    socket.emit('new-user', this.name);

    // messages list
    this.messagesList = [{text: "Welcome "+this.name+"!", complete: false}];
    this.filter = VisibilityFilters.SHOW_ALL;
    // What's inside the text box
    this.message = '';

    socket.on('user-connected', name => {
      this.addMessageToChat({userName:`${name}`, text: ' i joined the conversation'})
    });

    socket.on('user-disconnected', name => {

    });

    // Socket on - get event from the other side of the socket
    socket.on('chat-message', data => {
      // TODO: Add which users wrote the message
      this.addMessageToChat({userName: data.userName, text:data.text})
    });
  }

  render() {
    return html`
  <div class="input-layout"
  @keyup="${this.shortcutListener}">
      <vaadin-text-field
    placeholder="Message"
    value="${this.message}"
  @change="${this.updateTask}">
      </vaadin-text-field>
      <vaadin-button
    theme="primary"
  @click="${this.sendMassage}">
      Send
    </vaadin-button>
    </div>
    
    <div class="messages-list">
  ${this.messagesList.map(
      message => html`

          <div class="todo-item">
            <vaadin-text-field  value="${message.userName + ": " + message.text}">
              </vaadin-text-field>
          </div>
        `
    )
      }
  </div>
`
  }

  addMessageToChat(newMessage) {
    this.messagesList = [...this.messagesList, {
      userName: newMessage.userName,
      text: newMessage.text,
      complete: false
    }];
  }

  sendMassage() {
    socket.emit("send-chat-message", this.message);
    this.addMessageToChat({text: this.message, userName: 'me'})
  }

  shortcutListener(e) {
    if (e.key === 'Enter') {
      this.sendMassage();
    }
  }

  updateTask(e) {
    this.message = e.target.value;
  }

}

// logic
customElements.define('page-chat', PageChat);

// messageForm.addEventListener('submit', e => {
//   e.preventDefault()
//   const message = messageInput.value
//   appendMessage(`You: ${message}`)
//   socket.emit('send-chat-message', message)
//   messageInput.value = ''
// })

function appendMessage(newMessage) {
  PageChat.messagesList = [...PageChat.messagesList, {
    userName: newMessage.userName,
    text: newMessage.text,
    complete: false
  }];
}



