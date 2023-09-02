'use client';
import { Car } from '@/typings';
import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';
import Input from './Input';

type Props = {
  setFilteredCars: Dispatch<SetStateAction<Car[] | null>>;
  cars: Car[];
  loading?: Dispatch<SetStateAction<boolean>>;
};

export default function Filter({ setFilteredCars, cars, loading }: Props) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedCapacities, setSelectedCapacities] = useState<string[]>([]);

  const [selectedPrice, setSelectedPrice] = useState(20);

  const carTypes = [
    'Sedan',
    'Truck',
    'SUV',
    'Sport',
    'MPV',
    'Coupe',
    'Hatchback',
  ];
  const capacities = ['2', '4', '6', '8 or more'];

  function handleTypeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const type = e.target.value;
    if (e.target.checked) {
      setSelectedTypes([...selectedTypes, type]);
    } else {
      setSelectedTypes([...selectedTypes.filter((nType) => nType !== type)]);
    }
  }

  function handleCapacityChange(e: React.ChangeEvent<HTMLInputElement>) {
    const capacity = e.target.value;
    if (e.target.checked) {
      setSelectedCapacities([...selectedCapacities, capacity]);
    } else {
      setSelectedCapacities([
        ...selectedCapacities.filter((cap) => cap !== capacity),
      ]);
    }
  }

  useEffect(() => {
    if (loading) {
      loading(true);
    }
    const newCars = cars.filter(
      (car) =>
        (selectedTypes.length === 0 || selectedTypes.includes(car.car_type)) &&
        (selectedCapacities.length === 0 ||
          selectedCapacities.includes(car.capacity)) &&
        car.price >= selectedPrice,
    );
    setFilteredCars(newCars);
    setTimeout(() => {
      if (loading) {
        loading(false);
      }
    }, 300);
  }, [
    selectedPrice,
    cars,
    selectedCapacities,
    selectedTypes,
    setFilteredCars,
    loading,
  ]);

  return (
    <section className='grid gap-14'>
      <section className='flex flex-col gap-7'>
        <h1 className='text-xs font-semibold uppercase leading-[18px] tracking-[0.2rem] text-blue-100 lg:block'>
          Type
        </h1>
        {carTypes.map((type) => (
          <Input key={type} filter={type} handleChange={handleTypeChange} />
        ))}
      </section>

      <section className='flex flex-col gap-7'>
        <h1 className='text-xs font-semibold uppercase leading-[18px] tracking-[0.2rem] text-blue-100 lg:block'>
          Capacity
        </h1>
        {capacities.map((capacity) => (
          <Input
            key={capacity}
            filter={capacity}
            handleChange={handleCapacityChange}
            title='Person'
          />
        ))}
      </section>
      <section className='flex flex-col gap-7'>
        <h1 className='text-xs font-semibold uppercase leading-[18px] tracking-[0.2rem] text-blue-100 lg:block'>
          Price {selectedPrice}
        </h1>

        <div className=''>
          <input
            type='range'
            name='volume'
            min='20'
            max='100'
            value={selectedPrice}
            onChange={(element) => {
              element.preventDefault();
              setSelectedPrice(Number(element.currentTarget.value));
              // applyFilters();
            }}
            className='w-full lg:w-[90%]'
          />
        </div>
      </section>
    </section>
  );
}
