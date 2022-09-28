import { supabase } from "$lib/supabaseClient";
import { variables } from "$lib/variables";
import { errorToast } from "$lib/toast";
import { goto } from "$app/navigation";

export async function signInWithGoogle() {
  try {
    const { user, session, error } = await supabase.auth.signInWithOAuth(
      {
        provider: "google",
        options: {
          redirectTo: variables.URL
        }
      }
    );
    if (error) throw error;
  } catch (error) {
    errorToast(error.error_description || error.message);
  } finally {
    goto("/")
  }
}