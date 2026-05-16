function setupAllianceSocket(io) {

    io.on('connection', (socket) => {

        console.log(
            'Player connected'
        );

        socket.on(
            'joinAllianceRoom',

            (allianceId) => {

                socket.join(
                    `alliance-${allianceId}`
                );

                console.log(
                    `Joined alliance room ${allianceId}`
                );
            }
        );

        socket.on(
            'allianceMessage',

            (data) => {

                io.to(
                    `alliance-${data.allianceId}`
                ).emit(

                    'allianceMessage',

                    {
                        player:
                            data.player,

                        message:
                            data.message
                    }
                );
            }
        );

        socket.on(
            'disconnect',

            () => {

                console.log(
                    'Player disconnected'
                );
            }
        );
    });
}

module.exports = {
    setupAllianceSocket
};