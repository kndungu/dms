var initialisedDb = require('./dbSetup');

// To be able to autoincrement the id field
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(initialisedDb.dbConnection);

// Define the documents "table"
var DocumentsSchema = new initialisedDb.Schema({
    ownerId: Number,
    title: String,
    content: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date,
});

// Create the autoincrementing id field starting at 1
DocumentsSchema.plugin(autoIncrement.plugin, {
    model: 'Documents',
    startAt: 1,
    field: 'id'
});

module.exports = initialisedDb.mongoose.model('Documents', DocumentsSchema);
