import Toast from '@/components/reusable/Toast';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest } from 'next/server';
import { Stripe } from 'stripe';

interface CartItem {
  userId: string;
  carId: string;
  carTitle: string;
  price: number;
}

const supabase = createClientComponentClient();

export async function POST(req: NextRequest) {
  try {
    // Get cart data
    const { carTitle, price, carId, userId }: CartItem = await req.json();

    // Create Stripe instance
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2023-08-16',
    });

    // Create Checkout Session on server
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: carTitle,
            },
            unit_amount: price * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.nextUrl}/success?sessionId={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl}/cancel`,
      metadata: {
        carId,
        userId,
      },
    });


    // Return session ID to client
    const response = {
      sessionId: session.id,
    };
  

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (err) {
    // Handle errors
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
