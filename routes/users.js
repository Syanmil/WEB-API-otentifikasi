var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController')

/* GET users listing. */
router.post('/register', userController.register);
router.get('/register', userController.registerPage)
router.post('/', userController.login)
router.get('/', userController.home)
router.get('/logout', userController.logout)
router.get('/secret', userController.protect, userController.secretPage)

module.exports = router;
