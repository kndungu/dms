var config = require('../config/config');

// Define a "Table"
var TestSchema = new config.Schema({
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

TestSchema.plugin(config.autoIncrement.plugin, {
  model: 'Test',
  startAt: 1,
  field: 'id'
});

module.exports = config.mongoose.model('Test', TestSchema);
