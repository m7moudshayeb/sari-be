const mongoose = require('mongoose');
const RealEstate = require('../models/real-estate.model');
const asyncWrapper = require('../middleware/async-wrapper');
const { createCustomError } = require('../utils/custom-error-handler');
const { PAGE_SIZE } = require('../constants');

// Get list of real-estates within pagination range
const getRealEstates = asyncWrapper(async (req, res, next) => {
  const { pageNumber } = req.query;

  if (!pageNumber) {
    return next(createCustomError('Page Number is missing', 400));
  }

  const newPageOffset = pageNumber === 1 ? 0 : (pageNumber - 1) * PAGE_SIZE;
  const realEstates = await RealEstate.find(
    {},
    {
      name: 1,
      price: 1,
      address: 1,
    },
  )
    .skip(newPageOffset)
    .limit(PAGE_SIZE);
  const totalRealEstates = await RealEstate.find({}).count();

  return res.status(200).json({
    success: true,
    data: {
      realEstates,
      total: totalRealEstates,
    },
    message: 'Fetched Successfuly',
  });
});

// Get real-estate details
const getRealEstateById = asyncWrapper(async (req, res, next) => {
  const { id: realEstateId } = req.params;

  if (!realEstateId) {
    return next(createCustomError('Real Estate ID is missing', 400));
  }

  if (!mongoose.Types.ObjectId.isValid(realEstateId)) {
    return next(createCustomError('Id is invalid', 404));
  }

  const realEstate = await RealEstate.find({ _id: realEstateId });

  return res.status(200).json({
    success: true,
    data: realEstate,
    message: 'Fetched Successfuly',
  });
});

// Create a real-estate and return it
const createRealEstate = async (req, res) => {
  const newRealEstate = await RealEstate.create(req.body);

  return res.status(200).json({
    success: true,
    data: newRealEstate,
    message: 'Created Successfuly',
  });
};

// Update a specified real-estate
const updateRealEstate = async (req, res) => {
  const { id: realEstateId } = req.params;

  if (!realEstateId) {
    return next(createCustomError('Real Estate ID is missing', 400));
  }

  if (!mongoose.Types.ObjectId.isValid(realEstateId)) {
    return next(createCustomError('Id is invalid', 404));
  }

  const realEstate = await RealEstate.findByIdAndUpdate({ _id: realEstateId }, req.body, {
    new: true,
    runValidators: true,
  });

  return res.status(200).json({
    success: true,
    data: realEstate,
    message: 'Updated Successfuly',
  });
};

// Delete a specified real-estate
const deleteRealEstate = async (req, res) => {
  const { id: realEstateId } = req.params;

  if (!realEstateId) {
    return next(createCustomError('Real Estate ID is missing', 400));
  }

  if (!mongoose.Types.ObjectId.isValid(realEstateId)) {
    return next(createCustomError('Id is invalid', 404));
  }

  const realEstate = await RealEstate.findById({ _id: realEstateId });

  if (!realEstate) {
    return next(createCustomError('No such record with specified ID', 404));
  }

  await realEstate.deleteOne();

  return res.status(200).json({
    success: true,
    message: 'Deleted Successfuly',
  });
};

module.exports = {
  getRealEstates,
  getRealEstateById,
  createRealEstate,
  updateRealEstate,
  deleteRealEstate,
};
