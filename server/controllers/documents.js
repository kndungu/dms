var Documents = require('../models/documents');

module.exports = {
    getAll: function(req, res) {
        // Get all entries in the documents "table"
        Documents.find(function(error, documents) {
            //  Inform user if anything goes wrong
            if (error) {
                res.status(500);
                res.send('There was an error reading from the database');
            }

            // Else all's good, send results
            res.json(documents);
        });
    },
    getById: function(req, res) {
        // Find all entries with the specified id
        Documents.find({
            'id': req.params.id
        }, function(error, documents) {
            //  Inform user if anything goes wrong
            if (error) {
                res.status(500);
                res.send('There was an error reading from the database');
            }

            // Else all's good, send results
            res.json(documents);
        });
    },
    addDocument: function(req, res) {
        // Declare new instance of the Documents "table"
        document = new Documents();

        // Define values of the new "row" to add
        document.ownerId = req.body.ownerId; // TO DO
        document.title = req.body.title;
        document.content = req.body.content;

        // Save the new "row"
        document.save(function(error) {
            // If error occured inform user
            if (error) {
                console.log(err);
                res.status(500);
                res.send('There was an error saving to the database');
            }
            // Return successfully created object
            res.json(document);
        });
    },
    updateDocument: function(req, res) {
        // Return all entries in Documents "table" with provided id
        Documents.find({
            id: req.params.id
        }, function(find_error, documents) {
            // In case of error inform user
            if (find_error) {
                console.log(find_error);
                res.status(500);
                res.send('Error reading from database');
            }

            // Update each entry found
            documents.forEach(function(document) {
                // For every object property in the request body
                // Update it's corresponding db property
                Object.keys(req.body).forEach(function(property) {
                    // Update value of the properties
                    document[property] = req.body[property];

                    // "Row" can now have an updatedAt value
                    document.updatedAt = new Date();
                });

                // Save the updated "row"
                document.save(function(save_error) {
                    // If error occured inform user
                    if (save_error) {
                        console.log(save_error);
                        res.status(500);
                        res.send('Error saving to database');
                    }
                });
            });

            // Return successfully updated objects
            res.json(documents);
        });
    },
    deleteDocument: function(req, res) {
        // Delete entry with provided id
        Documents.remove({
            'id': req.params.id
        }, function(delete_error, document) {
            if (delete_error) {
                console.log(find_error);
                res.status(500);
                res.send('Error deleting from database');
            }
            res.send('Document deleted successfully');
        });
    },
    getByOwnerId: function(req, res) {
        // Find all entries with the specified id
        Documents.find({
            'ownerId': req.params.id
        }, function(error, documents) {
            //  Inform user if anything goes wrong
            if (error) {
                res.status(500);
                res.send('There was an error reading from the database');
            }

            // Else all's good, send results
            res.json(documents);
        });
    }
};
