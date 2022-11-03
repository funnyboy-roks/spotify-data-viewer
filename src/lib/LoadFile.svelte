<script lang="ts">
	import { getStreamingHistory } from '../util/data';
	import { streamingHistory } from '../stores';
	let files: FileList;
	let file: any = null;

	let loading = false;

	const loadFile = async () => {
		file = files ? files[0] : undefined
		if (!file) return;
		loading = true;
		$streamingHistory = await getStreamingHistory(file);
		loading = false;
	};
</script>

<div>
	<p>Please upload the zip file that you have downloaded from Spotify.</p>
	<p>
		You can get this by going to <a href="https://www.spotify.com/us/account/privacy/">Spotify Account Privacy</a>
	</p>
	<form on:submit|preventDefault={loadFile}>
		<label for="file"> File: </label>
		<input
			type="file"
			bind:files
			accept="application/zip"
			id="file"
			aria-invalid={file !== null && !file || (files && files[0] && !files[0].name.endsWith('.zip'))}
		/>
		<small>All file processing happens in your browser, no data is sent to our servers.</small>
		<button type="submit" aria-busy={loading}>{loading ? 'Parsing Data...' : 'Use File'}</button>
	</form>
</div>

<style>
</style>
