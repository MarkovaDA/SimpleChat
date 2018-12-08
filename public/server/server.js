const io = require('socket.io')();

var messages = [];

io.on('connection', (client) => {
    client.emit('SERVER-CONNECT');

    client.on('SEND-MESSAGE')
});

const port = 8000;
io.listen(port);

console.log('listening on port ', port);