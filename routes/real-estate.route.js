const express = require('express');
const router = express.Router();

const { canAccessData } = require('../middleware/authentication');
const passport = require('passport');
require('../passport');

const {
  getRealEstates,
  getRealEstateById,
  createRealEstate,
  updateRealEstate,
  deleteRealEstate,
} = require('../controllers/real-estate.controller');

router.get('/v1/query', getRealEstates);
router.get('/:id', passport.authenticate('jwt', { session: false }), canAccessData, getRealEstateById);
router.post('/', passport.authenticate('jwt', { session: false }), canAccessData, createRealEstate);
router.put('/:id', passport.authenticate('jwt', { session: false }), canAccessData, updateRealEstate);
router.delete('/:id', passport.authenticate('jwt', { session: false }), canAccessData, deleteRealEstate);

module.exports = router;
