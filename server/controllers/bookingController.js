
import Booking from "../models/Booking.js";
import Show from "../models/Show.js"
import Stripe from "stripe";

// function to check availability of selected seats for a movie
const checkSeatsAvailability= async (showId,selectedSeats)=>{
  try {
    const showData= await Show.findById(showId);
    if(!showData){
      return false;
    }

    const occupiedSeats = showData.occupiedSeats;
    const isAnySeatTaken = selectedSeats.some(seat=> occupiedSeats[seat]);
    return !isAnySeatTaken;

  } catch (error) {
    console.log(error.message);
    return false;
  }
}


export const createBooking = async(req,res)=>{
  try {
    const {userId}= req.auth();
    const {showId,selectedSeats}= req.body;
    // use frontend url for stripe payments
    const {origin}= req.headers;

    // check if the seat is available for the selected show
    const isAvailable = await checkSeatsAvailability(showId,selectedSeats);

    if(!isAvailable) return res.json({success:false,message:"Selected Seats are not available."});

    //Get the show details
    const showData = await Show.findById(showId).populate('movie');

    // create a new booking
    const booking = await Booking.create({
      user:userId,
      show:showId,
      amount:showData.showPrice*selectedSeats.length,
      bookedSeats:selectedSeats,
    })
    // now reserve the seats in the show data of model
    
    selectedSeats.map(seat=>{
      showData.occupiedSeats[seat]= userId;
    })

    showData.markModified('occupiedSeats');
    await showData.save();

    // now booking has been created so now we can make payment
    // Stripe Gateway Initialize
    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
    // creating line items for stripe
    const line_items = [{
      price_data:{
        currency:'eur',
        product_data:{
          name:showData.movie.title
        },
        unit_amount:Math.floor(booking.amount)*100
      },
      quantity:1
    }]
    // using these line_items we can create the session, payment session
    const session = await stripeInstance.checkout.sessions.create({
      // add success url, so after successfull payment it will open this url
      success_url:`${origin}/loading/my-bookings`,
      cancel_url: `${origin}/my-bookings`,
      line_items :line_items,
      mode:'payment',
      metadata:{
        bookingId:booking._id.toString()
      },
      expires_at:Math.floor(Date.now()/1000)+30*60,//this payment session expires in 30 minutes

    })

    booking.paymentLink = session.url
    await booking.save();


    res.json({success:true,url:session.url});// frontend par bhej diya payment link so ab frontend se jayega user payment page par , here i created that payment session, and after payment success_url will open so loading screen ke baad goes to my bookings page


  } catch (error) {
    console.log(error.message);
    res.json({success:false,message:error.message});
  }
}


export const getOccupiedSeats= async(req,res)=>{
  try {

    const {showId}= req.params;
    const showData = await Show.findById(showId);
    const occupiedSeats = Object.keys(showData.occupiedSeats);

    res.json({success:true,occupiedSeats});
    
  } catch (error) {
    console.log(error.message);
    res.json({success:false,message:error.message});
  }
}