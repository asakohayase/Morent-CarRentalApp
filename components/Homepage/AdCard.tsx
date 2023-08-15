import React from 'react';
import Image from 'next/image';

type Props = {
  bgImage: string;
  carImage: string;
  title: string;
  slogan: string;
  className?: string;
};

const AdCard = ({
  bgImage,
  carImage,
  title,
  slogan,
  className = '',
}: Props) => {
  return (
    <div className={'h-72 w-full sm:h-96 lg:w-1/2 ' + className}>
      <div className='relative h-full w-full overflow-hidden rounded-xl p-6'>
        <Image
          src={bgImage}
          alt='Background Ad Image'
          fill
          priority
          className='object-cover'
          sizes='(max-width: 768px) 50vw'
        />
        <hgroup className='relative flex max-w-[284px] flex-col gap-3'>
          <h3 className='font-medium text-white sm:text-3xl'>
            {/* The Best Platform for Car Rental */}
            {title}
          </h3>
          <h4 className='text-white'>
            {/* Ease of doing a car rental safely and reliably. Of course at a low
            price */}
            {slogan}
          </h4>
        </hgroup>
        <figure className='relative top-28 h-16 sm:h-24'>
          <Image
            src={carImage}
            alt='Stock Car Image'
            fill
            priority
            className='object-contain'
            sizes='(max-width: 768px) 50vw'
          />
        </figure>
      </div>
    </div>
  );
};

export default AdCard;
