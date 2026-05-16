const router = require('express').Router();

const allianceController = require('../controllers/allianceController');

const auth = require('../middleware/auth');

router.post('/create', auth, allianceController.createAlliance);

router.post('/join', auth, allianceController.joinAlliance);

router.get('/members/:allianceId', auth, allianceController.getAllianceMembers);

module.exports = router;