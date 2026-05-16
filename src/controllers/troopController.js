const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.trainTroops = async (req, res) => {

    try {

        const { type, quantity } = req.body;

        const existing = await prisma.troop.findFirst({
            where: {
                playerId: req.playerId,
                type
            }
        });

        let troop;

        if (existing) {

            troop = await prisma.troop.update({
                where: {
                    id: existing.id
                },
                data: {
                    quantity: existing.quantity + quantity
                }
            });

        } else {

            troop = await prisma.troop.create({
                data: {
                    playerId: req.playerId,
                    type,
                    quantity
                }
            });
        }

        res.json({
            message: 'Troops trained',
            troop
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            error: 'Server error'
        });
    }
};

exports.getTroops = async (req, res) => {

    try {

        const troops = await prisma.troop.findMany({
            where: {
                playerId: req.playerId
            }
        });

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