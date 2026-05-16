function sendNotification(

    io,

    playerId,

    message
) {

    io.to(
        `player-${playerId}`
    ).emit(

        'notification',

        {
            message
        }
    );
}

function setupNotificationSocket(io) {

    io.on('connection', (socket) => {

        socket.on(
            'joinPlayerRoom',

            (playerId) => {

                socket.join(
                    `player-${playerId}`
                );

                console.log(
                    `Player room joined ${playerId}`
                );
            }
        );
    });
}

module.exports = {

    sendNotification,

    setupNotificationSocket
};