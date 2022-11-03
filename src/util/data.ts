import { ZipReader, BlobReader, type Entry, TextWriter, type EntryGetDataOptions } from '@zip.js/zip.js';
import type { Stream } from './spotify';

export const getEntries = async (file: Blob): Promise<Entry[]> => {
	return await new ZipReader(new BlobReader(file)).getEntries({});
};

export const getStreamingHistory = async (file: Blob): Promise<Stream[]> => {
	// await new Promise((r) => setTimeout(r, 5));

	const data = await getEntries(file);
	const streamHistory = [];

	for (const d of data) {
		if (!d.filename.startsWith('MyData/StreamingHistory')) continue;
		const rawFileData = await d.getData(new TextWriter('utf-8'));
		const parsed = JSON.parse(rawFileData);
		streamHistory.push(...parsed);
	}

	return streamHistory;
};

export interface Song {
	title: string;
	artist: string;
	totalMsPlayed: number;
}

export const getAllSongs = (history: Stream[]): Song[] => {
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

export const getListens = (song: Song, history: Stream[]) => {
	return history.filter(s => s.artistName === song.artist && s.trackName === song.title);
}


