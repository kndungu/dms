var router = require('express').Router();
var DocumentsController = require('../../controllers/documents');

// e.g. GET localhost:8080/users
router.get('/', DocumentsController.getAll);

// e.g. GET localhost:8080/users/13
router.get('/:id', DocumentsController.getById);

// e.g. POST localhost:8080/users
router.post('/', DocumentsController.addDocument);

// e.g. PUT localhost:8080/users/13
router.put('/:id', DocumentsController.updateDocument);

// e.g. DELETE localhost:8080/users/13
router.delete('/:id', DocumentsController.deleteDocument);

module.exports = router;
