<script>
	import Header from '$lib/header/Header.svelte';
	import '../app.css';
	import '../scss/main.scss'
	import { SvelteToast } from '@zerodevx/svelte-toast'
</script>

<Header />

<main>
	<SvelteToast/>
	<slot />
</main>

<section class="section">
	<div class="hero-foot  has-text-centered">
		© 2022 Schiri Plus
	</div>
</section>

<style>
	
</style>
