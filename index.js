var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var extendify = require('extendify');

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html') );

//var msgCurrent = null;

// Пдключились
io.on('connection', (socket) => {

    //console.log('Client connected');

    //socket.on('disconnect', () => console.log('Client disconnected'));

    socket.on('sendmsg', (msg) => {

        /*var msgArr = msg.split(' '),
        msgCurrentBuffer = msg.split(' ');

        if (msgCurrent) {
        msgCurrentBuffer = extendify(msgCurrent, msgArr);

        msg = msgCurrentBuffer.join(' ');
        }

        msgCurrent = msgCurrentBuffer;*/

        //io.emit('setmsg', msg);
        socket.broadcast.emit('setmsg', msg);

    });

});

http.listen((process.env.PORT || 5000), () => console.log('listening on *:' + (process.env.PORT || 5000)));