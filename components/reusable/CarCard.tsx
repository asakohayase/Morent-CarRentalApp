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
    <article className='flex w-full flex-col justify-between gap-8 rounded-[10px] bg-white p-6 dark:bg-slate-800'>
      <section className='flex items-center justify-between '>
        <div>
          <h1 className=' whitespace-nowrap text-base font-semibold text-gray-900 dark:text-white md:text-xl md:font-bold'>
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
          className='mb-5 md:h-6 md:w-6'
        />
      </section>
      <section className='flex justify-between gap-14 md:flex-col'>
        <Image
          src={image}
          alt={title}
          width={160}
          height={64}
          className='md:mt-8 md:h-[100px] md:w-[248px]'
        />
        <section className='flex flex-col justify-between md:flex-row'>
          <div className='flex gap-2'>
            <Image
              src='/img/gas-station.svg'
              alt='gas'
              width={16}
              height={16}
            />
            <p className='dark:text-slate-400'>{gallons}</p>
          </div>
          <div className='flex gap-2'>
            <Image
              src='/img/transmission.svg'
              alt='transmission'
              width={16}
              height={16}
            />
            <p className='text-xs dark:text-slate-400 md:text-sm'>
              {transmission}
            </p>
          </div>
          <div className='flex gap-2'>
            <Image src='/img/capacity.svg' alt='gas' width={16} height={16} />
            <p className='dark:text-slate-400'>{capacity}</p>
          </div>
        </section>
      </section>
      <section>
        <section className='flex items-center justify-between'>
          <p>
            <span className='text-base font-bold text-gray-900 dark:text-white md:text-xl'>
              {price}
            </span>
            <span className='ml-1 text-xs font-bold text-slate-400 md:text-sm'>
              day
            </span>
          </p>
          <Dialog.Root>
            <Dialog.Trigger className='btn-primary w-fit hover:opacity-80'>
              More Info
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className='fixed inset-0 z-50 bg-black/50' />
              <Dialog.Content className='fixed left-1/2 top-[50%] z-50 w-[95%] -translate-x-1/2 -translate-y-1/2 rounded-[10px] bg-white text-gray-900 shadow  md:top-1/2 md:max-w-[1054px]'>
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
      </section>
    </article>
  );
};

export default CarCard;
