<script>
  import GamesTable from "$lib/games/gamesTable.svelte";
    export let data;
</script>
<section class="section">
  <div class="buttons is-right">
  <a href="/games/import" class="button is-primary is-right">Spiele importieren</a>
</div>
<h1 class="title is-1">Alle Spiele (3 Monate)</h1>
<GamesTable games={data.games}></GamesTable>
</section>
<style>
</style>