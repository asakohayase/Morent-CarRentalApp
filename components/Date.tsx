import Image from 'next/image';
import React from 'react';

type Props = {
  title: string;
};

const Date = ({ title }: Props) => {
  return (
    <div className='flex cursor-pointer flex-col gap-3'>
      <label htmlFor='' className='flex items-center gap-[6px]'>
        <div className='relative h-[14px] w-[14px] md:h-4 md:w-4'>
          <Image
            src={'/img/date.svg'}
            fill
            priority
            alt='Icon'
            className='object-cover'
          />
        </div>
        <span className='font-semibold leading-5'>{title}</span>
      </label>
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
  );
};

export default Date;
