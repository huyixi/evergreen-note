<script lang="ts">
	import { onMount } from 'svelte';

	let indexNote: string = '';
	async function fetchNote(slug: string) {
		const fetchPrefix = 'https://api.github.com/repos/huyixi/evergreen-files/contents';
		const res = await fetch(`${fetchPrefix}/${slug}.md`);
		const data = await res.json();

		const base64Content = data.content;

		const decodedContent = atob(base64Content);

		const { marked } = await import('marked');
		const htmlContent = marked(decodedContent);

		return htmlContent;
	}

	onMount(async () => {
		indexNote = await fetchNote('index');
		console.log(indexNote);
	});
</script>

<div>
	<h1>Notes</h1>
	<div>
		{#if indexNote}
			{@html indexNote}
		{:else}
			<p>Loading...</p>
		{/if}
	</div>
</div>
