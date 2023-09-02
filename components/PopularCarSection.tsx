import { Car } from '@/typings';
import React from 'react';
import PopularCars from './reusable/PopularCars';

const PopularCarSection = ({ cars }: { cars: Car[] | null }) => {
  return (
    <section className='relative mt-16 flex flex-col gap-6 sm:mt-3'>
      <h5 className='text-lg font-medium text-gray-600'>Popular Cars</h5>
      <section className='scrollbar-hide flex gap-8 overflow-x-auto scroll-smooth 2xl:block 2xl:columns-4 '>
        {cars
          ?.slice(0, 4)
          .map((car) => <PopularCars key={car.car_id} data={car} />)}
      </section>
    </section>
  );
};

export default PopularCarSection;
