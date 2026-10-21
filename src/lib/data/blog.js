/**
 * Blog posts, newest first. Each post lives in its own folder:
 * src/lib/blog/<slug>/Post.svelte holds the article and an optional
 * src/lib/blog/<slug>/Cover.svelte is the image on the Blog tab.
 */
export const posts = [
	{
		slug: 'green-checks-broken-clusters',
		title: 'Green checks, broken clusters: testing the graders of AI SRE benchmarks',
		summary:
			'AI agents are now ranked on how well they fix broken Kubernetes applications, and a grading script decides every result. I tested the graders of four such benchmarks. They passed clusters that were still broken, failed fixes that worked, and the usual sanity checks missed most of it.',
		date: '2026-10-17',
		readingTime: 10,
		tags: ['Agent evaluation', 'Benchmarks', 'Software testing', 'Test oracles', 'Kubernetes', 'AI agents']
	},
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
	},
	{
		slug: 'skipped-tests-tell-no-tales',
		title: 'Skipped tests tell no tales: the hidden cost of test selection in CI',
		summary:
			'CI runs every test on every change, and test selection promises to skip most of them safely. But a selector in production never learns how the tests it skipped would have done, while the replays used to judge it quietly tell it. Replayed honestly, a leading history-based selector let nearly three times as many failing builds slip through, while selectors that read the change barely noticed.',
		date: '2026-10-01',
		readingTime: 10,
		tags: [
			'Software testing',
			'Continuous integration',
			'Test selection',
			'Evaluation methodology',
			'LLMs',
			'Pre-registered'
		]
	},
	{
		slug: 'luck-is-not-skill',
		title: 'Luck is not skill: giving every rollout the same bad luck',
		summary:
			'Group-relative RL trains an LLM agent by comparing attempts at the same task, but a tool outage or a grading slip can make luck look like skill. I gave every attempt in a group the same luck. Comparisons got cleaner and gradient noise dropped at every checkpoint, and under tool faults the agent finished five points ahead, but the learning-curve tests I registered in advance did not pass.',
		date: '2026-09-09',
		readingTime: 11,
		tags: [
			'Reinforcement learning',
			'GRPO',
			'LLM agents',
			'Tool-use agents',
			'Common random numbers',
			'Pre-registered'
		]
	}
];
