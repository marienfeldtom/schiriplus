<script lang="ts">
    import GamesTable from "$lib/components/games/gamesTable.svelte";
      export let data : any;
  </script>
  <section class="section">
    <div class="buttons is-right">
  </div>
  <h1 class="title is-1">Meine Ansetzungen</h1>
  <GamesTable games={data.games} user={data.user}></GamesTable>
  </section>
  <style>
  </style>