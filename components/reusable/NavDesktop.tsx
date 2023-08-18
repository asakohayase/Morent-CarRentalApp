import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from './Button';

type Props = {};

const NavDesktop = (props: Props) => {
  return (
    <nav className='sticky top-0 z-40 flex h-[100px] w-full items-center border-b border-b-slate-300/40 bg-white'>
      <ul className='padding-layout flex w-full flex-row items-center justify-between '>
        <Link href='/'>
          <Image src={'/img/logo.svg'} width={148} height={44} alt={'logo'} />
        </Link>
        <div className='flex items-center justify-between gap-x-9 text-base font-medium text-slate-600'>
          <li className='hover:text-blue-500'>
            <Link href='/'>Home</Link>
          </li>
          <li className='hover:text-blue-500'>
            <Link href='/search'>Search</Link>
          </li>
          <li className='hover:text-blue-500'>
            <Link href='/addcar'>Add Car</Link>
          </li>
          <Button
            title={'Login'}
            href='#'
            style={'btn-login w-[116px] hover:opacity-80'}
          />
          <Image src={'/Icons/line.svg'} height={36} width={2} alt={'line'} />
          <Image src={'/Icons/sun.svg'} height={20} width={20} alt={'line'} />
        </div>
      </ul>
    </nav>
  );
};

export default NavDesktop;
