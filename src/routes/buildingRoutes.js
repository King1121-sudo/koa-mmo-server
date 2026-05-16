const router = require('express').Router();

const buildingController = require('../controllers/buildingController');

const auth = require('../middleware/auth');

router.post('/create', auth, buildingController.createBuilding);

router.get('/all', auth, buildingController.getBuildings);

router.post('/upgrade', auth, buildingController.upgradeBuilding);

module.exports = router;