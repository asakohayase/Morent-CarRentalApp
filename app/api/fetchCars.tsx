import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

async function fetchCars() {
  const supabase = createClientComponentClient();
  try {
    const { data, error } = await supabase.from('cars').select('*');
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Error fetching car data from database:', error);
    return [];
  }
}

export default fetchCars;
