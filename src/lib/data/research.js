import woa from '$lib/logos/woa.png';
import uiucSrse from '$lib/logos/uiuc-SRSE-2026.png';

export const researchCards = [
	{
		title: 'Passing Without Repairing: Verifier Blind Spots in a Live SRE Agent Benchmark',
		description:
			"With the Service deleted and no agent acting, the benchmark's grader still reports the fault as mitigated, because it only checks Deployment and Pod health.",
		status: {
			state: 'published',
			text: 'Accepted at NeurIPS 2026 Workshop "Who Verifies the Agents?"',
			href: 'https://verify-agents-workshop.github.io/'
		},
		tags: [
			'AI for SRE',
			'Benchmark verifiers',
			'Mutation testing',
			'SREGym',
			'Kubernetes',
			'Pre-registered'
		],
		links: [
			{ label: 'Code', href: 'https://github.com/TheDeadcoder/SREMut', icon: 'github' },
			{ label: 'Read the paper', href: 'https://openreview.net/forum?id=5ijFZfVQoy', icon: 'file' }
		],
		badges: [
			{ kind: 'year', text: '2026' },
			{ kind: 'text', text: 'Peer-reviewed workshop paper' }
		]
	},
	{
		title: 'Luck Is Not Skill: When Do Paired Rollouts Help Group-Relative RL of LLM Agents?',
		description:
			'Giving every rollout in a GRPO group the same luck lifted success under tool faults from 61.8% to 66.8%, but not under grader noise.',
		status: {
			state: 'pending',
			blink: true,
			text: 'Finalising for TMLR submission'
		},
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
			{ label: 'Code', href: 'https://github.com/TheDeadcoder/paired-rollouts', icon: 'github' },
			{ label: 'arXiv preprint', href: 'https://arxiv.org/abs/2609.24144', icon: 'arxiv' }
		],
		badges: [
			{ kind: 'year', text: '2026' },
		],
	},
	
	{
		title: 'Clarification Forensics: Does Halting After Clarification Reveal Misunderstanding?',
		description:
			"So far, telling Qwen3.5-9B the file is protected drops its protected-file picks from 27 of 36 to 1, but that alone doesn't show it was confused.",
		status: {
			state: 'pending',
			text: 'Ongoing'
		},
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
			'MemAgent: A cache-inspired framework for augmenting conversational Web Agents with task-specific information',
		description:
			'MemAgent asks for task details once and caches them with an expiry date, so recurring web tasks took 58% less time in a 15-person study.',
		badges: [
			{ kind: 'year', text: '2025' },
			{ kind: 'text', text: 'Peer-reviewed workshop paper' }
		],
		status: {
			state: 'published',
			text: 'Published in WOA 2025 – 26th Workshop "From Objects to Agents"',
			href: 'https://ceur-ws.org/Vol-4028/'
		},
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
			{
				label: 'Code',
				href: 'https://github.com/DialogBased-Interaction/Goal_Alignment',
				icon: 'github'
			},
			{ label: 'Read the paper', href: 'https://ceur-ws.org/Vol-4028/paper8.pdf', icon: 'file' }
		]
	}
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
