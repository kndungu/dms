var initialisedDb = require('./dbSetup');

// Define the documents "table"
var RolesSchema = new initialisedDb.Schema({
    title: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date,
});

// Create the autoincrementing id field starting at 1
RolesSchema.plugin(initialisedDb.autoIncrement.plugin, {
    model: 'Roles',
    startAt: 1,
    field: 'id'
});

module.exports = initialisedDb.mongoose.model('Roles', DocumentsSchema);
