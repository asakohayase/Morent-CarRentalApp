'use client';
// import Filter from '@/components/Search/Filter';
import Button from '@/components/reusable/Button';
import CarCard from '@/components/reusable/CarCard';
import PickUpDropOff from '@/components/reusable/PickUpDropOff';
import Filter from '@/components/Search/Filter';
import FilterOnMobile from '@/components/Search/FilterOnMobile';
import { carArray } from '@/data';
import Image from 'next/image';
import { useState } from 'react';

type Props = {};

const Page = (props: Props) => {
  const [open, setOpen] = useState(false);
  const filterCapacityArray: string[] = [];
  const filterTypeArray: string[] = [];

  carArray.map((el) => {
    return filterTypeArray.push(el.vehicleType);
  });

  const filteredType = new Set(filterTypeArray);
  const resultType = [...filteredType];

  carArray.map((el) => {
    return filterCapacityArray.push(el.capacity);
  });

  const filteredCapacity = new Set(filterCapacityArray);
  const resultCapacity = [...filteredCapacity];

  return (
    <main className='to-white-200 bg-gradient-to-r from-white from-55% dark:bg-gradient-to-r dark:from-gray-900 dark:to-[#1E2430] dark:to-75%'>
      <div className='bg-white-100 mx-auto flex flex-col dark:bg-[#1E2430] lg:max-w-[1536px] lg:flex-row lg:gap-8'>
        <aside className='fixed lg:static z-20 lg:z-0 flex w-full flex-col gap-14 bg-white px-6 pb-8 dark:bg-gray-900 lg:max-w-[250px] lg:pl-8 lg:pr-5 lg:pt-10 xl:w-[360px] xl:max-w-[360px]'>
          <section className='flex gap-4 lg:flex-col lg:gap-7'>
            <h1 className='hidden text-xs font-semibold uppercase leading-[18px] text-blue-100 lg:block'>
              Search
            </h1>
            <div className='rounded-10 dark:bg-gray-850 flex w-full gap-4 overflow-hidden border-[1px] border-blue-50 pl-3 pr-5 dark:border-gray-800 lg:max-w-[200px] xl:max-w-[283px]'>
              <Image
                src={'/img/search-sidebar.svg'}
                height={24}
                width={24}
                alt='Search'
              />
              <input
                type='text'
                placeholder='Search by brand or title'
                className='w-full py-[12px] outline-none placeholder:text-sm placeholder:font-medium placeholder:text-gray-700 dark:bg-gray-850 dark:placeholder:text-blue-100'
              />
            </div>
            <div
              onClick={() => {
                setOpen((prev) => !prev);
              }}
              className='flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-10 border-[1px] border-blue-50 dark:border-gray-800 lg:hidden'
            >
              <Image
                src={'/img/filter.svg'}
                width={24}
                height={24}
                alt='Filter'
                priority
              />
            </div>
          </section>
          {open && (
            <FilterOnMobile
              setOpen={setOpen}
              capacity={resultCapacity}
              type={resultType}
            />
          )}

          <section className='hidden lg:grid lg:gap-14'>
            <section className='flex flex-col gap-7'>
              <h1 className='hidden text-xs font-semibold uppercase leading-[18px] tracking-[0.2rem] text-blue-100 lg:block'>
                Type
              </h1>
              {resultType.map((filter, i) => (
                <Filter key={i} name={filter} />
              ))}
            </section>
            <section className='flex flex-col gap-7'>
              <h1 className='hidden text-xs font-semibold uppercase leading-[18px] tracking-[0.2rem] text-blue-100 lg:block'>
                Capacity
              </h1>
              {resultCapacity.map((filter, i) => (
                <Filter key={i} name={filter} />
              ))}
            </section>
            <section className='flex flex-col gap-7'>
              <h1 className='hidden text-xs font-semibold uppercase leading-[18px] tracking-[0.2rem] text-blue-100 lg:block'>
                Price
              </h1>
            </section>
          </section>
        </aside>

        <section className='flex flex-col justify-center p-6 mt-20 md:mt-0 gap-9 md:gap-5 lg:p-0 lg:pb-12 lg:pt-8 flex-1'>
          <PickUpDropOff />
          <section className='grid grid-cols-1 gap-8 mt-20 md:mt-0 md:grid-cols-2 lg:grid-cols-3'>
            {carArray?.slice(0, 9).map((car, i) => {
              return <CarCard key={i} data={car} />;
            })}
          </section>
          <Button
            title={'Show more cars'}
            style={
              'px-[10px] py-2 lg:px-[51px] lg:py-[18px] bg-blue-500 rounded-10 text-white w-fit place-self-center text-xs rounded-[4px] lg:rounded-10 lg:text-base lg:font-bold font-semibold'
            }
            href={'#!'}
          />
        </section>
      </div>
    </main>
  );
};

export default Page;
