import { error } from "@sveltejs/kit";
import { supabase } from "$lib/supabaseClient";

export async function load({ params }) {
  const { data, error } = await supabase
    .from("teams")
    .select(`*, games(*, referee1:referee_1_id (*), 
    referee2:referee_2_id ( * ), 
    judge1:judge_1_id ( * ),
    judge2:judge_2_id ( * ),
    team:team_id ( * ))`)
    .eq("id", params.slug)
    .order('date', {foreignTable: 'games'})
    .single();
    console.log(data);
  return {
    team: data,
  };
  throw error(404, "Not found");
}
