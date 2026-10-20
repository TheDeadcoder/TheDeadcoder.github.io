<script>
	import { tick } from 'svelte';
	import Icon from '../Icon.svelte';
	import { site, socials } from '$data/site.js';
	import { papers, focusAreas } from '$data/research.js';
	import { openSource } from '$data/opensource.js';
	import { news } from '$data/news.js';
	import { isSettled, statusLabel } from '$lib/status.js';
	import { setTab } from '$lib/tabs.svelte.js';

	const links = [
		{ label: 'Email', icon: 'mail', href: `mailto:${site.email}` },
		{ label: 'Résumé', icon: 'file', href: site.resume },
		...['Google Scholar', 'GitHub', 'Hugging Face', 'LinkedIn'].flatMap((label) =>
			socials.filter((s) => s.label === label)
		)
	];

	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	/** @param {string} date YYYY-MM */
	const monthYear = (date) => `${months[Number(date.slice(5, 7)) - 1]} ${date.slice(0, 4)}`;

	const heading = 'font-serif text-[22px] leading-tight font-medium lg:text-2xl';
	const titleLink =
		'decoration-accent/40 underline-offset-4 transition-colors hover:text-accent hover:underline';
	const textLink =
		'font-medium text-accent underline decoration-accent/35 underline-offset-4 transition-colors hover:decoration-accent';
	const inlineLink =
		'text-accent underline decoration-accent/35 underline-offset-2 transition-colors hover:decoration-accent';

	/** @param {MouseEvent} event */
	async function openResearch(event) {
		if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
			return;
		event.preventDefault();
		setTab('research');
		await tick();
		document.getElementById('research')?.focus({ preventScroll: true });
	}
</script>

{#snippet status(/** @type {string} */ value)}
	<span class="inline-flex items-center gap-1.5 text-ink">
		<span
			aria-hidden="true"
			class="size-[7px] shrink-0 rounded-full {isSettled(value)
				? 'bg-accent'
				: 'border-[1.5px] border-accent'}"
		></span>
		{statusLabel(value)}
	</span>
{/snippet}

{#snippet textLinks(/** @type {{ label: string, href: string }[]} */ items)}
	<p class="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm">
		{#each items as link (link.href)}
			<a href={link.href} target="_blank" rel="noopener noreferrer" class={textLink}>{link.label}</a>
		{/each}
	</p>
{/snippet}

<div
	class="max-w-[36rem] lg:grid lg:max-w-none lg:grid-cols-[18rem_minmax(0,36rem)] lg:gap-x-20 lg:pt-8 xl:gap-x-24"
>
	<header class="lg:top-32 lg:self-start lg:[@media(min-height:48rem)]:sticky">
		<div class="flex items-center gap-4 lg:block">
			<img
				src={site.avatar}
				alt="Portrait of {site.name}"
				width="432"
				height="520"
				fetchpriority="high"
				decoding="async"
				class="w-[88px] shrink-0 rounded-2xl bg-surface-2 lg:w-[200px]"
			/>
			<div class="min-w-0 lg:mt-6">
				<h1 class="font-serif text-[30px] leading-[1.1] font-medium lg:text-4xl">{site.name}</h1>
				<p lang="bn" class="mt-1.5 text-[17px] leading-snug text-ink-muted lg:text-lg">
					{site.nameBn}
				</p>
				<p class="mt-2 text-sm leading-snug text-ink-muted lg:whitespace-nowrap">
					{#each site.position as line (line)}<span class="block">{line}</span>{/each}
				</p>
			</div>
		</div>

		<ul class="mt-5 flex flex-wrap gap-x-5 gap-y-1 lg:mt-7 lg:flex-col lg:gap-y-1.5">
			{#each links as link (link.label)}
				{@const external = !link.href.startsWith('mailto:')}
				<li class={link.href === site.resume ? 'max-lg:hidden' : ''}>
					<a
						href={link.href}
						target={external ? '_blank' : undefined}
						rel={external ? 'noopener noreferrer' : undefined}
						class="inline-flex items-center gap-2 py-1 text-sm text-ink-muted transition-colors hover:text-accent lg:py-0.5 lg:text-[15px]"
					>
						<Icon name={link.icon} size={16} />
						{link.label}
					</a>
				</li>
			{/each}
		</ul>

		<a
			href={site.resume}
			target="_blank"
			rel="noopener noreferrer"
			class="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-[15px] font-medium text-accent-contrast transition-colors hover:bg-accent-hover lg:hidden"
		>
			<Icon name="file" size={16} />
			Résumé
		</a>
	</header>

	<div class="mt-12 text-base leading-[1.6] lg:mt-0 lg:text-[17px]">
		<div class="space-y-4">
			{#each site.bio as paragraph (paragraph)}
				<p>{paragraph}</p>
			{/each}
		</div>

		<!-- <figure class="mt-12 lg:mt-16">
			<blockquote class="font-serif italic">
				<p class="text-[21px] leading-[1.35] lg:text-2xl">
					The drop hollows the stone, not by force but by falling often.
				</p>
			</blockquote>
			<figcaption class="mt-3 text-sm text-ink-muted"> - Ovid</figcaption>
		</figure> -->

		<section aria-labelledby="about-research" class="mt-12 lg:mt-16">
			<h2 id="about-research" class={heading}>Research</h2>
			<ul aria-label="Research interests" class="mt-4 flex flex-wrap gap-2">
				{#each focusAreas as area (area)}
					<li class="rounded-full border border-line px-3 py-1 text-sm leading-5 text-ink-muted">
						{area}
					</li>
				{/each}
			</ul>

			<ul class="mt-8 space-y-8">
				{#each papers as paper (paper.title)}
					<li>
						<h3 class="font-serif text-lg leading-snug font-medium tracking-normal lg:text-[19px]">
							<a
								href={paper.links[0].href}
								target="_blank"
								rel="noopener noreferrer"
								class={titleLink}>{paper.title}</a
							>
						</h3>
						{#if paper.authors?.length}
							<p class="mt-1.5 text-sm text-ink-muted">
								{#each paper.authors as author, i (author)}{i > 0 ? ', ' : ''}<span
										class={author === site.name ? 'font-semibold text-ink' : ''}>{author}</span
									>{/each}
							</p>
						{/if}
						<p class="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-sm text-ink-muted">
							{@render status(paper.status)}
							{#if paper.venue}<span>{paper.venue}</span>{/if}
						</p>
						<p class="mt-2.5">{paper.description}</p>
						{@render textLinks(paper.links)}
					</li>
				{/each}
			</ul>

			<p class="mt-8">
				<a href="/#research" onclick={openResearch} class={textLink}>All research</a>
			</p>
		</section>

		<section aria-labelledby="about-open-source" class="mt-12 lg:mt-16">
			<h2 id="about-open-source" class={heading}>Open source</h2>
			<ul class="mt-6 space-y-8">
				{#each openSource as item (item.name)}
					<li>
						<h3 class="font-semibold">
							<a href={item.href} target="_blank" rel="noopener noreferrer" class={titleLink}
								>{item.name}</a
							>
						</h3>
						{#if item.tagline}<p class="mt-0.5 text-sm text-ink-muted">{item.tagline}</p>{/if}
						<ul class="mt-3 space-y-5">
							{#each item.contributions as contribution (contribution.links[0].href)}
								<li>
									<p class="text-sm">{@render status(contribution.status)}</p>
									<p class="mt-1.5">{contribution.summary}</p>
									{@render textLinks(contribution.links)}
								</li>
							{/each}
						</ul>
					</li>
				{/each}
			</ul>
		</section>

		<section aria-labelledby="about-news" class="mt-12 lg:mt-16">
			<h2 id="about-news" class={heading}>News</h2>
			<ol class="mt-6">
				{#each news as item, i (i)}
					{@const first = i === 0}
					{@const last = i === news.length - 1}
					<li
						class="grid grid-cols-[1.25rem_minmax(0,1fr)] items-baseline gap-x-3 lg:grid-cols-[4.25rem_1.25rem_minmax(0,1fr)]"
					>
						<span
							aria-hidden="true"
							class="relative row-span-2 self-stretch lg:col-start-2 lg:row-span-1 lg:row-start-1"
						>
							<span
								class="absolute left-1/2 w-px -translate-x-1/2 bg-line
									{first ? 'top-3 lg:top-3.5' : 'top-0'} {last ? 'h-3 lg:h-3.5' : 'bottom-0'}"
							></span>
							<span
								class="absolute top-[0.47rem] left-1/2 size-[7px] -translate-x-1/2 rounded-full bg-ink-muted lg:top-[0.62rem]"
							></span>
						</span>
						<time
							datetime={item.date}
							class="col-start-2 text-sm text-ink-muted tabular-nums lg:col-start-1 lg:row-start-1"
							>{monthYear(item.date)}</time
						>
						<p class="col-start-2 mt-0.5 lg:col-start-3 lg:row-start-1 lg:mt-0 {last ? '' : 'pb-7'}">
							{#each item.text as part, j (j)}{#if typeof part === 'string'}{part}{:else}<a
										href={part.href}
										target="_blank"
										rel="noopener noreferrer"
										class="{part.title ? 'font-serif text-[1.06em] italic' : ''} {inlineLink}"
										>{part.text}</a
									>{/if}{/each}
						</p>
					</li>
				{/each}
			</ol>
		</section>
	</div>
</div>
