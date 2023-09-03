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
      <div className='flex w-full flex-row justify-between gap-3 '>
        {images?.map((image) => (
          <div
            className='relative h-24 w-[30%] rounded-lg border  border-blue-600 transition duration-150  ease-in-out active:scale-95 active:border '
            key={image}
          >
            <Image
              src={image}
              alt={'car_title'}
              fill
              priority
              className={
                'rounded-[10px] border-4 border-white  object-contain dark:border-slate-800 md:h-[124] md:w-[144px]'
              }
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CarImages;
