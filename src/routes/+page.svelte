<script lang="ts">
	import { onMount } from 'svelte';

	interface Note {
		slug: string;
		html: string;
	}

	let notes: Note[] = [];

	async function fetchNote(slug: string): Promise<Note> {
		const res = await fetch(`/api/notes?slug=${slug}`);
		const data = await res.json();
		const note = data.data.html;
		return { slug, html: note };
	}

	onMount(async () => {
		const initialNote = await fetchNote('note1');
		const note2 = await fetchNote('note2');
		notes = [initialNote, note2];
	});
</script>

<div>
	{#each notes as note}
		<div>
			{@html note}
		</div>
	{/each}
</div>
