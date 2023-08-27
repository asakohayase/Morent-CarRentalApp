import React, { useState } from 'react';
import Image from 'next/image';
import * as Dialog from '@radix-ui/react-dialog';
import { motion } from 'framer-motion';
import Date from '@/components/Date';
import Time from '@/components/Time';
import SelectCountryInput from '../SelectCountryInput';
import Button from '../reusable/Button';
import { Cross2Icon } from '@radix-ui/react-icons';

interface Props {
  data: {
    carImage: string;
    smallCar: string;
    view1: string;
    view2: string;
    title: string;
    description: string;
    type: string;
    capacity: string;
    transmission: string;
    gasoline: string;
    price: string;
  };
  children?: React.ReactNode;
}

const CarDetailCard = ({
  data: {
    carImage,
    smallCar,
    view1,
    view2,
    title,
    description,
    type,
    capacity,
    transmission,
    gasoline,
    price,
  },
  children,
}: Props) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedPickupTime, setSelectedPickupTime] = useState('');
  const [selectedDropoffTime, setSelectedDropoffTime] = useState('');

  return (
    <motion.div animate={{ scale: [1.2, 1] }} transition={{ times: [1, 1, 1] }}>
      {children}
      <div className='flex h-full w-full flex-col rounded-[10px]  transition delay-150 ease-in-out md:flex-row'>
        <section className='flex h-full flex-col rounded-l-[10px] bg-white px-5 pt-5 dark:bg-slate-800 md:p-4'>
          <div
            className='flex w-full items-end justify-center rounded-[10px] border border-slate-200 pt-40 dark:border-slate-400 md:h-[360px] md:w-[460px] 
md:items-center md:pt-0'
          >
            <Image
              src={carImage}
              alt={title}
              width={190}
              height={60}
              className={'pb-5  md:w-[408px] md:pb-0'}
            />
          </div>
          <div className='flex items-center justify-between  pt-6'>
            <Image
              src={smallCar}
              alt={title}
              width={116}
              height={36}
              className={
                'h-[80px] w-[96px] rounded-[10px] border-blue-600 px-2 hover:border md:h-[124px] md:w-[144px]'
              }
            />
            <Image
              src={view1}
              alt='view1'
              width={96}
              height={64}
              className={
                'rounded-[10px] border-blue-600 hover:border md:h-[124] md:w-[144px]'
              }
            />
            <Image
              src={view2}
              alt='view1'
              width={96}
              height={64}
              className={
                'rounded-[10px] border-blue-600 object-cover hover:border md:h-[124] md:w-[144px]'
              }
            />
            <Dialog.Close />
          </div>
        </section>
        <section className='flex w-full flex-col justify-between gap-10 rounded-r-[10px] bg-white p-12 dark:bg-slate-800 md:justify-around md:px-10 md:py-6'>
          <section className='flex justify-between'>
            <h1 className='md:h1-bold text-xl font-bold leading-7 text-gray-900 dark:text-white'>
              {title}
            </h1>
          </section>
          <p className='md:base-regular w-full text-sm font-normal leading-normal text-slate-600 dark:text-neutral-100'>
            {description}
          </p>
          <section className=' flex w-full justify-between'>
            <section className='w-1/2'>
              <div className='flex w-full flex-row items-center justify-between '>
                <p className=' md:base-regular text-xs font-medium text-slate-400'>
                  Type Car{' '}
                </p>
                <span className='md:base-medium text-xs font-semibold text-slate-600 dark:text-white'>
                  {type}
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
                  {gasoline} L
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
                <Dialog.Content className='fixed left-1/2 top-[50%] z-50 w-[95%] -translate-x-1/2 -translate-y-1/2 rounded-[10px]  bg-white text-gray-900 shadow md:top-1/2 md:max-w-[500px]'>
                  <motion.div
                    animate={{ scale: [1.2, 1] }}
                    transition={{ times: [1, 1, 1] }}
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
                      <Button
                        href='#'
                        style={
                          ' btn-rent w-full hover:opacity-80 rounded-[10px]'
                        }
                        title={'Rent Now'}
                      />
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
