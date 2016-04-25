// Get the routes
var homeRoute = require('./routes/index');
var usersRoute = require('./routes/users');
var documentsRoute = require('./routes/documents');
var testRoute = require('./routes/test');

module.exports = function(app) {
    // Use routes above based on route visited by user
    app.use('/', homeRoute);
    app.use('/users', usersRoute);
    app.use('/documents', documentsRoute);
    app.use('/test', testRoute);
};
