var config = require('../config/config');

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

// Create the autoincrementing id field starting at 1
UserSchema.plugin(config.autoIncrement.plugin, {
    model: 'User',
    startAt: 1,
    field: 'id'
});

module.exports = config.mongoose.model('User', UserSchema);
