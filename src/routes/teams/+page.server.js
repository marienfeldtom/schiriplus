import { supabase } from '$lib/supabaseClient'

export async function load(event) {
    const {data, error} = await supabase.from('teams').select(`*, games(*)`);
    return {
        teams: data
    }
}