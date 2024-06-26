
const mongoose=require('mongoose')
const plm=require('passport-local-mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/hospital', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

const userSchema=mongoose.Schema({
  username:String,
  email:String,
  password:String,
  role:{
    type:String,
    enums:["patient","admin",'doctor'],
    default:"patient",
  }
})

userSchema.plugin(plm);


module.exports=mongoose.model("user",userSchema);
