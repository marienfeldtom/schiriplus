<script>
  import Header from "$lib/header/Header.svelte";
  import "../app.css";
  import "../scss/main.scss";
  import { navigating } from '$app/stores';
  import { user, loading } from "$lib/sessionStore";
  user.set(supabase.auth.user());
  import { SvelteToast } from "@zerodevx/svelte-toast";
  import { supabase } from "$lib/supabaseClient";
  import Login from "$lib/auth/Login.svelte";

  supabase.auth.onAuthStateChange((state, session) => {
    if (state == "SIGNED_IN") {
      user.set(session.user);
    } else {
      user.set(false);
    }
  });
</script>

<Header />

<main>
  <SvelteToast />
  <div class="pageloader is-left-to-right {$loading || $navigating ? 'is-active' : ''}"><span class="title">Einen Moment bitte...</span></div>
  
    {#if $user}
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
