<script>
  import Header from "$lib/header/Header.svelte";
  import { onDestroy } from "svelte";
  import "../app.css";
  import "../scss/main.scss";
  import { navigating } from "$app/stores";
  import { User, loading } from "$lib/sessionStore";
  //user.set(supabase.auth.user());
  import { SvelteToast } from "@zerodevx/svelte-toast";
  import { supabase } from "$lib/supabaseClient";
  import Login from "$lib/auth/Login.svelte";

  supabase.auth.onAuthStateChange((state, session) => {
    if (state == "SIGNED_IN") {
      User.set(session.user);
    } else {
      User.set(null);
    }
  });

  let user;
  const unUser = User.subscribe((v) => (user = v));
  onDestroy(unUser);

  $: isLoggedIn = !!user;
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

  {#if isLoggedIn}
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
