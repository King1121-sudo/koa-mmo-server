const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.getProfile = async (req, res) => {

    try {

        const player = await prisma.player.findUnique({
            where: {
                id: req.playerId
            }
        });

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