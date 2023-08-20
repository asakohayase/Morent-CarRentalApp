import ProfileCard from '@/components/Profile/ProfileCard'
import Button from '@/components/reusable/Button';
import CarCard from '@/components/reusable/CarCard';
import { carArray } from '@/data';
import React from 'react'

type Props = {}

const Page = (props: Props) => {
  return (
    <main className='padding-layout flex flex-col bg-gray-900 bg-white-200 dark:bg-gray-900'>
      <h1 className="mb-[24px] mt-6 text-xl font-bold text-gray-900 md:mb-[29px] md:mt-[68px]">My Profile</h1>
      {/* Profile Section */}
      <ProfileCard/>

      {/* Rented Car Section */}
      <section className='relative mt-10 flex flex-col gap-6'>
        <h5 className='px-6 text-lg font-medium text-gray-400'>Rented Cars</h5>
        <section className='grid grid-cols-1 gap-y-6 sm:grid-cols-2 md:gap-x-8 lg:grid-cols-4'>
          {carArray.slice(0, 4).map((item, index) => (
            <CarCard key={index} data={item} />
          ))}
        </section>
      </section>

      <section className='relative mt-10 flex flex-col gap-6'>
        <h5 className='px-6 text-lg font-medium text-gray-400'>My Cars for Rent</h5>
        <section className='grid grid-cols-1 gap-y-6 sm:grid-cols-2 md:gap-x-8 lg:grid-cols-4'>
          {carArray.slice(0, 4).map((item, index) => (
            <CarCard key={index} data={item} />
          ))}
        </section>
      </section>


      <div className="my-12 flex justify-center md:my-16">
        <Button href="/addcar" title="Add More Cars for Rent" style="btn-add-cars w-[228px] h-14 px-5" />
      </div>
    </main>
  );
}

export default Page