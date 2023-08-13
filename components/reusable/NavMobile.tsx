import React, { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import Button from './Button';

const NavMobile = () => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((isOpen) => !isOpen);

  return (
    <motion.div className='sticky top-0 z-10'>
      <nav className='padding-layout  mb-7 flex h-[92px] justify-between bg-white'>
        <Image src={'./img/logo.svg'} height={28} width={108} alt={'logo'} />
        <section className='flex'>
          <div className='flex w-[110px] justify-between'>
            <Image src={'./icons/sun.svg'} width={20} height={20} alt={'sun'} />
            <Image
              src={'./img/profileplaceholder.svg'}
              width={28}
              height={28}
              alt={'sun'}
            />
            <Image
              src={'./icons/menu.svg'}
              width={24}
              height={24}
              alt={'menu'}
              onClick={toggle}
            />
          </div>
        </section>
      </nav>
      <AnimatePresence mode='sync'>
        {open && (
          <motion.div
            className='absolute left-[15px] top-7 flex h-[400px] w-[93%] flex-col justify-around rounded-[10px] bg-slate-50 px-6 sm:left-[17px] sm:w-[96%]'
            initial='hide'
            animate='show'
            exit='hide'
          >
            <section className='flex w-full items-center justify-between'>
              <Image
                src={'./img/logo.svg'}
                height={24}
                width={87}
                alt={'logo'}
              />
              <Image
                src={'./icons/close.svg'}
                width={24}
                height={24}
                alt={'close'}
                onClick={toggle}
              />
            </section>
            <section className=' h-1/2 '>
              <ul className=' flex h-full flex-col justify-between'>
                <div className='flex h-full flex-col justify-around'>
                  <li className='flex h-[50px] items-center rounded pl-3 text-sm font-medium text-slate-600 hover:bg-blue-600 hover:text-white'>
                    <Image
                      src={'./icons/home.svg'}
                      width={18}
                      height={18}
                      alt={'home'}
                      className={' fill-white'}
                    />
                    <Link href='/' className='pl-2 hover:text-white'>
                      Home
                    </Link>
                  </li>
                  <li className='flex h-[50px] items-center rounded   pl-3 text-sm font-medium text-slate-600 hover:bg-blue-600 hover:text-white'>
                    <Image
                      src={'./icons/search.svg'}
                      width={18}
                      height={18}
                      alt={'home'}
                    />
                    <Link href='/search' className='pl-2 hover:text-white'>
                      Search
                    </Link>
                  </li>
                  <li className='flex h-[50px] items-center rounded pl-3 text-sm font-medium text-slate-600 hover:bg-blue-600 hover:text-white'>
                    <Image
                      src={'./icons/plus.svg'}
                      width={18}
                      height={18}
                      alt={'home'}
                    />
                    <Link href='/addcar' className='pl-2 hover:text-white'>
                      Add Car
                    </Link>
                  </li>
                </div>
              </ul>
            </section>
            <Button
              title={'Login'}
              href='#'
              style={'btn-login w-full hover:bg-blue-600 hover:text-white'}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default NavMobile;
