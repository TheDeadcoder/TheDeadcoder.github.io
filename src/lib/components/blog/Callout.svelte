<script>
	import Icon from '../Icon.svelte';

	/** @type {{ title: string, children: import('svelte').Snippet }} */
	let { title, children } = $props();
</script>

<aside class="my-8 rounded-2xl bg-accent-soft px-5 py-4 sm:px-6 sm:py-5">
	<p class="flex items-center gap-2 text-sm font-semibold text-accent">
		<Icon name="sparkles" size={16} />
		{title}
	</p>
	<div class="mt-2 text-base leading-relaxed text-ink lg:text-[17px]">{@render children()}</div>
</aside>
