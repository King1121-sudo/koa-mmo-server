const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.createAlliance = async (req, res) => {

    try {

        const {
            name,
            tag
        } = req.body;

        const alliance = await prisma.alliance.create({
            data: {
                name,
                tag
            }
        });

        await prisma.allianceMember.create({
            data: {
                playerId: req.playerId,
                allianceId: alliance.id,
                role: 'leader'
            }
        });

        res.json({
            message: 'Alliance created',
            alliance
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            error: 'Server error'
        });
    }
};

exports.joinAlliance = async (req, res) => {

    try {

        const { allianceId } = req.body;

        const member = await prisma.allianceMember.create({
            data: {
                playerId: req.playerId,
                allianceId
            }
        });

        res.json({
            message: 'Joined alliance',
            member
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            error: 'Server error'
        });
    }
};

exports.getAllianceMembers = async (req, res) => {

    try {

        const { allianceId } = req.params;

        const members = await prisma.allianceMember.findMany({
            where: {
                allianceId: parseInt(allianceId)
            },
            include: {
                player: true
            }
        });

        res.json({
            members
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            error: 'Server error'
        });
    }
};