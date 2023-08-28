'use client';
import Image from 'next/image';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { Country, State, IState } from 'country-state-city';

type Props = {
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
};

const SelectInput = ({ selected, setSelected }: Props) => {
  const states: IState[] = State.getAllStates();
  const [input, setInput] = useState('');
  const [open, setOpen] = useState(false);
  const handleClick = (state: IState) => {
    if (state?.name?.toLowerCase() !== selected.toLowerCase()) {
      setSelected(state?.name);
      setOpen(false);
      setInput('');
    }
    console.log(selected);
  };

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
        {states?.map((state: IState, i) => {
          if (!state?.name) {
            return <li key={i}>No city found</li>;
          }
          return (
            <li
              onClick={() => handleClick(state)}
              key={state?.isoCode + state?.countryCode}
              className={`cursor-pointer p-2 text-sm  ${
                state?.name?.toLowerCase() === selected?.toLowerCase()
                  ? 'bg-blue-500 text-white hover:bg-blue-500'
                  : 'hover:bg-blue-500/10 dark:hover:bg-black'
              } ${
                state?.name?.toLowerCase().startsWith(input)
                  ? 'block'
                  : 'hidden'
              }`}
            >
              {state?.name +
                ', ' +
                Country.getCountryByCode(state?.countryCode)?.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SelectInput;
