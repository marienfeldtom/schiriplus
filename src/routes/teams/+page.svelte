
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
                <td data-label="Mannschaft">{team.name} </td>
                <td data-label="Benötigt Schiedsrichter">{#if team.needs_referee} Ja {:else} Nein {/if}</td>
                <td class="is-actions-cell">
                    {#if team.games.length > 0} 
                    <a title="Spiele anzeigen" href="/teams/{team.id}" class="button is-primary is-small"><span class="icon is-small">
                      <i class="fas fa-eye"></i>
                    </span></a>
                    {:else} 
                    <a title="Spiele importieren" href="/games/import" class="button is-primary is-small"><span class="icon is-small">
                      <i class="fas fa-upload"></i>
                    </span></a>
                     {/if}
                    
                    <a href="/teams/{team.id}" title="Bearbeiten" class="button is-info is-small"><span class="icon is-small">
                      <i class="fas fa-pen-to-square"></i>
                    </span></a>
                    <button title="Löschen" class="button is-danger is-small"><span class="icon is-small">
                      <i class="fas fa-trash"></i>
                    </span></button>
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
