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

var _users = {};

// Пдключились
io.on('connection', (socket) => {

    //console.log('Client connected');

    socket.emit('setInitData', {
        _initData,
        _users
    });

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
        socket.broadcast.emit('setchange', {
            change,
            _users
        });
    });

    socket.on('setUserId', (userData) => {
        _users[userData.userId] = {
            id: userData.userId,
            caretPos: userData.caretPos
        };
    });

    socket.on('setCaretPos', (userData) => {
        _users[userData.userId].caretPos = userData.caretPos;
    });

    socket.on('setInitText', (data) => {
        _initData = data.initData;
    });

});

http.listen((process.env.PORT || 5000), () => console.log('listening on *:' + (process.env.PORT || 5000)));