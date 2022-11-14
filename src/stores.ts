import { writable } from 'svelte/store';
import type { ExtendedStream, SimpleStream } from './util/spotify';

export const simpleHistory = writable<SimpleStream[] | null>(null);
export const extendedHistory = writable<ExtendedStream[] | null>(null);

export const activeSongSearch = writable<string>('');
