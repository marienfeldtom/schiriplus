// src/routes/posts/+page.server.ts
import type { Actions } from './$types';
import { withAuth } from '@supabase/auth-helpers-sveltekit';
import { error, invalid } from '@sveltejs/kit';

export const actions: Actions = {
  default: withAuth(async ({ session, getSupabaseClient, request }) => {
    if (!session.user) {
      // the user is not signed in
      throw error(403, { message: 'Unauthorized' });
    }
    // we are save, let the user create the post
    const formData = await request.formData();
    const content = formData.get('game_name');

    const { data, error } = await getSupabaseClient()
    .from("games")
    .update({ 
        name: formData.get('game_name'),
        referee_1_id: formData.get('referee1') ? formData.get('referee1') : null,
        referee_2_id: formData.get('referee2') ? formData.get('referee2') : null,
        judge_1_id: formData.get('judge1') ? formData.get('judge1') : null,
        judge_2_id: formData.get('judge2') ? formData.get('judge2') : null,
        date: formData.get('date'),
     })
    .match({ id: formData.get('game_id') });
	return { data };
  })
};