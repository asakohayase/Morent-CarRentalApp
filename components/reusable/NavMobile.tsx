'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import * as Avatar from '@radix-ui/react-avatar';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { User } from '@supabase/supabase-js';

import {
  createClientComponentClient,
  type Session,
} from '@supabase/auth-helpers-nextjs';

import Button from './Button';
import { useRouter } from 'next/navigation';

const NavMobile = ({ session }: { session: Session | null }) => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((isOpen) => !isOpen);
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [user, setUser] = useState<User | null | undefined>(session?.user);
  const avatarUrl = user?.user_metadata.avatar_url;
  
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, [supabase]);

  const handleOAuth = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `http://${location.origin}/auth/callback`,
      },
    });
    router.refresh();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.refresh();
  };

  return (
    <motion.div className='sticky top-0 z-10'>
      <nav className='padding-layout  mb-7 flex h-[92px] justify-between bg-white'>
        <Image src={'./img/logo.svg'} height={28} width={108} alt={'logo'} />
        <section className='flex'>
          <div className='flex w-[110px] items-center justify-end gap-4'>
            <Image src={'./Icons/sun.svg'} width={20} height={20} alt={'sun'} />
            {avatarUrl && (
              <Avatar.Root>
                <Avatar.Image
                  className='h-7 rounded-full'
                  src={avatarUrl ?? '/img/placeholder-avatar.jpg'}
                />
                <Avatar.Fallback
                  className='h-7 rounded-full bg-slate-800'
                  delayMs={600}
                />
              </Avatar.Root>
            )}
            <Image
              src={'./Icons/menu.svg'}
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
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.3 }}
          >
            <section className='flex w-full items-center justify-between'>
              <Image
                src={'./img/logo.svg'}
                height={24}
                width={87}
                alt={'logo'}
              />
              <Image
                src={'./Icons/close.svg'}
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
                      src={'./Icons/Home.svg'}
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
                      src={'./Icons/Search.svg'}
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
                      src={'./Icons/plus.svg'}
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
            {avatarUrl ? (
              <>
                <button className='flex h-14 w-full items-center justify-center gap-2 rounded-md border border-blue-50 bg-white active:bg-white-200'>
                  <Avatar.Root>
                    <Avatar.Image
                      className='h-6 rounded-full'
                      src={avatarUrl ?? '/img/placeholder-avatar.jpg'}
                    />
                    <Avatar.Fallback
                      className='h-6 rounded-full bg-slate-800'
                      delayMs={600}
                    />
                  </Avatar.Root>
                  <span className='font-semibold text-blue-500'>
                    My Profile
                  </span>
                </button>
                <Button
                  title={'Logout'}
                  href='#'
                  style={
                    'flex h-14 w-full items-center justify-center gap-2 rounded-md bg-red-400 active:bg-red-700 text-white font-semibold'
                  }
                  handleClick={handleLogout}
                />
              </>
            ) : (
              <Button
                title={'Login'}
                href='#'
                style={'btn-login w-full hover:bg-blue-600 hover:text-white'}
                handleClick={handleOAuth}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default NavMobile;
