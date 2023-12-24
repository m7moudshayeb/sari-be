const express = require('express');
const router = express.Router();
const { canAccessData } = require('../middleware/authentication');
const passport = require('passport');

const {
  getAnonLocations,
  getAnonLocationById,
  createLocation,
  updateAnonLocation,
  deleteAnonLocation,
} = require('../controllers/anonymous-location.controller');
require('../passport');

router.get('/v1/query', passport.authenticate('jwt', { session: false }), canAccessData, getAnonLocations);
router.get('/:id', passport.authenticate('jwt', { session: false }), canAccessData, getAnonLocationById);
router.post('/', passport.authenticate('jwt', { session: false }), canAccessData, createLocation);
router.put('/:id', passport.authenticate('jwt', { session: false }), canAccessData, updateAnonLocation);
router.delete('/:id', passport.authenticate('jwt', { session: false }), canAccessData, deleteAnonLocation);

module.exports = router;
