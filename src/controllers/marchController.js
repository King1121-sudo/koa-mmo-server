const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.createMarch = async (req, res) => {

    try {

        const {
            startX,
            startY,
            targetX,
            targetY,
            troopType,
            troopAmount
        } = req.body;

        const distance = Math.sqrt(
            Math.pow(targetX - startX, 2) +
            Math.pow(targetY - startY, 2)
        );

        const travelSeconds = distance * 5;

        const arrivalTime = new Date(
            Date.now() + travelSeconds * 1000
        );

        const march = await prisma.march.create({
            data: {
                playerId: req.playerId,

                startX,
                startY,

                targetX,
                targetY,

                troopType,
                troopAmount,

                arrivalTime
            }
        });

        res.json({
            message: 'March started',
            march
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            error: 'Server error'
        });
    }
};

exports.getMarches = async (req, res) => {

    try {

        const marches = await prisma.march.findMany({
            where: {
                playerId: req.playerId
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