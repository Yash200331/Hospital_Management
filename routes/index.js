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
router.get('/createDoc', function(req, res, next) {
  res.render('createDoc');
});
router.get('/findDoctor', function(req, res, next) {
  res.render('doctor');
});
router.get('/DoctorProfile', function(req, res, next) {
  res.render('profileDoc');
});
router.post('/register', async function(req,res,next){
  const { username, password, role } = req.body;
try {
  const existingAdmin = await userModel.findOne({ role: 'admin' });
    if (role === 'admin' && existingAdmin) {
      throw new Error('Admin already exists.'); 
    }
    else{
      const user = await new userModel({
        username: req.body.username,
        name:req.body.name,
        email:req.body.email,
        role:req.body.role,
      })
      userModel.register(user,req.body.password)
      .then(function(){
      passport.authenticate('local')(req,res, function(err){
        res.redirect('/')
      })
      })
    }

} catch (error) {
  console.error(error);
  res.render('login', { error: error.message });
}

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
