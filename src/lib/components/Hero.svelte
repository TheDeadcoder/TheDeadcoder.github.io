<script>
	import Icon from './Icon.svelte';
	import { site, socials, stats } from '$data/site.js';
	import { setTab } from '$lib/tabs.svelte.js';
</script>

<section class="hero-glow relative isolate overflow-hidden">
	<div
		class="grid-lines pointer-events-none absolute inset-x-0 top-0 -z-10 h-[380px] opacity-[0.55]"
		aria-hidden="true"
	></div>

	<div class="mx-auto w-full max-w-6xl px-4 pt-10 pb-2 sm:px-6 sm:pt-14 lg:px-8 lg:pt-16">
		<div class="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
			<div class="max-w-2xl">
				<p
					class="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-[12.5px] text-ink-muted"
				>
					<span class="relative flex size-1.5">
						<span
							class="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75"
						></span>
						<span class="relative inline-flex size-1.5 rounded-full bg-emerald-500"></span>
					</span>
					Lecturer at BRAC University · open to research collaboration
				</p>

				<h1 class="text-4xl leading-[1.05] font-bold sm:text-5xl lg:text-[3.5rem]">
					{site.name}
				</h1>
				<p class="mt-3 text-lg font-medium text-accent sm:text-xl">
					{site.headline}
				</p>

				<p class="mt-5 max-w-xl text-[15px] leading-relaxed text-ink-muted sm:text-base">
					{site.tagline} Computer Science &amp; Engineering graduate of
					<span class="font-medium text-ink">BUET</span>, with published research on memory
					architectures for conversational web agents.
				</p>

				<div class="mt-7 flex flex-wrap items-center gap-3">
					<button
						type="button"
						onclick={() => setTab('projects')}
						class="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-accent-contrast transition-colors hover:bg-accent-hover"
					>
						View my work
						<Icon name="arrowRight" size={16} />
					</button>
					<a
						href={site.resume}
						target="_blank"
						rel="noopener"
						class="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-4 py-2.5 text-sm font-medium transition-colors hover:border-line-strong"
					>
						<Icon name="download" size={16} />
						Résumé
					</a>

					<div class="ml-1 flex items-center gap-0.5">
						{#each socials as s (s.label)}
							<a
								href={s.href}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={s.label}
								title={s.label}
								class="grid size-9 place-items-center rounded-lg text-ink-subtle transition-colors hover:bg-surface-2 hover:text-ink"
							>
								<Icon name={s.icon} size={17} />
							</a>
						{/each}
					</div>
				</div>
			</div>

			<div class="order-first justify-self-center lg:order-none lg:justify-self-end">
				<div class="relative">
					<div
						class="absolute -inset-3 -z-10 rounded-[2rem] bg-accent-soft blur-2xl"
						aria-hidden="true"
					></div>
					<img
						src={site.avatar}
						alt="Portrait of {site.name}"
						width="260"
						height="260"
						fetchpriority="high"
						decoding="async"
						class="size-40 rounded-3xl border border-line bg-surface-2 object-cover object-top shadow-sm sm:size-52 lg:size-60"
					/>
				</div>
			</div>
		</div>

		<dl class="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
			{#each stats as stat (stat.label)}
				<div class="bg-surface px-4 py-4 sm:px-5 sm:py-5">
					<dt class="text-[11.5px] tracking-wide text-ink-subtle uppercase">{stat.label}</dt>
					<dd class="mt-1 font-mono text-xl font-semibold sm:text-2xl">{stat.value}</dd>
				</div>
			{/each}
		</dl>
	</div>
</section>
