'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import SelectCountryInput from '@/components/SelectCountryInput';
import Time from '@/components/Time';
import Date from '@/components/Date';

type Props = {};

const PickUpDropOff = (props: Props) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedPickupTime, setSelectedPickupTime] = useState('');
  const [selectedDropoffTime, setSelectedDropoffTime] = useState('');
  // console.log(selectedPickupTime, selectedDropoffTime);

  return (
    <form className='rounded-10 relative flex w-full flex-col justify-between gap-y-[22px] bg-white px-3 py-6 lg:flex-row lg:items-end lg:gap-x-4 lg:gap-y-0 lg:px-[36px] dark:bg-gray-850'>
      <div className='grid w-full grid-cols-1 gap-3 gap-y-[22px] lg:grid-cols-3'>
        <div className='z-10 flex flex-col w-full gap-3 shrink-0'>
          <label htmlFor='location' className='flex items-center gap-[6px] dark:text-white'>
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
          </label>
          <SelectCountryInput
            selected={selectedDate}
            setSelected={setSelectedDate}
          />
        </div>
        <Date title={'Availability from'} />
        {/* <Time setSelectedTime={setSelectedPickupTime} title={'Pick-Up Time'} /> */}
        <Date title={'Availability To'} />
        {/* <Time
          setSelectedTime={setSelectedDropoffTime}
          title={'Drop-Off Time'}
        /> */}
      </div>
      <button
        type='submit'
        className='rounded-10 absolute -bottom-20 left-0 flex h-12 w-full items-center justify-center gap-[6px] bg-blue-500 sm:relative sm:-bottom-0 lg:h-14 lg:w-[160px] lg:shrink-0'
      >
        <Image
          src={'/img/search.svg'}
          height={14}
          width={14}
          priority
          alt='Icon'
        />
        <span className='block leading-[25px] text-white lg:text-base xl:block'>
          Search
        </span>
      </button>
    </form>
  );
};

export default PickUpDropOff;
