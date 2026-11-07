<script>
	import Icon from '../Icon.svelte';
	import Tag from '../Tag.svelte';
	import { reveal } from '$lib/actions/reveal.js';

	/** @type {{ items: (typeof import('$data/environments.js').environments) }} */
	let { items } = $props();

	const button =
		'inline-flex items-center gap-1.5 rounded-lg border border-line px-2.5 py-1.5 text-[12.5px] font-medium text-ink-muted transition-colors hover:border-line-strong hover:text-ink';
</script>

<div class="grid gap-4 lg:grid-cols-2">
	{#each items as env, i (env.name)}
		<article
			use:reveal={{ delay: i * 50 }}
			class="flex flex-col rounded-2xl border border-accent/25 bg-surface p-5 transition-colors duration-200 hover:border-line-strong sm:p-6"
		>
			<div class="flex flex-wrap gap-1.5">
				{#each env.kinds as kind (kind)}
					<Tag tone="accent">{kind}</Tag>
				{/each}
			</div>

			<div class="mt-4 flex items-start gap-3">
				<span
					aria-hidden="true"
					class="grid size-10 shrink-0 place-items-center rounded-xl bg-surface-2 text-accent ring-1 ring-line"
				>
					<Icon name={env.icon} size={19} />
				</span>
				<div class="min-w-0 flex-1">
					<h4 class="text-[17px] leading-snug font-semibold">{env.name}</h4>
					<p class="mt-0.5 text-[12.5px] text-ink-subtle">{env.tagline}</p>
				</div>
			</div>

			<p class="mt-4 text-[14px] leading-relaxed text-ink-muted">{env.summary}</p>

			<dl
				class="mt-5 grid gap-x-4 gap-y-3 rounded-xl bg-surface-2/60 p-4 text-[13.5px] leading-snug sm:grid-cols-[5.5rem_minmax(0,1fr)]"
			>
				{#each env.loop as row (row.label)}
					<dt class="font-medium text-ink-subtle">{row.label}</dt>
					<dd class="-mt-2.5 text-ink sm:mt-0">{row.text}</dd>
				{/each}
			</dl>

			{#if env.highlight}
				<p class="mt-4 flex flex-1 gap-2.5 text-[13.5px] leading-relaxed text-ink-muted">
					<Icon name="sparkles" size={15} class="mt-0.5 shrink-0 text-accent" />
					<span>{env.highlight}</span>
				</p>
			{/if}

			<div class="mt-4 flex flex-wrap gap-1.5">
				{#each env.stack as tech (tech)}
					<Tag>{tech}</Tag>
				{/each}
			</div>

			<div class="mt-5 flex flex-wrap items-center gap-2 border-t border-line pt-4">
				{#each env.links as link (link.href)}
					{@const external = !link.href.startsWith('/')}
					<a
						href={link.href}
						target={external ? '_blank' : undefined}
						rel={external ? 'noopener noreferrer' : undefined}
						class={button}
					>
						<Icon name={link.icon} size={14} />
						{link.label}
					</a>
				{/each}
			</div>
		</article>
	{/each}
</div>
