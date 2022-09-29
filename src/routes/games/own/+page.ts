import { withAuth } from "@supabase/auth-helpers-sveltekit";
import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = withAuth(
  async ({ session, getSupabaseClient }) => {
    if (!session.user) {
      throw redirect(303, "/");
    }
    const { data: games } = await getSupabaseClient()
      .from("games")
      .select(
        `*, teams(*), referee1:referee_1_id (*), 
    referee2:referee_2_id ( * ), 
    judge1:judge_1_id ( * ),
    judge2:judge_2_id ( * ),
    team:team_id ( * )`
      )
      .order("date")
      .or(
        "referee_1_id.eq." +
          session.user.id +
          ",referee_2_id.eq." +
          session.user.id +
          ",judge_1_id.eq." +
          session.user.id +
          ",judge_2_id.eq." +
          session.user.id
      );
    return { games, user: session.user };
  }
);
