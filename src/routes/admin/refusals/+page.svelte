<script lang="ts">
  import type { PageData } from ".svelte-kit/types/src/routes/$types";
  import moment from "moment";
  export let data: PageData;
</script>

<section class="section">
  <h1 class="title is-1">Absagen</h1>
<div class="b-table">
  <div class="table-wrapper has-mobile-cards">
    <table class="table is-fullwidth is-striped is-hoverable is-fullwidth">
    <thead>
      <tr>
        <th>Spiel</th>
        <th>Datum</th>
        <th>Name</th>
        <th>Grund</th>
        <th>Zeit der Absage</th>
      </tr>
    </thead>
    <tbody>
      {#each data.refusals as refusal}
      <tr>
        <td data-label="Spiel">{refusal.game.name} </td>
        <td data-label="Datum">{moment(refusal.game.date, moment.ISO_8601).format(
          "DD.MM.YYYY - HH:mm"
        )}</td>
        <td data-label="Name">{refusal.user.username}</td>
        <td data-label="Grund">{refusal.reason}</td>
        <td data-label="Zeit der Absage">{moment(refusal.created_at, moment.ISO_8601).format(
          "DD.MM.YYYY - HH:mm"
        )}</td>
        </tr>
        {/each}
    </tbody>
  </table>
  </div>
  </div>
</section>