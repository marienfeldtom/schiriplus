import { withAuth } from "@supabase/auth-helpers-sveltekit";
import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = withAuth(
  async ({ session, getSupabaseClient }) => {
    if (!session.user) {
      throw redirect(303, "/");
    }
    const { data: refusals } = await getSupabaseClient()
      .from("refusals")
      .select(
        `id, reason, participation, created_at, game:game_id (*), 
    user:user_id ( * )`
      ).order("created_at").limit(10);
    return { refusals, user: session.user };
  }
);
