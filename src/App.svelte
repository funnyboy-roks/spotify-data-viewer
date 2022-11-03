<script lang="ts">
	import { streamingHistory } from './stores';

	import LoadFile from './lib/LoadFile.svelte';
	import StreamingHistory from './lib/StreamingHistory.svelte';
</script>

<main class="container">
	<nav>
		<ul>
			<li />
		</ul>
		<ul>
			<li><h1>Spotify Data Viewer</h1></li>
		</ul>
		<ul>
			<li />
		</ul>
	</nav>
	{#if !$streamingHistory}
		<LoadFile />
	{:else}
		<StreamingHistory />
	{/if}

	<br />
</main>

<style>
</style>
