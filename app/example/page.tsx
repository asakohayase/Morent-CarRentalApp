import Button from '@/components/reusable/Button';
import Login from '@/components/reusable/Login';
import PickUpDropOff from '@/components/reusable/PickUpDropOff';

import React from 'react';

type Props = {};

const Page = (props: Props) => {
  return (
    <main className='padding-layout h-[1000px]'>
      <Login />
    </main>
  );
};

export default Page;
