var WebSocketServer = new require('ws');

// подключенные клиенты
var clients = {};
var messages = [];

var bufferSize = 10;

// WebSocket-сервер на порту 3001
var webSocketServer = new WebSocketServer.Server({
  port: 3001
});
webSocketServer.on('connection', function(client) {
  var id = Math.random();
  clients[id] = client;

  console.log("новое соединение " + id);

  //передаем последние 10 сообщений пользователю
  if (messages.length > 0) {
    for(var index in messages)
      clients[id].send(messages[index]);
  }

  client.on('message', function(message) {
    //вместе с message отсылать идентификатор клиента
    console.log('получено сообщение ' + message);
    messages.push(message);
    //очищаем буфер из сообщений
    if (messages.length >= bufferSize) {
      //образаем таким образом, чтобы оставались последние 10 элементов
      messages = messages.slice(-1*bufferSize);
    }
    //рассылаем сообщение всем подключенным клиентам
    for (var key in clients) {
      clients[key].send(message);
    }

  });

  client.on('close', function() {
    console.log('соединение закрыто ' + id);
    delete clients[id];
  });
});
