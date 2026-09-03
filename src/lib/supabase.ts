let _supabase: ReturnType<typeof import('@supabase/supabase-js').createClient> | null = null;

export function isSupabaseConfigured(): boolean {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

export function get supabase() {
  if (!_supabase && isSupabaseConfigured()) {
    try {
      const { createClient } = require('@supabase/supabase-js');
      _supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
    } catch { return null; }
  }
  return _supabase;
}