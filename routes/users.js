var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController')

/* GET users listing. */
router.post('/register', userController.register);
router.post('/', userController.login)
router.get('/home', function(req, res){
  res.render('index', {title: home})
})

module.exports = router;
