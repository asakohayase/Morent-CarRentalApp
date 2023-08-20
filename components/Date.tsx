import Image from 'next/image';
import React from 'react';

type Props = {
  title: string;
};

const Date = ({ title }: Props) => {
  return (
    <div className='flex cursor-pointer flex-col gap-3'>
      <label htmlFor='' className='flex items-center gap-[6px]'>
        <div className='relative h-[14px] w-[14px] shrink-0 md:h-4 md:w-4'>
          <Image
            src={'/img/date.svg'}
            fill
            priority
            alt='Icon'
            className='object-cover'
          />
        </div>
        <span className='truncate font-semibold leading-5 dark:text-white'>
          {title}
        </span>
      </label>
      <div className='relative flex justify-between gap-5 rounded-10 bg-white-200 px-[10px] dark:bg-gray-800'>
        <input
          type='date'
          name=''
          id=''
          className='z-[2] cursor-pointer bg-transparent py-[14px] text-xs leading-5 text-gray-400 outline-none dark:text-white-200 md:text-sm md:leading-7'
        />
        {/* <span className='text-xs leading-5 text-gray-400 truncate dark:text-white-200 md:text-sm md:leading-7'>
          Select your date
        </span> */}
        <Image
          src={'/img/arrow.svg'}
          height={14}
          width={14}
          priority
          alt='Icon'
          className='absolute right-3 top-1/2 z-[1] -translate-y-1/2'
        />
      </div>
    </div>
  );
};

export default Date;
