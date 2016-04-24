var express = require('express');
var router = express.Router();
var Test = require('../../models/test');

/*
 * Corresponds to 'theurl:port/api/test'
 */
router.post('/', function(req, res) {
    // Declare new instance of the Test "table"
    test = new Test();

    // Define values of the new "row" to add
    test.name = 'A test name';

    // Save the new "row"
    test.save(function(err) {
        // If error occured inform user
        if (err) {
            console.log(err);
            res.status(500);
            res.send('There was an error');
        }

        // Return successfully created object
        res.json(test);
    });

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

module.exports = router;
