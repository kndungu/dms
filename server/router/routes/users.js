var express = require('express');
var router = express.Router();
var Users = require('../../models/users');

/*
 * Corresponds to 'theurl:port/users'
 */
router.get('/', function(req, res) {
    // Get all entries in the users "table"
    Users.find(function(error, users) {
        //  Inform user if anything goes wrong
        if (error) {
            res.status(500);
            res.send('There was an error reading from the database');
        }

        // Else all's good, send results
        res.json(users);
    });
});
router.get('/:id', function(req, res) {
    // Find all entries with the specified id
    Users.find({'id':req.params.id}, function(error, user) {
        //  Inform user if anything goes wrong
        if (error) {
            res.status(500);
            res.send('There was an error reading from the database');
        }

        // Else all's good, send results
        res.json(user);
    });
});
router.post('/', function(req, res) {
    // Declare new instance of the Users "table"
    user = new Users();

    // Define values of the new "row" to add
    user.username = req.body.username;
    user.name.first = req.body.firstName;
    user.name.last = req.body.lastName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.role = req.body.role;

    // Save the new "row"
    user.save(function(error) {
        // If error occured inform user
        if (error) {
            console.log(err);
            res.status(500);
            res.send('There was an error saving to the database');
        }
        // Return successfully created object
        res.json(user);
    });
});



router.put('/:id', function(req, res) {
    // Return all entry in Users "table" with provided id
    Users.find({
        id: req.params.id
    }, function(find_error, users) {
        // In case of error inform user
        if (find_error) {
            console.log(find_error);
            res.status(500);
            res.send('Error reading from database');
        }

        // Update each entry found
        users.forEach(function(user) {

            // For every object property in the body
            // Update it's corresponding db property
            Object.keys(req.body).forEach(function(property) {
                // Special cases for first and last names
                if (property === 'firstName') {
                    user.name.first = req.body.firstName;
                } else if (property === 'lastName') {
                    user.name.last = req.body.lastName;
                } else {
                    user[property] = req.body[property];
                }

                // "Row" can now have an updated value
                user.updated = new Date();
            });

            // Save the updated "row"
            user.save(function(save_error) {
                // If error occured inform user
                if (save_error) {
                    console.log(save_error);
                    res.status(500);
                    res.send('Error saving to database');
                }
            });
        });

        // Return successfully updated object
        res.json(users);



    });
});

module.exports = router;
