var initialisedDb = require('./dbSetup');

// Define a "Table"
var TestSchema = new initialisedDb.Schema({
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
    updated: Date
});

TestSchema.plugin(initialisedDb.autoIncrement.plugin, {
    model: 'Test',
    startAt: 1,
    field: 'id'
});

module.exports = initialisedDb.mongoose.model('Test', TestSchema);
