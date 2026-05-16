const router = require('express').Router();

const battleController = require('../controllers/battleController');

const auth = require('../middleware/auth');

router.post('/attack', auth, battleController.attackPlayer);

module.exports = router;