require('dotenv').config();

const express = require('express');

const authRoutes = require('./routes/authRoutes');
const playerRoutes = require('./routes/playerRoutes');
const buildingRoutes = require('./routes/buildingRoutes');
const troopRoutes = require('./routes/troopRoutes');
const marchRoutes = require('./routes/marchRoutes');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('KOA MMO Server Running');
});

app.use('/auth', authRoutes);
app.use('/player', playerRoutes);
app.use('/building', buildingRoutes);
app.use('/troop', troopRoutes);
app.use('/march', marchRoutes);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});