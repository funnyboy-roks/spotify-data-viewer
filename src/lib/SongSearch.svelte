<script lang="ts">
	import { streamingHistory, activeSongSearch } from '../stores';
	import { getAllSongs, type Song } from '../util/data';
	import { minMax, map, formatTime } from '../util/util';
	import MiniSearch, { type SearchResult } from 'minisearch';
	import 'chart.js/auto';
	import { onDestroy } from 'svelte';

	const allSongs = getAllSongs($streamingHistory).map((n, id) => ({ ...n, id }));
	const miniSearch = new MiniSearch({
		fields: ['artist', 'title'],
		storeFields: ['artist', 'title', 'totalMsPlayed'],
		searchOptions: {
			fuzzy: 0.2,
		},
	});
	miniSearch.addAll(allSongs);

	function debounce(func, timeout = 300) {
		let timer;
		return (...args) => {
			clearTimeout(timer);
			timer = setTimeout(() => {
				func.apply(this, args);
			}, timeout);
		};
	}
	let results: SearchResult[] = [];
	const search = debounce((s: string) => {
		results = miniSearch
			.search(s)
			.sort((a, b) => b.score - a.score || b.totalMsPlayed - a.totalMsPlayed)
			.filter((r, i, a) => r.score > 10);
	});

	onDestroy(activeSongSearch.subscribe((song) => {
		search(song);
	}));

	search($activeSongSearch);

	export let songSelect: (song: Song) => void = () => 0;
</script>

<input type="search" placeholder="Search for a Song" bind:value={$activeSongSearch} />
Results: {results.length}
{#each results as result, i (i)}
	<!-- <pre>{JSON.stringify(result, null, 4)}</pre> -->
	<article on:click={() => songSelect(allSongs[result.id])} on:keydown={() => songSelect(allSongs[result.id])}>
		<hgroup>
			<h2>{result.title}</h2>
			<h3>{result.artist}</h3>
		</hgroup>
		<footer>
			<small>{formatTime(result.totalMsPlayed)} total playtime</small>
		</footer>
	</article>
{/each}

<style>

	article {
		cursor: pointer;
		transition: scale ease-in-out 50ms;
	}

	article:hover {
		scale: 1.05;
	}
</style>
