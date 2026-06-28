import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  _id:{
    type:String,required:true
  },
  name:{type:String,required:true},
  email:{type:String,required:true},
  image:{type:String,required:true},

})

// creating model from this userSchema
const User = mongoose.model('User',userSchema) // 1st argument is the model/collection name and it is saved in db in plural form

export default User;