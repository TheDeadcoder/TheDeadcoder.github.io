<script>
	import Icon from './Icon.svelte';
	import { tabs, tabState, setTab } from '$lib/tabs.svelte.js';

	/** @type {HTMLDivElement | undefined} */
	let strip = $state();
	/** @type {HTMLButtonElement[]} */
	let buttons = $state([]);
	let indicator = $state({ left: 0, width: 0, ready: false });

	function measure() {
		const i = tabs.findIndex((t) => t.id === tabState.active);
		const el = buttons[i];
		if (!el || !strip) return;
		indicator = { left: el.offsetLeft, width: el.offsetWidth, ready: true };
	}

	let mounted = false;

	$effect(() => {
		// Re-measure whenever the active tab changes.
		tabState.active;
		measure();

		// Keep the active tab visible in the scrollable strip. Done by setting
		// scrollLeft rather than scrollIntoView so the page itself never moves.
		const el = buttons[tabs.findIndex((t) => t.id === tabState.active)];
		if (!el || !strip) return;
		const target = el.offsetLeft - (strip.clientWidth - el.offsetWidth) / 2;
		const left = Math.max(0, Math.min(target, strip.scrollWidth - strip.clientWidth));
		strip.scrollTo({ left, behavior: mounted ? 'smooth' : 'auto' });
		mounted = true;
	});

	$effect(() => {
		if (!strip) return;
		const ro = new ResizeObserver(measure);
		ro.observe(strip);
		return () => ro.disconnect();
	});

	/** WAI-ARIA tabs keyboard pattern. */
	function onKeydown(/** @type {KeyboardEvent} */ e) {
		const i = tabs.findIndex((t) => t.id === tabState.active);
		let next = -1;
		if (e.key === 'ArrowRight') next = (i + 1) % tabs.length;
		else if (e.key === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length;
		else if (e.key === 'Home') next = 0;
		else if (e.key === 'End') next = tabs.length - 1;
		if (next < 0) return;
		e.preventDefault();
		setTab(tabs[next].id, { scroll: false });
		buttons[next]?.focus();
	}
</script>

<div
	bind:this={strip}
	role="tablist"
	tabindex="-1"
	aria-label="Portfolio sections"
	onkeydown={onKeydown}
	class="no-scrollbar relative flex w-full gap-1 overflow-x-auto scroll-smooth focus:outline-none"
>
	{#if indicator.ready}
		<span
			aria-hidden="true"
			class="pointer-events-none absolute inset-y-1 z-0 rounded-lg bg-surface-2 transition-all duration-300 ease-out"
			style="left:{indicator.left}px;width:{indicator.width}px"
		></span>
	{/if}

	{#each tabs as tab, i (tab.id)}
		{@const selected = tabState.active === tab.id}
		<button
			bind:this={buttons[i]}
			type="button"
			role="tab"
			id="tab-{tab.id}"
			aria-selected={selected}
			aria-controls={tab.id}
			tabindex={selected ? 0 : -1}
			onclick={() => setTab(tab.id)}
			class="relative z-1 flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-[13.5px] font-medium whitespace-nowrap transition-colors duration-200
				{selected ? 'text-ink' : 'text-ink-subtle hover:text-ink'}"
		>
			<Icon name={tab.icon} size={15} class="opacity-70" />
			{tab.label}
		</button>
	{/each}
</div>
