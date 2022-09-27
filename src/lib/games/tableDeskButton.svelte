<script>
  import { user, profile } from "$lib/sessionStore";
import { custom_event, get_current_component } from 'svelte/internal'
  export let referee;
  export let needsReferee;
  export let game;
  export let column_name;
  let loading = false;
  const dispatch = createEventDispatcher()
  export function createEventDispatcher() {
    const component = get_current_component();

    return (type, detail)=> {
        const callbacks = component.$$.callbacks[type];

        if (callbacks) {
            const arr = [];
            const hasCallbacks = !!callbacks.length;
            const event = custom_event(type, detail);
            callbacks.slice().forEach(fn => {
                const res = fn.call(component, event);
                if (res instanceof Promise) {
                    arr.push(res);
                }
            });
            return Promise.all(arr).then(() => hasCallbacks);
        }
        return new Promise((resolve) => resolve(false));
    };

}

  async function removeParticipation() {
    loading = true;
    dispatch('removeParticipation', {
			column_name: column_name,
      game: game
		}).finally(function() {
      loading= false;
    });
  }

  async function addParticipation() {
    loading = true;
    dispatch('addParticipation', {
			column_name: column_name,
      game: game
		}).finally(function() {
      loading= false;
    });;
  }
</script>

<td>
  {#if needsReferee}
    {#if referee != null}
      {#if referee.user_id == user.id}
        {referee.username} <button title="Absagen" on:click="{removeParticipation}" class="button is-small is-danger is-pulled-right ml-2 {loading ? 'is-loading' : ''}">
          <span class="icon is-small">
            <i class="fas fa-ban"></i>
          </span>
        </button>
      {:else}
        {referee.username}
      {/if}
    {:else}
    Fehlt <button title="Eintragen" on:click="{addParticipation}" class="button is-small is-info is-pulled-right ml-2 {loading ? 'is-loading' : ''}">
      <span class="icon is-small">
        <i class="fas fa-hand-point-up"></i>
      </span>
    </button>
    {/if}
  {:else}
    Angesetzt
  {/if}
</td>
