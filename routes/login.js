var express = require('express');
var router = express.Router();
var connection  = require('../library/database');

/* GET login page. */
router.get('/', function(req, res, next) {
  if (!req.session.loggedin) { //Cek jika status login masih false baru tampilkan login, jika sudah login langsung masuk posts
    res.render('./posts/login', {
      title: 'Login',
      data: ''
    })
  }else{
    res.redirect('/posts');
  }  
});

router.get('/login', function(req, res, next) {
  res.render('./posts/login', {
    title: 'Login',
    data: ''
  })
});

//authenticate user
router.post('/authentication', function(req, res, next) { 
  var email = req.body.email;
  var password = req.body.password;
  connection.query('SELECT * FROM accounts WHERE email = ? AND password = ?', [email, password], function(err, rows, fields) {
  if(err) throw err
    // if user not found
    if (rows.length <= 0) {
      req.flash('error', 'Please correct enter email and Password!')
      res.redirect('/')
    } else { // if user found
      // render to views/user/edit.ejs template file
      req.session.loggedin = true; 
      res.redirect('/posts');
    }            
  })
})

// Logout user
router.get('/logout', function (req, res) {
  req.session.destroy();
  //req.flash('success', 'Login Again Here');
  res.redirect('/');
});

module.exports = router;
