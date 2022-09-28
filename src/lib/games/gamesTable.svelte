<script>
  import TableDeskButton from "./tableDeskButton.svelte";
  import { errorToast } from "$lib/toast";
  import { supabase } from "$lib/supabaseClient";
  import { invalidateAll } from "$app/navigation";
  import { user } from "$lib/sessionStore";
  import { get } from "svelte/store";
  import moment from "moment";
  export let games;

  async function removeParticipation(event) {
    //loading.set(true);
    const { data, error } = await supabase
      .from("games")
      .update({ [event.detail.column_name]: null })
      .match({ id: event.detail.game.id });
    await invalidateAll();
  }

  async function addParticipation(event) {
    let game = event.detail.game;
    let user_id = get(user).id;
    if (
      game.referee_1_id == user_id ||
      game.referee_2_id == user_id ||
      game.judge_1_id == user_id ||
      game.judge_2_id == user_id
    ) {
      errorToast("Du bist bereits an dem Spiel beteiligt!");
    } else {
      //loading.set(true);
      const { data, error } = await supabase
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
<div class="b-table">
  <div class="table-wrapper has-mobile-cards">
    <table class="table is-fullwidth is-striped is-hoverable is-fullwidth">
      <thead>
        <tr>
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
            <td data-label="Spiel">{game.name} </td>
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
              {game}
            />
            <TableDeskButton
              on:addParticipation={addParticipation}
              on:removeParticipation={removeParticipation}
              column_name="referee_2_id"
              referee={game.referee2}
              data_label="Schiedsrichter 2"
              needsReferee={game.team.needs_referee}
              {game}
            />
            <TableDeskButton
              on:addParticipation={addParticipation}
              on:removeParticipation={removeParticipation}
              column_name="judge_1_id"
              referee={game.judge1}
              data_label="Kampfgericht 1"
              needsReferee={true}
              {game}
            />
            <TableDeskButton
              on:addParticipation={addParticipation}
              on:removeParticipation={removeParticipation}
              column_name="judge_2_id"
              referee={game.judge2}
              data_label="Kampfgericht 2"
              needsReferee={true}
              {game}
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
