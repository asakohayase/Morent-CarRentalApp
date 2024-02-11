import React from 'react';
import Image from 'next/image';
import Button from '@/components/reusable/Button';

const success = () => {
  return (
    <div className='relative mx-auto flex max-w-[500px] flex-col rounded-lg bg-white p-[50px] dark:bg-slate-800'>
      <div className='flex w-full flex-col items-center justify-start'>
        <div className='mb-[40px] text-base font-medium text-slate-400 md:mb-[53px] md:text-lg'>
          Thank You For Your Purchase
        </div>
        <Image
          className='mb-[49px] h-28 w-28'
          src='/Icons/success.png'
          alt='success'
          width={120}
          height={120}
        />
        <div className='mb-[40px] text-2xl font-bold leading-loose text-gray-900 dark:text-white md:text-3xl md:leading-10'>
          Payment Successful
        </div>
        <div className='mb-[32px] inline-flex h-14 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5'>
          <Button
            title='Back To Homepage'
            href='/'
            style='text-center text-base font-bold text-white'
          />
        </div>
        <div className='text-base font-medium text-slate-400 md:text-lg'>
          Generate Receipt
        </div>
      </div>
    </div>
  );
};

export default success;
