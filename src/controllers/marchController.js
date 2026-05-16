const { PrismaClient } =
require('@prisma/client');

const prisma = new PrismaClient();

const {
    startMarch
} = require('../game/marchEngine');

const {
    gatherResources
} = require('../game/resourceEngine');

exports.createMarch = async (
    req,
    res
) => {

    try {

        const result =
            await startMarch({

                prisma,

                io: req.app.get('io'),

                playerId: req.playerId,

                body: req.body
            });

        res.json(result);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            error: err.message
        });
    }
};

exports.getMarches = async (
    req,
    res
) => {

    try {

        const marches =
            await prisma.march.findMany({
                where: {
                    playerId:
                        req.playerId
                }
            });

        res.json({
            marches
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            error: 'Server error'
        });
    }
};

exports.gatherResource = async (
    req,
    res
) => {

    try {

        const {
            resourceType,
            amount
        } = req.body;

        const player =
            await gatherResources({

                prisma,

                playerId:
                    req.playerId,

                resourceType,

                amount
            });

        res.json({

            message:
                'Resources gathered',

            player
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            error: 'Server error'
        });
    }
};