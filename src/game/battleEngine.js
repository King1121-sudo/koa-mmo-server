const {

    calculateBattle

} = require('../services/battleService');

async function processBattle({

    prisma,

    attackerId,

    defenderId,

    troopType,

    troopAmount

}) {

    const defenderTroops =
        await prisma.troop.findMany({

            where: {
                playerId:
                    defenderId
            }
        });

    let defenderPower = 0;

    for (const troop of defenderTroops) {

        defenderPower += troop.quantity;
    }

    const attackerPower =
        troopAmount;

    const result =
        await calculateBattle({

            attackerPower,

            defenderPower
        });

    for (const troop of defenderTroops) {

        const newQuantity =
            troop.quantity -
            Math.floor(

                result.defenderLosses /
                defenderTroops.length
            );

        await prisma.troop.update({

            where: {
                id: troop.id
            },

            data: {

                quantity:
                    Math.max(
                        newQuantity,
                        0
                    )
            }
        });
    }

    const survivingAttackers =
        troopAmount -
        result.attackerLosses;

    const existingTroop =
        await prisma.troop.findFirst({

            where: {

                playerId:
                    attackerId,

                type:
                    troopType
            }
        });

    await prisma.troop.update({

        where: {
            id:
                existingTroop.id
        },

        data: {

            quantity:
                existingTroop.quantity +
                survivingAttackers
        }
    });

    return {

        winner:
            result.winner,

        attackerPower,

        defenderPower,

        attackerLosses:
            result.attackerLosses,

        defenderLosses:
            result.defenderLosses
    };
}

module.exports = {
    processBattle
};