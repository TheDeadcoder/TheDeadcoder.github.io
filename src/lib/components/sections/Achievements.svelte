<script>
	import SectionHeading from '../SectionHeading.svelte';
	import Icon from '../Icon.svelte';
	import { reveal } from '$lib/actions/reveal.js';
	import { achievements } from '$data/achievements.js';

	/** @type {HTMLDialogElement | undefined} */
	let dialog = $state();
	let active = $state({ src: '', name: '' });

	const total = achievements.reduce((n, y) => n + y.events.length, 0);
	const wins = achievements.reduce(
		(n, y) => n + y.events.filter((e) => e.rank === 'gold').length,
		0
	);

	const rankStyle = {
		gold: 'bg-amber-400/15 text-amber-600 dark:text-amber-400 ring-amber-500/25',
		silver: 'bg-slate-400/15 text-slate-600 dark:text-slate-300 ring-slate-400/25',
		bronze: 'bg-orange-500/10 text-orange-700 dark:text-orange-400 ring-orange-500/20'
	};

	/** @param {{src: string, name: string}} item */
	function open(item) {
		active = item;
		dialog?.showModal();
	}
</script>

<SectionHeading
	icon="trophy"
	eyebrow="Achievements"
	title="Competitions & awards"
	lead="{wins} first-place finishes across {total} national hackathons, datathons and programming contests."
/>

<div class="space-y-10">
	{#each achievements as group (group.year)}
		<section use:reveal>
			<div class="mb-4 flex items-center gap-4">
				<h3 class="font-mono text-[15px] font-semibold text-ink">{group.year}</h3>
				<div class="h-px flex-1 bg-line" aria-hidden="true"></div>
				<span class="font-mono text-[12px] text-ink-subtle">
					{group.events.length}
					{group.events.length === 1 ? 'entry' : 'entries'}
				</span>
			</div>

			<ul class="grid gap-3 sm:grid-cols-2">
				{#each group.events as event, i (event.name)}
					<li
						use:reveal={{ delay: i * 40 }}
						class="flex items-start gap-4 rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-line-strong"
					>
						<span
							class="grid size-10 shrink-0 place-items-center rounded-xl ring-1 {rankStyle[
								event.rank
							]}"
							aria-hidden="true"
						>
							<Icon name={event.rank === 'gold' ? 'trophy' : 'medal'} size={18} />
						</span>

						<div class="min-w-0 flex-1">
							<h4 class="text-[14.5px] leading-snug font-semibold">{event.name}</h4>
							<p class="mt-1 text-[13.5px] text-ink-muted">{event.result}</p>

							{#if event.certificate}
								<button
									type="button"
									onclick={() => open({ src: event.certificate, name: event.name })}
									class="mt-2.5 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-accent transition-opacity hover:opacity-80"
								>
									<Icon name="file" size={13} />
									View certificate
								</button>
							{/if}
						</div>
					</li>
				{/each}
			</ul>
		</section>
	{/each}
</div>

<dialog
	bind:this={dialog}
	onclick={(e) => {
		if (e.target === dialog) dialog?.close();
	}}
	class="m-auto w-[min(92vw,900px)] rounded-2xl border border-line bg-surface p-0 text-ink backdrop:bg-black/60 backdrop:backdrop-blur-sm"
>
	<div class="flex items-center justify-between gap-4 border-b border-line px-5 py-3.5">
		<h3 class="truncate text-[14.5px] font-semibold">{active.name}</h3>
		<button
			type="button"
			onclick={() => dialog?.close()}
			class="grid size-8 shrink-0 place-items-center rounded-lg text-ink-subtle transition-colors hover:bg-surface-2 hover:text-ink"
			aria-label="Close certificate preview"
		>
			<Icon name="close" size={17} />
		</button>
	</div>
	<div class="max-h-[75vh] overflow-auto bg-surface-2 p-4">
		{#if active.src}
			<img src={active.src} alt="Certificate for {active.name}" class="mx-auto h-auto w-full rounded-lg" />
		{/if}
	</div>
</dialog>
