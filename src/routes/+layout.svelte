<script lang="ts">
  import { invalidateAll } from '$app/navigation';
  import { navigating, page } from "$app/stores";
  import Header from "$lib/components/header/Header.svelte";
  import { supabaseClient } from '$lib/db';
  import { loading } from "$lib/sessionStore";
  import { startSupabaseSessionSync } from '@supabase/auth-helpers-sveltekit';
  import { SvelteToast } from "@zerodevx/svelte-toast";
  import "../app.css";
  import "../scss/main.scss";

// this sets up automatic token refreshing
startSupabaseSessionSync({
		page,
		handleRefresh: () => invalidateAll()
	});

	function signout() {
		supabaseClient.auth.signOut();
	}
</script>

<Header isLoggedIn="{$page.data.session.user}" />

<main>
  <SvelteToast />
  <div
    class="pageloader is-left-to-right {$loading || $navigating
      ? 'is-active'
      : ''}"
  >
    <span class="title">Einen Moment bitte...</span>
  </div>
<slot></slot>
<!--   {#if $page.data.session.user}
    <slot />
  {:else}
    <Login />
  {/if} -->
</main>

<section class="section">
  <div class="hero-foot  has-text-centered">© 2022 Schiri Plus</div>
</section>

<style>
</style>
