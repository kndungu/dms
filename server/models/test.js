var config = require('../config/config');

// Define a "Table"
var TestSchema = new config.Schema({
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

TestSchema.plugin(config.autoIncrement.plugin, {
    model: 'Test',
    startAt: 1,
    field: 'id'
});

module.exports = config.mongoose.model('Test', TestSchema);
