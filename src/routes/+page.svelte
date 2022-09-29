<script lang="ts">
  import { page } from "$app/stores";
  import Auth from "$lib/components/auth/Auth.svelte";
  import { supabaseClient } from "$lib/db";

  let loadedData: any[] = [];
  async function loadData() {
    const { data } = await supabaseClient.from("test").select("*").single();
    loadedData = data;
  }

  function signout() {
    supabaseClient.auth.signOut();
  }

  $: if ($page.data.session.user) {
    loadData();
  }

  type RedirectTo = undefined | string;

  let url: RedirectTo;
  url = "test";
</script>

{#if !$page.data.session.user}
  <Auth {supabaseClient} />
{:else}
  <p>
    [<a href="/profile">withPageAuth</a>] | [<a href="/protected-page"
      >supabaseServerClient</a
    >] | [<a href="/github-provider-token">GitHub Token</a>] |
    <button
      on:click={() =>
        supabaseClient.auth.update({ data: { test5: "updated" } })}
    >
      Update
    </button>
    <button on:click={signout}>Sign out</button>
  </p>

  <p>user:</p>
  <pre>{JSON.stringify($page.data.session.user, null, 2)}</pre>
  <p>client-side data fetching with RLS</p>
  <pre>{JSON.stringify(loadedData, null, 2)}</pre>
{/if}
