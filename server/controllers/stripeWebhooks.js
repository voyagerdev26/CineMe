import Stripe from "stripe";
import Booking from "../models/Booking.js";
import { inngest } from "../inngest/index.js";
// this is done for payment verification


export const stripeWebhooks = async (request,response)=>{
  const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
  const sig = request.headers["stripe-signature"];

  let event ;

  try {
    event = stripeInstance.webhooks.constructEvent(request.body,sig,process.env.STRIPE_WEBHOOK_SECRET)
  } catch (error) {
    return response.status(400).send(`Webhook Error: ${error.message}`);
  }
  // so here we will get the event , now we will check the event
  try {
    switch(event.type){
      case "payment_intent.succeeded":{
        const paymentIntent = event.data.object;
        const sessionList = await stripeInstance.checkout.sessions.list({
          payment_intent:paymentIntent.id 
        })
        const session = sessionList.data[0];
        const {bookingId} = session.metadata;

        await Booking.findByIdAndUpdate(bookingId,{isPaid:true,paymentLink:""})
        // trigger that inngest function for confirmation email
        await inngest.send({
          name:'app/show.booked',
          data:{bookingId}
        })

        break;

      }
      
      default: //if we get any other event other then payment intent succeed then this block will be executed
        console.log('Unhandled event type:',event.type)
    }

    response.json({received:true})
  } catch (error) {
    console.error("Webhook processing error:",error);
    response.status(500).send("Internal Server Error.");
  }
}