const io = require('socket.io-client');

const socket = io('http://localhost:3000');

socket.on('connect', () => {

    console.log('Connected to server');

    socket.emit('joinAllianceRoom', 1);

    socket.emit('allianceMessage', {
        allianceId: 1,
        player: 'AlphaKing',
        message: 'Welcome alliance members!'
    });
});

socket.on('allianceMessage', (data) => {

    console.log(`[Alliance] ${data.player}: ${data.message}`);
});