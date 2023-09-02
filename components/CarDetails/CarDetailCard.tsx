/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import * as Dialog from '@radix-ui/react-dialog';
import { motion } from 'framer-motion';
import Date from '@/components/Date';
import Time from '@/components/Time';
import SelectCountryInput from '../SelectCountryInput';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Car } from '@/typings';
import CarImages from './CarImages';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { User } from '@supabase/supabase-js';

type Props = {
  car_id: string;
};

const CarDetailCard = ({
  data,
  children,
}: {
  data: Car;
  children?: React.ReactNode;
}) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedPickupTime, setSelectedPickupTime] = useState('');
  const [selectedDropoffTime, setSelectedDropoffTime] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClientComponentClient();
  const {
    car_title,
    car_type,
    fuel_capacity,
    capacity,
    transmission,
    price,
    short_description,
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

  // const handleRentCar = async ({ car_id }: Props) => {
  //   if (user) {
  //     const supabase = createClientComponentClient();
  //     const { data, error } = await supabase
  //       .from('cars')
  //       .upsert({
  //         borrower_id: user?.id,
  //         booked_dates: selectedDate,
  //       })
  //       .eq('car_id', car_id);

  //     if (error) {
  //       console.error('Error inserting data:', error.message);
  //     } else {
  //       console.log('Data inserted successfully:', data);
  //     }
  //   }
  // };
  const handleRentCar = async ({ car_id }: Props) => {
    if (user) {
      const supabase = createClientComponentClient();
      const { data: carData, error: carError } = await supabase
        .from('cars')
        .select('*')
        .eq('car_id', car_id)
        .single();

      if (carError) {
        console.error('Error selecting car data:', carError.message);
      } else {
        if (carData) {
          const { data: insertData, error: insertError } = await supabase
            .from('cars')
            .upsert([
              {
                booked_dates: selectedDate,
                borrower_id: user?.id,
              },
            ]);

          if (insertError) {
            console.error('Error inserting borrower_id:', insertError.message);
          } else {
            console.log('Borrower_id inserted successfully:', insertData);
          }
        } else {
          console.error('car_id not found.');
        }
      }
    }
  };

  return (
    <motion.div animate={{ scale: [1.2, 1] }} transition={{ times: [1, 1, 1] }}>
      {children}
      <div className='flex h-full w-full flex-col transition delay-150 ease-in-out md:flex-row'>
        <section className='flex h-full w-full flex-col gap-3 rounded-l-[10px] bg-white px-5 pt-5 dark:bg-slate-800 md:p-4'>
          <CarImages data={data} />
        </section>
        <section className='flex w-full flex-col justify-between gap-10 rounded-r-[10px] bg-white p-12 dark:bg-slate-800 md:justify-around  md:px-10 md:py-6'>
          <section className='flex justify-between'>
            <h1 className='md:h1-bold text-xl font-bold leading-7 text-gray-900 dark:text-white'>
              {car_title}
            </h1>
          </section>
          <p className='md:base-regular w-full text-sm font-normal leading-normal text-slate-600 dark:text-neutral-100'>
            {short_description}
          </p>
          <section className=' flex w-full justify-between'>
            <section className='w-1/2'>
              <div className='flex w-full flex-row items-center justify-between '>
                <p className=' md:base-regular text-xs font-medium text-slate-400'>
                  Type Car{' '}
                </p>
                <span className='md:base-medium text-xs font-semibold text-slate-600 dark:text-white'>
                  {car_type}
                </span>
              </div>

              <div className='flex w-full  flex-row items-center  justify-between'>
                <p className='md:base-regular text-xs font-medium text-slate-400'>
                  Transm.{' '}
                </p>
                <span className='md:base-medium text-xs font-semibold text-slate-600 dark:text-white'>
                  {transmission}
                </span>
              </div>
            </section>
            <section className='ml-11 w-1/2'>
              <div className='flex w-full  flex-row items-center  justify-between '>
                <p className='md:base-regular text-xs font-medium text-slate-400'>
                  Capacity{' '}
                </p>
                <span className='md:base-medium text-xs font-semibold text-slate-600 dark:text-white'>
                  {capacity}
                </span>
              </div>
              <div className='flex w-full  flex-row items-center justify-between '>
                <p className='md:base-regular text-xs font-medium text-slate-400'>
                  Gasoline{' '}
                </p>
                <span className='md:base-medium text-xs font-semibold text-slate-600 dark:text-white'>
                  {fuel_capacity} L
                </span>
              </div>
            </section>
          </section>
          <section className='flex  w-full items-center justify-between'>
            <p>
              <span className='text-xl font-bold text-gray-900 dark:text-white md:text-[28px]'>
                {price}/
              </span>
              <span className='ml-1 text-xs font-bold text-slate-400 md:text-sm'>
                days
              </span>
            </p>
            <Dialog.Root>
              <Dialog.Trigger className='btn-primary ml-6 w-[148px] hover:opacity-80 md:w-fit'>
                Rent Now
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className='fixed inset-0 z-50 bg-black/50' />
                <Dialog.Content className='fixed left-1/2  z-50 w-[95%] -translate-x-1/2 -translate-y-1/2 rounded-[10px]  bg-white text-gray-900 shadow md:top-1/2 md:max-w-[500px]'>
                  <motion.div
                    animate={{ scale: [1.2, 1] }}
                    transition={{ times: [1] }}
                  >
                    <form className=' flex h-full flex-col justify-between gap-9 rounded-[10px] bg-white p-10 dark:bg-slate-800'>
                      <section className='flex w-full flex-col justify-between '>
                        <div className=' flex justify-between'>
                          <Dialog.Title className='base-bold text-gray-900 dark:text-white'>
                            Add Pick & Drop-Off Info
                          </Dialog.Title>
                          <Dialog.Close>
                            <Cross2Icon
                              height={34}
                              width={34}
                              className='dark:text-white'
                            />
                          </Dialog.Close>
                        </div>
                        <p className='text-sm font-medium text-slate-400'>
                          Please enter your info
                        </p>
                      </section>

                      <div className='z-30 flex w-full shrink-0 flex-col gap-3'>
                        <label
                          htmlFor='location'
                          className='flex items-center gap-[6px] dark:text-white'
                        >
                          <div className='relative h-[14px] w-[14px] md:h-4 md:w-4'>
                            <Image
                              src={'/img/location.svg'}
                              fill
                              priority
                              alt='Icon'
                              className='object-cover'
                            />
                          </div>
                          <span className='font-semibold leading-5'>
                            Pickup Location
                          </span>
                        </label>
                        <SelectCountryInput
                          selected={selectedDate}
                          setSelected={setSelectedDate}
                        />
                      </div>
                      <section className='flex w-full justify-between gap-x-3'>
                        <div className='w-full '>
                          <Date title={'Pick-Up Date'} />
                        </div>
                        <div className='w-full'>
                          <Time
                            setSelectedTime={setSelectedPickupTime}
                            title={'Pick-Up Time'}
                            selectedTime={selectedPickupTime}
                          />
                        </div>
                      </section>
                      <section className='flex w-full justify-between gap-x-3'>
                        <div className='w-full '>
                          <Date title={'Drop-Off Date'} />
                        </div>
                        <div className='w-full'>
                          <Time
                            setSelectedTime={setSelectedDropoffTime}
                            title={'Drop-Off Time'}
                            selectedTime={selectedDropoffTime}
                          />
                        </div>
                      </section>
                      <button
                        className={
                          'flex w-full items-center justify-center gap-2 rounded-[10px] bg-blue-600 px-8 py-[13px] text-base font-bold text-white hover:opacity-80 md:px-9 md:py-4'
                        }
                        title={'Rent Now'}
                        onClick={handleRentCar}
                      >
                        Rent Now
                      </button>
                    </form>
                  </motion.div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </section>
        </section>
      </div>
    </motion.div>
  );
};

export default CarDetailCard;
