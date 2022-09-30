<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import { clickOutside } from "$lib/clickOutside.js";
  import { supabaseClient } from "$lib/db";
  import { errorToast } from "$lib/toast";
  import { createEventDispatcher, onMount } from "svelte";
  import TeamBadge from "./teamBadge.svelte";

  export let game: Object;
  export let active: boolean;
  let profiles: any = [];
  let referee1, referee2, judge1, judge2;

  const dispatch = createEventDispatcher();

  function closeModal(_event: any) {
    dispatch("closeModal");
  }

  onMount(async () => {
    const { data, error } = await supabaseClient.from("profiles").select(`*`);
    profiles = data;
  });
</script>

<form method="POST">
  <div class="modal {active ? 'is-active' : ''}">
    <div class="modal-background" />
    <div
      class="modal-card"
      use:clickOutside
      on:click_outside={closeModal}
    >
      <header class="modal-card-head">
        <p class="modal-card-title">
          {game.name}
          <TeamBadge href="#" color={game.team.team_color}
            >{game.league_name}</TeamBadge
          >
        </p>
        <button
          on:click|preventDefault={closeModal}
          class="delete"
          aria-label="close"
        />
      </header>
      <section class="modal-card-body">
        <div class="field">
          <label class="label">Name</label>
          <div class="control">
            <input name="game_name" class="input" type="text" bind:value={game.name} />
          </div>
        </div>
        <div class="field">
          <label class="label">Anpfiff</label>
          <div class="control">
            <input class="input" type="text" name="date" bind:value={game.date} />
          </div>
        </div>

        <div class="control">
          <label class="label">Schiedsrichter 1</label>
          {#if game.team.needs_referee}
            <div class="select">
              {#if game.referee1}
                <select name="referee1" bind:value={game.referee1.id}>
                  <option value="" />
                  {#each profiles as profile}
                    <option value={profile.id}>{profile.username}</option>
                  {/each}
                </select>
              {:else}
                <select name="referee1">
                  <option value="" />
                  {#each profiles as profile}
                    <option value={profile.id}>{profile.username}</option>
                  {/each}
                </select>
              {/if}
            </div>
          {:else}
            <input class="input" type="text" placeholder="Angesetzt" disabled />
          {/if}
        </div>

        <div class="control">
          <label class="label">Schiedsrichter 2</label>
          {#if game.team.needs_referee}
            <div class="select">
              {#if game.referee2}
                <select name="referee2" bind:value={game.referee2.id}>
                  <option value="" />
                  {#each profiles as profile}
                    <option value={profile.id}>{profile.username}</option>
                  {/each}
                </select>
              {:else}
                <select name="referee2">
                  <option value="" />
                  {#each profiles as profile}
                    <option value={profile.id}>{profile.username}</option>
                  {/each}
                </select>
              {/if}
            </div>
          {:else}
            <input class="input" type="text" placeholder="Angesetzt" disabled />
          {/if}
        </div>

        <div class="control">
          <label class="label">Kampfgericht 1</label>
          <div class="select">
            {#if game.judge1}
              <select name="judge1" bind:value={game.judge1.id}>
                <option value="" />
                {#each profiles as profile}
                  <option value={profile.id}>{profile.username}</option>
                {/each}
              </select>
            {:else}
              <select name="judge1">
                <option value="" />
                {#each profiles as profile}
                  <option value={profile.id}>{profile.username}</option>
                {/each}
              </select>
            {/if}
          </div>
        </div>
        <div class="control">
          <label class="label">Kampfgericht 2</label>
          <div class="select">
            {#if game.judge2}
              <select name="judge2" bind:value={game.judge2.id}>
                <option value="" />
                {#each profiles as profile}
                  <option value={profile.id}>{profile.username}</option>
                {/each}
              </select>
            {:else}
              <select name="judge2">
                <option value="" />
                {#each profiles as profile}
                  <option value={profile.id}>{profile.username}</option>
                {/each}
              </select>
            {/if}
          </div>
        </div>
        <input type="hidden" name="game_id" value="{game.id}">
      </section>
      <footer class="modal-card-foot">
        <button type="submit" class="button is-success">Speichern</button>
        <button class="button" on:click|preventDefault={closeModal}
          >Abbrechen</button
        >
      </footer>
    </div>
  </div>
</form>
