<script>
  import { role, user } from "$lib/sessionStore";
  import { custom_event, get_current_component } from "svelte/internal";
  import { get } from "svelte/store";

  export let referee;
  export let needsReferee;
  export let game;
  export let column_name;
  export let data_label;
  
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

  async function toggleModal() {
    loading = true;
    dispatch("toggleModal", {
      column_name: column_name,
      game: game,
      currentParticipant: referee
    }).finally(function () {
      loading = false;
    });
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
      {#if referee.id == get(user).id}
        <span class="ml-auto">{referee.username}</span>
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
      {:else}
        <span class="ml-auto">{referee.username}</span>
      {/if}
    {:else}
      <span class="ml-auto">Fehlt</span>
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
    {#if $role.isAdmin}
    <button
    title="Ändern"
    on:click={toggleModal}
    class="button is-small is-warning is-pulled-right ml-2"
    >
    <span class="icon is-small">
      <i class="fas fa-pencil" />
    </span>
    </button>
    {/if}
  {:else}
    <span class="ml-auto">Angesetzt</span>
  {/if}
</td>
