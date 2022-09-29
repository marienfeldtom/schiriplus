<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import { supabaseClient } from "$lib/db";
  import { errorToast } from "$lib/toast";
  import moment from "moment";
  import ChangeModal from "./changeModal.svelte";
  import TableDeskButton from "./tableDeskButton.svelte";
  
  export let games : any;
  export let user : any;
  export let isAdmin : boolean = false;
  export let teams : [] = [];
  
  let changeModalActive = false;
  let modal_game : any;
  let modal_title : any;
  let modal_column : any;
  let modal_currentParticipant : any;
    let user_id = user.id;

  function closeModal() {
    changeModalActive = false;
  }

  async function toggleModal(event) {
    if(!changeModalActive) {
      modal_game = event.detail.game;
      modal_title = event.detail.game.name;
      modal_column = event.detail.column_name;
      modal_currentParticipant = event.detail.currentParticipant ? event.detail.currentParticipant.id : null;
    }
    changeModalActive = !changeModalActive;
  }

  async function removeParticipation(event : any) {
    //loading.set(true);
    const { data, error } = await supabaseClient
      .from("games")
      .update({ [event.detail.column_name]: null })
      .match({ id: event.detail.game.id });
    await invalidateAll();
  }

  async function addParticipation(event : any) {
    let game = event.detail.game;
    console.log(game)
    if (false
      /* game.referee1.id == user_id ||
      game.referee2.id == user_id ||
      game.judge1.id == user_id ||
      game.judge2.id == user_id */
    ) {
      errorToast("Du bist bereits an dem Spiel beteiligt!");
    } else {
      //loading.set(true);
      const { data, error } = await supabaseClient
        .from("games")
        .update({ [event.detail.column_name]: user_id })
        .match({ id: event.detail.game.id });
      await invalidateAll();
    }
  }
</script>

<svelte:head>
  <title>Startseite</title>
  <meta name="description" content="SchiriPlus" />
</svelte:head>

<ChangeModal user="{user}" currentParticipant="{modal_currentParticipant}" title="{modal_title}" column_name="{modal_column}" game="{modal_game}" active="{changeModalActive}" on:closeModal="{closeModal}"></ChangeModal>
{#if teams}<b>Filtern nach:</b>
{#each teams as team}
<a href="#">
<span class="tag my-3 mx-1 {team.team_color}">{team.name}</span>
</a>
{/each}
{/if}
<div class="b-table">
  <div class="table-wrapper has-mobile-cards">
    <table class="table is-fullwidth is-striped is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th>Liga</th>
          {#if isAdmin} <th>Aktion</th>{/if}
          <th>Spiel</th>
          <th>Anpfiff</th>
          <th>Schiedsrichter 1</th>
          <th>Schiedsrichter 2</th>
          <th>Kampfgericht 1</th>
          <th>Kampfgericht 2</th>
        </tr>
      </thead>
      <tbody>
        {#each games as game}
          <tr>
            <td data-label="Liga"><span class="tag {game.team.team_color}">{game.league_name}</span></td>
            {#if isAdmin} <td data-label="Aktion">
              <button href="#" title="Bearbeiten" class="button is-info is-small"><span class="icon is-small">
                <i class="fas fa-pen-to-square"></i>
              </span></button>
              <button title="Löschen" class="button is-danger is-small">
                <span class="icon is-small"><i class="fas fa-trash"></i>
                </span></button></td>
              {/if}
            <td data-label="Spiel">
              {game.name} </td>
            <td data-label="Anpfiff"
              >{moment(game.date, moment.ISO_8601).format(
                "DD.MM.YYYY - HH:mm"
              )}</td
            >
            <TableDeskButton
              on:addParticipation={addParticipation}
              on:removeParticipation={removeParticipation}
              on:toggleModal={toggleModal}
              column_name="referee_1_id"
              referee={game.referee1}
              data_label="Schiedsrichter 1"
              needsReferee={game.team.needs_referee}
              {user_id}
              {game}
              {isAdmin}
            />
            <TableDeskButton
              on:addParticipation={addParticipation}
              on:removeParticipation={removeParticipation}
              on:toggleModal={toggleModal}
              column_name="referee_2_id"
              referee={game.referee2}
              data_label="Schiedsrichter 2"
              needsReferee={game.team.needs_referee}
              {user_id}
              {game}
              {isAdmin}
            />
            <TableDeskButton
              on:addParticipation={addParticipation}
              on:removeParticipation={removeParticipation}
              on:toggleModal={toggleModal}
              column_name="judge_1_id"
              referee={game.judge1}
              data_label="Kampfgericht 1"
              needsReferee={true}
              {user_id}
              {game}
              {isAdmin}
            />
            <TableDeskButton
              on:addParticipation={addParticipation}
              on:removeParticipation={removeParticipation}
              on:toggleModal={toggleModal}
              column_name="judge_2_id"
              referee={game.judge2}
              data_label="Kampfgericht 2"
              needsReferee={true}
              {user_id}
              {game}
              {isAdmin}
            />
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<style>
  .table {
    margin-left: auto;
    margin-right: auto;
  }
</style>
