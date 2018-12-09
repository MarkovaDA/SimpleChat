const io = require('socket.io')();

const buffer = 10; //размер буфера сохраняемых сообщений
let messages = [];
let currentClient;

io.on('connection', (client) => {
    console.log('new_connection');
    io.sockets.emit('open');

    if (messages.length > 0) {
        for(var index in messages)
            io.sockets.emit('send', messages[index]);
    }

    client.on('join', (username) => {
        currentClient = username;
    });

    client.on('send', (data) => {
        messages.push(data);
        io.sockets.emit('send', data);

        if (messages.length >= buffer) {
            messages = messages.slice(-1*buffer);
        }
    });

    client.on('disconnect', () => {
        io.sockets.emit('leave', currentClient);
        console.log('client disconnect', currentClient)
    });
});


const port = 8000;
io.listen(port);
console.log('listening on port ', port);