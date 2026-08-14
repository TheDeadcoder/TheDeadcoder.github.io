<script>
	import SectionHeading from '../SectionHeading.svelte';
	import Icon from '../Icon.svelte';
	import { reveal } from '$lib/actions/reveal.js';

	const pillars = [
		{
			icon: 'sparkles',
			title: 'LLM post-training, end to end',
			body: 'I build the full pipeline — teacher-distilled dataset synthesis, supervised fine-tuning, then GRPO with composite reward design — and I report what actually happened. My GeoQL work is published as a negative result because the RL stage did not beat SFT, and that is worth documenting.'
		},
		{
			icon: 'layers',
			title: 'Retrieval systems that survive real data',
			body: 'Agentic and graph RAG in production for banking, legal, civil engineering and e-commerce domains: hybrid indexing, multimodal embeddings, reranking, and human-in-the-loop escalation when confidence drops.'
		},
		{
			icon: 'code',
			title: 'Full-stack by default',
			body: 'A model is not a product. I ship the FastAPI and Django services around it, the SvelteKit and Next.js interfaces on top, the Flutter client beside it, and the Docker, Nginx and CI/CD that keep it running.'
		},
		{
			icon: 'cap',
			title: 'Teaching the fundamentals',
			body: 'As a Lecturer at BRAC University I teach the theory underneath the tooling. Explaining a concept to a room of students is the fastest way to find the gaps in your own understanding of it.'
		},
		{
			icon: 'trophy',
			title: 'Competitive problem solving',
			body: 'Six national hackathon and contest wins, and an active competitive programming habit. Decomposing a messy problem under time pressure is a transferable skill, and it is the one I lean on most.'
		}
	];
</script>

<SectionHeading
	icon="user"
	eyebrow="About"
	title="Engineer, researcher, teacher"
	lead="I work at the point where language models stop being demos and start being systems people depend on — and I teach the fundamentals that make that possible."
/>

<div class="grid gap-4 sm:grid-cols-2">
	{#each pillars as pillar, i (pillar.title)}
		<article
			use:reveal={{ delay: i * 60 }}
			class="group rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-line-strong
				{i === 0 ? 'sm:col-span-2' : ''}"
		>
			<div
				class="mb-4 grid size-10 place-items-center rounded-xl bg-accent-soft text-accent"
				aria-hidden="true"
			>
				<Icon name={pillar.icon} size={19} />
			</div>
			<h3 class="text-[17px] font-semibold">{pillar.title}</h3>
			<p class="mt-2.5 text-[14.5px] leading-relaxed text-ink-muted">{pillar.body}</p>
		</article>
	{/each}
</div>
