import { error } from '@sveltejs/kit';
import { posts } from '$data/blog.js';

const bodies = import.meta.glob('/src/lib/blog/*/Post.svelte');

/** @type {() => { slug: string }[]} */
export const entries = () => posts.map(({ slug }) => ({ slug }));

/** @param {{ params: { slug: string } }} event */
export async function load({ params }) {
	const index = posts.findIndex((post) => post.slug === params.slug);
	const body = bodies[`/src/lib/blog/${params.slug}/Post.svelte`];
	if (index === -1 || !body) error(404, 'Not found');

	const module = /** @type {{ default: import('svelte').Component }} */ (await body());
	return {
		post: posts[index],
		newer: posts[index - 1] ?? null,
		older: posts[index + 1] ?? null,
		Body: module.default
	};
}
