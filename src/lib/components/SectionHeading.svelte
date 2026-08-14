<script>
	import Icon from './Icon.svelte';

	/** @type {{ icon?: string, eyebrow?: string, title: string, lead?: string }} */
	let { icon = '', eyebrow = '', title, lead = '' } = $props();
</script>

<header class="mb-10 sm:mb-14">
	{#if eyebrow}
		<p
			class="mb-3 flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] text-accent uppercase"
		>
			{#if icon}<Icon name={icon} size={14} />{/if}
			{eyebrow}
		</p>
	{/if}
	<h2 class="text-2xl font-semibold sm:text-3xl md:text-[2.1rem]">{title}</h2>
	{#if lead}
		<p class="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-muted">{lead}</p>
	{/if}
</header>
