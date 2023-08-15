'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import Button from '@/components/reusable/Button';
import { supabaseClientComponent } from '@/utils/supabase';
import { Session, User } from '@supabase/supabase-js';
import * as Avatar from '@radix-ui/react-avatar';

const NavDesktop = ({ session }: { session: Session | null }) => {
  const supabase = supabaseClientComponent;
  const [loading, setLoading] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const getUser = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user);
  }, [supabase]);

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`avatar_url`)
        .eq('id', user?.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      //   alert('Error loading user data!' + user);
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  const handleOAuth = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `http://${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <nav className=' sticky top-0 z-10 mb-8 flex h-[100px] w-full items-center border-b border-b-slate-300/40 bg-white'>
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
          {avatarUrl ? (
            <Avatar.Root>
              <Avatar.Image
                className='h-10 rounded-full'
                src={avatarUrl ?? '/img/placeholder-avatar.jpg'}
              />
              <Avatar.Fallback
                className='h-10 rounded-full bg-slate-800'
                delayMs={600}
              />
            </Avatar.Root>
          ) : (
            <Button
              title={'Login'}
              href='#'
              style={'btn-login w-[116px] hover:opacity-80'}
              handleClick={handleOAuth}
            />
          )}
          <Image src={'/Icons/line.svg'} height={36} width={2} alt={'line'} />
          <Image src={'/Icons/sun.svg'} height={20} width={20} alt={'line'} />
        </div>
      </ul>
    </nav>
  );
};

export default NavDesktop;
