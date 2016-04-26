var router = require('express').Router();
var UsersController = require('../../controllers/users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// e.g. GET localhost:8080/users/login
router.post('/users/login', UsersController.login);

module.exports = router;
