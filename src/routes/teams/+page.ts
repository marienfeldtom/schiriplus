import { withAuth } from '@supabase/auth-helpers-sveltekit';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = withAuth(async ({ session, getSupabaseClient }) => {
	if (!session.user) {
		throw redirect(303, '/');
	}
    const {data, error} = await getSupabaseClient().from('teams').select(`*, games(*)`);
    return {
        teams: data
    }
});