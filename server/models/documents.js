var config = require('../config/config');

// Define the documents "table"
var DocumentsSchema = new config.Schema({
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
DocumentsSchema.plugin(config.autoIncrement.plugin, {
    model: 'Documents',
    startAt: 1,
    field: 'id'
});

module.exports = config.mongoose.model('Documents', DocumentsSchema);
