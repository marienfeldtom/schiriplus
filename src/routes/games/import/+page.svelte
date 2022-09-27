<script>
  import { supabase } from "$lib/supabaseClient";
  import icsToJson from "ics-to-json";
  import {successToast} from "$lib/toast"
  let files = [{ name: "-" }];
  let fileinput;
  let teamId;
  let games = [];
  let gamesToImport= [];
  export let data;

  function abort() {
    games = [];
    fileinput = null;
    files = [{ name: "-" }];
  }

  async function importGames() {
    var gamesToImportMapped = gamesToImport.map((item) => ({
        name: item.name,
        team_id: teamId,
        date: item.date
    }));
    const { data, error } = await supabase
    .from('games')
    .insert(gamesToImportMapped);
    successToast("Spiele wurden erfolgreich importiert");
    abort();
  }

  const onFileSelected = (e) => {
    let document = e.target.files[0];
    let reader = new FileReader();
    reader.readAsText(document);
    reader.onload = async (e) => {
      games = await convert(e.target.result);
    };
  };

  const convert = async (data) => {
    const icsData = data;
    // Convert
    const data2 = icsToJson(icsData);
    var result = data2.map((item) => ({
      name: item.summary,
      date: item.startDate,
      location: item.location.split("\\").join(""),
      home: item.summary.split("]").pop().split("-")[0].trim() == "TuRa Meldorf",
    }));
    result.forEach((o, i) => o.id = i + 1);
    result.forEach(function(item) {
        if(item.home) {
            gamesToImport.push(item);
        }
    });
    return result;
  };
</script>

<section class="section">
  <div class="box">
    <h1 class="title is-1">Import</h1>
    <div id="file-js-example" class="file has-name">
      <label class="file-label">
        <input
          class="file-input"
          on:change={(e) => onFileSelected(e)}
          bind:this={fileinput}
          bind:files
          multiple="false"
          accept=".ics"
          type="file"
          name="resume"
        />
        <span class="file-cta">
          <span class="file-icon">
            <i class="fas fa-upload" />
          </span>
          <span class="file-label"> ics Datei auswählen </span>
        </span>
        <span class="file-name">
          {files[0].name}
        </span>
      </label>
    </div>
    {#if games.length > 0}
      <h2 class="title is-2">Spiele</h2>
      <p>Es wurden automatische alle Heimspiel vorausgewählt.</p>
      <br />
      <ul>
        {#each games as game}
          <li>
            <label class="checkbox">
              <input type="checkbox" bind:group={gamesToImport} value="{game}" name="games"/>
              {game.name}
            </label>
          </li>
        {/each}
      </ul>

      <div class="field">
        <label class="label" for="team">Mannschaft</label>
        <div class="control">
          <div class="select">
            <select id="team" name="team" bind:value={teamId}
              >#
              {#each data.teams as team}
                <option value={team.id}>{team.name}</option>
              {/each}
            </select>
          </div>
        </div>
      </div>
      <div class="field is-grouped">
        <div class="control">
          <button on:click={importGames} class="button is-link">Importieren</button>
        </div>
        <div class="control">
          <button on:click={abort} class="button is-link is-light"
            >Abbrechen</button
          > {gamesToImport.length}
        </div>
      </div>
    {/if}
  </div>
</section>

<style>
</style>
