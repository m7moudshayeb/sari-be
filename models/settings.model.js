const { Decimal128 } = require('mongodb');
const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
  enableTransactions: {
    type: Boolean,
    default: true,
  },
  centroid: {
    lat: {
      type: Decimal128,
      required: [true, 'Latitude is required'],
    },
    long: {
      type: Decimal128,
      required: [true, 'Longitude is required'],
    },
  },
  zoomLevel: {
    type: Decimal128,
    default: 10,
  },
  mapType: {
    type: String,
    enum: ['roadmap', 'satellite', 'hybrid', 'terrain'],
    default: 'satellite',
  },
});

module.exports = mongoose.model('Settings', SettingsSchema);
