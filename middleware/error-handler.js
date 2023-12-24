const { CustomAPIError } = require('../utils/custom-error-handler');
const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }
  return res.status(500).json({
    success: false,
    message: err.message || 'Something Went Wrong',
    error: err,
  });
};

module.exports = errorHandler;
