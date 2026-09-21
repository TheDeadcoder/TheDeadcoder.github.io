<script>
	import SectionHeading from '../SectionHeading.svelte';
	import Icon from '../Icon.svelte';
	import Tag from '../Tag.svelte';
	import { reveal } from '$lib/actions/reveal.js';
	import {
		researchCards,
		researchExperience,
		researchInterests,
		collaborationNote
	} from '$data/research.js';
</script>

<SectionHeading
	icon="beaker"
	eyebrow="Research"
	title="Publications & interests"
	lead="I care about what happens after the benchmark number: how agents remember, how post-training actually behaves, and how people work alongside these systems."
/>
<div class="space-y-4">
	{#each researchCards as card (card.title)}
		<article
			use:reveal
			class="rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-line-strong sm:p-7"
		>
			<div class="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
				<div class="min-w-0 flex-1">
					{#if card.badges?.length}
						<div class="mb-3 flex flex-wrap items-center gap-2">
							{#each card.badges as badge}
								{#if badge.kind === 'year'}
									<span
										class="rounded-md bg-accent-soft px-2 py-0.5 font-mono text-[11px] font-medium text-accent"
									>
										{badge.text}
									</span>
								{:else}
									<span class="text-[12.5px] text-ink-subtle">{badge.text}</span>
								{/if}
							{/each}
						</div>
					{/if}

					<h4 class="text-[17px] leading-snug font-semibold text-balance sm:text-[19px]">
						{card.title}
					</h4>

					{#if card.lines?.length}
						{#each card.lines as line, lineIndex}
							<p class={lineIndex === 0 ? 'mt-3 text-[14px] text-ink-muted' : 'mt-1 text-[14px] text-ink-muted'}>
								<span class="text-ink-subtle">{line.label}</span>
								{#if line.people?.length}
									{#each line.people as person, i}
										<a
											href={person.url}
											target="_blank"
											rel="noopener noreferrer"
											class="font-medium text-accent hover:underline">{person.name}</a
										>{#if i < line.people.length - 1}<span>{line.joiner ?? ', '}</span>{/if}
									{/each}
								{:else if line.text}
									<span>{line.text}</span>
								{/if}
							</p>
						{/each}
					{/if}
				</div>

				{#if card.venueLogo}
					<div class="flex shrink-0 items-center gap-4 lg:flex-col lg:items-end">
						<img
							src={card.venueLogo}
							alt=""
							width="56"
							height="56"
							loading="lazy"
							class="size-14 rounded-xl bg-surface-2 object-contain p-1.5 ring-1 ring-line"
						/>
					</div>
				{/if}
			</div>

			<div class="mt-6 border-t border-line pt-5">
				<p class="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13.5px] text-ink-muted">
					<span
						class="mt-0.5 size-2 shrink-0 rounded-full {card.status.state === 'published'
							? 'bg-accent'
							: card.status.blink
								? 'animate-pulse bg-amber-400'
								: 'border border-line-strong'}"
						aria-hidden="true"
					></span>
					<span class={card.status.state === 'published' ? 'text-ink' : 'text-ink-muted'}>
						{#if card.status.href}
							<a
								href={card.status.href}
								target="_blank"
								rel="noopener noreferrer"
								class="font-medium text-accent hover:underline">{card.status.text}</a
							>
						{:else}
							{card.status.text}
						{/if}
					</span>
				</p>

				{#if card.tags?.length}
					<div class="mt-4 flex flex-wrap gap-1.5">
						{#each card.tags as tag}
							<Tag>{tag}</Tag>
						{/each}
					</div>
				{/if}

				{#if card.links?.length}
					<div class="mt-5 flex flex-wrap items-center gap-2">
						{#each card.links as link}
							<a
								href={link.href}
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex w-fit items-center gap-1.5 rounded-lg border border-line px-2.5 py-1.5 text-[12.5px] font-medium text-ink-muted transition-colors hover:border-line-strong hover:text-ink"
							>
								<Icon name={link.icon ?? 'external'} size={14} />
								{link.label}
							</a>
						{/each}
					</div>
				{/if}
			</div>
		</article>
	{/each}
</div>

<h3 class="mt-12 mb-4 text-[13px] font-semibold tracking-wide text-ink-subtle uppercase">
	Research experience
</h3>

<article
	use:reveal
	class="rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-line-strong sm:p-7"
>
	<div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
		{#if researchExperience.logo}
			<img
				src={researchExperience.logo}
				alt=""
				width="84"
				height="84"
				loading="lazy"
				decoding="async"
				class="size-16 shrink-0 rounded-xl bg-surface-2 object-cover ring-1 ring-line sm:size-20"
			/>
		{/if}
		<div class="min-w-0 flex-1">
			<p class="text-[14px] text-ink-muted">
				<span class="text-ink-subtle">Role</span>
				<span class="font-medium text-ink">{researchExperience.role}</span>
			</p>
			<p class="mt-1 text-[14px] text-ink-muted">
				<span class="text-ink-subtle">Program</span>
				<a
					href={researchExperience.program.href}
					target="_blank"
					rel="noopener noreferrer"
					class="font-medium text-accent hover:underline">{researchExperience.program.name}</a
				>
			</p>
			<p class="mt-1 text-[14px] text-ink-muted">
				<span class="text-ink-subtle">Dates</span>
				<span>{researchExperience.dates}</span>
			</p>
			<p class="mt-1 text-[14px] text-ink-muted">
				<span class="text-ink-subtle">{researchExperience.collaboration.label}</span>
				{#each researchExperience.collaboration.people as person, i}
					<a
						href={person.url}
						target="_blank"
						rel="noopener noreferrer"
						class="font-medium text-accent hover:underline">{person.name}</a
					>{#if i < researchExperience.collaboration.people.length - 1}<span>{researchExperience.collaboration.joiner ?? ', '}</span>{/if}
				{/each}
			</p>
		</div>
	</div>
</article>

<h3 class="mt-12 mb-4 text-[13px] font-semibold tracking-wide text-ink-subtle uppercase">
	Research interests
</h3>

<div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
	{#each researchInterests as interest, i (interest.name)}
		<div
			use:reveal={{ delay: i * 40 }}
			class="rounded-xl border border-line bg-surface p-4 transition-colors hover:border-line-strong"
		>
			<p class="text-[14.5px] font-medium">{interest.name}</p>
			<p class="mt-1 text-[13px] text-ink-subtle">{interest.note}</p>
		</div>
	{/each}
</div>

<div
	use:reveal
	class="mt-10 rounded-2xl border border-line bg-accent-soft/50 p-6 text-center sm:p-8"
>
	<h3 class="text-[19px] font-semibold">Open to collaboration</h3>
	<p class="mx-auto mt-2 max-w-xl text-[14.5px] leading-relaxed text-ink-muted">
		I'm actively looking for research collaborations in {collaborationNote.focus}.
		{collaborationNote.closing}
	</p>
	<a
		href="#contact"
		class="mt-5 inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-accent-contrast transition-colors hover:bg-accent-hover"
	>
		<Icon name="mail" size={16} />
		Get in touch
	</a>
</div>
