<script lang="ts">
	import { simpleHistory, extendedHistory } from './stores';

	import LoadFile from './lib/LoadFile.svelte';
	import SimpleHistory from './lib/SimpleHistory/SimpleHistory.svelte';
	import ExtendedHistory from './lib/ExtendedHistory/ExtendedHistory.svelte';
</script>

<main class="container">
	<nav>
		<ul>
			<!-- <li /> -->
		</ul>
		<ul>
			<li><h1>Spotify Data Viewer</h1></li>
		</ul>
		<ul>
			<!-- <li /> -->
		</ul>
	</nav>

	{#if $simpleHistory}
		<SimpleHistory />
	{:else if $extendedHistory}
		<ExtendedHistory />
		{:else}
		<LoadFile />
		{/if}

	<br />
</main>

<style>
</style>
