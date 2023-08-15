import Button from '@/components/reusable/Button';
import PickUpDropOff from '@/components/reusable/PickUpDropOff';

import React from 'react';

type Props = {};

const Page = (props: Props) => {
  return (
    <main className='ml-5 mt-5 w-[300px]'>
      <div className='flex h-[600px] flex-col gap-2'>
        <Button title={''} href='#' style={'btn-search w-fit'} />
      </div>
    </main>
  );
};

export default Page;
