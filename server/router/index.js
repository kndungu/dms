// Get the routes
var publicRoute = require('./routes/public');
var usersRoute = require('./routes/users');
var documentsRoute = require('./routes/documents');
var testRoute = require('./routes/test');
var testRoute2 = require('./routes/test2');

// To process token
var jwt = require('jsonwebtoken');

// Middleware to protect sensitive routes
var authenticateUser = function(req, res, next) {

    // Check whether request object has a token and save result
    var token = req.body.token ||
        req.query.token ||
        req.headers['x-access-token'];

    // If a token is found
    if (token) {

        // Decode token with our secret key
        jwt.verify(token, process.env.SECRET_KEY, function(error, decoded) {
            // Perhaps a forged token
            if (error) {
                return res.json({
                    success: false,
                    message: 'Failed to authenticate token.'
                });
            } else {
                // If it checks out save in request object for others to use
                req.decoded = decoded;

                // Pass it over to the next function
                next();
            }
        });

    } else {

        // No token provided
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
};

module.exports = function(app) {
    // Use routes above based on route visited by user
    app.use('/', publicRoute);
    app.use('/test', testRoute);

    // Protect sensitive routes
    app.use(authenticateUser);
    app.use('/users', usersRoute);
    app.use('/documents', documentsRoute);
};
