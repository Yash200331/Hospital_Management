// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
// router.get('/login', function(req, res, next) {
//   res.render('login', { title: 'Express' });
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const userModel=require('./users')
const localStrategy=require('passport-local');
const passport = require('passport');
passport.use(new localStrategy(userModel.authenticate()));
/* GET home page. */
router.get('/',isLoggedIn, function(req, res, next) {
  res.render('index', { title: 'Express' }); 
});
router.get('/login', function(req, res, next) {
  res.render('login');
});
router.get('/find-docter', function(req, res, next) {
  res.render('docter');
});
router.get('/Docter-Profile', function(req, res, next) {
  res.render('profileDoc');
});
router.post('/register',function(req,res){
  const userData=new userModel({
    username:req.body.username,
    fullname:req.body.fullname,
    email:req.body.email
  });
  userModel.register(userData,req.body.password)
  .then(function(registereduser){
    passport.authenticate("local")(req,res,function(){
      res.redirect('/')
    })
  })
})

router.post("/login",passport.authenticate("local",{
  successRedirect:"/",
  failureRedirect:"/login"
}),function(req,res){ })

router.get('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/login');
  });
});

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login")
}

module.exports = router;
