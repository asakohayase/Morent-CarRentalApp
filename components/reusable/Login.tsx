'use client';

import React, { useEffect, useState } from 'react';
import * as Form from '@radix-ui/react-form';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Button from './Button';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Provider } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

const variants = {
  open: { scale: 1 },
  close: { scale: 0 },
};

const show = {
  opacity: 1,
  display: 'block',
};

const hide = {
  opacity: 0,
  transitionEnd: {
    display: 'none',
  },
};

const Login = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [register, setRegister] = useState(false);
  const [open, setOpen] = useState(false);
  const [serverErrors, setServerErrors] = useState({
    email: false,
    password: false,
  });

  const toggle = () => {
    setOpen((isOpen) => !isOpen);
    setServerErrors({ email: false, password: false });
  };

  const handleOAuth = async (provider: Provider) => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: register
          ? `${location.origin}/auth/editprofile`
          : `${location.origin}`,
      },
    });
  };

  useEffect(() => {
    supabase.auth.onAuthStateChange(() => {
      router.refresh();
    });
  }, [supabase, router, register]);

  const loginOrRegister = () => {
    setRegister((state) => !state);
  };

  return (
    <>
      <Button
        title={'Login'}
        href='#'
        style={'btn-login w-[116px] hover:opacity-80 hidden lg:block'}
        handleClick={toggle}
      />
      <Button
        title={'Login'}
        href='#'
        style={
          'btn-login w-full lg:hidden hover:bg-blue-600 hover:text-white dark:border-0'
        }
        handleClick={toggle}
      />
      <motion.div
        id='loginForm'
        className={`fixed left-0 top-0 z-50 h-screen w-full bg-gray-900/60`}
        animate={open ? show : hide}
        initial={{ display: 'none' }}
      >
        <motion.div
          className='relative top-52 mx-auto rounded-lg bg-white p-12 dark:bg-gray-850 sm:w-[520px]'
          variants={variants}
          animate={open ? 'open' : 'close'}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
        >
          {/* Close Button */}
          <button
            className='absolute right-5 top-5 font-extrabold text-blue-500 transition ease-in-out hover:text-blue-400'
            onClick={toggle}
          >
            ╳
          </button>
          <section className='flex flex-col gap-4'>
            <hgroup>
              <h2 className='text-lg font-extrabold text-blue-300'>
                {register ? 'Sign Up' : 'Welcome Back'}
              </h2>
              <h3 className='text-gray-400'>
                {register
                  ? 'Sign up to start renting!'
                  : 'Sign in to your account'}
              </h3>
            </hgroup>
            {/* Provider Buttons */}
            <section className='flex flex-col gap-6'>
              <button
                className='flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-white-200 font-semibold text-black transition ease-in-out hover:bg-gray-300 dark:hover:bg-white-200/80'
                onClick={() => handleOAuth('google')}
              >
                <Image
                  src='/img/companies/google.svg'
                  width={21}
                  height={21}
                  alt='google logo'
                />
                Continue with Google
              </button>
              <button
                className='flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#1F66F5] font-semibold text-white transition ease-in-out hover:bg-blue-700 dark:hover:bg-[#1F66F5]/80'
                onClick={() => handleOAuth('facebook')}
              >
                <Image
                  src='/img/companies/facebook.svg'
                  width={11}
                  height={11}
                  alt='facebook logo'
                />
                Continue with Facebook
              </button>
              <button
                className='flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-black font-semibold text-white transition ease-in-out hover:bg-black/70 dark:hover:bg-black/50'
                onClick={() => handleOAuth('discord')}
              >
                <Image
                  src='/img/companies/discord.png'
                  width={25}
                  height={25}
                  alt='discord logo'
                />
                Continue with Discord
              </button>
            </section>
            {/* separator */}
            <section className='mb-6 mt-3 inline-flex h-3.5 w-full items-center justify-center gap-[21px]'>
              <div className='h-px w-full bg-gray-400' />
              <h3 className='h-3.5 w-3 text-xs font-normal text-gray-400'>
                or
              </h3>
              <div className='h-px w-full bg-gray-400' />
            </section>
          </section>
          <Form.Root
            className='flex flex-col gap-4'
            onSubmit={async (event) => {
              event.preventDefault();

              const formData = Object.fromEntries(
                new FormData(event.currentTarget),
              );

              if (!register) {
                const { error } = await supabase.auth.signInWithPassword({
                  email: formData.email as string,
                  password: formData.password as string,
                });

                if (error) {
                  setServerErrors({ email: true, password: true });
                }
              }
              if (register) {
                const { error } = await supabase.auth.signUp({
                  email: formData.email as string,
                  password: formData.password as string,
                });

                if (error) {
                  setServerErrors({ email: true, password: true });
                }
              }
            }}
            onClearServerErrors={() =>
              setServerErrors({ email: false, password: false })
            }
            onChange={() => setServerErrors({ email: false, password: false })}
          >
            {/* Email Login */}
            <section className='flex flex-col gap-6'>
              <section className='flex flex-col gap-3'>
                <Form.Field
                  className='flex flex-col gap-1'
                  name='email'
                  serverInvalid={serverErrors.email}
                >
                  <Form.Label className='font-semibold'>Email</Form.Label>
                  <Form.Message
                    className='font-semibold text-red-400'
                    match='valueMissing'
                  >
                    Please enter your email
                  </Form.Message>
                  <Form.Message
                    className='font-semibold text-red-400'
                    match='typeMismatch'
                  >
                    Please provide a valid email
                  </Form.Message>
                  <Form.Message
                    className='font-semibold text-red-400'
                    match='patternMismatch'
                    forceMatch={serverErrors.email}
                  >
                    Your email or password is incorrect.
                  </Form.Message>
                  <Form.Control asChild>
                    <input
                      className='h-10 rounded-lg bg-white-200 p-4 text-sm tracking-wider outline-none placeholder:text-sm placeholder:text-gray-400/70 dark:bg-dark-900/75 dark:text-blue-50'
                      placeholder='you@exmaple.com'
                      type='email'
                      required
                    />
                  </Form.Control>
                </Form.Field>
                <Form.Field className='flex flex-col gap-1' name='password'>
                  <Form.Label className='font-semibold'>Password</Form.Label>
                  <Form.Message
                    className='font-semibold text-red-400'
                    match='valueMissing'
                  >
                    Please enter your Password
                  </Form.Message>
                  <Form.Message
                    className='font-semibold text-red-400'
                    match='typeMismatch'
                  >
                    Please provide a valid password.
                  </Form.Message>
                  <Form.Control asChild>
                    <input
                      className='h-10 rounded-lg bg-white-200 p-4 text-sm tracking-wider outline-none placeholder:text-sm placeholder:text-gray-400/70 dark:bg-dark-900/75 dark:text-blue-50'
                      placeholder='●●●●●●●●●●'
                      type='password'
                      required
                    />
                  </Form.Control>
                </Form.Field>
              </section>
              <Form.Submit asChild>
                <button className='h-10 rounded-lg bg-blue-500 font-semibold text-white transition ease-in-out hover:bg-blue-700'>
                  {register ? 'Sign Up' : 'Sign In'}
                </button>
              </Form.Submit>
            </section>
          </Form.Root>
          <h3 className='mt-6 flex justify-center gap-1 text-gray-400'>
            {register ? 'Already have an account?' : "Don't have an account?"}
            <a
              className='cursor-pointer font-semibold text-blue-500 hover:text-blue-400'
              onClick={loginOrRegister}
            >
              {register ? 'Login' : 'Register'}
            </a>
          </h3>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Login;
