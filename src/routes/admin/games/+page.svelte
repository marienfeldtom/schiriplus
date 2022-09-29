<script lang="ts">
    import GamesTable from "$lib/components/games/gamesTable.svelte";
      export let data : any;
  </script>
  <section class="section">
    <div class="buttons is-right">
    <a href="/games/import" class="button is-primary is-right"><span class="icon is-small">
      <i class="fas fa-upload"></i>
    </span><span>Spiele importieren</span></a>
  </div>
  <h1 class="title is-1">Alle Spiele (Admin)</h1>
  <GamesTable isAdmin={true} games={data.games} user={data.user}></GamesTable>
  </section>
  <style>
  </style>