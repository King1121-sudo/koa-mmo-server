const {
    processBattle
} = require('./battleEngine');

const {
    GAME_CONFIG
} = require('../config/gameConfig');

async function startMarch({

    prisma,

    io,

    playerId,

    body

}) {

    const {

        startX,
        startY,

        targetX,
        targetY,

        troopType,
        troopAmount,

        defenderId

    } = body;

    const troop =
        await prisma.troop.findFirst({

            where: {

                playerId,

                type: troopType
            }
        });

    if (
        !troop ||
        troop.quantity < troopAmount
    ) {

        throw new Error(
            'Not enough troops'
        );
    }

    const distance = Math.sqrt(

        Math.pow(
            targetX - startX,
            2
        ) +

        Math.pow(
            targetY - startY,
            2
        )
    );

    const travelSeconds =
        Math.floor(

            distance *

            GAME_CONFIG
            .MARCH_SPEED
        );

    const arrivalTime =
        new Date(

            Date.now() +
            travelSeconds * 1000
        );

    await prisma.troop.update({

        where: {
            id: troop.id
        },

        data: {

            quantity:
                troop.quantity -
                troopAmount
        }
    });

    const march =
        await prisma.march.create({

            data: {

                playerId,

                startX,
                startY,

                targetX,
                targetY,

                troopType,
                troopAmount,

                arrivalTime
            }
        });

    io.to(
        `player-${playerId}`
    ).emit(

        'notification',

        {
            message:
                `March started to (${targetX}, ${targetY})`
        }
    );

    setTimeout(async () => {

        try {

            if (defenderId) {

                const result =
                    await processBattle({

                        prisma,

                        attackerId:
                            playerId,

                        defenderId,

                        troopType,

                        troopAmount
                    });

                io.to(
                    `player-${playerId}`
                ).emit(

                    'notification',

                    {
                        message:
                            `Battle finished. Winner: ${result.winner}`
                    }
                );

                io.to(
                    `player-${defenderId}`
                ).emit(

                    'notification',

                    {
                        message:
                            `Your city was attacked`
                    }
                );
            }

            await prisma.march.delete({

                where: {
                    id: march.id
                }
            });

        } catch (err) {

            console.log(err);
        }

    }, travelSeconds * 1000);

    return {

        message:
            'March started',

        travelSeconds,

        arrivalTime,

        march
    };
}

module.exports = {
    startMarch
};