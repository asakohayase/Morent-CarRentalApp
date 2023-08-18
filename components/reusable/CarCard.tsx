import React from 'react';
import Image from 'next/image';
import Button from './Button';

import * as Dialog from '@radix-ui/react-dialog';

interface Props {
  data: {
    title: string;
    vehicleType: string;
    gallons: string;
    image: string;
    transmission: string;
    capacity: string;
    price: string;
  };
}

const CarCard = ({
  data: { title, vehicleType, gallons, image, transmission, capacity, price },
}: Props) => {
  return (
    <article className='flex h-full w-full flex-col justify-between rounded-[10px] bg-white p-6 '>
      <header className='flex items-center justify-between'>
        <section className='flex-col'>
          <h1 className='text-base font-semibold text-gray-900 md:text-xl md:font-bold'>
            {title}
          </h1>
          <p className='text-xs font-medium text-slate-400 md:text-sm md:font-bold'>
            {vehicleType}
          </p>
        </section>
        <Image
          src='/img/heart.svg'
          alt='heart'
          height={16}
          width={16}
          className='mb-5 md:h-6 md:w-6'
        />
      </header>
      <section className='flex items-center justify-between  md:h-52 md:flex-col md:items-start'>
        <Image
          src={image}
          alt={title}
          width={160}
          height={64}
          className='md:mt-8 md:h-[100px] md:w-[248px]'
        />
        <section className='flex  flex-col'>
          <section className='flex flex-col items-start justify-between  text-sm font-medium text-slate-400 md:w-[250px] md:flex-row'>
            <div className='flex gap-2'>
              <Image
                src='/img/gas-station.svg'
                alt='gas'
                width={16}
                height={16}
              />
              <p>{gallons}</p>
            </div>
            <div className='flex gap-2'>
              <Image
                src='/img/transmission.svg'
                alt='transmission'
                width={16}
                height={16}
              />
              <p className='text-xs md:text-sm'>{transmission}</p>
            </div>
            <div className='flex gap-2'>
              <Image src='/img/capacity.svg' alt='gas' width={16} height={16} />
              <p>{capacity}</p>
            </div>
          </section>
        </section>
      </section>
      <section className='flex items-center justify-between'>
        <p>
          <span className='text-base font-bold text-gray-900 md:text-xl'>
            {price}
          </span>
          <span className='ml-1 text-xs font-bold text-slate-400 md:text-sm'>
            day
          </span>
        </p>
        <Button
          title={'More Info'}
          href='#'
          style={'btn-primary w-[116px]] hover:opacity-80'}
        />
      </section>
    </article>
  );
};

export default CarCard;
