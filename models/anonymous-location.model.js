const mongoose = require('mongoose');
const { Decimal128 } = require('mongodb');

const AnonymousLocationSchema = new mongoose.Schema({
  name: {},
  price: {},
  address: {},
  location: {
    lat: {
      type: Decimal128,
      required: [true, 'Latitude is required'],
    },
    long: {
      type: Decimal128,
      required: [true, 'Longitude is required'],
    },
  },
  clicks: {
    type: Number,
  },
});

module.exports = mongoose.model('AnonymousLocation', AnonymousLocationSchema);
