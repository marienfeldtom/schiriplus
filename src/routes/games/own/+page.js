import { supabase } from '$lib/supabaseClient'
import moment from 'moment';
import { get } from "svelte/store";
import { user } from '$lib/sessionStore'

export async function load(event) {
    user.set(supabase.auth.getUser());
    console.log($user)
    const {data, error} = await supabase.from('games').select(`*, teams(*), referee1:referee_1_id (*), 
    referee2:referee_2_id ( * ), 
    judge1:judge_1_id ( * ),
    judge2:judge_2_id ( * ),
    team:team_id ( * )`).order("date")
    .or('referee_1_id.eq.'+ user.id +',referee_2_id.eq.'+ user.id +',judge_1_id.eq.'+ user.id +',judge_2_id.eq.'+ user.id +',')
    return {
        games: data
    }
}