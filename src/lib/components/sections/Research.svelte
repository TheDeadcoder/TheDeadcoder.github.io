<script>
	import SectionHeading from '../SectionHeading.svelte';
	import Icon from '../Icon.svelte';
	import { reveal } from '$lib/actions/reveal.js';
	import { researchInterests, publications } from '$data/research.js';
</script>

<SectionHeading
	icon="beaker"
	eyebrow="Research"
	title="Publications & interests"
	lead="I care about what happens after the benchmark number — how agents remember, how post-training actually behaves, and how people work alongside these systems."
/>

<h3 class="mb-4 text-[13px] font-semibold tracking-wide text-ink-subtle uppercase">Publications</h3>

<div class="space-y-4">
	{#each publications as pub (pub.title)}
		<article
			use:reveal
			class="rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-line-strong sm:p-7"
		>
			<div class="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
				<div class="min-w-0 flex-1">
					<div class="mb-3 flex flex-wrap items-center gap-2">
						<span
							class="rounded-md bg-accent-soft px-2 py-0.5 font-mono text-[11px] font-medium text-accent"
						>
							{pub.year}
						</span>
						<span class="text-[12.5px] text-ink-subtle">Peer-reviewed workshop paper</span>
					</div>

					<h4 class="text-[17px] leading-snug font-semibold text-balance sm:text-[19px]">
						{pub.title}
					</h4>

					<p class="mt-3 text-[14px] text-ink-muted">
						<span class="text-ink-subtle">Supervised by</span>
						<a
							href={pub.supervisor.url}
							target="_blank"
							rel="noopener noreferrer"
							class="font-medium text-accent hover:underline">{pub.supervisor.name}</a
						>
					</p>
					<p class="mt-1 text-[14px] text-ink-muted">
						<span class="text-ink-subtle">Mentored by</span>
						{#each pub.mentors as m, i}
							<a
								href={m.url}
								target="_blank"
								rel="noopener noreferrer"
								class="font-medium text-accent hover:underline">{m.name}</a
							>{#if i < pub.mentors.length - 1}<span>,&nbsp;</span>{/if}
						{/each}
					</p>
				</div>

				<div class="flex shrink-0 items-center gap-4 lg:flex-col lg:items-end">
					<img
						src={pub.venueLogo}
						alt=""
						width="56"
						height="56"
						loading="lazy"
						class="size-14 rounded-xl bg-surface-2 object-contain p-1.5 ring-1 ring-line"
					/>
				</div>
			</div>

			<div
				class="mt-6 flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between"
			>
				<p class="text-[13.5px] text-ink-muted">
					Published in
					<a
						href={pub.venueUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="font-medium text-accent hover:underline">{pub.venue}</a
					>
				</p>
				<a
					href={pub.paperUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex w-fit items-center gap-2 rounded-xl bg-accent px-4 py-2 text-[13.5px] font-medium text-accent-contrast transition-colors hover:bg-accent-hover"
				>
					<Icon name="file" size={15} />
					Read the paper
				</a>
			</div>
		</article>
	{/each}
</div>

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
		I'm actively looking for research collaborations in LLM post-training, agent memory and
		low-resource NLP. If you're working on something adjacent, I'd like to hear about it.
	</p>
	<a
		href="#contact"
		class="mt-5 inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-accent-contrast transition-colors hover:bg-accent-hover"
	>
		<Icon name="mail" size={16} />
		Get in touch
	</a>
</div>
