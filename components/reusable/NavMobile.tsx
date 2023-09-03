'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import * as Avatar from '@radix-ui/react-avatar';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { User } from '@supabase/supabase-js';
import Plus from '@/public/Icons/plus.svg';
import Home from '@/public/Icons/Home.svg';
import Search from '@/public/Icons/Search.svg';

import {
  createClientComponentClient,
  type Session,
} from '@supabase/auth-helpers-nextjs';

import Button from './Button';
import { useRouter } from 'next/navigation';
import ToggleTheme from './ToggleTheme';

const NavMobile = ({ session }: { session: Session | null }) => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((isOpen) => !isOpen);
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [user, setUser] = useState<User | null | undefined>(session?.user);
  const [avatarUrl, setAvatarUrl] = useState<string | null | undefined>(
    session?.user?.user_metadata?.avatar_url,
  );

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, [supabase]);

  useEffect(() => {
    if (avatarUrl) return;
    const getAvatar = async () => {
      const { data } = await supabase
        .from('profiles')
        .select(`avatar_url`)
        .eq(`id`, user?.id)
        .single();
      setAvatarUrl(data?.avatar_url);
    };
    getAvatar();
  }, [user, supabase, avatarUrl]);

  const handleOAuth = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    router.refresh();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setUser(null);
    router.refresh();
  };

  return (
    <motion.div className='sticky top-0 z-50 '>
      <nav className='padding-layout  flex h-[92px] justify-between bg-white dark:bg-gray-900'>
        <Image src={'/img/logo.svg'} height={28} width={108} alt={'logo'} />
        <section className='flex'>
          <div className='flex w-[110px] items-center justify-end gap-4'>
            <ToggleTheme />
            {(session || user) && (
              <Avatar.Root>
                <Avatar.Image className='rounded-full h-7' src={avatarUrl!} />
                <Avatar.Fallback className='rounded-full h-7 bg-slate-800' />
              </Avatar.Root>
            )}
            <Image
              src={'./Icons/menu.svg'}
              width={24}
              height={24}
              alt={'menu'}
              onClick={toggle}
              className={'cursor-pointer'}
            />
          </div>
        </section>
      </nav>
      <AnimatePresence mode='sync'>
        {open && (
          <motion.div
            className='absolute left-[15px] top-7 z-50 flex h-[500px] w-[93%] flex-col justify-around rounded-[10px] bg-slate-50 px-6 dark:bg-slate-800 sm:left-[17px] sm:w-[96%]'
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.3 }}
          >
            <section className='z-40 flex items-center justify-between w-full pt-5 '>
              <Link href='/' className='cursor-pointer'>
                <Image
                  src={'./img/logo.svg'}
                  height={24}
                  width={87}
                  alt={'logo'}
                />
              </Link>
              <Image
                src={'/Icons/close.svg'}
                width={24}
                height={24}
                alt={'close'}
                onClick={toggle}
                className={'cursor-pointer'}
              />
            </section>
            <section className='h-1/2 '>
              <ul className='flex flex-col gap-5 '>
                <div className='flex flex-col gap-5'>
                  <Link href='/' onClick={()=> setOpen(prev => !prev)} className='group'>
                    <li className='flex h-[50px] items-center rounded pl-3 text-sm font-  text-slate-600 hover:bg-blue-600 group-hover:text-white'>
                      <Home
                        width={18}
                        height={18}
                        alt={'home'}
                        className='fill-[#3D5278] group-hover:fill-white focus:fill-white dark:fill-white'
                      />
                      <h3 className='pl-2 group-hover:text-white dark:text-white'>
                        Home
                      </h3>
                    </li>
                  </Link>

                  <Link href='search' onClick={()=> setOpen(prev => !prev)} className='group'>
                    <li className='flex h-[50px] items-center rounded pl-3 text-sm font-medium text-slate-600 hover:bg-blue-600 group-hover:text-white'>
                      <Search
                        width={18}
                        height={18}
                        alt={'home'}
                        className='fill-[#3D5278] group-hover:fill-white dark:fill-white'
                      />
                      <h3 className='pl-2 group-hover:text-white dark:text-white'>
                        Search
                      </h3>
                    </li>
                  </Link>
                  {session && (<Link href='addcar' onClick={()=> {
                    setOpen(prev => !prev)
                  }} className='group'>
                    <li className='flex h-[50px] items-center rounded pl-3 text-sm font-medium text-slate-600 hover:bg-blue-600 group-hover:text-white'>
                      <Plus
                        width={18}
                        height={18}
                        alt={'plus'}
                        className='fill-[#3D5278] group-hover:fill-white dark:fill-white'
                      />
                      <h3 className='pl-2 group-hover:text-white dark:text-white'>
                        Add Car
                      </h3>
                    </li>
                  </Link>)}
                </div>
              </ul>
            </section>
            {session || user ? (
              <Link
                href={`/profile/${user?.id || ''}`}
                className='flex flex-col gap-4'
              >
                <button className='flex items-center justify-center w-full gap-2 bg-white border rounded-md h-14 border-blue-50 active:bg-white-200 dark:border-none dark:bg-gray-700'>
                  <Avatar.Root>
                    <Avatar.Image
                      className='h-6 rounded-full'
                      src={avatarUrl || '/img/placeholder-avatar.jpg'}
                    />
                    <Avatar.Fallback className='h-6 rounded-full bg-slate-800' />
                  </Avatar.Root>
                  <span className='font-semibold text-blue-300'>
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
              </Link>
            ) : (
              <Button
                title={'Login'}
                href='#'
                style={
                  'btn-login w-full hover:bg-blue-600 hover:text-white dark:bg-slate-600 dark:border-0'
                }
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
