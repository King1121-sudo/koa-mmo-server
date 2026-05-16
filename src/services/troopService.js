async function getTroops(
    prisma,
    playerId
) {

    return await prisma.troop.findMany({

        where: {
            playerId
        }
    });
}

async function getTroopByType(

    prisma,

    playerId,

    type
) {

    return await prisma.troop.findFirst({

        where: {

            playerId,

            type
        }
    });
}

async function createTroop(

    prisma,

    playerId,

    type,

    quantity
) {

    return await prisma.troop.create({

        data: {

            playerId,

            type,

            quantity
        }
    });
}

async function updateTroop(

    prisma,

    troopId,

    quantity
) {

    return await prisma.troop.update({

        where: {
            id: troopId
        },

        data: {
            quantity
        }
    });
}

module.exports = {

    getTroops,

    getTroopByType,

    createTroop,

    updateTroop
};