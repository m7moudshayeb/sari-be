const mongoose = require('mongoose');
const Settings = require('../models/settings.model');
const asyncWrapper = require('../middleware/async-wrapper');
const { createCustomError } = require('../utils/custom-error-handler');

// Get Settings
const getSettings = asyncWrapper(async (req, res, next) => {
  const settings = await Settings.find({});

  return res.status(200).json({
    success: true,
    data: settings,
    message: 'Fetched Successfuly',
  });
});

// Update settings
const updateSettings = async (req, res) => {
  const settings = await Settings.findOneAndUpdate({}, req.body, {
    new: true,
    runValidators: true,
  });

  return res.status(200).json({
    success: true,
    data: settings,
    message: 'Updated Successfuly',
  });
};

module.exports = {
  getSettings,
  updateSettings,
};
