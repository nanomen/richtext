var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var extendify = require('extendify');

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html') );

var _initData = {
      ops: [
        { insert: 'Привет!' }
      ]
    };

// Пдключились
io.on('connection', (socket) => {

    //console.log('Client connected');

    socket.emit('setInitData', _initData);

    /*socket.on('getInitData', () => {

    });*/


    //socket.on('disconnect', () => console.log('Client disconnected'));

    socket.on('sendchange', (change) => {

        /*var msgArr = msg.split(' '),
        msgCurrentBuffer = msg.split(' ');

        if (msgCurrent) {
        msgCurrentBuffer = extendify(msgCurrent, msgArr);

        msg = msgCurrentBuffer.join(' ');
        }

        msgCurrent = msgCurrentBuffer;*/

        //io.emit('setmsg', msg);
        socket.broadcast.emit('setchange', change);
    });

    socket.on('setInitText', (data) => {
        _initData = data.initData;
    });

});

http.listen((process.env.PORT || 5000), () => console.log('listening on *:' + (process.env.PORT || 5000)));