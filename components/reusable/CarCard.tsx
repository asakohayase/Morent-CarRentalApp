import React from 'react';
import Image from 'next/image';

interface Props {
  data: {
    title: string;
    vehicleType: string;
    gallons: string;
    image: string;
    transmission: string;
    capacity: string;
    price: string;
  };
}

const CarCard = ({
  data: { title, vehicleType, gallons, image, transmission, capacity, price },
}: Props) => {
  return (
    <div className="flex h-[240px] w-[327px] flex-col justify-between rounded-[10px] bg-white p-6 md:h-[388px] md:w-[304px]">
      <div className="flex items-center justify-between">
        <div className="flex-col">
          <h1 className="text-base font-semibold text-gray-900 md:text-xl md:font-bold">
            {title}
          </h1>
          <p className="text-xs font-medium text-slate-400 md:text-sm md:font-bold">
            {vehicleType}
          </p>
        </div>
        <Image
          src="/img/heart.svg"
          alt="heart"
          height={16}
          width={16}
          className="mb-5 md:h-6 md:w-6"
        />
      </div>
      <div className="flex items-center justify-between  md:h-52 md:flex-col md:items-start">
        <Image
          src={image}
          alt={title}
          width={160}
          height={64}
          className="md:mt-8 md:h-[100px] md:w-[248px]"
        />
        <div className="absolute  top-[125px] z-10 h-[44px] w-[190px] bg-gradient-to-b from-white to-white opacity-20 md:top-[170px]  md:h-[68px] md:w-[250px]" />
        <div className="flex  flex-col">
          <div className="flex flex-col items-start justify-between  text-sm font-medium text-slate-400 md:w-[250px] md:flex-row">
            <div className="flex gap-2">
              <Image
                src="/img/gas-station.svg"
                alt="gas"
                width={16}
                height={16}
              />
              <p>{gallons}</p>
            </div>
            <div className="flex gap-2">
              <Image
                src="/img/transmission.svg"
                alt="gas"
                width={16}
                height={16}
              />
              <p className="text-xs md:text-sm">{transmission}</p>
            </div>
            <div className="flex gap-2">
              <Image src="/img/capacity.svg" alt="gas" width={16} height={16} />
              <p>{capacity}</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p>
          <span className="text-base font-bold text-gray-900 md:text-xl">
            {price}
          </span>
          <span className="text-xs font-bold text-slate-400 md:text-sm">
            day
          </span>
        </p>
      </div>
    </div>
  );
};

export default CarCard;
