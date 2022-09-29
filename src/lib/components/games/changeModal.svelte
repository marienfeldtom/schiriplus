<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import { clickOutside } from "$lib/clickOutside.js";
  import { supabaseClient } from "$lib/db";
  import { errorToast } from "$lib/toast";
  import { createEventDispatcher, onMount } from "svelte";
  
  export let title : any;
  export let game : any;
  export let active : any;
  export let column_name : any;
  export let currentParticipant : any;

  let profiles  : any = [];

  const dispatch = createEventDispatcher();

  function toggleModal() {
    dispatch("closeModal");
  }

  function handleClickOutside() {
      dispatch("closeModal");
  }

  async function save() {
    if (
      game.referee_1_id == currentParticipant ||
      game.referee_2_id == currentParticipant ||
      game.judge_1_id == currentParticipant ||
      game.judge_2_id == currentParticipant
    ) {
      toggleModal();
      errorToast("Die Person ist bereits am Spiel beteiligt!");
    } else {
      const { data, error } = await supabaseClient
        .from("games")
        .update({ [column_name]: currentParticipant ? currentParticipant : null })
        .match({ id: game.id });
      dispatch("closeModal");
      await invalidateAll();
    }
  }

  async function loadProfiles() {
    const { data, error } = await supabaseClient.from("profiles").select(`*`);
    profiles = data;
  }

  onMount(async () => {
    await loadProfiles();
  });
</script>

<div class="modal {active ? 'is-active' : ''}">
  <div class="modal-background" />
  <div
    class="modal-card"
    use:clickOutside
    on:click_outside={handleClickOutside}
  >
    <header class="modal-card-head">
      <p class="modal-card-title">{title}</p>
      <button on:click={toggleModal} class="delete" aria-label="close" />
    </header>
    <section class="modal-card-body">
      <div class="control">
        <div class="select">
          <select bind:value={currentParticipant}>
            <option value="" />
            {#each profiles as profile}
              <option value={profile.id}>{profile.username}</option>
            {/each}
          </select>
        </div>
      </div>
    </section>
    <footer class="modal-card-foot">
      <button on:click={save} class="button is-success">Speichern</button>
      <button class="button" on:click={toggleModal}>Abbrechen</button>
    </footer>
  </div>
</div>
