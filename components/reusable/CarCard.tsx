/* eslint-disable camelcase */
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import * as Dialog from '@radix-ui/react-dialog';
import CarDetailCard from '../CarDetails/CarDetailCard';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Car } from '@/typings';
import Heart from '@/public/img/heart.svg';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { User } from '@supabase/supabase-js';

const CarCard = ({ data }: { data: Car }) => {
  const {
    car_id,
    car_title,
    car_type,
    fuel_capacity,
    capacity,
    transmission,
    images,
    price,
  } = data;

  const [user, setUser] = useState<User | null>(null);
  const [btnFill, setBtnFill] = useState(
    car_id === user?.id ? 'fill-red-500' : 'fill-none',
  );
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user ?? null);
    };
    getUser();
  }, [supabase]);

  const handleFavorite = async () => {
    const { data: liked_cars } = await supabase
      .from('profiles')
      .insert({ liked_cars: car_id });

    setBtnFill(btnFill === 'fill-none' ? 'fill-red-500' : 'fill-none');
  };

  return (
    <article className='flex w-full flex-col justify-between gap-9 rounded-[10px] bg-white p-4 transition-all hover:scale-105 dark:bg-slate-800  lg:p-6'>
      <section className='flex items-center justify-between'>
        <div className='w-4/5'>
          <h1 className='truncate whitespace-nowrap text-base font-semibold text-gray-900 dark:text-white md:text-xl md:font-bold'>
            {car_title}
          </h1>
          <p className='text-xs font-medium text-slate-400 md:text-sm md:font-bold'>
            {car_type}
          </p>
        </div>
        <button>
          <Heart
            alt='heart'
            className={`${btnFill} mb-3 h-fit shrink-0 hover:border-0 hover:fill-red-500 md:h-6 md:w-6`}
            onClick={handleFavorite}
          />
        </button>
      </section>
      <section className='flex flex-row justify-between gap-8 text-sm text-gray-400 sm:gap-14 md:flex-col'>
        <div className='flex w-full md:items-center md:justify-center'>
          <div className='relative h-[115px] w-full after:absolute after:bottom-0 after:h-20 after:w-full after:bg-gradient-to-t after:from-white after:to-transparent after:to-80% dark:after:from-transparent'>
            <Image
              src={images && images.length > 0 ? images[0] : '/img/car.png'}
              alt={car_title}
              fill
              className='object-contain p-2'
            />
          </div>
        </div>

        <section className='flex w-24 shrink-0 flex-col gap-3 sm:w-full sm:gap-2 md:flex-row md:flex-wrap md:items-center md:justify-between'>
          <div className='flex shrink-0 items-center gap-2'>
            <div className='relative h-4 w-4 md:h-6 md:w-6'>
              <Image
                src='/img/gas-station.svg'
                alt='gas'
                fill
                className='object-contain'
              />
            </div>
            <p className='dark:text-slate-400'>{`${fuel_capacity} L`}</p>
          </div>
          <div className='flex shrink-0 items-center gap-2'>
            <div className='relative h-4 w-4 md:h-6 md:w-6'>
              <Image
                src='/img/transmission.svg'
                alt='transmission'
                fill
                className='object-contain'
              />
            </div>
            <p className='text-xs dark:text-slate-400 md:text-sm'>
              {transmission}
            </p>
          </div>
          <div className='flex shrink-0 items-center gap-2'>
            <div className='relative h-4 w-4 md:h-6 md:w-6'>
              <Image
                src='/img/capacity.svg'
                alt='gas'
                fill
                className='object-contain'
              />
            </div>
            <p className='dark:text-slate-400'>{`${capacity} People`}</p>
          </div>
        </section>
      </section>
      <section>
        <section className='flex items-center justify-between gap-2'>
          <p>
            <span className='text-base font-bold text-gray-900 dark:text-white md:text-xl'>
              {`$${price} / `}
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
              <Dialog.Content className=' fixed left-1/2 top-[50%] z-50 w-[95%] -translate-x-1/2 -translate-y-1/2 rounded-[10px] bg-white text-gray-900 shadow dark:bg-slate-800 md:top-1/2 md:max-w-[1054px]'>
                <CarDetailCard data={data}>
                  <Dialog.Close className='absolute right-4 top-[-20px] cursor-pointer rounded-t-sm bg-white dark:bg-slate-800 dark:text-white md:hidden'>
                    <Cross2Icon height={24} width={24} />
                  </Dialog.Close>
                  <Dialog.Close className='absolute right-8 top-[34px] hidden cursor-pointer dark:text-white md:inline'>
                    <Cross2Icon height={34} width={34} />
                  </Dialog.Close>
                </CarDetailCard>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </section>
      </section>
    </article>
  );
};

export default CarCard;
