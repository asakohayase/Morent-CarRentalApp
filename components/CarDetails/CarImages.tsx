/* eslint-disable camelcase */
import { Car } from '@/typings';
import React from 'react';
import Image from 'next/image';

const CarImages = ({ data }: { data: Car }) => {
  const { images, car_title } = data;
  return (
    <section>
      <div
        className='relative flex h-[327px] w-full rounded-[10px] border border-slate-200  dark:border-slate-400 md:h-[360px]  
md:items-center md:pt-0'
      >
        <Image
          src={images && images.length > 0 ? images[0] : '/img/car.png'}
          alt={car_title}
          fill
          priority
          className={
            'mx-auto min-w-[190px] max-w-[190px] object-contain pt-[200px]  md:max-w-[408px] md:py-0'
          }
        />
      </div>
      <div className='flex w-full gap-3'>
        {images?.map((image) => (
          <div className='relative h-24 w-full flex-1 rounded-lg' key={image}>
            <Image
              src={image}
              alt={'car_title'}
              fill
              priority
              className={
                'rounded-[10px] border-blue-600 object-contain hover:border md:h-[124] md:w-[144px]'
              }
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CarImages;
