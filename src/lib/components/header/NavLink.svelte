<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    export let href : string;
    export let prefetch : boolean;
	const dispatch = createEventDispatcher();

    function toggle() {
		dispatch('toggle');
	}
</script>

{#if prefetch} 
<a {href} data-sveltekit-prefetch class="navbar-item" on:click="{toggle}"><slot></slot></a>
{:else}
<a {href}  class="navbar-item" on:click="{toggle}"><slot></slot></a>
{/if}