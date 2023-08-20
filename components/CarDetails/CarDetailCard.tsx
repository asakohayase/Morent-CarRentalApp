import React from 'react';
import Image from 'next/image';
import Button from '@/components/reusable/Button';

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
}: Props) => {
  return (
    <div className='flex h-full w-full flex-col rounded-lg md:flex-row'>
      <section className='flex h-full flex-col  bg-white p-6 dark:bg-slate-800 md:p-4'>
        <div
          className='flex w-full items-end justify-center rounded-[10px] border border-slate-200 pt-40 dark:border-slate-400 md:h-[360px] md:w-[460px] 
md:items-center md:pt-0'
        >
          <Image
            src={carImage}
            alt={title}
            width={190}
            height={60}
            className={'pb-5 md:w-[408px] md:pb-0'}
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
        </div>
      </section>
      <section className='flex  w-full flex-col justify-between gap-y-7 p-8  dark:bg-slate-800 md:justify-around md:px-10 md:py-6'>
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
                {gasoline}
              </span>
            </div>
          </section>
        </section>
        <section className='flex  w-full items-center justify-between'>
          <p>
            <span className='text-xl font-bold text-gray-900 dark:text-white md:text-[28px]'>
              {price}
            </span>
            <span className='ml-1 text-xs font-bold text-slate-400 md:text-sm'>
              days
            </span>
          </p>
          <Button
            title={'Rent Now'}
            href='#'
            style={'w-[140px] btn-rent-secondary md:w-fit hover:opacity-80'}
          />
        </section>
      </section>
    </div>
  );
};

export default CarDetailCard;
