'use client';

import React from 'react';
import NavDesktop from './NavDesktop';
import NavMobile from './NavMobile';

const NavBar = () => {
  return (
    <section>
      <section className='hidden lg:block'>
        <NavDesktop />
      </section>
      <section className='block lg:hidden'>
        <NavMobile />
      </section>
    </section>
  );
};

export default NavBar;
