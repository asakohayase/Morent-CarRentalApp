import React from 'react';

type Props = {};

const Loader = (props: Props) => {
  return (
    <div className='absolute bottom-1/2 right-1/2 hidden h-14 w-14 -translate-x-1/2 -translate-y-1/2 animate-pulse overflow-hidden rounded-full border-[6px] border-blue-500 lg:block'></div>
  );
};

export default Loader;
