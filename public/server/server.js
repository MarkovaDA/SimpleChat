const io = require('socket.io')();

let messages = [];//буфер сообщений

const size = 10; //размер буфера

io.on('connection', (socket) => {
  //сообщаем о подключении
  socket.emit('server-connect');

  if (messages.length > 0) {
    //только что подключившемуся клиенту отправляем накопленные сообщения из буфера
    for(let index in messages) {
      let savedMessage = messages[index];
      let sendMessage = {text: savedMessage.text, whose: savedMessage.clientId === socket.id};
      socket.emit('new-message', sendMessage);
    }
  }

  socket.on('send-message', (message) => {
    saveMessageToBuffer(message, socket.id);

    const clients = io.sockets.sockets;
    let newMessage = {};

    //рассылаем сообщение всем клиентам
    Object.keys(clients).forEach((id) => {
      newMessage.text = message;
      newMessage.whose = id === socket.id;
      clients[id].emit('new-message', newMessage);
    });

    //io.sockets.emit('new-message', newMessage);
    //обрезаем буфер сообщений до  размера size, сохраняя последние сообщения
    if (messages.length >= size) {
      messages = messages.slice(-1*size);
    }
  });

  //server-disconnect
  socket.on('disconnect', (reason) => {
    socket.emit('server-disconnect', reason);
  });
});

saveMessageToBuffer = (msgText, socketId) => {
  messages.push({text:msgText, clientId: socketId});
};
const port = 3003;
io.listen(port);

console.log('listening on port ', port);