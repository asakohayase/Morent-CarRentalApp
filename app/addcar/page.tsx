import { AddCarForm } from '@/components/AddCar/AddCarForm'
import React from 'react'

const page = () => {
  return (
    <div className="padding-layout relative flex flex-col px-6 py-10 md:py-[30px]">
        <div className="inline-flex flex-col items-start justify-start gap-2.5">
            <div className="text-xl font-bold text-gray-900">Add a Car for Rent</div>
            <div className="text-sm font-medium text-gray-400">Please enter your car info</div>
        </div>
        <div className="inline-flex flex-col items-start justify-start gap-6 pt-[34px]">
            <div className="text-lg font-extrabold text-blue-500">CAR INFO</div>
            <AddCarForm />
        </div>
   </div>
  )
}

export default page