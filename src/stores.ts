import { writable } from 'svelte/store';
import type { Stream } from './util/spotify';

export const streamingHistory = writable<Stream[] | null>(null);

export const activeSongSearch = writable<string>('');
