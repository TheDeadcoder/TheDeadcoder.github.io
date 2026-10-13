import woa from '$lib/logos/woa.png';
import uiucSrse from '$lib/logos/uiuc-SRSE-2026.png';

/**
 * Shared by the About view and the Research tab. `status` is one of 'accepted',
 * 'published', 'preprint', 'under review' or 'ongoing'. The About view lists
 * every entry except ongoing work and links each title to its first link.
 */
export const researchCards = [
	{
		title: 'Passing Without Repairing: Verifier Blind Spots in a Live SRE Agent Benchmark',
		authors: ['Nazmus Sakib'],
		status: 'accepted',
		venue: 'NeurIPS 2026 workshop “Who Verifies the Agents?”, poster',
		venueHref: 'https://verify-agents-workshop.github.io/',
		description:
			"With the Service deleted and no agent acting, the benchmark's grader still reports the fault as mitigated, because it only checks Deployment and Pod health.",
		tags: [
			'AI for SRE',
			'Benchmark verifiers',
			'Mutation testing',
			'SREGym',
			'Kubernetes',
			'Pre-registered'
		],
		links: [
			{ label: 'Paper', href: 'https://neurips.cc/virtual/2026/loc/sydney/173080', icon: 'file' },
			{ label: 'Code', href: 'https://github.com/TheDeadcoder/SREMut', icon: 'github' }
		],
		badges: [
			{ kind: 'year', text: '2026' },
			{ kind: 'text', text: 'Peer-reviewed workshop paper' }
		]
	},
	{
		title:
			'Seen but Not Bound: LLM Operations Agents Treat Confirmation Policies as a Caution Dial, Not a Gate',
		authors: ['Nazmus Sakib', 'Md Rizwan Parvez'],
		status: 'under review',
		description:
			'Agents can tell a production target from staging, yet a confirmation rule meant for production shifts their behavior nearly as much everywhere else.',
		links: [{ label: 'Code', href: 'https://github.com/TheDeadcoder/OPharm', icon: 'github' }],
		badges: [{ kind: 'year', text: '2026' }]
	},
	{
		title: 'Luck Is Not Skill: When Do Paired Rollouts Help Group-Relative RL of LLM Agents?',
		authors: ['Nazmus Sakib'],
		status: 'preprint',
		venue: 'arXiv:2609.24144',
		description:
			'Giving every rollout in a GRPO group the same luck lifted success under tool faults from 61.8% to 66.8%, but not under grader noise.',
		tags: [
			'LLM post-training',
			'GRPO',
			'Reinforcement Learning',
			'Stochastic Environment',
			'Common random numbers',
			'Tool-use agents',
			'Pre-registered'
		],
		links: [
			{ label: 'arXiv', href: 'https://arxiv.org/abs/2609.24144', icon: 'arxiv' },
			{ label: 'Code', href: 'https://github.com/TheDeadcoder/paired-rollouts', icon: 'github' }
		],
		badges: [
			{ kind: 'year', text: '2026' },
		],
	},
	
	{
		title: 'Clarification Forensics: Does Halting After Clarification Reveal Misunderstanding?',
		description:
			"So far, telling Qwen3.5-9B the file is protected drops its protected-file picks from 27 of 36 to 1, but that alone doesn't show it was confused.",
		status: 'ongoing',
		tags: ['AI safety', 'Interpretability', 'Model forensics', 'Qwen3.5-9B'],
		links: [
			{ label: 'Code', href: 'https://github.com/TheDeadcoder/AI-safety-forensics', icon: 'github' }
		],
		badges: [
			{ kind: 'year', text: '2026' },
		],
	},
	{
		title:
			'MemAgent: A Cache-Inspired Framework for Augmenting Conversational Web Agents With Task-Specific Information',
		authors: ['Nazmus Sakib', 'Protoy Barai', 'Sifat Ishmam Parisa', 'Anindya Iqbal'],
		status: 'published',
		venue: 'WOA 2025, CEUR Workshop Proceedings Vol. 4028',
		venueHref: 'https://ceur-ws.org/Vol-4028/',
		description:
			'MemAgent asks for task details once and caches them with an expiry date, so recurring web tasks took 58% less time in a 15-person study.',
		badges: [
			{ kind: 'year', text: '2025' },
			{ kind: 'text', text: 'Peer-reviewed workshop paper' }
		],
		lines: [
			{
				label: 'Supervised by',
				text: '',
				joiner: ', ',
				people: [
					{
						name: 'Prof. Dr. Anindya Iqbal',
						url: 'https://scholar.google.com/citations?user=jAuiNFgAAAAJ&hl=en'
					}
				]
			},
			{
				label: 'Mentored by',
				text: '',
				joiner: ', ',
				people: [
					{
						name: 'Faria Huq',
						url: 'https://scholar.google.com/citations?user=u-HabqEAAAAJ&hl=en'
					},
					{
						name: 'Abhik Bhattacharjee',
						url: 'https://scholar.google.com/citations?user=J3ScR4cAAAAJ&hl=en'
					}
				]
			}
		],
		venueLogo: woa,
		tags: ['Web agents', 'Agent memory', 'Conversational agents'],
		links: [
			{ label: 'Paper', href: 'https://ceur-ws.org/Vol-4028/paper8.pdf', icon: 'file' },
			{
				label: 'Code',
				href: 'https://github.com/DialogBased-Interaction/Goal_Alignment',
				icon: 'github'
			}
		]
	}
];

/** Papers listed in the About view: every entry except ongoing work. */
export const papers = researchCards.filter((card) => card.status !== 'ongoing');

/** Shown as pills in the About view. */
export const focusAreas = [
	'AI for Software Engineering and SRE',
	'LLM Post-Training',
	'AI Safety',
	'NLP',
	'Agentic Systems',
	'Human-Computer Interaction'
];

export const researchExperience = {
	role: 'Research Intern',
	logo: uiucSrse,
	program: {
		name: 'UIUC++ Summer Research in Software Engineering',
		href: 'https://uiuc-srse.github.io/'
	},
	dates: 'Summer 2026',
	collaboration: {
		label: 'Collaborated with',
		joiner: ' and ',
		people: [
			{
				name: 'Prof. Darko Marinov (UIUC)',
				url: 'https://scholar.google.com/citations?user=x6OIBq4AAAAJ&hl=en'
			},
			{
				name: 'Prof. Tianyin Xu (UIUC)',
				url: 'https://scholar.google.com/citations?user=h5ZyE5wAAAAJ&hl=en'
			},
			{
				name: 'Prof. Wenxi Wang (University of Virginia)',
				url: 'https://scholar.google.com/citations?user=o23gui0AAAAJ&hl=en'
			}
		]
	},
	work: [
		{
			title: 'Turning Failure Postmortems into SRE-Benchmark Problems',
			href: 'https://www.sregym.com/blog/postmortems-to-sre-benchmarks',
			
		},
		{
			title: 'Ongoing work on two projects: a Verus project and a survey with accompanying experiments.',
			kind: 'Ongoing'
		}
	]
};

export const researchInterests = [
	{
		name: 'AI for Software Engineering and SRE',
		note: 'Benchmarks, verifiers and testing'
	},
	{ name: 'LLM Post-Training', note: 'Critic-free RL and reward design' },
	{ name: 'AI Safety', note: 'Interpretability and model forensics' },
	{ name: 'Agent Orchestration', note: 'Multi-agent workflows and tool use' },
	{ name: 'Natural Language Processing', note: 'Low-resource and multilingual settings' },
	{ name: 'Human–Computer Interaction', note: 'Agent–human collaboration interfaces' }
];

export const collaborationNote = {
	focus: 'AI for software engineering, LLM post-training and AI safety',
	closing: "If you're working on something adjacent, I'd like to hear about it."
};
