import Image from 'next/image';
import React from 'react';

type Props = {};

const Empty = (props: Props) => {
  return (
    <div className='flex w-full flex-col items-center justify-center gap-10 rounded-10 bg-white px-5 py-10 text-center lg:absolute lg:left-1/2 lg:top-1/2 lg:w-fit lg:-translate-x-1/2 lg:-translate-y-1/2'>
      <div className='flex flex-col items-center justify-center space-y-5'>
        <Image
          src={'/img/404.svg'}
          width={200}
          height={200}
          priority
          alt='404'
        />
        <p className='text-2xl font-bold text-gray-800'>{`Sorry! Result Not Found :(`}</p>
        <p className='px-5 text-[17px] text-gray-500 lg:max-w-sm'>
          Whoops ... This informaton is not available at the moment
        </p>
        <button
          // onClick={}
          className='w-fit rounded-full bg-blue-500 px-10 py-3 text-white'
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Empty;
