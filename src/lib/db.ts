import { createClient } from "@supabase/supabase-js";
import { setupSupabaseHelpers } from "@supabase/auth-helpers-sveltekit";
import { dev } from "$app/environment";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  persistSession: false,
  autoRefreshToken: false,
});

setupSupabaseHelpers({
  supabaseClient,
  cookieOptions: {
    secure: !dev,
  },
});
