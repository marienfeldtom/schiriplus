<script>
    import GamesTable from "$lib/games/gamesTable.svelte";
      export let data;
  </script>
  <section class="section">
    <div class="buttons is-right">
  </div>
  <h1 class="title is-1">Meine Ansetzungen</h1>
  <GamesTable games={data.games}></GamesTable>
  </section>
  <style>
  </style>