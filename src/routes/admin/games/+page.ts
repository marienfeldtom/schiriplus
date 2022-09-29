import moment from "moment";
import { withAuth } from "@supabase/auth-helpers-sveltekit";
import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = withAuth(
  async ({ session, getSupabaseClient }) => {
    if (!session.user) {
      throw redirect(303, "/");
    }
    let dateString1 = moment().toISOString();
    const { data: games } = await getSupabaseClient()
      .from("games")
      .select(
        `id, date, league_name, name, teams(*), referee1:referee_1_id (*), 
    referee2:referee_2_id ( * ), 
    judge1:judge_1_id ( * ),
    judge2:judge_2_id ( * ),
    team:team_id ( * )`
      )
      .order("date")
      .gt("date", dateString1);
    return { games, user: session.user };
  }
);
