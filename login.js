const express = require('express');
const router = express.Router();

const Users = require('./models/users.model');
const asyncWrapper = require('./middleware/async-wrapper');
const { createCustomError } = require('./utils/custom-error-handler');
const jwt = require('jsonwebtoken');

router.post(
  '/api/login',
  asyncWrapper(async (req, res, next) => {
    const { email, password } = req.body;

    console.log('Received email:', email);
    console.log('Received password:', password);

    const user = await Users.findOne({ email });

    if (!user) {
      return next(createCustomError('Email or password does not match!', 400));
    }

    if (user.password !== password) {
      return next(createCustomError('Email or password does not match!.....', 400));
    }

    // Set the expiration time to 1 hour (3600 seconds)
    const expiresIn = 3600;

    const jwToken = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn });

    res.status(200).json({
      success: true,
      message: `Welcome Back ${user.name}!`,
      data: jwToken,
    });
  }),
);

module.exports = router;
