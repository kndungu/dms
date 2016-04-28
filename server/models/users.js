var config = require('../config/config');
var bcrypt = require('bcrypt-nodejs');

// Define a "Table"
var UserSchema = new config.Schema({
  username: {
    type: String,
    required: [true, 'A username must be provided']
  },
  name: {
    first: {
      type: String,
      required: [true, 'A first name must be provided']
    },
    last: {
      type: String,
      required: [true, 'A last name must be provided']
    }
  },
  email: {
    type: String,
    required: [true, 'An email must be provided']
  },
  password: {
    type: String,
    required: [true, 'A password must be provided']
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: Date,
  role: {
    type: String,
    required: [true, 'A role must be defined'],
    enum: ['admin', 'user']
  }
});

// Create the autoincrementing id field starting from 1
UserSchema.plugin(config.autoIncrement.plugin, {
  model: 'User',
  startAt: 1,
  field: 'id'
});

// Before saving hash the plain text password
UserSchema.pre('save', function(next) {

  // To be able to access the object from within the bcrypt function
  var user = this;
  bcrypt.hash(this.password, null, null, function(error, hashedPassword) {
    if (error) {
      var err = new Error('something went wrong');
      console.log(error);
      next(err);
    }
    user.password = hashedPassword;
    next();
  });
});

// Validate hashed password
UserSchema.methods.validatePassword = function(providedPassword, callback) {
  // To be able to access the object from within the bcrypt function
  var user = this;
  console.log(this);
  bcrypt.compare(providedPassword, user.password, function(err, isMatch) {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};

module.exports = config.mongoose.model('User', UserSchema);
