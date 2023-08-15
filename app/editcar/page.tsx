import { EditCarForm } from '@/components/EditCar/EditCarForm'
import React from 'react'
import Image from '@/node_modules/next/image';


const page = () => {
  return (
    <div className="padding-layout relative flex flex-col px-6 py-10 md:py-[30px]">
        <div className="flex flex-col md:flex-row-reverse md:justify-between">
            <div className="mb-5 flex h-[89px] w-[327px] items-center justify-center rounded bg-neutral-100 md:mb-0 md:mr-[38px] md:h-[49px] md:w-[122px]">
                <Image 
                    src="/img/car.png" 
                    alt="Car Image"
                    width={103}
                    height={46}
                    />
            </div>
            <div className="inline-flex flex-col items-start justify-start gap-2.5">
                <div className="text-xl font-bold text-gray-900">Edit Car Details</div>
                <div className="text-sm font-medium text-gray-400">Please enter your car info</div>
            </div>
        </div>
        <div className="inline-flex flex-col items-start justify-start gap-6 pt-[34px]">
            <div className="text-lg font-extrabold text-blue-500">CAR INFO</div>
            <EditCarForm />
        </div>
   </div>
  )
}

export default page