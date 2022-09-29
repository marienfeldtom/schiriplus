<script lang="ts">
    import GamesTable from "$lib/components/games/gamesTable.svelte";
export let data : any;
</script>

<section class="section">
    <h1 class="title is-1">{data.team.name} - Spiele</h1>

    <GamesTable games={data.team.games} user={data.user}></GamesTable>

</section>


<style>

</style>