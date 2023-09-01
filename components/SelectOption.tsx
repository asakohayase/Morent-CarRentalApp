'use client';
import Image from 'next/image';
import React, { Dispatch, SetStateAction, useState } from 'react';

type Props = {
  selected: string | null;
  setSelected: Dispatch<SetStateAction<string>>;
  title: string | null;
  placeholder: string;
  options: string[] | number[] | undefined;
};

const SelectOption = ({
  selected,
  setSelected,
  title,
  placeholder,
  options,
}: Props) => {
  const [input, setInput] = useState('');
  const [open, setOpen] = useState(false);

  const handleClick = (option: string | number) => {
    if (option !== selected) {
      setSelected(option.toString());
      setOpen(false);
      setInput('');
    }
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
          {selected || `Select ${title}`}
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
            setInput(e.target.value);
          }}
          placeholder={placeholder}
          className='sticky top-0 w-full border-b-[1px] border-gray-100 p-2 text-sm outline-none drop-shadow-sm placeholder:text-sm placeholder:text-gray-300 dark:border-transparent dark:bg-gray-850 dark:drop-shadow-lg'
        />
        {options?.map((option) => {
          const isSelected =
            typeof selected === 'number'
              ? option === selected
              : typeof selected === 'string' && option === selected;

          const startsWithInput =
            typeof option === 'string' &&
            option.toLowerCase().startsWith(input.toLowerCase());

          return (
            <li
              onClick={() => handleClick(option)}
              key={option}
              className={`cursor-pointer p-2 text-sm  ${
                isSelected
                  ? 'bg-blue-500 text-white hover:bg-blue-500'
                  : 'hover:bg-blue-500/10 dark:hover:bg-black'
              } ${startsWithInput ? 'block' : 'hidden'}`}
            >
              {option}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SelectOption;
