const express = require('express');
const router = express.Router();
const userModel=require('./users')
const localStrategy=require('passport-local');
const passport = require('passport');
const doctorModel=require('./DoctorSchema');
const { name } = require('ejs');
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
router.get('/doctor',async function(req, res, next) {
  const doctors=await doctorModel.find();
  res.render('doctor',{doctors});
});
router.get('/DoctorProfile',async function(req, res, next) {
  const doctors=await doctorModel.findOne();
  res.render('profileDoc');
});
router.post("/createDoc",async function(req,res,next){
  const doctor = await doctorModel.create({
    username:req.body.username,
    email:req.body.email,
    password:req.body.password,
    name:req.body.name,
    phone:req.body.phone,
    photo:req.body.photo,
    ticketPrice:req.body.ticketPrice,
    role:req.body.role,
    specialization:req.body.specialization,
    qualification:req.body.qualification,
    experiences:req.body.experiences,
    bio:req.body.bio,
    about:req.body.about,
    timeSlots:req.body.timeSlots,
    reviews: req.body.reviews,
    averageRating:req.body.averageRating,
    totalRating:req.body.totalRating,
    isApproved:req.body.isApproved,
    appointments:req.body.appointments
  })
  res.redirect("/doctor");
})
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
