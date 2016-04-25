var initialisedDb = require('./dbSetup');

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
UserSchema.plugin(initialisedDb.autoIncrement.plugin, {
    model: 'User',
    startAt: 1,
    field: 'id'
});

module.exports = initialisedDb.mongoose.model('User', UserSchema);
