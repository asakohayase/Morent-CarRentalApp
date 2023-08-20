'use client';
import { carArray } from '@/data';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import Filter from './Filter';
import Image from 'next/image';

type Props = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  capacity: string[];
  type: string[];
};

const FilterOnMobile = ({ setOpen, capacity, type }: Props) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className='fixed inset-x-0 bottom-0 top-[174px] z-50 h-full w-full bg-[#666666]/25 px-2 py-[20px] dark:bg-[#1A202C]/60'>
      <div className='grid h-full grid-cols-1 place-content-start '>
        <div className='rounded-10 dark:bg-gray-850 relative grid gap-2 bg-white p-8'>
          <section className='flex flex-col gap-[18px]'>
            <h1 className='text-xs font-semibold uppercase leading-[18px] tracking-[0.2rem] text-blue-100'>
              Type
            </h1>

            {type.map((filter) => (
              <Filter key={filter} name={filter} />
            ))}
          </section>
          <section className='flex flex-col gap-[18px] mt-9'>
            <h1 className='text-xs font-semibold uppercase leading-[18px] tracking-[0.2rem] text-blue-100'>
              Capacity
            </h1>

            {capacity.map((filter) => (
              <Filter key={filter} name={filter + ' ' + 'People'} />
            ))}
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
