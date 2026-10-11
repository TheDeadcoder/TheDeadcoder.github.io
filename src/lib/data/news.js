/**
 * Newest first. `date` is YYYY-MM. `text` mixes plain strings with links;
 * `title: true` marks a paper title, which is set in italics.
 */
export const news = [
	{
		date: '2026-10',
		text: [
			'Opened two pull requests to Kestra: a ',
			{
				text: 'tool-schema fix for the Anthropic plugin',
				href: 'https://github.com/kestra-io/plugin-anthropic/pull/148'
			},
			' and a ',
			{
				text: 'Claude Message Batches blueprint',
				href: 'https://github.com/kestra-io/blueprints/pull/979'
			},
			'.'
		]
	},
	{
		date: '2026-10',
		text: [
			{ text: 'Seen but Not Bound', href: 'https://github.com/TheDeadcoder/OPharm', title: true },
			' is under review, with code public in ',
			{ text: 'OPharm', href: 'https://github.com/TheDeadcoder/OPharm' },
			'.'
		]
	},
	{
		date: '2026-09',
		text: [
			{
				text: 'Passing Without Repairing',
				href: 'https://neurips.cc/virtual/2026/loc/sydney/173080',
				title: true
			},
			' was accepted as a poster at the NeurIPS 2026 workshop “Who Verifies the Agents?”'
		]
	},
	{
		date: '2026-09',
		text: [
			'The ',
			{ text: 'SREGym blog', href: 'https://www.sregym.com/blog/postmortems-to-sre-benchmarks' },
			' featured the benchmark problems our UIUC++ SRSE cohort built from real postmortems, including mine.'
		]
	},
	{
		date: '2026-07',
		text: [
			'Posted ',
			{ text: 'Luck Is Not Skill', href: 'https://arxiv.org/abs/2609.24144', title: true },
			' on arXiv.'
		]
	},
	{
		date: '2026-05',
		text: [
			'My ',
			{ text: 'Kafka poison-pill problem', href: 'https://github.com/SREGym/SREGym/pull/790' },
			' was merged into SREGym during the UIUC++ SRSE research internship.'
		]
	},
	{
		date: '2025-09',
		text: [
			{ text: 'MemAgent', href: 'https://ceur-ws.org/Vol-4028/paper8.pdf', title: true },
			' was published in the WOA 2025 proceedings (CEUR, Vol. 4028).'
		]
	},
	{
		date: '2025-03',
		text: ['Graduated from BUET with a BSc in Computer Science and Engineering.']
	}
];
