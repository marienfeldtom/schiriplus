<script>
  import { user } from "$lib/sessionStore";
  import { supabase } from "$lib/supabaseClient";
  import { signOut, getProfile } from "$lib/auth";
  user.set(supabase.auth.user());

  supabase.auth.onAuthStateChange((state, session) => {
    if (state == "SIGNED_IN") {
      user.set(session.user);
    } else {
      user.set(false);
    }
  });
</script>

<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="/">
      <img
        src="https://pic.onlinewebfonts.com/svg/img_531232.png"
        alt="SchiriPlus Logo"
      />
      <b style="margin-left: 10px;">Schiri Plus</b>
    </a>

    <!-- svelte-ignore a11y-missing-attribute -->
    <a
      role="button"
      class="navbar-burger"
      aria-label="menu"
      aria-expanded="false"
      data-target="navbarBasicExample"
    >
      <span aria-hidden="true" />
      <span aria-hidden="true" />
      <span aria-hidden="true" />
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      <a href="/" class="navbar-item"> Start </a>

      <a class="navbar-item" href="/games"> Spiele </a>

      <a class="navbar-item" href="/teams"> Mannschaften </a>

      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link" href="/"> Mehr </a>

        <div class="navbar-dropdown">
          <a class="navbar-item" href="/"> Jobs </a>
          <a class="navbar-item" href="/"> Contact </a>
          <hr class="navbar-divider" />
          <a class="navbar-item" href="/"> Report an issue </a>
        </div>
      </div>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          {#if $user}
            <button on:click={signOut} class="button is-danger">
              Ausloggen
            </button>
          {:else}
            <button class="button is-primary">
              <strong>Registrieren</strong>
            </button>
            <a href="/login" class="button is-light"> Einloggen </a>
          {/if}
        </div>
      </div>
    </div>
  </div>
</nav>

<style>
</style>
