var http = require('http');
var server = http.createServer();
var socket_io = require('socket.io');
//https://github.com/itaylor/redux-socket.io
server.listen(3003);
var io = socket_io();
io.attach(server);
io.on('connection', function(socket) {
  console.log("Socket connected: " + socket.id);

  //отлавливаем действия пользователя
  socket.on('action', (action) => {
    console.log('SERVER CATCH ACTION', action.type);
    //socket.emit('action', action);
    /*if (action.type === 'server/new-message') {
      console.log('Got new message', action.message);
      socket.emit('action', {type: 'response', data: "I've receive message"});
    }*/
  });
});