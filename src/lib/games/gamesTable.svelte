<script>
  import TableDeskButton from "./tableDeskButton.svelte";
  import {errorToast} from "$lib/toast";
  import { supabase } from "$lib/supabaseClient";
  import { goto, invalidateAll } from "$app/navigation";
  import moment from "moment";
  export let games;

  async function removeParticipation(event) {
    const { data, error } = await supabase
      .from("games")
      .update({ [event.detail.column_name]: null })
      .match({ id: event.detail.game.id });
    invalidateAll();
  }

  async function addParticipation(event) {
    console.log(event.detail.game);
    let game = event.detail.game;
    let user_id = supabase.auth.user().id;
    if (
      game.referee_1_id == user_id ||
      game.referee_2_id == user_id ||
      game.judge_1_id == user_id ||
      game.judge_2_id == user_id
    ) {
      errorToast("Du bist bereits an dem Spiel beteiligt!");
    } else {
      const { data, error } = await supabase
        .from("games")
        .update({ [event.detail.column_name]: user_id })
        .match({ id: event.detail.game.id });
      invalidateAll();
    }
  }
</script>

<svelte:head>
  <title>Startseite</title>
  <meta name="description" content="SchiriPlus" />
</svelte:head>

<table class="table">
  <tr>
    <th>Spiel</th>
    <th>Datum</th>
    <th>Schiedsrichter 1</th>
    <th>Schiedsrichter 2</th>
    <th>Kampfgericht 1</th>
    <th>Kampfgericht 2</th>
  </tr>
  {#each games as game}
    <tr>
      <td>{game.name} </td>
      <td>{moment(game.date, moment.ISO_8601).format("DD.MM.YYYY - HH:mm")}</td>
      <TableDeskButton
        on:addParticipation={addParticipation}
        on:removeParticipation={removeParticipation}
        column_name="referee_1_id"
        referee={game.referee1}
        needsReferee={game.team.needs_referee}
        {game}
      />
      <TableDeskButton
        on:addParticipation={addParticipation}
        on:removeParticipation={removeParticipation}
        column_name="referee_2_id"
        referee={game.referee2}
        needsReferee={game.team.needs_referee}
        {game}
      />
      <TableDeskButton
        on:addParticipation={addParticipation}
        on:removeParticipation={removeParticipation}
        column_name="judge_1_id"
        referee={game.judge1}
        needsReferee={true}
        {game}
      />
      <TableDeskButton
        on:addParticipation={addParticipation}
        on:removeParticipation={removeParticipation}
        column_name="judge_2_id"
        referee={game.judge2}
        needsReferee={true}
        {game}
      />
    </tr>
  {/each}
</table>

<style>
  .table {
    margin-left: auto;
    margin-right: auto;
  }
</style>
