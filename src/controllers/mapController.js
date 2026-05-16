const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const worldMap = require('../game/worldMap');

exports.getMap = async (req, res) => {

    const players = await prisma.player.findMany({
        select: {
            id: true,
            username: true,
            cityX: true,
            cityY: true
        }
    });

    const mapCopy = JSON.parse(JSON.stringify(worldMap));

    for (const player of players) {

        mapCopy[player.cityY][player.cityX].player = {
            id: player.id,
            username: player.username
        };
    }

    res.json({
        map: mapCopy
    });
};