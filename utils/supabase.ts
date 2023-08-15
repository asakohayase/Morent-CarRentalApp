import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const options = {
  auth: {
    persistSession: false,
  },
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, options);

export const supabaseClientComponent = createClientComponentClient();
