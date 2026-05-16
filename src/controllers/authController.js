const { PrismaClient } =
require('@prisma/client');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

exports.register = async (
    req,
    res
) => {

    try {

        const {
            username,
            password
        } = req.body;

        const existing =
            await prisma.player.findUnique({

                where: {
                    username
                }
            });

        if (existing) {

            return res.status(400).json({
                error:
                    'Username already exists'
            });
        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        const player =
            await prisma.player.create({

                data: {

                    username,

                    password:
                        hashedPassword,

                    power: 100,

                    food: 1000,

                    wood: 1000,

                    stone: 1000,

                    gold: 1000
                }
            });

        res.json({

            message:
                'Player created',

            player
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            error: 'Server error'
        });
    }
};

exports.login = async (
    req,
    res
) => {

    try {

        const {
            username,
            password
        } = req.body;

        const player =
            await prisma.player.findUnique({

                where: {
                    username
                }
            });

        if (!player) {

            return res.status(400).json({
                error:
                    'Invalid username'
            });
        }

        const valid =
            await bcrypt.compare(
                password,
                player.password
            );

        if (!valid) {

            return res.status(400).json({
                error:
                    'Invalid password'
            });
        }

        const token = jwt.sign(

            {
                playerId: player.id
            },

            process.env.JWT_SECRET,

            {
                expiresIn: '7d'
            }
        );

        res.json({

            message:
                'Login successful',

            token
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            error: 'Server error'
        });
    }
};