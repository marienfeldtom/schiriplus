<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import { supabaseClient } from "$lib/db";
  import { errorToast } from "$lib/toast";
  import moment from "moment";
  import EditGameModal from "./editGameModal.svelte";
  import TableDeskButton from "./tableDeskButton.svelte";
  import TeamBadge from "./teamBadge.svelte";

  export let games: any;
  export let user: any;
  export let isAdmin: boolean = false;
  export let teams: [] = [];
  export let filteredGames : any = games;
  export let filteredTeams : [] = [];

  let changeModalActive = false;
  let modal_game: any = games[0];
  let user_id = user.id;

  function closeModal() {
    changeModalActive = false;
  }

  function filterGames(team_id) {
    filteredTeams = [];
    team_id.forEach((item)=> {
      filteredTeams.push(item);
    });

    filteredGames = games.filter((item)=>{
       return filteredTeams.includes(item.team.id);
    });
  }

  async function removeParticipation(event: any) {
    //loading.set(true);
    const { data, error } = await supabaseClient
      .from("games")
      .update({ [event.detail.column_name]: null })
      .match({ id: event.detail.game.id });
    await invalidateAll();
  }

  async function addParticipation(event: any) {
    let game = event.detail.game;
    if (
      false
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
<EditGameModal
  active={changeModalActive}
  game={modal_game}
  on:closeModal={closeModal}
/>

{#if teams}<b>Filtern nach:</b>
<a on:click="{()=>{filterGames(teams.map((item)=>{return item.id}))}}">
  <span class="tag my-3 mx-1 is-white">Alle</span>
</a>
  {#each teams as team}
    <TeamBadge on:click="{filterGames([team.id])}" href="#" color={team.team_color}>{team.name}</TeamBadge>
  {/each}
{/if}
<div class="b-table">
  <div class="table-wrapper has-mobile-cards">
    <table class="table is-fullwidth is-striped is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th>Liga</th>
          <th>Spiel</th>
          <th>Anpfiff</th>
          <th>Schiedsrichter 1</th>
          <th>Schiedsrichter 2</th>
          <th>Kampfgericht 1</th>
          <th>Kampfgericht 2</th>
          {#if isAdmin} <th>Aktion</th>{/if}
        </tr>
      </thead>
      <tbody>
        {#each filteredGames as game}
          <tr>
            <td data-label="Liga">
              <TeamBadge href="#" color={game.team.team_color}
                >{game.league_name}</TeamBadge
              >
            </td><td data-label="Spiel">
              {game.name}
            </td>
            <td data-label="Anpfiff"
              >{moment(game.date, moment.ISO_8601).format(
                "DD.MM.YYYY - HH:mm"
              )}</td
            >
            <TableDeskButton
              on:addParticipation={addParticipation}
              on:removeParticipation={removeParticipation}
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
              column_name="judge_2_id"
              referee={game.judge2}
              data_label="Kampfgericht 2"
              needsReferee={true}
              {user_id}
              {game}
              {isAdmin}
            />
            {#if isAdmin}
              <td data-label="Aktion">
                <button
                  href="#"
                  title="Bearbeiten"
                  on:click={() => {modal_game=game; changeModalActive=true;}}
                  class="button is-info is-small"
                  ><span class="icon is-small">
                    <i class="fas fa-pen-to-square" />
                  </span></button
                >
                <button title="Löschen" class="button is-danger is-small">
                  <span class="icon is-small"
                    ><i class="fas fa-trash" />
                  </span></button
                ></td
              >
            {/if}
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
