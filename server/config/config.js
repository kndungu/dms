// Set up the database
var mongoose = require('mongoose');

// Custom message for enum validation errors
mongoose.Error.messages.String.enum  = '\'{VALUE}\' is in an invalid {PATH}.';

// Connect to the db
var dataseUri = process.env.DATABASE_URI;
var db = mongoose.connect(dataseUri);

// Provide feedback
var db = mongoose.connection;
db.on('error', function(error) {
    console.log(error);
});
db.once('open', function() {
    console.log('Successfully connected to db');
});

// To be able to autoincrement an id field
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(db);

// To create the "table"
var Schema = mongoose.Schema;

module.exports = {
    'mongoose': mongoose,
    'Schema': Schema,
    'autoIncrement': autoIncrement
};
