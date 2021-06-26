const io = require('socket.io')(3000);
const users = {};
const elasticsearch = require('elasticsearch');
const Client = new elasticsearch.Client({ host: 'localhost:9200' });

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

