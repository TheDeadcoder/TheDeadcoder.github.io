<script>
	/** @type {{ items: { value: string, label: string }[] }} */
	let { items } = $props();
</script>

<dl
	class="my-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4"
>
	{#each items as item (item.label)}
		<div class="flex flex-col-reverse justify-end gap-1 bg-surface px-4 py-4">
			<dt class="text-[13px] leading-snug text-ink-muted">{item.label}</dt>
			<dd class="text-2xl font-semibold text-ink">{item.value}</dd>
		</div>
	{/each}
</dl>
