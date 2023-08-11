import AdCard from '@/components/Homepage/AdCard';

export default function Home() {
  return (
    <main className='flex flex-col gap-8'>
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
      <section className='flex w-full flex-col items-center gap-3 lg:flex-row lg:justify-between lg:gap-0'>
        <section className='flex h-[132px] w-full items-center justify-center rounded-xl bg-slate-700 lg:w-6/12'>
          <h1 className='text-xl font-bold text-white'>Pick-Up</h1>
        </section>
        <section className='hidden h-10 w-10 items-center justify-center rounded-xl bg-slate-700 p-8 lg:m-8 lg:flex'>
          <h1 className='font-bold text-white'>Search</h1>
        </section>
        <section className='flex h-[132px] w-full items-center justify-center rounded-xl bg-slate-700 lg:w-6/12'>
          <h1 className='text-xl font-bold text-white'>Drop-Off</h1>
        </section>
        <section className='flex h-12 w-2/3 items-center justify-center rounded-xl bg-slate-700 lg:m-8 lg:hidden'>
          <h1 className='font-bold text-white'>Search</h1>
        </section>
      </section>
      {/* Popular Car Section */}
      <section className='mt-3 flex flex-col gap-6'>
        <h5 className='text-lg font-medium text-gray-600'>Popular Cars</h5>
        <section className='scrollbar-hide flex justify-between gap-6 overflow-x-auto scroll-smooth'>
          {[...Array(4)].map((item, index) => (
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
