const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, 'Email can not be empty'],
    trim: true,
    unique: [true, 'Email already exists'],
    validate: {
      validator: value => validator.isEmail(value),
      message: 'Invalid email format',
    },
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['ADMIN', 'CLIENT'],
  },
});

module.exports = mongoose.model('Users', UserSchema);
