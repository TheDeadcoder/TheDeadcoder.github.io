/**
 * Blog posts, newest first. Each post lives in its own folder:
 * src/lib/blog/<slug>/Post.svelte holds the article and an optional
 * src/lib/blog/<slug>/Cover.svelte is the image on the Blog tab.
 */
export const posts = [
	{
		slug: 'seen-but-not-bound',
		title: 'Seen but not bound: AI agents treat a safety rule as a dial, not a gate',
		summary:
			'We gave LLM operations agents one rule: ask before doing anything destructive in production. They spotted production and judged the risk. Then they turned their caution up on every ticket instead of stopping where the rule applies.',
		date: '2026-10-12',
		readingTime: 8,
		tags: [
			'Mechanistic interpretability',
			'Model internals',
			'Agent evaluation',
			'AI agents',
			'AI safety',
			'Benchmarks',
			
		]
	}
];
