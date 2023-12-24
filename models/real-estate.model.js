const { Decimal128 } = require('mongodb');
const mongoose = require('mongoose');

const RealEstateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name field is required'],
    trim: [true, 'Name has trailing spaces'],
  },
  price: {
    type: Decimal128,
    required: [true, 'Price field is required'],
  },
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
  address: {
    type: String,
    required: [true, 'Address field is required'],
    trim: [true, 'Address has trailing spaces'],
  },
  clicks: {
    type: Number,
  },
});

module.exports = mongoose.model('RealEstate', RealEstateSchema);
