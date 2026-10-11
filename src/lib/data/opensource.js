/**
 * Shown in the About view, in this order.
 * status: 'merged' | 'in review' | 'released'
 */
export const openSource = [
	{
		name: 'SREGym',
		href: 'https://github.com/SREGym/SREGym',
		tagline: 'Live benchmark for AI SRE agents',
		status: 'merged',
		summary:
			'Added a Kafka poison-pill problem: one malformed record stalls a consumer while every pod still looks healthy.',
		links: [{ label: 'Pull request #790', href: 'https://github.com/SREGym/SREGym/pull/790' }]
	},
	{
		name: 'Kestra Anthropic plugin',
		href: 'https://github.com/kestra-io/plugin-anthropic',
		status: 'in review',
		summary: 'Reported and fixed custom tool schemas that did not reach the Anthropic API intact.',
		links: [
			{ label: 'Issue #147', href: 'https://github.com/kestra-io/plugin-anthropic/issues/147' },
			{ label: 'Pull request #148', href: 'https://github.com/kestra-io/plugin-anthropic/pull/148' }
		]
	},
	{
		name: 'Kestra blueprints',
		href: 'https://github.com/kestra-io/blueprints',
		status: 'in review',
		summary: 'A blueprint that labels support tickets in Postgres with Claude Message Batches.',
		links: [{ label: 'Pull request #979', href: 'https://github.com/kestra-io/blueprints/pull/979' }]
	},
	{
		name: 'Hugging Face',
		href: 'https://huggingface.co/Melikshah',
		status: 'released',
		summary:
			'Models and datasets, including a clinical chain-of-thought GPT-OSS-20B in GGUF and GeoQL-4B for text to OverpassQL.',
		links: [
			{
				label: 'gpt-oss-20b-clinical-cot-gguf',
				href: 'https://huggingface.co/Melikshah/gpt-oss-20b-clinical-cot-gguf'
			},
			{ label: 'GeoQL-4B-SFT', href: 'https://huggingface.co/Melikshah/GeoQL-4B-SFT' }
		]
	}
];
