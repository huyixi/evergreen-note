import fs from 'fs';
import path from 'path';
import { error, json } from '@sveltejs/kit';
import { compile } from 'mdsvex';
import { timeStamp } from 'console';

const notesDir = path.resolve(process.cwd(), 'notes');

export async function GET({ url }: { url: URL }) {
	const slug = url.searchParams.get('slug');

	if (!slug) {
		throw error(400, { message: 'Slug is required' });
	}

	const filePath = path.join(notesDir, `${slug}.svx`);
	if (!fs.existsSync(filePath)) {
		throw error(404, { message: 'Note not found' });
	}

	try {
		const content = fs.readFileSync(filePath, 'utf-8');
		const compiled = await compile(content);
		if (!compiled) {
			throw error(500, { message: 'Failed to compile the note' });
		}
		console.log('compiled:', compiled);

		return json({
			status: 'success',
			data: {
				slug: slug,
				html: compiled.code
			},
			meta: {
				message: 'Note fetched successfully',
				timeStamp: Date.now()
			}
		});
	} catch (err) {
		throw error(500, new Error('Failed to read or serialize the note: ' + (err as Error).message));
	}
}
