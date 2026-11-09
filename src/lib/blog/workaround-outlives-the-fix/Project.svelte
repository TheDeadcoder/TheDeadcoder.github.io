<script>
	import Icon from '$components/Icon.svelte';
</script>

<aside class="my-8 rounded-2xl border border-line bg-surface p-5 sm:p-6">
	<p class="text-[13px] font-medium text-ink-muted">About the project</p>
	<p class="mt-1.5 font-serif text-lg leading-snug font-medium">Shift Notes</p>
	<p class="mt-2 text-sm text-ink-muted">
		A personal research project. The sandbox, both guards, the experiment and analysis code, and the
		plan I registered before running it are open.
	</p>
	<p class="mt-4 flex items-center gap-2.5 text-sm">
		<Icon name="github" size={16} class="shrink-0 text-ink-muted" />
		<span class="min-w-0">
			<a
				href="https://github.com/TheDeadcoder/swarm"
				target="_blank"
				rel="noopener noreferrer"
				class="font-medium text-accent underline decoration-accent/35 underline-offset-4 transition-colors hover:decoration-accent"
				>Code: the SwarmGate testbed and experiments</a
			>
			<span class="text-ink-muted"> · GitHub</span>
		</span>
	</p>
</aside>
