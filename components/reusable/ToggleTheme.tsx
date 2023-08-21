'use client';

import React, { useState } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { motion } from 'framer-motion';
const lightVariant = {
  open: {
    opacity: 0,
    scale: 0,
    rotate: -360,
  },
  closed: {
    opacity: 1,
    scale: 1,
    rotate: 0,
  },
};

const darkVariant = {
  open: {
    opacity: 1,
    scale: 1,
    rotate: 0,
  },
  closed: {
    opacity: 0,
    scale: 0,
    rotate: 360,
  },
};

const ToggleTheme = () => {
  const { theme, setTheme } = useTheme();
  const oppositeTheme = theme === 'dark' ? 'light' : 'dark';
  const [toggle, setToggle] = useState(theme === 'dark');

  const handleToggle = () => {
    setToggle(!toggle);
    setTheme(oppositeTheme);
  };

  return (
    <>
      <motion.div
        variants={lightVariant}
        animate={toggle ? 'open' : 'closed'}
        className='dark:hidden'
      >
        <Image
          src={'/Icons/sun.svg'}
          height={20}
          width={20}
          alt={'line'}
          className='cursor-pointer dark:hidden'
          onClick={handleToggle}
        />
      </motion.div>
      <motion.div
        className='hidden dark:block'
        variants={darkVariant}
        animate={toggle ? 'open' : 'closed'}
      >
        <Image
          src={'/Icons/moon.svg'}
          height={20}
          width={20}
          alt={'line'}
          className='hidden cursor-pointer dark:block'
          onClick={handleToggle}
        />
      </motion.div>
    </>
  );
};

export default ToggleTheme;
