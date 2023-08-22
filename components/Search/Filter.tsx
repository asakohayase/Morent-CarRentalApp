import React from 'react';

type Props = {
  name: string | number;
  length?: number;
};

const Filter = ({ name, length = 10 }: Props) => {
  return (
    <div className='flex flex-col gap-5'>
      <ul className='flex flex-col gap-y-3'>
        <li className='flex h-[24px] items-center justify-between'>
          <div className='flex items-center space-x-[14px]'>
            <input
              type='checkbox'
              id={`check${name}`}
              className="relative h-[20px] w-[20px] shrink-0 cursor-pointer appearance-none rounded-[5px] border-[1px] after:absolute after:left-0 after:top-0 after:h-full after:w-full after:bg-[length:10px] after:bg-center after:bg-no-repeat after:content-[''] checked:border-transparent checked:bg-blue-500 after:checked:bg-[url('/img/filter-check.svg')] focus:outline-none dark:border-gray-400 dark:checked:border-transparent lg:h-[24px] lg:w-[24px]"
            />
            <label
              htmlFor={`check${name}`}
              className='dark:text-white-100 cursor-pointer text-base font-semibold capitalize leading-[22px] text-gray-700 lg:text-[20px] lg:leading-[30px]'
            >
              {name}
              <span className='font-medium text-gray-400'> ({length})</span>
            </label>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Filter;
