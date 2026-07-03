import mongoose from "mongoose";

const bookingSchema =  new mongoose.Schema({
  user:{type:String,required:true,ref:'User'},
  show:{ type:String,required:true,ref:'Show'},
  amount:{ type:Number,required:true},
  bookedSeats:{ type:Array,required:true},
  isPaid:{ type:Boolean,default:false},
  paymentLink:{type:String}, // when isPaid property is false we will store the paymentLink


},{timestamps:true})

const Booking = mongoose.model("Booking",bookingSchema);

export default Booking;