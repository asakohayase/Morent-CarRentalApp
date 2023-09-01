'use client';
import Image from 'next/image';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { State, City, ICity } from 'country-state-city';
import { GeoResponse } from '@/typings';

type Props = {
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
};

const SelectInput = ({ selected, setSelected }: Props) => {
  const [input, setInput] = useState('');
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState<GeoResponse>();

  const cities = City.getCitiesOfCountry(location?.countryCode!);
  // console.log(cities);

  const handleClick = (city: ICity) => {
    if (city?.name?.toLowerCase() !== selected.toLowerCase()) {
      setSelected(
        city?.name +
          ', ' +
          State.getStateByCodeAndCountry(city?.stateCode, city?.countryCode)
            ?.name +
          ', ' +
          city?.countryCode,
      );
      setOpen(false);
      setInput('');
    }
  };

  useEffect(() => {
    async function fetchLocation() {
      const url = 'http://ip-api.com/json/';

      const response = await fetch(url, {
        method: 'GET',
      });
      const result = await response.json();
      setLocation(result);
    }
    fetchLocation();
  }, []);

  return (
    <div className='relative cursor-pointer'>
      <div
        onClick={() => {
          setOpen((prev) => !prev);
        }}
        className='flex justify-between gap-5 rounded-10 bg-white-200 px-[18px] py-[14px] dark:bg-gray-800'
      >
        <span className='truncate text-xs leading-5 text-gray-400 dark:text-white-200 md:text-sm md:leading-7'>
          {selected || 'Location - Select your city'}
        </span>
        <Image
          src={'/img/arrow.svg'}
          height={14}
          width={14}
          priority
          alt='Icon'
        />
      </div>
      <ul
        className={`absolute mt-3 ${
          open ? 'max-h-56' : 'max-h-0'
        } scrollbar-hide w-full overflow-y-auto rounded-b-[10px] bg-white drop-shadow-md dark:bg-gray-800 dark:text-white-200`}
      >
        <input
          type='text'
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setInput(e.target.value.toLocaleLowerCase());
          }}
          placeholder='Enter city name'
          className='sticky top-0 w-full border-b-[1px] border-gray-100 p-2 text-sm outline-none drop-shadow-sm placeholder:text-sm placeholder:text-gray-300 dark:border-transparent dark:bg-gray-850 dark:drop-shadow-lg'
        />
        {cities?.map((city: ICity, i) => {
          if (!city?.name) {
            return <li key={i}>No city found</li>;
          }
          return (
            <li
              onClick={() => handleClick(city)}
              key={city?.name + city?.stateCode + city?.countryCode}
              className={`cursor-pointer p-2 text-sm  ${
                city?.name?.toLowerCase() === selected?.toLowerCase()
                  ? 'bg-blue-500 text-white hover:bg-blue-500'
                  : 'hover:bg-blue-500/10 dark:hover:bg-black'
              } ${
                city?.name?.toLowerCase().startsWith(input) ? 'block' : 'hidden'
              }`}
            >
              {city?.name +
                ', ' +
                State.getStateByCodeAndCountry(
                  city?.stateCode,
                  city?.countryCode,
                )?.name +
                ', ' +
                city?.countryCode}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SelectInput;
