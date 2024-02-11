/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import * as Dialog from '@radix-ui/react-dialog';
import { motion } from 'framer-motion';
import DateComp from '@/components/DateComp';
import SelectCountryInput from '../SelectCountryInput';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Car } from '@/typings';
import CarImages from './CarImages';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { User } from '@supabase/supabase-js';
import CheckoutButton from '../CheckoutButton';

const CarDetailCard = ({
  data,
  children,
}: {
  data: Car;
  children?: React.ReactNode;
}) => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedPickupDate, setSelectedPickupDate] = useState('');
  const [selectedDropoffDate, setSelectedDropoffDate] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClientComponentClient();

  const bookedDates = data.booked_dates;

  const getDate = () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    return `${month}/${date}}`;
  };
  const currentDate = getDate();

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

  // const handleRentCar = async (e: { preventDefault: () => void }) => {
  //   e.preventDefault();
  //   if (user) {
  //     const { data: car, error } = await supabase
  //       .from('cars')
  //       .update({
  //         booked_dates: [selectedPickupDate, selectedDropoffDate],
  //         borrower_id: [...borrower_id, user?.id],
  //       })
  //       .eq('car_id', car_id)
  //       .single();

  //     if (error) {
  //       console.error('Error selecting car data:', error.message);
  //     } else {
  //       if (error) {
  //         console.error('Error inserting borrower_id:');
  //       } else {
  //         console.log('Borrower_id inserted successfully:');
  //         Toast({ type: 'success', message: 'Success!' });
  //       }
  //     }
  //     console.log(car);
  //   }
  // };

  return (
    <motion.div animate={{ scale: [1.2, 1] }} transition={{ times: [1, 1, 1] }}>
      {children}
      <div className='flex h-full w-full flex-col transition delay-150 ease-in-out md:flex-row'>
        <section className='scrollbar-hide relative flex h-full w-full flex-col gap-3 overflow-x-auto scroll-smooth rounded-l-[10px] bg-white px-5 pt-5 dark:bg-slate-800 md:p-4'>
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
              {bookedDates.includes(currentDate) ? (
                <Dialog.Trigger
                  className='btn-primary ml-6 w-[148px] bg-slate-400 text-neutral-100  dark:bg-gray-600/70 dark:text-slate-400 md:w-fit'
                  disabled
                >
                  Unavailable
                </Dialog.Trigger>
              ) : (
                <Dialog.Trigger className='btn-primary ml-6 w-[148px] hover:opacity-80 md:w-fit'>
                  Rent Now
                </Dialog.Trigger>
              )}
              {/* {bookedDates !== currentDate ? (
                <Dialog.Trigger className='btn-primary ml-6 w-[148px] hover:opacity-80 md:w-fit'>
                  Rent Now
                </Dialog.Trigger>
              ) : (
                <Dialog.Trigger
                  className='btn-primary ml-6 w-[148px] bg-slate-400 text-neutral-100  dark:bg-gray-600/70 dark:text-slate-400 md:w-fit'
                  disabled
                >
                  Unavailable
                </Dialog.Trigger>
              )} */}

              <Dialog.Portal>
                <Dialog.Overlay className='fixed inset-0 z-50 bg-black/50' />
                <Dialog.Content className='fixed left-1/2 top-1/2 z-50 w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-[10px] bg-white text-gray-900  shadow md:left-1/2 md:top-1/2 md:w-[95%] md:max-w-[500px]'>
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
                          selected={selectedLocation}
                          setSelected={setSelectedLocation}
                        />
                      </div>
                      <section className='flex w-full justify-between'>
                        <div className='w-[100%]'>
                          <DateComp
                            title={'Pick-Up Date'}
                            dateValueChange={setSelectedPickupDate}
                            dateValue={selectedPickupDate}
                          />
                        </div>
                      </section>
                      <section className='flex w-full justify-between gap-x-3'>
                        <div className='w-[100%] '>
                          <DateComp
                            title={'Drop-Off Date'}
                            dateValueChange={setSelectedDropoffDate}
                            dateValue={selectedDropoffDate}
                          />
                        </div>
                      </section>

                      {/* <button
                        className={
                          'flex w-full items-center justify-center gap-2 rounded-[10px] bg-blue-600 px-8 py-[13px] text-base font-bold text-white hover:opacity-80 md:px-9 md:py-4'
                        }
                        title={'Rent Now'}
                        onClick={handleRentCar}
                      >
                        Rent Now
                      </button> */}
                      {user && <CheckoutButton car={data} userId={user.id} />}
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
