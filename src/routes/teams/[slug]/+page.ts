import { withAuth } from "@supabase/auth-helpers-sveltekit";
import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = withAuth(
  async ({ session, getSupabaseClient, params }) => {
    if (!session.user) {
      throw redirect(303, "/");
    }
    const { data: team } = await getSupabaseClient()
      .from("teams")
      .select(
        `*, games(*, referee1:referee_1_id (*), 
    referee2:referee_2_id ( * ), 
    judge1:judge_1_id ( * ),
    judge2:judge_2_id ( * ),
    team:team_id ( * ))`
      )
      .eq("id", params.slug)
      .order("date", { foreignTable: "games" })
      .single();
    return { team, user: session.user };
  }
);
