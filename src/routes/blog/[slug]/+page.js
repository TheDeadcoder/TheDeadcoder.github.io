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
	const post = posts[index];

	// Three other posts: those sharing the most tags first, then the nearest in time.
	const more = posts
		.map((other, i) => ({
			other,
			shared: other.tags.filter((tag) => post.tags.includes(tag)).length,
			distance: Math.abs(i - index)
		}))
		.filter(({ other }) => other.slug !== post.slug)
		.sort((a, b) => b.shared - a.shared || a.distance - b.distance)
		.slice(0, 3)
		.map(({ other }) => other);

	return { post, more, Body: module.default };
}
