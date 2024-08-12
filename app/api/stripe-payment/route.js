import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
    try {
        const { tire, price } = await request.json();

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

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
        });

        console.log(session);
        // Include the amount_total in the response
        return new Response(JSON.stringify({
            id: session.id,
            amount_total: session.amount_total
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}