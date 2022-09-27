import { supabase } from "$lib/supabaseClient";
import { variables } from "$lib/variables";
import { errorToast } from "$lib/toast";
import { goto } from "$app/navigation";
import { user, profile } from "$lib/sessionStore";

user.set(supabase.auth.user());

export const handleLogin = async (email, password) => {
  try {
    //loading = true
    const { error } = await supabase.auth.signIn(
      { email, password },
      { redirectTo: variables.URL }
    );
    if (error) throw error;
  } catch (error) {
    errorToast(error.error_description || error.message);
  } finally {
    getProfile();
    //loading = false
  }
};

export async function signInWithGoogle() {
  try {
    //loading = true
    const { user, session, error } = await supabase.auth.signIn(
      {
        provider: "google",
      },
      { redirectTo: variables.URL }
    );
    if (error) throw error;
  } catch (error) {
    errorToast(error.error_description || error.message);
  } finally {
    goto("/")
  }
}

export async function signOut() {
  try {
    //loading = true
    let { error } = await supabase.auth.signOut();
    user.set(null);
    profile.set({
      avatar_url:
        "https://p.kindpng.com/picc/s/685-6851196_person-icon-grey-hd-png-download.png",
    });
    if (error) throw error;
  } catch (error) {
    errorToast(error.message);
  } finally {
    goto("/")
  }
}

export async function getProfile() {
  if (supabase.auth.user()) {
    try {
      //loading = true

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url, teams(name)`)
        .eq("id", supabase.auth.user().id)
        .single();

      if (error && status !== 406) throw error;

      if (data) {
        profile.set(data);
        console.log(data.avatar_url);
      }
    } catch (error) {
      errorToast(error.message);
    } finally {
      //loading = false
    }
  } else {
    profile.set({
      avatar_url:
        "https://p.kindpng.com/picc/s/685-6851196_person-icon-grey-hd-png-download.png",
    });
  }
}