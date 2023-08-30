'use client';

import CarCard from '@/components/reusable/CarCard';

import React, { useEffect, useState } from 'react';
import { Car } from '@/typings';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import PopularCars from '@/components/reusable/PopularCars';

type Props = {};

const Page = (props: Props) => {
  const supabase = createClientComponentClient();
  const [cars, setCars] = useState<Car[] | null>(null);
  useEffect(() => {
    const getCars = async () => {
      const { data: cars } = await supabase.from('cars').select('*');
      setCars(cars);
    };

    getCars();
  }, [supabase]);
  return (
    <main className='padding-layout my-12 flex flex-col gap-8'>
      <section className='relative mt-16 flex flex-col gap-6 sm:mt-3'>
        <section className='scrollbar-hide relative flex gap-8 overflow-x-auto scroll-smooth'>
          {cars?.map((car) => <PopularCars key={car.car_id} data={car} />)}
        </section>
      </section>
      <section className='flex flex-col gap-6'>
        <h5 className='text-lg font-medium text-gray-600'>Recommended Cars</h5>
        <section className='grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {cars?.map((car) => <CarCard key={car.car_id} data={car} />)}
        </section>
      </section>
    </main>
  );
};

export default Page;
