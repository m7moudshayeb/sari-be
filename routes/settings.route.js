const express = require('express');
const router = express.Router();
const { canAccessData } = require('../middleware/authentication');
const passport = require('passport');
require('../passport');

const { getSettings, updateSettings } = require('../controllers/settings.controller');

router.get('/', passport.authenticate('jwt', { session: false }), canAccessData, getSettings);
router.put('/:id', passport.authenticate('jwt', { session: false }), canAccessData, updateSettings);

module.exports = router;
