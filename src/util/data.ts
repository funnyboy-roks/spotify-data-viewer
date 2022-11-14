import { ZipReader, BlobReader, type Entry, TextWriter, type EntryGetDataOptions } from '@zip.js/zip.js';
import type { SimpleStream, SimpleSong, ExtendedStream } from './spotify';

export const getEntries = async (file: Blob): Promise<Entry[]> => {
	return await new ZipReader(new BlobReader(file)).getEntries({});
};

export const isSimpleHistory = (data: Entry[]): boolean => {
	return data.some((d) => d.filename.startsWith('MyData/StreamingHistory'));
};

export const isExtendedHistory = (data: Entry[]): boolean => {
	return data.some((d) => d.filename.startsWith('MyData/endsong'));
};

export const getSimpleHistory = async (data: Entry[]): Promise<SimpleStream[]> => {
	const history = [];

	for (const d of data) {
		if (!d.filename.startsWith('MyData/StreamingHistory')) continue;
		const rawFileData = await d.getData(new TextWriter('utf-8'));
		const parsed = JSON.parse(rawFileData);
		history.push(...parsed);
	}

	return history;
};

export const getExtendedHistory = async (data: Entry[]): Promise<ExtendedStream[]> => {
	const history: ExtendedStream[] = [];

	for (const d of data) {
		if (!d.filename.startsWith('MyData/endsong')) continue;
		const rawFileData = await d.getData(new TextWriter('utf-8'));
		const parsed = JSON.parse(rawFileData);
		history.push(...parsed);
	}

	return history;
};

export const getSimpleSongs = (history: SimpleStream[]): SimpleSong[] => {
	const songMap = new Map<string, number>();
	const getKey = (artist: string, title: string) => artist + '§§§§§' + title;
	const fromKey = (key: string) => {
		const parts = key.split('§§§§§');
		return {
			artist: parts[0],
			title: parts[1],
		};
	};

	history.forEach((s) => {
		const key = getKey(s.artistName, s.trackName);
		const n = songMap.get(key) || 0;
		songMap.set(key, n + s.msPlayed);
	});

	return [...songMap.entries()].map(([k, v]) => ({ ...fromKey(k), totalMsPlayed: v }));
};

export const getSimpleListens = (song: SimpleSong, history: SimpleStream[]) => {
	return history.filter((s) => s.artistName === song.artist && s.trackName === song.title);
};
