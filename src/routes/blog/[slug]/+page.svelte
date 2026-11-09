<script>
	import Icon from '$components/Icon.svelte';
	import Tag from '$components/Tag.svelte';
	import { site } from '$data/site.js';
	import { formatDate } from '$lib/format.js';

	/** @typedef {(typeof import('$data/blog.js').posts)[number]} Post */
	/** @type {{ data: { post: Post, more: Post[], Body: import('svelte').Component } }} */
	let { data } = $props();

	const covers = /** @type {Record<string, import('svelte').Component>} */ (
		import.meta.glob('/src/lib/blog/*/Cover.svelte', { eager: true, import: 'default' })
	);

	let post = $derived(data.post);
	let url = $derived(`${site.url}/blog/${post.slug}`);
	let writers = $derived(post.authors ?? [{ name: site.name, position: site.position.join(', ') }]);
	let people = $derived(
		writers.map((writer) => ({
			'@type': 'Person',
			name: writer.name,
			...(writer.name === site.name ? { url: site.url } : {})
		}))
	);
	let jsonLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: post.title,
		description: post.summary,
		datePublished: post.date,
		keywords: post.tags.join(', '),
		url,
		mainEntityOfPage: url,
		image: `${site.url}${site.ogImage}`,
		author: people.length === 1 ? people[0] : people
	});
</script>

<svelte:head>
	<title>{post.title} | {site.name}</title>
	<meta name="description" content={post.summary} />
	<meta name="author" content={writers.map((writer) => writer.name).join(', ')} />
	<link rel="canonical" href={url} />

	<meta property="og:type" content="article" />
	<meta property="og:site_name" content={site.name} />
	<meta property="og:title" content={post.title} />
	<meta property="og:description" content={post.summary} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content="{site.url}{site.ogImage}" />
	<meta property="article:published_time" content={post.date} />
	{#each post.tags as tag (tag)}
		<meta property="article:tag" content={tag} />
	{/each}

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={post.title} />
	<meta name="twitter:description" content={post.summary} />
	<meta name="twitter:image" content="{site.url}{site.ogImage}" />

	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</` + `script>`}
</svelte:head>

<article class="mx-auto w-full max-w-6xl px-4 pt-8 sm:px-6 lg:px-8 lg:pt-12">
	<div class="mx-auto max-w-[38rem]">
		<a
			href="/#blog"
			class="inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-accent"
		>
			<Icon name="arrowLeft" size={15} />
			All posts
		</a>

		<header class="mt-8">
			<p class="flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink-muted">
				<time datetime={post.date}>{formatDate(post.date)}</time>
				<span>{post.readingTime} min read</span>
			</p>
			<h1 class="mt-3 font-serif text-[32px] leading-[1.12] font-medium lg:text-[44px]">
				{post.title}
			</h1>
			<p class="mt-5 text-lg leading-relaxed text-ink-muted lg:text-xl">{post.summary}</p>

			<div class="mt-6 flex flex-wrap gap-1.5 border-b border-line pb-7">
				{#each post.tags as tag (tag)}
					<Tag>{tag}</Tag>
				{/each}
			</div>
		</header>

		<div class="post-body mt-10">
			<data.Body />
		</div>

		<footer class="mt-14 border-t border-line pt-8">
			{#if writers.length > 1}
				<p class="text-[13px] font-medium text-ink-muted">Written by</p>
				<ul class="mt-3 grid gap-x-6 gap-y-4 sm:grid-cols-3">
					{#each writers as writer (writer.name)}
						<li>
							<p class="font-medium text-ink">{writer.name}</p>
							<p class="mt-0.5 text-[14px] leading-snug text-ink-muted">{writer.position}</p>
						</li>
					{/each}
				</ul>
			{:else}
				<p class="font-medium text-ink">{writers[0].name}</p>
				<p class="mt-0.5 text-[15px] text-ink-muted">{writers[0].position}</p>
			{/if}
		</footer>
	</div>

	<section aria-labelledby="more-posts" class="mx-auto mt-16 max-w-5xl">
		{#if data.more.length}
			<h2 id="more-posts" class="font-serif text-[26px] leading-tight font-medium lg:text-[30px]">
				More posts
			</h2>
			<div class="mt-6 grid gap-4 md:grid-cols-3">
				{#each data.more as other (other.slug)}
					{@const Cover = covers[`/src/lib/blog/${other.slug}/Cover.svelte`]}
					<article
						class="relative flex flex-col rounded-2xl border border-line bg-surface p-3 transition-colors hover:border-line-strong"
					>
						<div class="aspect-[16/10] overflow-hidden rounded-xl bg-surface-2">
							{#if Cover}<Cover />{/if}
						</div>
						<div class="px-2 pt-4 pb-2">
							<p class="flex flex-wrap gap-x-3 gap-y-0.5 text-[12.5px] text-ink-muted">
								<time datetime={other.date}>{formatDate(other.date)}</time>
								<span>{other.readingTime} min read</span>
							</p>
							<h3 class="mt-1.5 font-serif text-[19px] leading-snug font-medium">
								<a
									href="/blog/{other.slug}"
									class="transition-colors after:absolute after:inset-0 after:rounded-2xl hover:text-accent"
									>{other.title}</a
								>
							</h3>
							<p class="mt-2 line-clamp-3 text-[14px] leading-relaxed text-ink-muted">
								{other.summary}
							</p>
						</div>
					</article>
				{/each}
			</div>
		{/if}

		<a
			href="/#blog"
			class="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-accent underline decoration-accent/35 underline-offset-4 transition-colors hover:decoration-accent"
		>
			<Icon name="arrowLeft" size={15} />
			All posts
		</a>
	</section>
</article>

<style>
	/* Shared typography for every post body. Posts write plain elements; figures,
	   charts and callouts bring their own styles. */
	.post-body {
		counter-reset: figure;
		font-size: 1.0625rem;
		line-height: 1.75;
		color: var(--ink);
	}

	.post-body > :global(p) {
		margin: 0 0 1.25em;
	}

	.post-body > :global(h2) {
		margin: 2.4em 0 0.6em;
		font-family: var(--font-serif);
		font-size: 1.625rem;
		font-weight: 500;
		line-height: 1.2;
		letter-spacing: -0.01em;
		scroll-margin-top: 8rem;
	}

	.post-body > :global(h3) {
		margin: 2em 0 0.5em;
		font-size: 1.125rem;
		font-weight: 600;
		line-height: 1.35;
		scroll-margin-top: 8rem;
	}

	.post-body > :global(ul),
	.post-body > :global(ol) {
		margin: 0 0 1.4em;
		padding-left: 1.4em;
	}

	.post-body > :global(ul) {
		list-style: disc;
	}

	.post-body > :global(ol) {
		list-style: decimal;
	}

	.post-body > :global(:is(ul, ol) > li) {
		margin-top: 0.6em;
		padding-left: 0.3em;
	}

	.post-body > :global(:is(ul, ol) > li::marker) {
		color: var(--ink-muted);
	}

	.post-body :global(strong) {
		font-weight: 600;
	}

	.post-body > :global(:is(p, ul, ol) a:not(.cite)) {
		color: var(--accent);
		text-decoration: underline;
		text-decoration-color: color-mix(in oklab, var(--accent) 35%, transparent);
		text-underline-offset: 3px;
	}

	.post-body :global(a.cite) {
		margin-left: 0.1em;
		font-size: 0.72em;
		font-weight: 600;
		line-height: 0;
		vertical-align: super;
		color: var(--accent);
		text-decoration: none;
	}

	.post-body :global(a.cite:hover) {
		text-decoration: underline;
	}

	@media (min-width: 64rem) {
		.post-body {
			font-size: 1.125rem;
		}

		.post-body > :global(h2) {
			font-size: 1.875rem;
		}
	}
</style>
