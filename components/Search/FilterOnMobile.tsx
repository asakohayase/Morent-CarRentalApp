'use client';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import Filter from './Filter';
import Image from 'next/image';
import { Car } from '@/typings';

type Props = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  setFilteredCars: Dispatch<SetStateAction<Car[] | null>>;
  cars: Car[];
  // loading?: Dispatch<SetStateAction<boolean>>;
};

const FilterOnMobile = ({ setOpen, cars, setFilteredCars }: Props) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className='fixed inset-x-0 bottom-0 top-[174px] z-50  w-full overflow-y-scroll bg-[#666666]/25 px-2 py-[20px] dark:bg-[#1A202C]/60 lg:hidden'>
      <div className='grid h-full grid-cols-1 place-content-start '>
        <div className='relative grid gap-2 rounded-10 bg-white p-8 dark:bg-gray-850'>
          <section className='flex flex-col gap-[18px]'>
            <Filter
              setFilteredCars={setFilteredCars}
              cars={cars}
              // loading={loading}
            />
          </section>

          <button
            onClick={() => {
              setOpen((prev) => !prev);
            }}
            className='absolute right-[18px] top-0 mt-4 p-2 text-blue-500'
          >
            <Image
              src={'/img/close.svg'}
              width={24}
              height={24}
              alt='Close'
              priority
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterOnMobile;
