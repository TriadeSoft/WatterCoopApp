import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function handler() {
  try {
    const now = new Date().toISOString();

    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('active', true)
      .gt('expires_at', now)
      .order('created_at', { ascending: false })
      .limit(1);

    if (error) throw error;

    return {
      statusCode: 200,
      body: JSON.stringify(data[0] || null)
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
