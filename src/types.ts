export type LineOptions = import('chart.js/types/utils.js')._DeepPartialObject<
	import('chart.js').CoreChartOptions<'line'> &
		import('chart.js').ElementChartOptions<'line'> &
		import('chart.js').PluginChartOptions<'line'> &
		import('chart.js').DatasetChartOptions<'line'> &
		import('chart.js').ScaleChartOptions<'line'> &
		import('chart.js').LineControllerChartOptions
>;
