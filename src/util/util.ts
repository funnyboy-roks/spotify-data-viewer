export const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

export type MinMax = {
	min: number;
	max: number;
};

export const minMax = (arr: number[]) => {
	let min = Infinity;
	let max = -Infinity;
	arr.forEach((v) => {
		if (min > v) min = v;
		if (max < v) max = v;
	});
	return { min, max };
};

export const map = (num: number, rangeFrom: MinMax, rangeTo: MinMax): number => {
	num = (num - rangeFrom.min) / (rangeFrom.max - rangeFrom.min);
	return rangeTo.min + num * (rangeTo.max - rangeTo.min);
};

export const formatTime = (time: number) => {
	const ms = time % 1000;
	const s = Math.floor(time / 1000) % 60;
	const m = Math.floor(time / 1000 / 60) % 60;
	const h = Math.floor(time / 1000 / 60 / 60) % 24;
	const d = Math.floor(time / 1000 / 60 / 60 / 24) % 30;
	const mo = Math.floor(time / 1000 / 60 / 60 / 24 / 30) % 12;
	const y = Math.floor(time / 1000 / 60 / 60 / 24 / 30 / 12);

	const sections = ['ms', 's', 'm', 'h', 'd', 'mo', 'y'].reverse();
	const data = [ms, s, m, h, d, mo, y].reverse();

	return data
		.map((v, i) => ({ v, i }))
		.filter(({ v }) => v)
		.map(({ v, i }) => v + sections[i]).join(' ');
};
