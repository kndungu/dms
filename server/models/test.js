// Will do the heavy lifting
var mongoose = require('mongoose');

// To create the "table"
var Schema = mongoose.Schema;

// Define a "Table"
var TestSchema   = new Schema({
    name: String
});

module.exports = mongoose.model('Test', TestSchema);
