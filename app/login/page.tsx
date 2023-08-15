'use client';

import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase';
// import { Auth } from '@supabase/auth-ui-react';
// import { ThemeSupa } from '@supabase/auth-ui-shared';
import React from 'react';

type Props = {};

const Page = (props: Props) => {
  const router = useRouter();
  //   const { data, error } = await supabase.auth.signInWithOAuth({
  //     provider: 'google',
  //   });

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    router.refresh();
  };

  return (
    <main>
      {/* <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={['google']}
        onlyThirdPartyProviders
      /> */}
      <button onClick={handleSignIn}>Sign In</button>
    </main>
  );
};

export default Page;
