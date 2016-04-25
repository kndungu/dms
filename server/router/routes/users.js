var express = require('express');
var router = express.Router();
var UsersController = require('../../controllers/users');

// e.g. GET localhost:8080/users
router.get('/', UsersController.getAll);

// e.g. GET localhost:8080/users/13
router.get('/:id', UsersController.getById);

// e.g. POST localhost:8080/users
router.post('/', UsersController.addUser);

// e.g. PUT localhost:8080/users/13
router.put('/:id', UsersController.updateUser);

// e.g. DELETE localhost:8080/users/13
router.delete('/:id', UsersController.deleteUser);

module.exports = router;
