// Will do the heavy lifting
// var mongoose = require('mongoose');
var dataseUri = process.env.DATABASE_URI;
/*
 *Set up database
 */
var mongoose = require('mongoose');
var db = mongoose.connect(dataseUri);

// Provide feedback
var db = mongoose.connection;
db.on('error', function(err) {
    console.log(err);
});
db.once('open', function() {
    console.log('Successfully connected to db');
});

// To be able to autoincrement fields
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(db);

// To create the "table"
var Schema = mongoose.Schema;

// Define a "Table"
var TestSchema = new Schema({
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

TestSchema.plugin(autoIncrement.plugin, {
    model: 'Test',
    startAt: 1,
    field: 'id'
});

module.exports = mongoose.model('Test', TestSchema);
