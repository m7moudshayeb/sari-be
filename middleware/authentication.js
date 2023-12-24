const { createCustomError } = require('../utils/custom-error-handler');

const isAdmin = (req, res, next) => {
  // Check if the user has the 'admin' role.
  if (req.user && req.user.role === 'ADMIN') {
    return next();
  }
  return next(createCustomError('Access denied. You are not an owner.', 403));
};

const isClient = (req, res, next) => {
  // Check if the user has the 'customer' role.
  if (req.user && req.user.role === 'CLIENT') {
    return next();
  }
  return next(createCustomError('Access denied. You are not an customer.', 403));
};

const canAccessData = (req, res, next) => {
  // Check if the user has the 'customer' role.
  if (req.user && ['ADMIN', 'CLIENT'].includes(req.user.role)) {
    return next();
  }
  return next(createCustomError('Access denied. You are not an customer.', 403));
};

const hasAccessToOwnData = (req, res, next) => {
  // Check if the user is trying to access their own data.
  if ((req.params || req.body) && req.user && (req.params.id || req.body.userId) === req.user.id) {
    return next();
  }
  return next(createCustomError('Access denied. You do not have permission to access this data.', 403));
};

module.exports = { isAdmin, isClient, canAccessData, hasAccessToOwnData };
