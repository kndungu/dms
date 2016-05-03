var Users = require('../models/users');
var jwt = require('jsonwebtoken');
var parseError = require('./parseError');

module.exports = {

    getAll: function(req, res) {
      // Get all entries in the users "table"
      Users.find({}, function(error, users) {
        //  Inform user if anything goes wrong
        if (error) {
          res.status(500);
          res.send('There was an error reading from the database');
        } else {
          // Else all's good, send results
          res.json(users);
        }
      });
    },
    getById: function(req, res) {
      // Find all entries with the specified id
      Users.find({
        'id': req.params.id
      }, function(error, user) {
        //  Inform user if anything goes wrong
        if (error) {
          res.status(500);
          res.send('There was an error reading from the database');
        } else {
          // Else all's good, send results
          res.json(user);
        }
      });
    },
    addUser: function(req, res) {
      // Declare new instance of the Users "table"
      user = new Users();

      // Define values of the new "row" to add
      user.username = req.body.username;
      user.name.first = req.body.firstName;
      user.name.last = req.body.lastName;
      user.email = req.body.email;
      user.password = req.body.password;
      user.role = req.body.role;

      // Ensure the username has not been used before
      Users.find({
          'username': req.body.username
        }, function(error, matches) {
          // console.log(matches);
          // Inform user if username has been used
          if (matches[0]) {
            res.status(409);
            res.json({
              success: false,
              message: '\'' + req.body.username + '\'' +
                ' already used, please provide another username'
            });
          } else {
            // Ensure the enail has not been used before
            Users.find({
              'email': req.body.email
            }, function(error, matches) {
              // Inform user if email has been used
              if (matches[0]) {
                res.status(409);
                res.json({
                  success: false,
                  message: '\'' + req.body.email + '\'' +
                    ' already used, please provide another email'
                });
              } else {
                // All's good, save the new user
                user.save(function(error) {
                  if (error) {
                    res.status(500);
                    parseError(res, error);
                  } else {
                    // Return successfully created object
                    res.json(user);
                  }
                });
              }
            });
          }
        });

  },
  updateUser: function(req, res) {
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
  },
  deleteUser: function(req, res) {
    // Delete entry with provided id
    Users.remove({
      'id': req.params.id
    }, function(delete_error, user) {
      if (delete_error) {
        console.log(find_error);
        res.status(500);
        res.send('Error deleting from database');
      }
      res.send('User deleted successfully');
    });
  },
  login: function(req, res) {
    // Look for user in the database
    Users.findOne({
      username: req.body.username
    }, function(error, user) {
      // In case of a server error inform the user
      if (error) {
        res.status(500);
        res.send('There was an error reading from the database');
      }

      // User not in the database
      if (!user) {
        res.json({
          success: false,
          message: 'Authentication failed. User not found.'
        });
      } else {
        // Verify provided password is valid
        user.validatePassword(req.body.password, function(error, isMatch) {
          if (error) {
            throw error;
          }
          if (isMatch) {
            // All's good, create a token
            var token = jwt.sign(user, process.env.SECRET_KEY, {
              expiresInDays: 90
            });

            // Return token and success message in JSON
            res.json({
              success: true,
              message: 'You\'ve successfully been logged in.',
              token: token
            });
          }
          // Passwords do not match
          else {
            res.json({
              success: false,
              message: 'Authentication failed. Wrong password.'
            });
          }
        });
      }
    });
  }
};
