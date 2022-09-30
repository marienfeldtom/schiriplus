<script lang="ts">
  import { page } from "$app/stores";
  import Auth from "$lib/components/auth/Auth.svelte";
  import { supabaseClient } from "$lib/db";
  import { isAdmin } from "$lib/sessionStore";
  import { onMount } from "svelte";
  import { cubicOut } from "svelte/easing";
  import { tweened } from "svelte/motion";



  const progress = tweened(0, {
    duration: 3000,
    easing: cubicOut,
  });

  onMount(async () => {
    progress.set(30);
  });

  type RedirectTo = undefined | string;

  let url: RedirectTo;
  url = "test";
</script>

{#if !$page.data.session.user}
  <Auth {supabaseClient} />
{:else}
<section class="section">
  <h1 class="title is-1">Schiri Plus</h1>
  <h3 class="title is-3 has-text-centered">Entwicklungs-Fortschritt</h3>
  <div class="columns">
    <div class="column is-half is-offset-one-quarter">
      <progress class="progress" value={$progress} max="100">30%</progress>
    </div>
  </div>
  <div class="tile is-ancestor">
    <div class="tile">
      <div class="tile is-parent">
        <article class="tile is-child notification is-primary">
          <p class="title">Für den Schiriwart</p>
          <p class="subtitle">
            Einfache Verwaltung von Schieds- und Kamprichtern. Automatische
            Ansetzungen mit intelligenter Berücksichtigung von Erfahrungen und
            Altersklassen.
          </p>
          <a class="button">Mehr Infos</a>
        </article>
      </div>
    </div>
    <div class="tile">
      <div class="tile is-parent">
        <article class="tile is-child notification is-info">
          <p class="title">Für Schiris</p>
          <p class="subtitle">
            Alle Ansetzungen auf einen Blick, in einer Anwendung. Einfaches
            festlegen von Urlaubstagen und Wunsch-Spielen.
          </p>
          <a class="button">view details</a>
        </article>
      </div>
    </div>
    <div class="tile">
      <div class="tile is-parent">
        <article class="tile is-child notification is-warning">
          <p class="title">Trainer</p>
          <p class="subtitle">
            Direktes Anlegen von Spielen in der Anwendung. Schiris bekommen dann
            direkt eine Beanchrichtigung und können sich freiwillig für das
            Spiel melden.
          </p>
          <a class="button">view details</a>
        </article>
      </div>
    </div>
  </div>
</section>
{/if}
