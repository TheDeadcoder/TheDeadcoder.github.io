<script>
	import Icon from '$components/Icon.svelte';

	// Where everything in the post lives. There is no paper, so this stands in for PaperCard.
	const links = [
		{
			label: 'Training code',
			host: 'GitHub',
			href: 'https://github.com/TheDeadcoder/dc_ops_training',
			icon: 'github'
		},
		{
			label: 'Environment code',
			host: 'GitHub',
			href: 'https://github.com/TheDeadcoder/dc_ops_environment',
			icon: 'github'
		},
		{
			label: 'Live environment',
			host: 'Hugging Face',
			href: 'https://huggingface.co/spaces/Melikshah/dc_ops_env',
			icon: 'huggingface'
		},
		{
			label: 'Teacher dataset',
			host: 'Hugging Face',
			href: 'https://huggingface.co/datasets/Melikshah/dc-ops-sft-data',
			icon: 'huggingface'
		},
		{
			label: 'GRPO weights',
			host: 'Hugging Face',
			href: 'https://huggingface.co/Melikshah/dc_ops_grpo_lora',
			icon: 'huggingface'
		}
	];
</script>

<aside class="my-8 rounded-2xl border border-line bg-surface p-5 sm:p-6">
	<p class="text-[13px] font-medium text-ink-muted">About the project</p>
	<p class="mt-1.5 font-serif text-lg leading-snug font-medium">DC-Ops Assistant</p>
	<p class="mt-2 text-sm text-ink-muted">
		A personal research project, with no paper behind it. The simulator, the training code, the
		data and the weights are all open.
	</p>
	<ul class="mt-4 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
		{#each links as link (link.href)}
			<li class="flex items-center gap-2.5 text-sm">
				<Icon name={link.icon} size={16} class="shrink-0 text-ink-muted" />
				<span class="min-w-0">
					<a
						href={link.href}
						target="_blank"
						rel="noopener noreferrer"
						class="font-medium text-accent underline decoration-accent/35 underline-offset-4 transition-colors hover:decoration-accent"
						>{link.label}</a
					>
					<span class="text-ink-muted"> · {link.host}</span>
				</span>
			</li>
		{/each}
	</ul>
</aside>
