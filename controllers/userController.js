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
        res.render('index', {title: "home", success: "register success"})
      } else {
        res.render('index', {title: "home", success: "email or username already registered"})
      }
    })
  },
  login: function(req, res){
    let username = req.body.username
    let password = req.body.password
    user.findOne({where: {username: username}}).then(function(err, data) {
      if(err) throw error
      if(!data){
        res.render('index', {title: "home", success: "Username not Found"})
      }
      if(hash.verify(password, data.password)){
        req.session.login = true
        res.render('secret')
      } else {
        res.render('index', {title: "home", success: "Incorrect Password"})
      }
    })
  },
  logout: function () {
    req.session.destroy()
  }
}

module.exports = userController
