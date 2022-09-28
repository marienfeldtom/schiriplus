<script>
  import { clickOutside } from '$lib/clickOutside.js';
  import { role } from "$lib/sessionStore";
  import { supabase } from "$lib/supabaseClient";
  import { get, writable } from "svelte/store";
  import NavLink from "./NavLink.svelte";

  export let isLoggedIn;
  let isActive;

  function handleClickOutside(event) {
		isActive = false;
	}

  function toggleAdmin() {
    role.set({isAdmin: !get(role).isAdmin});
  }
</script>

<nav class="navbar" aria-label="main navigation" use:clickOutside on:click_outside={handleClickOutside}>
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
      on:click="{() => {isActive=!isActive}}"
    >
      <span aria-hidden="true" />
      <span aria-hidden="true" />
      <span aria-hidden="true" />
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu {isActive ? 'is-active': ''}">
    <div class="navbar-start">
      <NavLink href="/" on:toggle="{() => {isActive=false}}">Start</NavLink>

      <NavLink href="/games" on:toggle="{() => {isActive=false}}">Spiele</NavLink>

      <NavLink href="/teams" on:toggle="{() => {isActive=false}}">Mannschaften</NavLink>

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
          {#if isLoggedIn}
          <div class="field mr-5">
            <input id="switchRtlExample" checked="{get(role).isAdmin}" on:click="{toggleAdmin}" type="checkbox" name="switchRtlExample" class="switch is-info is-small is-rounded">
            <label for="switchRtlExample">Admin?</label>
          </div>
            <button on:click={() => supabase.auth.signOut()} class="button is-danger ml-3">
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
  .navbar-menu.is-active {
    animation: navAnim .2s ease-in-out;
}

@keyframes navAnim {
  0% {
    display: none;
    opacity: 0;
    height: 0;
  }
  1% {
    display: block;
    opacity: 0;
  }
  100% {
    opacity: 1;
    height: 396px;
  }
}
</style>
