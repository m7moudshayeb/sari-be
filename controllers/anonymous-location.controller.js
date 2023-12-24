const mongoose = require('mongoose');
const AnonLocation = require('../models/anonymous-location.model');
const asyncWrapper = require('../middleware/async-wrapper');
const { createCustomError } = require('../utils/custom-error-handler');
const { PAGE_SIZE } = require('../constants');

// Get list of locations within pagination range
const getAnonLocations = asyncWrapper(async (req, res, next) => {
  const { pageNumber } = req.query;

  if (!pageNumber) {
    return next(createCustomError('Page Number is missing', 400));
  }

  const newPageOffset = pageNumber === 1 ? 0 : (pageNumber - 1) * PAGE_SIZE;
  const location = await AnonLocation.find(
    {},
    {
      location: 1,
      clicks: 1,
    },
  )
    .skip(newPageOffset)
    .limit(PAGE_SIZE);
  const totalLocations = await AnonLocation.find({}).count();

  return res.status(200).json({
    success: true,
    data: {
      location,
      total: totalLocations,
    },
    message: 'Fetched Successfuly',
  });
});

// Get location details
const getAnonLocationById = asyncWrapper(async (req, res, next) => {
  const { id: locationId } = req.params;

  if (!locationId) {
    return next(createCustomError('Real Estate ID is missing', 400));
  }

  if (!mongoose.Types.ObjectId.isValid(locationId)) {
    return next(createCustomError('Id is invalid', 404));
  }

  const location = await AnonLocation.find(
    { _id: locationId },
    { name: 1, price: 1, location: 1, clicks: 1, address: 1 },
  );

  return res.status(200).json({
    success: true,
    data: location,
    message: 'Fetched Successfuly',
  });
});

// Create an anonymous location and return it
const createLocation = async (req, res) => {
  const newLocation = await AnonLocation.create(req.body);

  return res.status(200).json({
    success: true,
    data: newLocation,
    message: 'Created Successfuly',
  });
};

// Update a specified location
const updateAnonLocation = async (req, res) => {
  const { id: locationId } = req.params;

  if (!locationId) {
    return next(createCustomError('Real Estate ID is missing', 400));
  }

  if (!mongoose.Types.ObjectId.isValid(locationId)) {
    return next(createCustomError('Id is invalid', 404));
  }

  const location = await AnonLocation.findByIdAndUpdate({ _id: locationId }, req.body, {
    new: true,
    runValidators: true,
  });

  return res.status(200).json({
    success: true,
    data: location,
    message: 'Updated Successfuly',
  });
};

// Delete a specified location
const deleteAnonLocation = async (req, res) => {
  const { id: locationId } = req.params;

  if (!locationId) {
    return next(createCustomError('Real Estate ID is missing', 400));
  }

  if (!mongoose.Types.ObjectId.isValid(locationId)) {
    return next(createCustomError('Id is invalid', 404));
  }

  const location = await AnonLocation.findById({ _id: locationId });

  if (!location) {
    return next(createCustomError('No such record with specified ID', 404));
  }

  await location.deleteOne();

  return res.status(200).json({
    success: true,
    message: 'Deleted Successfuly',
  });
};

module.exports = {
  getAnonLocations,
  getAnonLocationById,
  createLocation,
  updateAnonLocation,
  deleteAnonLocation,
};
