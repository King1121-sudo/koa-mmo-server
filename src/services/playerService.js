async function getPlayerById(
    prisma,
    playerId
) {

    return await prisma.player.findUnique({

        where: {
            id: playerId
        },

        include: {

            buildings: true,

            troops: true
        }
    });
}

async function getPlayerByUsername(
    prisma,
    username
) {

    return await prisma.player.findUnique({

        where: {
            username
        }
    });
}

module.exports = {

    getPlayerById,

    getPlayerByUsername
};