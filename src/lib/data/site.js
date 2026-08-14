/**
 * Single source of truth for identity + SEO.
 * Change the canonical URL here if you move to a custom domain.
 */
export const site = {
	url: 'https://thedeadcoder.github.io',
	name: 'Nazmus Sakib',
	shortName: 'Nazmus Sakib',
	role: 'AI/ML Engineer · Lecturer',
	headline: 'AI/ML Engineer & Lecturer',
	tagline:
		'I build production LLM systems, including fine-tuning, RL post-training and retrieval pipelines, and teach the fundamentals behind them.',
	description:
		'Nazmus Sakib, AI/ML Engineer and Lecturer at BRAC University. BUET CSE graduate specialising in LLM fine-tuning, GRPO reinforcement learning, agentic RAG and full-stack engineering.',
	keywords: [
		'Nazmus Sakib',
		'AI Engineer',
		'Machine Learning Engineer',
		'LLM fine-tuning',
		'GRPO',
		'Retrieval-Augmented Generation',
		'BUET CSE',
		'BRAC University',
		'Bangladesh'
	],
	location: 'Dhaka, Bangladesh',
	email: 'sakibbuet2k19@gmail.com',
	// phone: '+880-1759948779', // uncomment to surface publicly
	avatar: '/images/profile.webp',
	avatarFallback: '/images/profile.png',
	ogImage: '/og.png',
	resume: '/cv.pdf',
	alumniOf: 'Bangladesh University of Engineering and Technology',
	worksFor: 'BRAC University'
};

export const socials = [
	{ label: 'GitHub', icon: 'github', href: 'https://github.com/TheDeadcoder' },
	{
		label: 'LinkedIn',
		icon: 'linkedin',
		href: 'https://www.linkedin.com/in/nazmus-sakib-touhid-a43533205'
	},
	{ label: 'Hugging Face', icon: 'huggingface', href: 'https://huggingface.co/Melikshah' },
	{
		label: 'Google Scholar',
		icon: 'googleScholar',
		href: 'https://scholar.google.com/citations?hl=en&user=b50aVhQAAAAJ'
	},
	{ label: 'Kaggle', icon: 'kaggle', href: 'https://kaggle.com/thedarkstorm' },
	{ label: 'Codeforces', icon: 'codeforces', href: 'https://codeforces.com/profile/melikshah' },
	{ label: 'HackerRank', icon: 'hackerrank', href: 'https://www.hackerrank.com/sakibbuet2k19' },
	{ label: 'YouTube', icon: 'youtube', href: 'https://www.youtube.com/@nazmussakib19061' }
];

import { experience } from './experience.js';
import { projects } from './projects.js';
import { achievements } from './achievements.js';

/**
 * Headline numbers, derived from the data above so they can never drift out of
 * sync with the sections they summarise.
 */
export const stats = [
	{ value: `${experience.length}`, label: 'Roles' },
	{ value: `${projects.length}`, label: 'Shipped projects' },
	{
		value: `${achievements.reduce((n, y) => n + y.events.filter((e) => e.rank === 'gold').length, 0)}`,
		label: 'First-place wins'
	},
	{ value: '3.82', label: 'BUET CGPA / 4.00' }
];
