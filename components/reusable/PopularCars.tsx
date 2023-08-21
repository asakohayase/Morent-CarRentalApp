'use client';

import React from 'react';
import Image from 'next/image';

import * as Dialog from '@radix-ui/react-dialog';
import { carDetails } from '@/data';
import CarDetailCard from '../CarDetails/CarDetailCard';
import { Cross2Icon } from '@radix-ui/react-icons';

interface Props {
  data: {
    title: string;
    vehicleType: string;
    gallons: number;
    image: string;
    transmission: string;
    capacity: number;
    price: number;
  };
}

const PopularCars = ({
  data: { title, vehicleType, gallons, image, transmission, capacity, price },
}: Props) => {
  return (
    <article className='flex w-full flex-col justify-between gap-y-8 rounded-[10px] bg-white p-7 dark:bg-slate-800 md:w-fit md:gap-8 md:p-6'>
      <section className='flex w-full items-center justify-between'>
        <div className='overflow-hidden'>
          <h1 className='line-clamp-1 text-base font-semibold text-gray-900 dark:text-white md:text-xl md:font-bold'>
            {title}
          </h1>
          <p className='text-xs font-medium text-slate-400 md:text-sm md:font-bold'>
            {vehicleType}
          </p>
        </div>
        <Image
          src='/img/heart.svg'
          alt='heart'
          height={16}
          width={16}
          className='mb-4 md:mb-5 md:h-6 md:w-6'
        />
      </section>
      <section className=''>
        <Image
          src={image}
          alt={title}
          width={160}
          height={64}
          className='md:mt-8 md:h-[100px] md:w-[248px]'
        />
        <section className='mt-8 flex flex-row justify-between'>
          <div className='flex gap-2'>
            <Image
              src='/img/gas-station.svg'
              alt='gas'
              width={14}
              height={14}
              className={' md:h-4 md:w-4'}
            />
            <p className='text-xs font-medium text-slate-400 dark:text-slate-400 md:text-sm'>
              {gallons}
            </p>
          </div>
          <div className='flex gap-2'>
            <Image
              src='/img/transmission.svg'
              alt='transmission'
              width={14}
              height={14}
              className={'md:h-4 md:w-4'}
            />
            <p className='text-xs dark:text-slate-400 md:text-sm'>
              {transmission}
            </p>
          </div>
          <div className='flex gap-2'>
            <Image
              src='/img/capacity.svg'
              alt='capacity'
              width={14}
              height={14}
              className={'md:h-4 md:w-4'}
            />
            <p className='text-xs font-medium text-slate-400 dark:text-slate-400 md:text-sm'>
              {capacity}
            </p>
          </div>
        </section>
      </section>
      <section className='flex w-full items-center justify-between'>
        <p>
          <span className='text-base font-bold text-gray-900 dark:text-white md:text-xl'>
            {price}
          </span>
          <span className='ml-1 text-xs font-bold text-slate-400 md:text-sm'>
            day
          </span>
        </p>
        <Dialog.Root>
          <Dialog.Trigger className='btn-primary ml-6 w-[100px] hover:opacity-80 md:w-fit'>
            More Info
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className='fixed inset-0 z-50 bg-black/50' />
            <Dialog.Content className='fixed left-1/2 top-[50%] z-50 w-[95%] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white text-gray-900 shadow md:top-1/2 md:max-w-[1054px]'>
              <CarDetailCard data={carDetails} />
              <Dialog.Close className='absolute right-4 top-[-20px] cursor-pointer rounded-t-sm bg-white md:hidden'>
                <Cross2Icon height={24} width={24} />
              </Dialog.Close>
              <Dialog.Close className='absolute right-8 top-[34px] hidden cursor-pointer md:inline'>
                <Cross2Icon height={34} width={34} />
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </section>
    </article>
  );
};

export default PopularCars;
