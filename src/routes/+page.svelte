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
		return data.data.html;
	}

	onMount(async () => {
		const indexNote = await fetchNote('index');
		const note2 = await fetchNote('note2');
		const note3 = await fetchNote('note3');
		notes = [indexNote, note2, note3];
	});
</script>

<div>
	{#each notes as note}
		<div>
			{@html note}
		</div>
	{/each}
</div>
