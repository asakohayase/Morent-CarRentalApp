'use client';

import React, { useEffect, useState } from 'react';

import ProfileCard from '@/components/Profile/ProfileCard';
import Button from '@/components/reusable/Button';
import CarCard from '@/components/reusable/CarCard';
import { carType } from '@/constants/index';
import fetchCars from '@/utils/fetchCars';

const ProfilePage = ({ params }: { params: { id: number } }) => {
  const [carData, setCarData] = useState<carType[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const cars = await fetchCars();
        setCarData(cars);
      } catch (error) {
        console.error('Error fetching car data:', error);
      }
    }
    fetchData();
  }, []);

  const rentedCars = carData.filter((car) => car.borrower_id === params.id);
  const myCarsForRent = carData.filter((car) => car.owner_id === params.id);

  const renderCarSection = (title: string, cars: carType[]) => (
    <section className='relative mt-10 flex flex-col gap-6'>
      <h5 className='px-6 text-lg font-medium text-gray-400'>{title}</h5>
      <div className='grid grid-cols-1 gap-y-6 sm:grid-cols-2 md:gap-x-8 lg:grid-cols-4'>
        {cars.slice(0, 4).map((item) => (
          <CarCard key={item.car_id} data={item} />
        ))}
      </div>
    </section>
  );

  return (
    <main className='padding-layout flex flex-col bg-white-200 dark:bg-gray-900'>
      <h1 className='mb-[24px] mt-6 text-xl font-bold text-gray-900 md:mb-[29px] md:mt-[68px]'>
        My Profile
      </h1>
      {/* Profile Section */}
      <ProfileCard id={params.id} />

      {/* Rented Car Section */}
      {renderCarSection('Rented Cars', rentedCars)}

      {/* My Cars for Rent Section */}
      {renderCarSection('My Cars for Rent', myCarsForRent)}

      <div className='my-12 flex justify-center md:my-16'>
        <Button
          href='/addcar'
          title='Add More Cars for Rent'
          style='btn-add-cars w-[228px] h-14 px-5'
        />
      </div>
    </main>
  );
};

export default ProfilePage;
