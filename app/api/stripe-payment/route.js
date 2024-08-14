import Stripe from 'stripe';
import dbConnect from '@/utils/dbConnect';
import User from '@/models/User';
import Payment from '@/models/Payment';
import { auth} from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/nextjs/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
    try {
        await dbConnect(); 

        const { tire, price } = await request.json();

        const { userId: clerkUserId } = auth();
        if (!clerkUserId) {
            return new Response(JSON.stringify({ error: 'Unauthorized' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const user = await User.findOne({ clerkId: clerkUserId });
        if (!user) {
            return new Response(JSON.stringify({ error: 'User not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const lineItems = [{
            price_data: {
                currency: 'usd',
                product_data: {
                    name: tire.name,
                },
                unit_amount: Math.round(price),
            },
            quantity: 1,
        }];

        const stripeSession = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
        });

        const clerkUser = await clerkClient.users.getUser(clerkUserId);
        const userEmail = clerkUser.emailAddresses[0].emailAddress;

        const payment = new Payment({
            userId: user._id, 
            transactionId: stripeSession.id,
            amount: stripeSession.amount_total, 
            email: userEmail,
        });

        
        await payment.save();

        return new Response(JSON.stringify({
            id: stripeSession.id,
            amount_total: stripeSession.amount_total
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}