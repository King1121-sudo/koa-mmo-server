const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.attackPlayer = async (req, res) => {

    try {

        const {
            defenderId,
            troopType,
            troopAmount
        } = req.body;

        const attackerTroops = await prisma.troop.findFirst({
            where: {
                playerId: req.playerId,
                type: troopType
            }
        });

        if (!attackerTroops || attackerTroops.quantity < troopAmount) {

            return res.status(400).json({
                error: 'Not enough troops'
            });
        }

        const defenderTroops = await prisma.troop.findMany({
            where: {
                playerId: defenderId
            }
        });

        let defenderPower = 0;

        for (const troop of defenderTroops) {
            defenderPower += troop.quantity;
        }

        const attackerPower = troopAmount;

        let winner;

        if (attackerPower > defenderPower) {
            winner = 'attacker';
        } else {
            winner = 'defender';
        }

        const attackerLosses = Math.floor(attackerPower * 0.3);

        const defenderLosses = Math.floor(defenderPower * 0.5);

        await prisma.troop.update({
            where: {
                id: attackerTroops.id
            },
            data: {
                quantity:
                    attackerTroops.quantity - attackerLosses
            }
        });

        for (const troop of defenderTroops) {

            const newQuantity =
                troop.quantity -
                Math.floor(defenderLosses / defenderTroops.length);

            await prisma.troop.update({
                where: {
                    id: troop.id
                },
                data: {
                    quantity:
                        Math.max(newQuantity, 0)
                }
            });
        }

        res.json({
            message: 'Battle completed',

            result: {
                winner,
                attackerPower,
                defenderPower,
                attackerLosses,
                defenderLosses
            }
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            error: 'Server error'
        });
    }
};