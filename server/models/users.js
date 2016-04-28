var config = require('../config/config');
var bcrypt = require('bcrypt-nodejs');

// Define a "Table"
var UserSchema = new config.Schema({
  username: String,
  name: {
    first: String,
    last: String
  },
  email: String,
  password: String,
  created: {
    type: Date,
    default: Date.now
  },
  updated: Date,
  role: String
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
