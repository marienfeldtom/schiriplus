<script>
    import { createEventDispatcher } from 'svelte';
    export let href;
	const dispatch = createEventDispatcher();

    function toggle() {
		dispatch('toggle');
	}
</script>

<a {href} class="navbar-item" on:click="{toggle}"><slot></slot></a>