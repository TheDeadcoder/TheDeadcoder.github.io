<script>
	import Icon from './Icon.svelte';
	import { theme, toggleTheme } from '$lib/theme.svelte.js';
</script>

<button
	type="button"
	onclick={toggleTheme}
	class="grid size-9 place-items-center rounded-lg border border-line bg-surface text-ink-muted transition-colors hover:border-line-strong hover:text-ink"
	aria-label={theme.value === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
	title={theme.value === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
>
	{#if theme.value === 'dark'}
		<Icon name="sun" size={17} />
	{:else}
		<Icon name="moon" size={17} />
	{/if}
</button>
