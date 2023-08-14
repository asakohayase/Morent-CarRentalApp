/* eslint-disable tailwindcss/no-custom-classname */
'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import SelectCountryInput from '@/components/SelectCountryInput';

type Props = {};

const PickUpDropOff = (props: Props) => {
  const [selected, setSelected] = useState('');

  return (
    <section className='rounded-10 relative flex w-full flex-col justify-between gap-y-[22px] bg-white px-3 py-6 lg:flex-row lg:items-end lg:gap-x-4 lg:gap-y-0 lg:px-[36px]'>
      <div className='z-10 flex w-full shrink-0 flex-col gap-3 lg:max-w-[255px] xl:max-w-[296px]'>
        <div className='flex items-center gap-[6px]'>
          <div className='relative h-[14px] w-[14px] md:h-4 md:w-4'>
            <Image
              src={'/img/location.svg'}
              fill
              priority
              alt='Icon'
              className='object-cover'
            />
          </div>
          <span className='font-semibold leading-5'>Location</span>
        </div>
        <SelectCountryInput selected={selected} setSelected={setSelected} />
      </div>
      <div className='grid grid-cols-2 gap-3 gap-y-[22px] lg:grid-cols-4'>
        <div className='flex flex-col gap-3'>
          <div className='flex items-center gap-[6px]'>
            <div className='relative h-[14px] w-[14px] md:h-4 md:w-4'>
              <Image
                src={'/img/date.svg'}
                fill
                priority
                alt='Icon'
                className='object-cover'
              />
            </div>
            <span className='font-semibold leading-5'>Pick-Up Date</span>
          </div>
          <div className='bg-white-200 rounded-10 flex justify-between gap-5 px-[18px] py-[14px]'>
            <span className='truncate text-xs leading-5 text-gray-400 md:text-sm md:leading-7'>
              Select your date
            </span>
            <Image
              src={'/img/arrow.svg'}
              height={14}
              width={14}
              priority
              alt='Icon'
            />
          </div>
        </div>
        <div className='flex flex-col gap-3'>
          <div className='flex items-center gap-[6px]'>
            <div className='relative h-[14px] w-[14px] md:h-4 md:w-4'>
              <Image
                src={'/img/time.svg'}
                fill
                priority
                alt='Icon'
                className='object-cover'
              />
            </div>
            <span className='font-semibold leading-5'>Pick-Up Time</span>
          </div>
          <div className='bg-white-200 rounded-10 flex justify-between gap-5 px-[18px] py-[14px]'>
            <span className='truncate text-xs leading-5 text-gray-400 md:text-sm md:leading-7'>
              Select your time
            </span>
            <Image
              src={'/img/arrow.svg'}
              height={14}
              width={14}
              priority
              alt='Icon'
            />
          </div>
        </div>
        <div className='flex flex-col gap-3'>
          <div className='flex items-center gap-[6px]'>
            <div className='relative h-[14px] w-[14px] md:h-4 md:w-4'>
              <Image
                src={'/img/date.svg'}
                fill
                priority
                alt='Icon'
                className='object-cover'
              />
            </div>
            <span className='font-semibold leading-5'>Drop-Off Date</span>
          </div>
          <div className='bg-white-200 rounded-10 flex justify-between gap-5 px-[18px] py-[14px]'>
            <span className='truncate text-xs leading-5 text-gray-400 md:text-sm md:leading-7'>
              Select your date
            </span>
            <Image
              src={'/img/arrow.svg'}
              height={14}
              width={14}
              priority
              alt='Icon'
            />
          </div>
        </div>
        <div className='flex flex-col gap-3'>
          <div className='flex items-center gap-[6px]'>
            <div className='relative h-[14px] w-[14px] md:h-4 md:w-4'>
              <Image
                src={'/img/time.svg'}
                fill
                priority
                alt='Icon'
                className='object-cover'
              />
            </div>
            <span className='font-semibold leading-5'>Drop-Off Time</span>
          </div>
          <div className='bg-white-200 rounded-10 flex justify-between gap-5 px-[18px] py-[14px]'>
            <span className='truncate text-xs leading-5 text-gray-400 md:text-sm md:leading-7'>
              Select your time
            </span>
            <Image
              src={'/img/arrow.svg'}
              height={14}
              width={14}
              priority
              alt='Icon'
            />
          </div>
        </div>
      </div>
      <button className='rounded-10 absolute -bottom-20 left-0 flex h-12 w-full items-center justify-center gap-[6px] bg-blue-500 sm:relative sm:-bottom-0 lg:h-14 lg:w-[60px] lg:shrink-0 xl:w-[160px]'>
        <Image
          src={'/img/search.svg'}
          height={14}
          width={14}
          priority
          alt='Icon'
        />
        <span className='block leading-[25px] text-white lg:hidden lg:text-base xl:block'>
          Search
        </span>
      </button>
    </section>
  );
};

export default PickUpDropOff;
