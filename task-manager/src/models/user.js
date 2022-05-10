const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model('User', {
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    min: 1
  },
  email: {
    type: String,
    required: true,
    validate(value) {
      return validator.isEmail(value)
    }
  },
  password: {
    type: String,
    required: true,
    validate(value) {
      if(value.length < 7 || value.toLowerCase().includes('password')) {
        throw new Error('Password length must be greater than 6 and cannot contain "password"')
      }
    }
  }
});

module.exports = User;