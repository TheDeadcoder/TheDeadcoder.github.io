import woa from '$lib/logos/woa.png';

export const researchInterests = [
	{ name: 'Large Language Models', note: 'Post-training, RL and alignment' },
	{ name: 'LLM Web Agents', note: 'Memory, planning and tool use' },
	{ name: 'Natural Language Processing', note: 'Low-resource and multilingual settings' },
	{ name: 'Human–Computer Interaction', note: 'Agent–human collaboration interfaces' },
	{ name: 'Deep Learning', note: 'Efficient training and quantisation' },
	{ name: 'Software Engineering & Testing', note: 'AI-assisted development workflows' }
];

export const publications = [
	{
		title:
			'MemAgent: A cache-inspired framework for augmenting conversational Web Agents with task-specific information',
		venue: 'WOA 2025 — 26th Workshop "From Objects to Agents"',
		venueUrl: 'https://ceur-ws.org/Vol-4028/',
		venueLogo: woa,
		year: 2025,
		paperUrl: 'https://ceur-ws.org/Vol-4028/paper8.pdf',
		supervisor: {
			name: 'Prof. Dr. Anindya Iqbal',
			url: 'https://scholar.google.com/citations?user=jAuiNFgAAAAJ&hl=en'
		},
		mentors: [
			{ name: 'Faria Huq', url: 'https://scholar.google.com/citations?user=u-HabqEAAAAJ&hl=en' },
			{
				name: 'Abhik Bhattacharjee',
				url: 'https://scholar.google.com/citations?user=J3ScR4cAAAAJ&hl=en'
			}
		]
	}
];
