require('dotenv').config();

const express = require('express');

const cors = require('cors');

const http = require('http');

const { Server } =
require('socket.io');

const authRoutes =
require('./routes/authRoutes');

const playerRoutes =
require('./routes/playerRoutes');

const buildingRoutes =
require('./routes/buildingRoutes');

const troopRoutes =
require('./routes/troopRoutes');

const marchRoutes =
require('./routes/marchRoutes');

const mapRoutes =
require('./routes/mapRoutes');

const allianceRoutes =
require('./routes/allianceRoutes');

const battleRoutes =
require('./routes/battleRoutes');

const {
    setupAllianceSocket
} = require('./sockets/allianceSocket');

const {
    setupNotificationSocket
} = require(
    './sockets/notificationSocket'
);

const app = express();

const server =
http.createServer(app);

const io = new Server(server, {

    cors: {
        origin: '*'
    }
});

app.set('io', io);

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {

    res.send(
        'KOA MMO Server Running'
    );
});

app.use('/auth', authRoutes);

app.use('/player', playerRoutes);

app.use('/building', buildingRoutes);

app.use('/troop', troopRoutes);

app.use('/march', marchRoutes);

app.use('/map', mapRoutes);

app.use('/alliance', allianceRoutes);

app.use('/battle', battleRoutes);

setupAllianceSocket(io);

setupNotificationSocket(io);

server.listen(3000, () => {

    console.log(
        'Server running on port 3000'
    );
});