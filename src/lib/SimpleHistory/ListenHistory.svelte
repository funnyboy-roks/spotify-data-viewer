<script lang="ts">
	import { Chart, registerables, type ChartData } from 'chart.js';
	import { Line } from 'svelte-chartjs';
	import type { LineOptions } from 'src/types';
	import { simpleHistory } from '../../stores';
	import { minMax } from '../../util/util';

	Chart.register(...registerables);

	const spotifyGreen = '#1db954';
	let data: ChartData<'line'>;
	const { min: minMonth, max: maxMonth } = minMax($simpleHistory.map((s) => new Date(s.endTime).getMonth()));
	let listenHistory: number[] = Array(maxMonth + 1 - minMonth)
		.fill(0)
		.map((n, i) => (i < minMonth ? null : n));

	const updateData = () => {
		data = {
			datasets: [
				{
					label: 'Time Listen Per Month',
					data: listenHistory,
					order: 2,
				},
			],
		};
	};

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

	const now = new Date();
	$simpleHistory.forEach((s) => {
		const date = new Date(s.endTime);
		if (date.getFullYear() === now.getFullYear()) listenHistory[date.getMonth()] += s.msPlayed / 1000 / 60;
	});
	updateData();
</script>

<div>
	<div class="chart">
		{#key data}
			<Line {data} width={100} height={50} {options} />
		{/key}
	</div>
</div>

<style>
</style>
