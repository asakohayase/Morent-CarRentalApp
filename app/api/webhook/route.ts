// eslint-disable camelcase

import Stripe from 'stripe';
import { cookies, headers } from 'next/headers';
import { NextRequest } from 'next/server';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import { Database } from '@/types/database.types';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-08-16',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const supabase = createServerComponentClient<Database>({ cookies });

export const runtime = 'nodejs';

async function registerCarToSupabase(carId: string, userId: string) {
  const { data: car } = await supabase
    .from('cars')
    .select('*')
    .eq('car_id', carId)
    .single();

  if (car) {
    const { borrower_id } = car;
    const userExists = borrower_id.includes(userId);
    if (!userExists) {
      await supabase
        .from('cars')
        .update({
          borrower_id: [...borrower_id, userId],
        })
        .eq('car_id', carId)
        .single();
    }
  }
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = headers().get('Stripe-Signature') as string;
  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) return;
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error(
      `Webhook signature verification failed: ${(err as Error).message}`,
    );
    return new Response(`Webhook Error: ${(err as Error).message}`, {
      status: 400,
    });
  }

  switch (event.type) {
    case 'checkout.session.completed':
      {
        const session: any = event.data.object;
        // grab carId and userId from the session table
        const carId = session?.metadata?.carId;
        const userId = session?.metadata?.userId;

        // Register the car to Supabase
        await registerCarToSupabase(carId, userId);
      }
      break;

    default:
      console.warn(`Unhandled event type: ${event.type}`);
  }
  return new Response('Success!', {
    status: 200,
  });
}
