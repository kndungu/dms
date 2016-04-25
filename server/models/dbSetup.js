// Set up the database
var mongoose = require('mongoose');
var dataseUri = process.env.DATABASE_URI;
var db = mongoose.connect(dataseUri);

// Provide feedback and get connection object
var db = mongoose.connection;
db.on('error', function(err) {
    console.log(err);
});
db.once('open', function() {
    console.log('Successfully connected to db');
});

// To create the "table"
var Schema = mongoose.Schema;

module.exports = {
    'mongoose': mongoose,
    'Schema': Schema,
    'dbConnection': db
};