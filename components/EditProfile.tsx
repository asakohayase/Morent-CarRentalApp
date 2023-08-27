import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import PreviewAndForm from './EditProfile/PreviewAndForm';
import { redirect } from 'next/navigation';
const EditProfile = async () => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) redirect('/');

  return <PreviewAndForm session={session} />;
};

export default EditProfile;
