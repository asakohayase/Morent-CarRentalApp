'use client';
import Image from 'next/image';
import React, { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import SelectCountryInput from '@/components/SelectCountryInput';
import Date from '@/components/Date';
import { usePathname } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Car } from '@/typings';

type Props = {
  results: Dispatch<SetStateAction<Car[] | null>>;
  loading?: Dispatch<SetStateAction<boolean>>;
};

const PickUpDropOff = ({ results, loading }: Props) => {
  const supabase = createClientComponentClient();
  const pathname = usePathname();
  const searchPath = pathname?.split('/').pop();
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedPickupDate, setSelectedPickupDate] = useState('');
  const [selectedDropoffDate, setSelectedDropoffDate] = useState('');

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (loading) loading(true);
    // if (!selectedLocation || !selectedPickupDate || !selectedDropoffDate) {
    //   alert('Fields Location, Pick Up Date or Drop Off Date is empty');
    //   return;
    // }
    try {
      console.log(selectedLocation);
      const { data: cars } = await supabase
        .from('cars')
        .select('*')
        .eq('location', selectedLocation);
      // .ilike('location', `%${selectedLocation}%`);
      // .contains('booked_dates', [selectedPickupDate]);
      results(cars);
      console.log('car results : ', cars);
    } catch (error) {
      console.log('Failed to fetch cars:', error);
    }
    if (loading) loading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='relative flex w-full flex-col justify-between gap-y-[22px] rounded-10 bg-white px-3 py-6 dark:bg-gray-850 lg:flex-row lg:items-end lg:gap-x-4 lg:gap-y-0 lg:px-[36px]'
    >
      <div className='grid w-full grid-cols-1 gap-3 gap-y-[22px] lg:grid-cols-3'>
        <div className='z-10 flex w-full shrink-0 flex-col gap-3'>
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
            <span className='font-semibold leading-5'>Location</span>
          </label>
          <SelectCountryInput
            selected={selectedLocation}
            setSelected={setSelectedLocation}
          />
        </div>
        <Date
          title={'Availability from'}
          dateValueChange={setSelectedPickupDate}
          dateValue={selectedPickupDate}
        />
        <Date
          title={'Availability To'}
          dateValueChange={setSelectedDropoffDate}
          dateValue={selectedDropoffDate}
        />
      </div>
      <button
        type='submit'
        className={`absolute -bottom-20 left-0 flex h-12 w-full items-center justify-center gap-[6px] rounded-10 bg-blue-500 sm:relative sm:-bottom-0 lg:h-14 lg:w-[160px] lg:shrink-0 ${
          searchPath === 'search' && 'lg:h-14 lg:w-[60px]'
        }`}
      >
        <Image
          src={'/img/search.svg'}
          height={14}
          width={14}
          priority
          alt='Icon'
        />
        <span
          className={`block leading-[25px] text-white lg:text-base xl:block ${
            searchPath === 'search' && 'lg:hidden xl:hidden'
          }`}
        >
          Search
        </span>
      </button>
    </form>
  );
};

export default PickUpDropOff;
