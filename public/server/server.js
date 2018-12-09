const io = require('socket.io')();

const buffer = 10; //размер буфера сохраняемых сообщений
let messages = [];
let clients = {};

io.on('connection', (client) => {
    console.log('new_connection');
    io.sockets.emit('open');

    const id = Math.random();
    if (messages.length > 0) {
        for(var index in messages)
            io.sockets.emit('send', messages[index]);
    }

    client.on('join', (username) => {
        clients[id] = username;
    });

    client.on('send', (data) => {
        messages.push(data);
        io.sockets.emit('send', data);

        if (messages.length >= buffer) {
            messages = messages.slice(-1*buffer);
        }
    });

    client.on('disconnect', () => {
        io.sockets.emit('leave', clients[id]);
        console.log('client disconnect', clients[id])
    });
});


const port = 8000;
io.listen(port);
console.log('listening on port ', port);