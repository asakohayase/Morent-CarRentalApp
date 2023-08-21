'use client';
import { hours, minutes, periods } from '@/data';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

type Props = {
  setSelectedTime: React.Dispatch<React.SetStateAction<string>>;
  selectedTime: string;
  title: string;
};

const TimePicker = ({ setSelectedTime, title, selectedTime }: Props) => {
  const [open, setOpen] = useState(false);
  const [selectedHour, setSelectedHour] = useState(hours[0]);
  const [selectedMinute, setSelectedMinute] = useState(minutes[0]);
  const [selectedPeriod, setSelectedPeriod] = useState(periods[0]);

  const handleHourChange = (
    hour: string,
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
  ) => {
    setSelectedHour(hour);
    e.stopPropagation();
  };
  const handleMinuteChange = (
    minute: string,
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
  ) => {
    setSelectedMinute(minute);
    e.stopPropagation();
  };
  const handlePeriodChange = (
    period: string,
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
  ) => {
    setSelectedPeriod(period);
    e.stopPropagation();
  };

  useEffect(() => {
    const time = () => {
      setSelectedTime(`${selectedHour}:${selectedMinute}:${selectedPeriod}`);
    };
    time();
  }, [setSelectedTime, selectedHour, selectedMinute, selectedPeriod]);

  return (
    <div
      onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setOpen((prev) => !prev);
        e.stopPropagation();
      }}
      className='relative flex cursor-pointer flex-col gap-3'
    >
      <label htmlFor='' className='flex items-center gap-[6px]'>
        <div className='relative h-[14px] w-[14px] shrink-0 md:h-4 md:w-4'>
          <Image
            src={'/img/time.svg'}
            fill
            priority
            alt='Icon'
            className='object-cover'
          />
        </div>
        <span className='truncate font-semibold leading-5 dark:text-white'>
          {title}
        </span>
      </label>
      <div className='relative flex justify-between gap-5 rounded-10 bg-white-200 px-[18px] py-[14px] dark:bg-gray-800'>
        <span className='truncate text-xs leading-5 text-gray-400 dark:text-white-200 md:text-sm md:leading-7'>
          {selectedTime || 'Select your time'}
        </span>
        <Image
          src={'/img/arrow.svg'}
          height={14}
          width={14}
          priority
          alt='Icon'
        />
        <div
          className={`absolute right-0 z-10 mt-10 grid w-full grid-cols-3 items-start gap-1 overflow-y-auto bg-white dark:bg-gray-800 md:mt-14 ${
            open === true ? 'max-h-56' : 'max-h-0'
          } rounded-b-[10px] bg-white drop-shadow-md`}
        >
          <ul className='scrollbar-hide max-h-56 overflow-y-auto'>
            {hours?.map((hour) => (
              <li
                onClick={(e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
                  handleHourChange(hour, e);
                }}
                key={hour}
                className={`flex cursor-pointer items-center justify-center p-3 text-xs dark:text-white ${
                  hour === selectedHour
                    ? 'bg-blue-500 text-white hover:bg-blue-500'
                    : 'hover:bg-blue-500/10 dark:hover:bg-black'
                }`}
              >
                {hour}
              </li>
            ))}
          </ul>
          <ul className='scrollbar-hide max-h-56 overflow-y-auto'>
            {minutes?.map((minute) => (
              <li
                onClick={(e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
                  handleMinuteChange(minute, e);
                }}
                key={minute}
                className={`flex cursor-pointer items-center justify-center p-3 text-xs dark:text-white ${
                  minute === selectedMinute
                    ? 'bg-blue-500 text-white hover:bg-blue-500'
                    : 'hover:bg-blue-500/10 dark:hover:bg-black'
                }`}
              >
                {minute}
              </li>
            ))}
          </ul>

          <ul>
            {periods?.map((period) => (
              <li
                onClick={(e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
                  handlePeriodChange(period, e);
                }}
                key={period}
                className={`flex cursor-pointer items-center justify-center p-3 text-xs dark:text-white ${
                  period === selectedPeriod
                    ? 'bg-blue-500 text-white hover:bg-blue-500'
                    : 'hover:bg-blue-500/10 dark:hover:bg-black'
                }`}
              >
                {period}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TimePicker;
