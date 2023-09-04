/* eslint-disable camelcase */
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { InView } from 'react-intersection-observer';

import * as Dialog from '@radix-ui/react-dialog';
import CarDetailCard from '../CarDetails/CarDetailCard';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Car } from '@/typings';
import Heart from '@/public/img/heart.svg';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { User } from '@supabase/supabase-js';

const PopularCars = ({ data }: { data: Car }) => {
  const carId = data.car_id;

  const [user, setUser] = useState<User | null>(null);
  const [btnFill, setBtnFill] = useState('fill-none');
  const [likedCars, setLikedCars] = useState<string[]>([]);
  // const isLiked = localStorage.getItem('btnFill');
  const supabase = createClientComponentClient();
  const [inView, setInView] = useState(false);
  const {
    car_title,
    car_type,
    capacity,
    images,
    fuel_capacity,
    transmission,
    price,
  } = data;

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user ?? null);
    };
    getUser();
  }, [supabase]);

  const handleLikedCars = async () => {
    if (!user) {
      return;
    }
    const { data, error } = await supabase
      .from('profiles')
      .select('liked_cars')
      .eq('id', user?.id)
      .single();

    if (error) {
      console.error('Error fetching profile data:', error);
      return;
    }
    const isCarLiked = data.liked_cars.includes(carId);

    if (isCarLiked) {
      setBtnFill('fill-red-500');

      setLikedCars(data.liked_cars.filter((id: string) => id !== carId));

      const updatedLikedCars = data.liked_cars.filter(
        (likedCarId: string) => likedCarId !== carId,
      );
      const { error } = await supabase
        .from('profiles')
        .update({ liked_cars: updatedLikedCars })
        .eq('id', user?.id);

      if (error) {
        console.error('Error updating liked cars:', error);
      }
    } else {
      setBtnFill('fill-none');
      setLikedCars([...likedCars, carId]);
      const updatedLikedCars = [...likedCars, carId];
      const { error } = await supabase
        .from('profiles')
        .update({ liked_cars: updatedLikedCars })
        .eq('id', user?.id);

      if (error) {
        console.error('Error updating liked cars:', error);
      }
    }
  };

  useEffect(() => {
    handleLikedCars();
  }, []);

  // useEffect(() => {
  //   localStorage.setItem('btnFill', `{$btnFill}`);
  // }, [isLiked]);

  return (
    <InView
      onChange={(inView) => setInView(inView)}
      as='article'
      className={
        `transition ease-in-out rounded-[10px] duration-300` +
        `${inView ? '' : ' blur-sm shadow-sm'}`
      }
      threshold={0.8}
      delay={300}
    >
      <article className='flex h-full w-full min-w-[304px] flex-col justify-between gap-4 rounded-[10px] bg-white px-7 py-4 dark:bg-slate-800 sm:gap-9 sm:p-4 lg:p-6'>
        <section className='flex w-full items-center justify-between'>
          <div className='overflow-hidden'>
            <h1 className='line-clamp-1 text-base font-semibold text-gray-900 dark:text-white md:text-xl md:font-bold'>
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
              onClick={handleLikedCars}
            />
          </button>
        </section>
        <section className='flex flex-col justify-between gap-3 text-sm text-gray-400 sm:gap-14'>
          <div className='flex w-full items-center justify-center'>
            <div className='relative h-[115px] w-full after:absolute after:bottom-0 after:h-20 after:w-full after:bg-gradient-to-t after:from-white after:to-transparent after:to-80% dark:after:from-transparent'>
              <Image
                src={images && images.length > 0 ? images[0] : '/img/car.png'}
                alt={car_title}
                fill
                className='object-contain p-2'
              />
            </div>
          </div>

          <section className='mr-5 flex  w-full shrink-0 flex-row items-center justify-between gap-2 sm:w-full  sm:gap-2 md:mr-0 md:flex-wrap'>
            <div className='flex shrink-0 items-center gap-0.5 md:gap-2'>
              <div className='relative h-[12px] w-[12px] md:h-6 md:w-6'>
                <Image
                  src='/img/gas-station.svg'
                  alt='gas'
                  fill
                  className='object-contain'
                />
              </div>
              <p className='dark:text-slate-400'>{`${fuel_capacity} L`}</p>
            </div>
            <div className='flex shrink-0 items-center gap-0.5 md:gap-2'>
              <div className='relative h-[12px] w-[12px] md:h-6 md:w-6'>
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
            <div className='flex shrink-0 items-center gap-0.5 md:gap-2'>
              <div className='relative h-[12px] w-[12px] md:h-6 md:w-6'>
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
        <section className='mt-2 flex w-full items-center justify-between md:mt-0 md:gap-2'>
          <p className=''>
            <span className=' text-base font-bold text-gray-900 dark:text-white md:text-xl'>
              {`${price} /`}
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
      </article>
    </InView>
  );
};

export default PopularCars;
