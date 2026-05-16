const { PrismaClient } =
require('@prisma/client');

const prisma = new PrismaClient();

const {

    getTroops,

    getTroopByType,

    createTroop,

    updateTroop

} = require('../services/troopService');

exports.trainTroops = async (
    req,
    res
) => {

    try {

        const {
            type,
            quantity
        } = req.body;

        let troop =
            await getTroopByType(

                prisma,

                req.playerId,

                type
            );

        if (troop) {

            troop =
                await updateTroop(

                    prisma,

                    troop.id,

                    troop.quantity +
                    quantity
                );

        } else {

            troop =
                await createTroop(

                    prisma,

                    req.playerId,

                    type,

                    quantity
                );
        }

        res.json({

            message:
                'Troops trained',

            troop
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            error: 'Server error'
        });
    }
};

exports.getTroops = async (
    req,
    res
) => {

    try {

        const troops =
            await getTroops(

                prisma,

                req.playerId
            );

        res.json({
            troops
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            error: 'Server error'
        });
    }
};