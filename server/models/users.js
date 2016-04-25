var initialisedDb = require('./dbSetup');

// To be able to autoincrement the id field
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(initialisedDb.dbConnection);

// Define a "Table"
var UserSchema = new initialisedDb.Schema({
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
UserSchema.plugin(autoIncrement.plugin, {
    model: 'User',
    startAt: 1,
    field: 'id'
});

module.exports = initialisedDb.mongoose.model('User', UserSchema);
