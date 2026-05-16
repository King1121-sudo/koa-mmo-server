const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.register = async (req, res) => {

    try {

        const { username, password } = req.body;

        const existing = await prisma.player.findUnique({
            where: {
                username
            }
        });

        if (existing) {
            return res.status(400).json({
                error: 'Username already exists'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const player = await prisma.player.create({
            data: {
                username,
                password: hashedPassword
            }
        });

        res.json({
            message: 'Player created',
            player
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            error: 'Server error'
        });
    }
};

exports.login = async (req, res) => {

    try {

        const { username, password } = req.body;

        const player = await prisma.player.findUnique({
            where: {
                username
            }
        });

        if (!player) {
            return res.status(401).json({
                error: 'Player not found'
            });
        }

        const validPassword = await bcrypt.compare(
            password,
            player.password
        );

        if (!validPassword) {
            return res.status(401).json({
                error: 'Wrong password'
            });
        }

        const token = jwt.sign(
            {
                id: player.id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '7d'
            }
        );

        res.json({
            message: 'Login successful',
            token
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            error: 'Server error'
        });
    }
};