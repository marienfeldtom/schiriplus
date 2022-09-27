import { supabase } from '$lib/supabaseClient'
import moment from 'moment';

export async function load(event) {
    let dateString1 = moment().toISOString();
    let dateString2 = moment().add(3, 'M').toISOString();
    const {data, error} = await supabase.from('games').select(`*, teams(*), referee1:referee_1_id (*), 
    referee2:referee_2_id ( * ), 
    judge1:judge_1_id ( * ),
    judge2:judge_2_id ( * ),
    team:team_id ( * )`).order("date")
    .lt('date', dateString2)
    .gt('date', dateString1);
    return {
        games: data
    }
}