/* eslint-disable tailwindcss/no-custom-classname */
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

  return (
    <div className='relative'>
      <div
        onClick={() => {
          setOpen((prev) => !prev);
        }}
        className='bg-white-200 flex justify-between gap-5 rounded-[10px] px-[18px] py-[14px]'
      >
        <span className='truncate text-xs leading-5 text-gray-400 md:text-sm md:leading-7'>
          {selected
            ? selected?.length > 25
              ? selected?.substring(0, 25) + '...'
              : selected
            : 'Location - Select your city'}
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
        } scrollbar-thin scrollbar-thumb-rounded scrollbar-track-transparent scrollbar-thumb-blue-500 w-full overflow-y-auto rounded-b-[10px] bg-white drop-shadow-md`}
      >
        <input
          type='text'
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setInput(e.target.value.toLocaleLowerCase());
          }}
          placeholder='Enter city name'
          className='sticky top-0 w-full border-b-[1px] border-gray-100 p-2 outline-none drop-shadow-sm placeholder:text-sm placeholder:text-gray-300'
        />
        {states?.map((el, i) => {
          return (
            <li
              onClick={() => {
                if (el?.name?.toLowerCase() !== selected.toLowerCase()) {
                  setSelected(el?.name);
                  setOpen(false);
                  setInput('');
                }
              }}
              key={i}
              className={`cursor-pointer p-2 text-sm hover:bg-blue-500/10  ${
                el?.name?.toLowerCase() === selected?.toLowerCase() &&
                'bg-blue-500 text-white'
              } ${
                el?.name?.toLowerCase() === selected?.toLowerCase() &&
                'text-white hover:bg-blue-500'
              } ${
                el?.name?.toLowerCase().startsWith(input) ? 'block' : 'hidden'
              }`}
            >
              {el?.name + ', ' + Country.getCountryByCode(el.countryCode)?.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SelectInput;
