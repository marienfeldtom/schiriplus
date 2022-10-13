<script lang="ts">
  import SocialAuthButton from "./SocialAuthButton.svelte";

    export let providers : Array<string>;
    export let redirectTo : any;
    export let supabaseClient : any;
</script>

<b>Einloggen mit...</b><br>
{#each providers as provider}
<SocialAuthButton {redirectTo} {supabaseClient} {provider}></SocialAuthButton>
{/each}
