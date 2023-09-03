'use client';
import CarCard from '@/components/reusable/CarCard';
import PickUpDropOff from '@/components/reusable/PickUpDropOff';
import Filter from '@/components/Search/Filter';
import Loader from '@/components/Search/Loader';
import FilterOnMobile from '@/components/Search/FilterOnMobile';
import { Car } from '@/typings';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Empty from '@/components/Search/Empty';

type Props = {};

const Page = (props: Props) => {
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState<Car[] | null>([]);
  const [open, setOpen] = useState(false);
  const [filteredCars, setFilteredCars] = useState<Car[] | null>([]);
  const [searchResult, setSearchResult] = useState<Car[] | null>([]);
  const [carsToDisplay, setCarsToDisplay] = useState<Car[] | null>([]);
  const [visible, setVisible] = useState(6);

  useEffect(() => {
    const getCars = async () => {
      const { data } = await supabase.from('cars').select('*');
      setCars(data);
      setCarsToDisplay(data);
    };
    getCars();
  }, [supabase]);

  useEffect(() => {
    if (searchResult) {
      setCarsToDisplay(searchResult);
    }
  }, [searchResult]);

  useEffect(() => {
    if (filteredCars && filteredCars.length > 0) {
      setCarsToDisplay(filteredCars);
    } else if (filteredCars && filteredCars.length === 0) {
      setCarsToDisplay(null);
    }
  }, [filteredCars]);

  const handleMore = () => {
    setVisible((prev) => prev + 6);
  };

  return (
    <main className='bg-gradient-to-r from-white from-55% to-white-200 dark:bg-gradient-to-r dark:from-gray-900 dark:to-[#1E2430] dark:to-75%'>
      <div className='mx-auto flex flex-col bg-white-100 dark:bg-[#1E2430] lg:max-w-[1536px] lg:flex-row lg:gap-8'>
        <aside className='fixed z-20 flex w-full flex-col gap-14 bg-white px-6 pb-8 dark:bg-gray-900 lg:static lg:z-0 lg:max-w-[250px] lg:pl-8 lg:pr-5 lg:pt-10 xl:w-[360px] xl:max-w-[360px]'>
          <section className='flex gap-4 lg:flex-col lg:gap-7'>
            <h1 className='hidden text-xs font-semibold uppercase leading-[18px] text-blue-100 lg:block'>
              Search
            </h1>
            <div className='flex w-full gap-4 overflow-hidden rounded-10 border-[1px] border-blue-50 pl-3 pr-5 dark:border-gray-800 dark:bg-gray-850 lg:max-w-[200px] xl:max-w-[283px]'>
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
              setFilteredCars={setFilteredCars}
              cars={cars}
            />
          )}

          <section className='hidden lg:grid lg:gap-14'>
            <Filter
              setFilteredCars={setFilteredCars}
              cars={cars}
              setLoading={setLoading}
            />
          </section>
        </aside>

        <section className='relative mt-20 flex w-full flex-1 flex-col place-items-start gap-10 p-6 md:gap-5 lg:mt-0 lg:gap-9 lg:p-0 lg:pb-12 lg:pr-8 lg:pt-8'>
          <PickUpDropOff results={setSearchResult} loading={setLoading} />
          <section className='mt-20 grid w-full shrink-0 grid-cols-1 gap-5 sm:mt-0 md:grid-cols-2 lg:grid-cols-2 lg:gap-8 xl:grid-cols-3'>
            {loading ? (
              <Loader />
            ) : (
              <>
                {carsToDisplay && carsToDisplay.length > 0 ? (
                  carsToDisplay
                    .slice(0, visible)
                    .map((car, i) => <CarCard key={i} data={car} />)
                ) : (
                  <Empty />
                )}
              </>
            )}
          </section>

          {carsToDisplay && carsToDisplay?.length > 6 && (
            <button
              onClick={handleMore}
              className={`${
                loading === true && 'hidden'
              } w-fit place-self-center rounded-[4px] bg-blue-500 px-[10px] py-2 text-xs font-semibold text-white lg:rounded-10 lg:px-[51px] lg:py-[18px] lg:text-base lg:font-bold`}
            >
              Show more cars
            </button>
          )}
        </section>
      </div>
    </main>
  );
};

export default Page;
