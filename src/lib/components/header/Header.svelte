<script lang="ts">
  import { page } from "$app/stores";
  import { clickOutside } from "$lib/clickOutside.js";
  import { supabaseClient } from "$lib/db";
  import { isAdmin } from "$lib/sessionStore";
  import NavLink from "./NavLink.svelte";

  export let isLoggedIn: any;
  let isActive: any;

  function handleClickOutside() {
    isActive = false;
  }
</script>

<nav
  class="navbar"
  aria-label="main navigation"
  use:clickOutside
  on:click_outside={handleClickOutside}
>
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
      on:click={() => {
        isActive = !isActive;
      }}
    >
      <span aria-hidden="true" />
      <span aria-hidden="true" />
      <span aria-hidden="true" />
    </a>
  </div>

  <div
    id="navbarBasicExample"
    class="navbar-menu {isActive ? 'is-active' : ''}"
  >
    <div class="navbar-start">
      <NavLink
        prefetch={false}
        href="/"
        on:toggle={() => {
          isActive = false;
        }}>Start</NavLink
      >

      <NavLink
        prefetch={true}
        href="/games"
        on:toggle={() => {
          isActive = false;
        }}>Alle Spiele</NavLink
      >
      <NavLink
        prefetch={true}
        href="/games/own"
        on:toggle={() => {
          isActive = false;
        }}>Meine Ansetzungen</NavLink
      >
      <NavLink
        prefetch={true}
        href="/teams"
        on:toggle={() => {
          isActive = false;
        }}>Mannschaften</NavLink
      >
      <NavLink
        prefetch={true}
        href="/profile"
        on:toggle={() => {
          isActive = false;
        }}>Profil</NavLink
      >

      {#if $isAdmin && $page.data.session.user}
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link" href="/admin/games"> Admin </a>

          <div class="navbar-dropdown">
            <a class="navbar-item" href="/admin/games">Alle Ansetzungen </a>
            <a class="navbar-item" href="/"> Rechte verwalten </a>
            <hr class="navbar-divider" />
            <a class="navbar-item" href="/"> Vereins Einstellungen </a>
          </div>
        </div>
      {/if}
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          {#if isLoggedIn}
            <button
              on:click={() => supabaseClient.auth.signOut()}
              class="button is-danger ml-3"
            >
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
    animation: navAnim 0.2s ease-in-out;
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
