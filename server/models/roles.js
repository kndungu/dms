var config = require('../config/config');

// Define the documents "table"
var RolesSchema = new config.Schema({
    title: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date,
});

// Create the autoincrementing id field starting at 1
RolesSchema.plugin(config.autoIncrement.plugin, {
    model: 'Roles',
    startAt: 1,
    field: 'id'
});

module.exports = config.mongoose.model('Roles', DocumentsSchema);
