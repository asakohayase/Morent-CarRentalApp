import AdCard from '@/components/Homepage/AdCard';
import CarCard from '@/components/reusable/CarCard';
import PickUpDropOff from '@/components/reusable/PickUpDropOff';
import { carArray } from '@/data';

export default function Home() {
  return (
    <main className='padding-layout flex flex-col gap-8'>
      {/* Ads Section */}
      <section className='flex gap-8'>
        <AdCard
          bgImage='/img/widgets/lightcard.svg'
          carImage='/img/whitecar.png'
          title='The Best Platform for Car Rental'
          slogan='Ease of doing a car rental safely and reliably. Of course at a low
            price'
        />
        <AdCard
          bgImage='/img/widgets/darkcard.svg'
          carImage='/img/darkcar.png'
          title='Easy way to rent a car at a low price'
          slogan='Providing cheap car rental services and safe and comfortable facilities'
          className='hidden md:block'
        />
      </section>
      {/* Pick-Up & Drop-Off Section */}
      <section className='flex w-full flex-col items-center gap-3 rounded-xl bg-white lg:flex-row lg:justify-between lg:gap-0'>
        <PickUpDropOff />
      </section>
      {/* Popular Car Section */}
      <section className='sm: relative mt-3 flex flex-col gap-6'>
        <h5 className='text-lg font-medium text-gray-600'>Popular Cars</h5>
        {/* <div className='absolute right-0 top-14 z-10 h-5/6 w-1/4 bg-gradient-to-tr from-transparent to-black/30 sm:hidden'></div> */}
        <section className='scrollbar-hide relative flex justify-between overflow-x-auto  scroll-smooth'>
          {carArray.slice(0, 4).map((item, index) => (
            <CarCard key={index} data={item} />
          ))}
        </section>
      </section>
      {/* Recommended Car Section */}
      <section className='flex flex-col gap-6  pr-14'>
        <h5 className='text-lg font-medium text-gray-600'>Recommended Cars</h5>
        <section className='grid grid-cols-1 gap-x-12 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {carArray.slice(0, 8).map((item, index) => (
            <CarCard key={index} data={item} />
          ))}
        </section>
      </section>
    </main>
  );
}
