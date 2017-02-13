var user = require('../models').user
var hash = require('password-hash')

let userController = {
  register: function(req, res){
    let username = req.body.username
    let password = hash.generate(req.body.password)
    let email = req.body.email
    user.findOrCreate({where: {
      email: email, username : username
    }, defaults: {
      password: password
    }}).spread(function(user, created) {
      console.log(user.get({
        plain: true
      }))
      if (created){
        res.render('index', {title: "HOME", success: "register success"})
      } else {
        res.render('index', {title: "HOME", success: "email or username already registered"})
      }
    })
  },
  login: function(req, res){
    let username = req.body.username
    let password = req.body.password
    user.findOne({where: {username: username}}).then(function(data, err) {
      if(err) console.log(err)
      if(!data){
        res.render('index', {title: "HOME", success: "Username not Found"})
      }
      if(hash.verify(password, data.dataValues.password)){
        req.session.user = data.dataValues.username
        res.redirect('users/secret')
      } else {
        res.render('index', {title: "HOME", success: "Incorrect Password"})
      }
    })
  },
  logout: function (req, res) {
    req.session.destroy()
    res.redirect('/')
  },
  home: function (req,res) {
    res.render('index', {title: "HOME", success: "Welcome To Landing Page"})
  },
  protect: function(req, res, next){
    if(req.session.user){
      next()
    } else {
      res.render('index', {title: "HOME", success: "Please Login!!!"})
    }
  }
}

module.exports = userController
