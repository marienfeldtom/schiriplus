<script>
    import GamesTable from "$lib/games/gamesTable.svelte";
export let data;
</script>

<section class="section">
    <h1 class="title is-1">{data.team.name} - Spiele</h1>

    <GamesTable games={data.team.games}></GamesTable>

</section>


<style>

</style>