<script lang="ts">
	import type { Entry } from '@zip.js/zip.js';
	import { getEntries, getExtendedHistory, getSimpleHistory, isExtendedHistory, isSimpleHistory } from '../util/data';
	import { simpleHistory, extendedHistory } from '../stores';
	let files: FileList;
	let file: any = null;

	let loading = false;

	let fileState: 'empty' | 'reading' | 'valid' | 'invalid' = 'empty';
	let errorMsg = '';
	let entries: Entry[];

	const onUploadFile = async () => {
		fileState = 'reading';
		await new Promise((r) => setTimeout(r, 1)); // Delay necessary for the files array to update
		file = files ? files[0] : undefined;
		if (!file) return (fileState = 'invalid'), (errorMsg = 'Please upload a file.');
		try {
			entries = await getEntries(file);
			if (!entries) throw (errorMsg = 'Please use a .zip file.');
			if (!isSimpleHistory(entries) && !isExtendedHistory(entries))
				throw (errorMsg =
					'This file does not have Spotify Streaming data, make sure you are using your Account Data or Extended Streaming History Data.');
			fileState = 'valid';
			errorMsg = '';
		} catch (e) {
			fileState = 'invalid';
			if (!errorMsg) errorMsg = 'Please use a .zip file';
			entries = undefined;
		}
	};

	const loadFile = async () => {
		loading = true;
		if (entries.find((d) => d.filename.startsWith('MyData/StreamingHistory'))) $simpleHistory = await getSimpleHistory(entries);
		else $extendedHistory = await getExtendedHistory(entries);
		loading = false;
	};
</script>

<div>
	<p>To get your streaming data, go to <a href="https://www.spotify.com/us/account/privacy/">Spotify Account Privacy</a>.</p>
	<p>
		You can use either the Account Data or Extended Streaming History. Extended Streaming History takes longer to receive, though it has more
		details and longer history. You can read more on the <a href="https://www.spotify.com/us/account/privacy/">Spotify Account Privacy</a> Page.
	</p>
	<form on:submit|preventDefault={loadFile}>
		<input
			type="file"
			bind:files
			on:input={onUploadFile}
			accept="application/zip"
			id="file"
			aria-invalid={fileState === 'empty' || fileState === 'reading' ? null : fileState === 'invalid'}
			aria-busy={fileState == 'reading'}
		/>
		<small class="error">{errorMsg}</small>
		<button type="submit" aria-busy={loading || fileState === 'reading'} disabled={fileState !== 'valid' || loading}
			>{fileState === 'reading' ? 'Validating Data...' : loading ? 'Reading Data...' : 'Use File'}</button
		>
		<small>All file processing happens in your browser, no data is sent to our servers.</small>
	</form>
</div>

<style>
	.error {
		color: var(--del-color);
	}
</style>
