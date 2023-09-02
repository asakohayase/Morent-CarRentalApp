import React from 'react';

const EditSkeleton = () => {
  return (
    <section className='flex flex-col gap-6'>
      <hgroup>
        <h1 className=' h1-semibold text-blue-300'>Design your Profile</h1>
        <h2 className='base-regular text-gray-400 '>
          Your profile is something anyone can see!
        </h2>
      </hgroup>
      {/* Form */}
      <section className='flex flex-col items-center justify-between gap-8 lg:flex-row'>
        <section className='w-full rounded-lg bg-white p-10 dark:bg-gray-850 lg:w-7/12'>
          <section className='flex flex-col gap-3'>
            <section className='flex flex-col gap-2'>
              <label htmlFor='fullName'>Full Name</label>
              <input
                className='h-10 w-full animate-pulse rounded-lg bg-white-200 p-4 text-sm tracking-wider outline-none placeholder:text-sm placeholder:text-gray-400/70 dark:bg-dark-900/75 dark:text-blue-50'
                type='text'
                maxLength={30}
                name='fullName'
                required
              />
            </section>
            <section className='flex flex-col gap-2'>
              <label htmlFor='headline'>Headline</label>
              <input
                className='h-10 w-full animate-pulse rounded-lg bg-white-200 p-4 text-sm tracking-wider outline-none placeholder:text-sm placeholder:text-gray-400/70 dark:bg-dark-900/75 dark:text-blue-50'
                type='text'
                maxLength={30}
                name='headline'
                required
              />
            </section>
            <section className='mt-2 w-full'>
              <button
                className='h-10 w-full rounded-lg bg-blue-500 font-semibold text-white transition ease-in-out hover:bg-blue-700 disabled:bg-blue-500/60 disabled:text-white/60'
                disabled={true}
              >
                Save Changes
              </button>
            </section>
          </section>
        </section>
        {/* Preview */}
        <section className='h-52 w-full animate-pulse rounded-10 bg-white dark:bg-dark-850 sm:h-64'>
          <section className='h-full'>
            {/* Banner */}
            <section className='relative h-32 w-full animate-pulse rounded-t-lg bg-dark-900'></section>
            {/* Avatar */}
            <section className='relative -top-6 left-8 h-20 w-20 animate-pulse rounded-full bg-dark-900 sm:h-32 sm:w-32'></section>
            {/* Name & Banner */}
            <section className='flex flex-col gap-1'>
              <section className='relative bottom-14 left-36 h-5 w-36 rounded-lg bg-white dark:bg-dark-900 sm:bottom-[5.5rem] sm:left-48 sm:h-6'></section>
              <section className='relative bottom-14 left-36 h-4 w-10 rounded-lg bg-white dark:bg-dark-900 sm:bottom-[5.5rem] sm:left-48'></section>
            </section>
          </section>
        </section>
      </section>
    </section>
  );
};

export default EditSkeleton;
