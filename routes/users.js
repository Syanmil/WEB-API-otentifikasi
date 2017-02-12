var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController')

/* GET users listing. */
router.post('/register', userController.register);
router.post('/', userController.login)
router.get('/', userController.home)
router.get('/logout', userController.logout)
router.get('/secret', userController.protect, function(req, res){
  res.render('secret', {user: req.session.user})
})

module.exports = router;
