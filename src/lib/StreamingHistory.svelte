<script lang="ts">
	import { streamingHistory } from '../stores';
	import SongHistory from './SongHistory.svelte';
	import ListenHistory from './ListenHistory.svelte';

	const tabs = [
		{
			name: 'Listen History',
			component: ListenHistory,
		},
		{
			name: 'Song History',
			component: SongHistory,
		},
	];

	let tab = 0;
	$: C = tabs[tab].component;
</script>

<div>
	<nav>
		<ul>
			{#each tabs as { name }, i (i)}
				<li><button on:click|preventDefault={() => (tab = i)} class="{tab === i ? 'contrast' : 'secondary'} outline">{name}</button></li>
			{/each}
		</ul>
	</nav>
	<svelte:component this={C} />
</div>

<style>
</style>
