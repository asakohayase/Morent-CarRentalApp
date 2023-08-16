'use client';

import React from 'react';

import type { Session } from '@supabase/auth-helpers-nextjs';

import NavDesktop from './NavDesktop';
import NavMobile from './NavMobile';

const NavBar = ({ session }: { session: Session | null }) => {
  return (
    <section>
      <section className='hidden lg:block'>
        <NavDesktop session={session} />
      </section>
      <section className='block lg:hidden'>
        <NavMobile session={session} />
      </section>
    </section>
  );
};

export default NavBar;
