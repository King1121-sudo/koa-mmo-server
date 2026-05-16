const router = require('express').Router();

const troopController = require('../controllers/troopController');

const auth = require('../middleware/auth');

router.post('/train', auth, troopController.trainTroops);

router.get('/all', auth, troopController.getTroops);

module.exports = router;