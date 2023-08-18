/* eslint-disable camelcase */
import React from 'react';
import NavBar from '@/components/reusable/NavBar';
import './globals.css';
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import Footer from '@/components/reusable/Footer';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/utils/database.types';
import { cookies } from 'next/headers';

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Morent',
  description: 'The Best Platform for Car Rental',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang='en'>
      <body className={`${plusJakartaSans.className} bg-white-200`}>
          <NavBar session={session} />
          {children}
        <Footer />

      </body>
    </html>
  );
}
