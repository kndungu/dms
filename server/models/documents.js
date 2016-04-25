var initialisedDb = require('./dbSetup');

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
DocumentsSchema.plugin(initialisedDb.autoIncrement.plugin, {
    model: 'Documents',
    startAt: 1,
    field: 'id'
});

module.exports = initialisedDb.mongoose.model('Documents', DocumentsSchema);
