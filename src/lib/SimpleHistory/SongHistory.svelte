<script lang="ts">
	import SongSearch from './SongSearch.svelte';

	import { Chart, registerables, type ChartData } from 'chart.js';
	import { Line } from 'svelte-chartjs';
	import type { LineOptions } from 'src/types';
	import { getSimpleListens } from '../../util/data';
	import { writable } from 'svelte/store';
	import { onDestroy } from 'svelte';
	import { simpleHistory } from '../../stores';
	import { minMax } from '../../util/util';
	import type { SimpleSong } from 'src/util/spotify';

	Chart.register(...registerables);

	const spotifyGreen = '#1db954';
	let data: ChartData<'line'>;
	const { max: maxMonth } = minMax($simpleHistory.map((s) => new Date(s.endTime).getMonth()));
	let listenHistory: number[] = Array(maxMonth + 1).fill(0);

	const updateData = () => {
		data = {
			datasets: [
				{
					label: $selectedSong?.title || 'No Song Selected.',
					data: listenHistory,
					order: 2,
				},
			],
		};
	};

	updateData();

	//    ;)
	const dtf = new Intl.DateTimeFormat(navigator.language, {
		month: 'short',
	});

	const options: LineOptions = {
		maintainAspectRatio: true,
		backgroundColor: spotifyGreen,
		borderColor: spotifyGreen,
		responsive: true,
		color: '#fff',
		plugins: {
			tooltip: {
				titleColor: spotifyGreen,
			},
		},
		scales: {
			x: {
				axis: 'x',
				labels: Array(12)
					.fill(0)
					.map((_, n) => dtf.format(new Date(0, n, 2))),
				title: {
					color: '#fff',
					display: true,
					text: 'Month',
				},
			},
			y: {
				axis: 'y',
				min: 0,
				title: {
					display: true,
					color: '#fff',
					text: 'Minutes Listened',
				},
				grid: {
					color: 'grey',
				},
				ticks: {
					stepSize: 1,
					callback: (n: number) => (Math.floor(n / 60) ? Math.floor(n / 60) + 'h ' + (n % 60) + 'm' : n + 'm'),
				},
			},
		},
	};

	const selectedSong = writable<SimpleSong>(undefined);

	onDestroy(
		selectedSong.subscribe(($selectedSong) => {
			if (!$selectedSong) return;
			getSimpleListens($selectedSong, $simpleHistory).forEach((s) => {
				const date = new Date(s.endTime);
				listenHistory[date.getMonth()] += s.msPlayed / 1000 / 60;
			});
			updateData();
		})
	);
</script>

<div>
	{#if !$selectedSong}
		<SongSearch songSelect={(song) => ($selectedSong = song)} />
	{:else}
		<button on:click={() => ($selectedSong = undefined)}>Search For Another Song</button>
		<pre>{JSON.stringify($selectedSong, null, 4)}</pre>
		<div class="chart">
			{#key data}
				<Line {data} width={100} height={50} {options} />
			{/key}
		</div>
	{/if}
</div>

<style>
</style>
