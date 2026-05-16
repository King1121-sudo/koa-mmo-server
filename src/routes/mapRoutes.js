const router = require('express').Router();

const mapController = require('../controllers/mapController');

const auth = require('../middleware/auth');

router.get('/', auth, mapController.getMap);

module.exports = router;    