import { Database } from '@/utils/database.types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import React, { Suspense } from 'react';
import { cookies } from 'next/headers';
import PreviewAndForm from '@/components/EditProfile/PreviewAndForm';
import EditSkeleton from '@/components/EditSkeleton';

type Props = {};

const Page = async (props: Props) => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return (
    <main className='padding-layout py-12 lg:pb-60'>
      <Suspense fallback={<EditSkeleton />}>
        <PreviewAndForm session={session} />
      </Suspense>
    </main>
  );
};

export default Page;
