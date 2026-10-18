<script>
	import SectionHeading from '../SectionHeading.svelte';
	import Tag from '../Tag.svelte';
	import { reveal } from '$lib/actions/reveal.js';
	import { posts } from '$data/blog.js';
	import { formatDate } from '$lib/format.js';

	const covers = /** @type {Record<string, import('svelte').Component>} */ (
		import.meta.glob('/src/lib/blog/*/Cover.svelte', { eager: true, import: 'default' })
	);

	const [latest, ...earlier] = posts;
	const LatestCover = latest ? covers[`/src/lib/blog/${latest.slug}/Cover.svelte`] : undefined;
</script>

<SectionHeading
	icon="book"
	eyebrow="Blog"
	title="Research, in plain words"
	lead="Short write-ups of my papers and projects: what we asked, what we found, and the figures that tell the story."
/>

{#if latest}
	<article
		use:reveal
		class="relative grid gap-6 rounded-2xl border border-line bg-surface p-4 transition-colors hover:border-line-strong sm:p-5 lg:grid-cols-[minmax(0,25rem)_minmax(0,1fr)] lg:items-center lg:gap-10"
	>
		<div class="aspect-[16/10] overflow-hidden rounded-xl bg-surface-2">
			{#if LatestCover}<LatestCover />{/if}
		</div>
		<div class="lg:pr-4">
			<p class="flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-ink-muted">
				<time datetime={latest.date}>{formatDate(latest.date)}</time>
				<span>{latest.readingTime} min read</span>
			</p>
			<h3 class="mt-2 font-serif text-[22px] leading-snug font-medium lg:text-[26px]">
				<a
					href="/blog/{latest.slug}"
					class="transition-colors after:absolute after:inset-0 after:rounded-2xl hover:text-accent"
					>{latest.title}</a
				>
			</h3>
			<p class="mt-3 text-[15px] leading-relaxed text-ink-muted">{latest.summary}</p>
			<div class="mt-4 flex flex-wrap gap-1.5">
				{#each latest.tags as tag (tag)}
					<Tag>{tag}</Tag>
				{/each}
			</div>
			<p class="mt-5 text-sm font-medium text-accent" aria-hidden="true">Read the post</p>
		</div>
	</article>
{/if}

{#if earlier.length}
	<h3 class="mt-12 mb-4 text-[13px] font-semibold tracking-wide text-ink-subtle uppercase">
		Earlier posts
	</h3>
	<ul class="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
		{#each earlier as post (post.slug)}
			<li class="relative p-5 transition-colors hover:bg-surface-2/60 sm:p-6">
				<p class="flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-ink-muted">
					<time datetime={post.date}>{formatDate(post.date)}</time>
					<span>{post.readingTime} min read</span>
				</p>
				<h4 class="mt-1.5 font-serif text-lg leading-snug font-medium">
					<a href="/blog/{post.slug}" class="after:absolute after:inset-0">{post.title}</a>
				</h4>
				<p class="mt-2 text-[15px] leading-relaxed text-ink-muted">{post.summary}</p>
			</li>
		{/each}
	</ul>
{/if}
