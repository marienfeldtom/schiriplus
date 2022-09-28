
<script>
    export let data;
</script>

<svelte:head>
  <title>Startseite</title>
  <meta name="description" content="SchiriPlus" />
</svelte:head>

<section class="section">
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-half box">
        <h1 class="title is-1">Mannschaften</h1>
        <div class="b-table">
          <div class="table-wrapper has-mobile-cards">
            <table class="table is-fullwidth is-striped is-hoverable is-fullwidth">
              <thead>
                <tr>
            <th>Mannschaft</th>
            <th>Schiedsrichter benötigt?</th>
            <th>Aktion</th>
          </tr>
          </thead>
          <tbody>
          {#each data.teams as team}
            <tr>
                <td>{team.name} </td>
                <td>{#if team.needs_referee} Ja {:else} Nein {/if}</td>
                <td>
                    {#if team.games.length > 0} 
                    <a href="/teams/{team.id}" class="button is-primary is-small">Spiele anzeigen</a>
                    {:else} 
                    <a href="/teams/{team.id}" class="button is-primary is-small">Spiele importieren</a>
                     {/if}
                    
                    <a class="button is-info is-small">Bearbeiten</a>
                    <a class="button is-danger is-small">Löschen</a>
                </td>
            </tr>
          {/each}
        </tbody>
        </table>
        </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .table {
    margin-left: auto;
    margin-right: auto;
  }
</style>
