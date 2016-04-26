var router = require('express').Router();
var Test = require('../../models/test');

/*
 * Corresponds to 'theurl:port/api/test'
 */
router.post('/', function(req, res) {
    // Declare new instance of the Test "table"
    test = new Test();

    // Define values of the new "row" to add
    test.username = req.body.username;
    test.name.first = req.body.firstName;
    test.name.last = req.body.lastName;
    test.email = req.body.email;
    test.password = req.body.password;

    // Save the new "row"
    test.save(function(err) {
        console.log('abc');
        // If error occured inform user
        if (err) {
            console.log(err);
            res.status(500);
            res.send('There was an error');
        }
        console.log('affjsofi');

        // Return successfully created object
        res.json(test);
    });
    console.log('Outside save');

});

router.get('/', function(req, res) {
    // Return all entries in Test "table"
    Test.find(function(err, tests) {
        // In case of error inform user
        if (err) {
            res.status(500);
            res.send('There was an error');
        }

        // Return the rows found
        res.json(tests);
    });
});

router.put('/:test_id', function(req, res) {
    // Return all entry in Test "table" with provided id
    Test.find({
        id: req.params.test_id
    }, function(err, tests) {
        // In case of error inform user
        if (err) {
            res.status(500);
            res.send('Error connecting to database');
        }

        // Update each entry found
        tests.forEach(function(test) {

            // For every object property in the body
            // Update it's corresponding db property
            Object.keys(req.body).forEach(function(property) {
                // Special cases for first and last names
                if (property === 'firstName') {
                    test.name.first = req.body.firstName;
                } else if (property === 'lastName') {
                    test.name.last = req.body.lastName;
                } else {
                    test[property] = req.body[property];
                }
                test.updated = new Date();
            });

            // Save the updated "row"
            test.save(function(err) {
                // If error occured inform user
                if (err) {
                    console.log(err);
                    res.status(500);
                    res.send('There was an error');
                }
            });
        });

        // Return successfully updated object
        res.json(tests);



    });
});

module.exports = router;
