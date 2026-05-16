const { PrismaClient } =
require('@prisma/client');

const prisma = new PrismaClient();

const {

    getPlayerById

} = require('../services/playerService');

exports.getProfile = async (
    req,
    res
) => {

    try {

        const player =
            await getPlayerById(
                prisma,
                req.playerId
            );

        res.json({
            player
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            error: 'Server error'
        });
    }
};

exports.getPlayerById = async (
    req,
    res
) => {

    try {

        const player =
            await getPlayerById(

                prisma,

                parseInt(req.params.id)
            );

        if (!player) {

            return res.status(404).json({
                error:
                    'Player not found'
            });
        }

        res.json({
            player
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            error: 'Server error'
        });
    }
};