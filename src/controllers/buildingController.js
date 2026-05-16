const { PrismaClient } =
require('@prisma/client');

const prisma = new PrismaClient();

exports.createBuilding = async (
    req,
    res
) => {

    try {

        const {
            type
        } = req.body;

        const building =
            await prisma.building.create({

                data: {

                    playerId:
                        req.playerId,

                    type,

                    level: 1
                }
            });

        res.json({

            message:
                'Building created',

            building
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            error: 'Server error'
        });
    }
};

exports.upgradeBuilding = async (
    req,
    res
) => {

    try {

        const {
            buildingId
        } = req.body;

        const building =
            await prisma.building.findUnique({

                where: {
                    id: buildingId
                }
            });

        if (!building) {

            return res.status(404).json({
                error:
                    'Building not found'
            });
        }

        const upgraded =
            await prisma.building.update({

                where: {
                    id: buildingId
                },

                data: {
                    level:
                        building.level + 1
                }
            });

        res.json({

            message:
                'Building upgraded',

            building: upgraded
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            error: 'Server error'
        });
    }
};

exports.getBuildings = async (
    req,
    res
) => {

    try {

        const buildings =
            await prisma.building.findMany({

                where: {
                    playerId:
                        req.playerId
                }
            });

        res.json({
            buildings
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            error: 'Server error'
        });
    }
};