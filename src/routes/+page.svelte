<script>
	import Counter from '$lib/Counter.svelte';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="section">
	<h1 class="title is-1">Schiri Plus</h1>
	<div class="tile is-ancestor">
		<div class="tile">
			<div class="tile is-parent">
				<article class="tile is-child notification is-primary">
					<p class="title">Für den Schiriwart</p>
					<p class="subtitle"> Einfache Verwaltung von Schieds- und Kamprichtern. Automatische Ansetzungen mit intelligenter Berücksichtigung von Erfahrungen und Altersklassen.
</p>
					<a class="button">Mehr Infos</a>
				</article>
			</div>
		</div>
		<div class="tile">
			<div class="tile is-parent">
				<article class="tile is-child notification is-info">
					<p class="title">Für Schiris</p>
					<p class="subtitle">Alle Ansetzungen auf einen Blick, in einer Anwendung. Einfaches festlegen von Urlaubstagen und Wunsch-Spielen.</p>
					<a class="button">view details</a>
				</article>
			</div>
		</div>
		<div class="tile">
			<div class="tile is-parent">
				<article class="tile is-child notification is-warning">
					<p class="title">Trainer</p>
					<p class="subtitle">Direktes Anlegen von Spielen in der Anwendung. Schiris bekommen dann direkt eine Beanchrichtigung und können sich freiwillig für das Spiel melden.
</p>
					<a class="button">view details</a>
				</article>
			</div>
		</div>
	</div>
</section>

<style>
	
</style>
