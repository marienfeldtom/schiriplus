<script lang="ts">
  import { role } from "$lib/sessionStore";
  import { custom_event, get_current_component } from "svelte/internal";
  import { get } from "svelte/store";

  export let referee : any;
  export let needsReferee : any;
  export let game : any;
  export let column_name : any;
  export let data_label : any;
  export let user_id : any;
  export let isAdmin : boolean = false;
  
  let loading = false;

  const dispatch = createEventDispatcher();
  export function createEventDispatcher() {
    const component = get_current_component();

    return (type, detail) => {
      const callbacks = component.$$.callbacks[type];

      if (callbacks) {
        const arr = [];
        const hasCallbacks = !!callbacks.length;
        const event = custom_event(type, detail);
        callbacks.slice().forEach((fn) => {
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
    dispatch("removeParticipation", {
      column_name: column_name,
      game: game,
    }).finally(function () {
      loading = false;
    });
  }

  async function addParticipation() {
    loading = true;
    dispatch("addParticipation", {
      column_name: column_name,
      game: game,
    }).finally(function () {
      loading = false;
    });
  }
</script>

<td data-label={data_label}>
  {#if needsReferee}
  
     {#if referee != null}
      {#if referee.id == user_id}
        <span class="ml-auto">{referee.username}</span>
        {#if !isAdmin}
        <button
          title="Absagen"
          on:click={removeParticipation}
          class="button is-small is-danger is-pulled-right ml-2 {loading
            ? 'is-loading'
            : ''}"
        >
          <span class="icon is-small">
            <i class="fas fa-ban" />
          </span>
        </button>
        {/if}
      {:else}
        <span class="ml-auto">{referee.username}</span>
      {/if}
    {:else}
      <span class="ml-auto">Fehlt</span>
      {#if !isAdmin}
      <button
        title="Eintragen"
        on:click={addParticipation}
        class="button is-small is-info is-pulled-right ml-2 {loading
          ? 'is-loading'
          : ''}"
      >
        <span class="icon is-small">
          <i class="fas fa-hand-point-up" />
        </span>
      </button>
      {/if}
    {/if}
  {:else}
    <span class="ml-auto">Angesetzt</span>
  {/if}
</td>
