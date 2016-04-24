// Get the routes
var homeRoute = require('./routes/index');
var testRoute = require('./routes/test');

module.exports = function(app) {
    // Use routes above based on route visited by user
    app.use('/', homeRoute);
    app.use('/api/test', testRoute);
};
