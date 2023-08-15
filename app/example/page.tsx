import Button from '@/components/reusable/Button';
import PickUpDropOff from '@/components/reusable/PickUpDropOff';

import React from 'react';

type Props = {};

const Page = (props: Props) => {
  return (
    <main className='ml-5 mt-5 w-[300px]'>
      <div className='flex h-[600px] flex-col gap-2'>
        main
        <Button title={'Login'} href='#' style={'btn-login w-[116px]'} />
        <Button title={'Logout'} href='#' style={'btn-logout'} />
        <Button title={'More Info'} href='#' style={'btn-primary w-fit'} />
        <Button
          title={'Show more cars'}
          href='#'
          style={'btn-show-more w-fit'}
        />
        <Button title={'Rent Now'} href='#' style={'btn-rent w-fit'} />
        <Button
          title={'Rent Now'}
          href='#'
          style={'btn-rent-secondary w-fit'}
        />
        <Button title={'Register Car'} href='#' style={'btn-register w-fit'} />
        <Button
          title={'Edit Profile'}
          href='#'
          style={'btn-edit-profile w-fit'}
        />
        <Button
          title={'Add More Cars for Rent'}
          href='#'
          style={'btn-add-cars w-fit'}
        />
        <Button title={'Remove Car'} href='#' style={'btn-remove w-fit'} />
        <Button title={'Edit Car'} href='#' style={'btn-edit w-fit'} />
        <Button title={''} href='#' style={'btn-search w-fit'} />
      </div>
    </main>
  );
};

export default Page;
