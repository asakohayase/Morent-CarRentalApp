import { Database } from '@/utils/database.types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Children, cloneElement, ReactNode } from 'react';

const SessionProvider = async ({ children }: { children: ReactNode }) => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const renderChildren = () => {
    return Children.map(children, (child) => {
      return cloneElement(child, { session });
    });
  };

  return renderChildren();
};

export default SessionProvider;
