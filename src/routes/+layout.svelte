<script>
  import Header from "$lib/header/Header.svelte";
  import { onMount } from 'svelte';
  import "../app.css";
  import "../scss/main.scss";
  import { navigating } from "$app/stores";
  import { user, loading } from "$lib/sessionStore";
  import { SvelteToast } from "@zerodevx/svelte-toast";
  import { supabase } from "$lib/supabaseClient";
  import Login from "$lib/auth/Login.svelte";

let session;

  onMount(() => {
    supabase.auth.getSession().then(({ data }) => {
      session = data.session;
      console.log(session);
      user.set(data.session.user);
    })

    supabase.auth.onAuthStateChange((_event, _session) => {
      session = _session;
    })
  })

  $: isLoggedIn = session;
</script>

<Header {isLoggedIn} />

<main>
  <SvelteToast />
  <div
    class="pageloader is-left-to-right {$loading || $navigating
      ? 'is-active'
      : ''}"
  >
    <span class="title">Einen Moment bitte...</span>
  </div>

  {#if session}
    <slot />
  {:else}
    <Login />
  {/if}
</main>

<section class="section">
  <div class="hero-foot  has-text-centered">© 2022 Schiri Plus</div>
</section>

<style>
</style>
