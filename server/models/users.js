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

// To be able to autoincrement the id field
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(db);

// To create the "table"
var Schema = mongoose.Schema;

// Define a "Table"
var UserSchema = new Schema({
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
    updated: Date,
    role: String
});

// Create the autoincrementing id field starting at 1
UserSchema.plugin(autoIncrement.plugin, {
    model: 'User',
    startAt: 1,
    field: 'id'
});

module.exports = mongoose.model('User', UserSchema);
