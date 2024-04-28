const mongoose=require('mongoose')
const plm=require('passport-local-mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/hospital")

const userSchema=mongoose.Schema({
  username:String,
  email:String,
  password:String,
  accountType:{
    type:String,
    enums:["Patient","Doctor"],
    default:"Patient"
  }
})

userSchema.plugin(plm);

module.exports=mongoose.model("user",userSchema);