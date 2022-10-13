<script lang="ts">
  import Login from "$lib/auth/Login.svelte";

  let loading = false;
  export let redirectTo: string;
  export let supabaseClient: any;
  export let provider: string;
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<a
  class="button is-medium mr-2 mt-2 {loading ? 'is-loading' : ''}"
  on:click={() => {
    loading = true;
    supabaseClient.auth.signIn(
      { provider: provider },
      { redirectTo: redirectTo }
    );
  }}
>
  <span class="icon">
    <i class="fab fa-{provider}" />
  </span>
</a>


<style>
    .button:hover {
        text-decoration: none;
    }
</style>
