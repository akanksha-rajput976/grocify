
import connectDb from '@/lib/db';
import Order from '@/models/order.model';
import { NextRequest, NextResponse} from 'next/server';
import Stripe from 'stripe';


export const runtime = "nodejs";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!
);
export async function POST(req: NextRequest) {

       const sig = req.headers.get('stripe-signature');
       const rawBody = await req.text();
       let event: Stripe.Event;
    try{
        event = stripe.webhooks.constructEvent(
            rawBody,
            sig!,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
        
    }catch(error){
      console.error("Webhook signature verification failed.",error);
      return NextResponse.json({ error: `Webhook Error: ${error}` }, { status: 400 });
    }

    if(event?.type==="checkout.session.completed"){
        const session=event.data.object as Stripe.Checkout.Session
        await connectDb();
         await Order.findByIdAndUpdate(session?.metadata?.orderId,{
            ispaid:true
         }) 
        


}
    return NextResponse.json({ received: true }, { status: 200 });
}