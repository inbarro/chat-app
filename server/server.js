const io = require('socket.io')(3000);
const users = {};
const elasticsearch = require('elasticsearch');
const Client = new elasticsearch.Client({ host: 'localhost:9200' });

// TODO: 1. Convert the message to question in terms of front (not ui), back and DB
//       2. Change the message in the UI to make it look like a question
//       3. Add option to answer a question (add a button in the ui first)
//       4. Add the backend part of receiving the answer to that question
//       5. Add the DB part of answers (add them to the table of questions)
//       6. Change the UI to show question and answer.
//       7. Next stuff later:
//         1) Robot that add answer if the question was asked before
//         2) Find similar using elasticsearch
//         3) Add a header (nice looking one)
//         4) Add a like button and show answer by likes
//         5) Make the robot show use results from google
//         6) Prompt when entering the chat: The robot speaks and he says welcome or something like that
//         7) Add some animation and other impressive UI things


io.on('connection', socket => {
  socket.on('new-user', name => {
    users[socket.id] = name;
    socket.broadcast.emit('user-connected', name);
    Client.index({
      index:'users',
      type: 'mytype',
      id: socket.id,
      body: {'name' : name}
    })
  });

  //old
// ,function (err, res, status) {
//     if (err) {
//       console.log(err);
//     } else {
//       return res.status(200).send({
//         message: 'user call succeeded'
//       })
//     }
//   }

  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { text: message, userName: users[socket.id]})
  })

  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})

