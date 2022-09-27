<script>
  import { user, profile } from "$lib/sessionStore";
import { createEventDispatcher } from 'svelte';
  export let referee;
  export let needsReferee;
  export let game;
  export let column_name;
    const dispatch = createEventDispatcher();

  async function removeParticipation() {
    dispatch('removeParticipation', {
			column_name: column_name,
      game: game
		});
  }

  async function addParticipation() {
    dispatch('addParticipation', {
			column_name: column_name,
      game: game
		});
  }
</script>

<td>
  {#if needsReferee}
    {#if referee != null}
      {#if referee.user_id == user.id}
        {referee.username} <button title="Absagen" on:click="{removeParticipation}" class="button is-small is-danger is-pulled-right ml-2">
          <span class="icon is-small">
            <i class="fas fa-ban"></i>
          </span>
        </button>
      {:else}
        {referee.username}
      {/if}
    {:else}
    Fehlt <button title="Eintragen" on:click="{addParticipation}" class="button is-small is-info is-pulled-right ml-2">
      <span class="icon is-small">
        <i class="fas fa-hand-point-up"></i>
      </span>
    </button>
    {/if}
  {:else}
    Angesetzt
  {/if}
</td>
