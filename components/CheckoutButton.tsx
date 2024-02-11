import { MouseEvent } from 'react';
import { Car } from '@/typings';
import { loadStripe } from '@stripe/stripe-js';

const CheckoutButton = ({ car, userId }: { car: Car; userId: string }) => {
  const handleCheckout = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          car,
          carTitle: car.car_title,
          price: car.price,
          carId: car.car_id,
          userId,
        }),
      });
      if (response.ok) {
        const { sessionId } = await response.json();
        const stripe = await loadStripe(
          process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
        );
        // Redirect to checkout
        stripe?.redirectToCheckout({ sessionId }).then((result) => {
          if (result.error) {
            console.error('Error redirecting to checkout:', result.error);
          }
        });
      } else {
        console.error('Error in response:', response.status);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className='btn-primary ml-6 w-[148px] hover:opacity-80 md:w-fit'
    >
      Rent Now
    </button>
  );
};

export default CheckoutButton;
