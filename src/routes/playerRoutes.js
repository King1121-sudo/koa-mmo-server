const router = require('express').Router();

const playerController = require('../controllers/playerController');

const auth = require('../middleware/auth');

router.get('/profile', auth, playerController.getProfile);

router.get('/:id', auth, playerController.getPlayerById);

module.exports = router;