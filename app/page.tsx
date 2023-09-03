import AdCard from '@/components/Homepage/AdCard';
import CarCard from '@/components/reusable/CarCard';
import PickUpDropOff from '@/components/reusable/PickUpDropOff';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { Database } from '@/utils/database.types';
import PopularCarSection from '@/components/PopularCarSection';

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: cars } = await supabase.from('cars').select('*');

  return (
    <main className='padding-layout my-12 flex flex-col gap-8'>
      {/* Ads Section */}
      <section className='flex gap-8'>
        <AdCard
          bgImage='/img/widgets/lightcard.svg'
          carImage='/img/whitecar.png'
          title='The Best Platform for Car Rental'
          slogan='Ease of doing a car rental safely and reliably. Of course at a low
            price'
        />
        <AdCard
          bgImage='/img/widgets/darkcard.svg'
          carImage='/img/darkcar.png'
          title='Easy way to rent a car at a low price'
          slogan='Providing cheap car rental services and safe and comfortable facilities'
          className='hidden md:block'
        />
      </section>
      {/* Pick-Up & Drop-Off Section */}
      <PickUpDropOff />
      {/* Popular Car Section */}
      <PopularCarSection cars={cars} />
      {/* Recommended Car Section */}
      <section className='flex flex-col gap-6'>
        <h5 className='text-lg font-medium text-gray-600'>Recommended Cars</h5>
        <section className='grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {cars
            ?.map((car) => <CarCard key={`rec-${car.car_id}`} data={car} />)
            .slice(0, 8)}
        </section>
      </section>
      <section className='mx-auto w-full lg:w-60'>
        <Link href='/search'>
          <button className='w-full rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white'>
            Show More Cars
          </button>
        </Link>
      </section>
    </main>
  );
}
