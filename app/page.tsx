import AdCard from '@/components/Homepage/AdCard';

export default function Home() {
  return (
    <main className='flex flex-col gap-8'>
      {/* Ads Section */}
      <section className='flex gap-8 px-6'>
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
      <section className='flex w-full flex-col items-center gap-3 px-6 lg:flex-row lg:justify-between lg:gap-0'>
        <section className='flex h-[132px] w-full items-center justify-center rounded-xl bg-slate-700 lg:w-6/12'>
          <h1 className='text-xl font-bold text-white'>Pick-Up</h1>
        </section>
        <section className='hidden h-10 w-10 items-center justify-center rounded-xl bg-slate-700 p-8 lg:m-8 lg:flex'>
          <h1 className='font-bold text-white'>Search</h1>
        </section>
        <section className='flex h-[132px] w-full items-center justify-center rounded-xl bg-slate-700 lg:w-6/12'>
          <h1 className='text-xl font-bold text-white'>Drop-Off</h1>
        </section>
        <section className='flex h-12 w-full items-center justify-center rounded-xl bg-slate-700 lg:m-8 lg:hidden'>
          <h1 className='font-bold text-white'>Search</h1>
        </section>
      </section>
      {/* Popular Car Section */}
      <section className='relative mt-3 flex flex-col gap-6 pl-6 sm:px-6'>
        <h5 className='text-lg font-medium text-gray-600'>Popular Cars</h5>
        {/* <div className='absolute right-0 top-14 z-10 h-5/6 w-1/4 bg-gradient-to-tr from-transparent to-black/30 sm:hidden'></div> */}
        <section className='scrollbar-hide relative flex justify-between overflow-x-auto  scroll-smooth'>
          {[...Array(4)].map((item, index) => (
            <div key={index}>
              <article className='mr-6 flex h-[286px] w-[304px] items-center justify-center rounded-2xl border-2 border-black bg-slate-700 md:h-[388px] xl:mr-0'>
                <h4 className='text-3xl font-bold text-white'>Car Card</h4>
              </article>
            </div>
          ))}
        </section>
      </section>
      {/* Recommended Car Section */}
      <section className='flex flex-col gap-6 px-6 pr-14'>
        <h5 className='text-lg font-medium text-gray-600'>Recommended Cars</h5>
        <section className='grid grid-cols-1 gap-x-12 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {[...Array(8)].map((item, index) => (
            <div key={index}>
              <article className='flex h-[286px] w-[304px] items-center justify-center rounded-2xl border-2 border-black bg-slate-700 md:h-[388px]'>
                <h4 className='text-3xl font-bold text-white'>Car Card</h4>
              </article>
            </div>
          ))}
        </section>
      </section>
    </main>
  );
}
