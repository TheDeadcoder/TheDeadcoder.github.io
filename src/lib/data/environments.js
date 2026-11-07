/**
 * RL and benchmark environments, shown in the Projects tab. `kinds` become the badges,
 * and `loop` reads as the RL loop: what the agent observes, how it acts, what it is
 * rewarded for, and what it is tested on. `icon` names an icon in Icon.svelte.
 */
export const environments = [
	{
		name: 'GeoQL environment',
		icon: 'pin',
		kinds: ['RL environment', 'Benchmark'],
		tagline: 'Natural-language map requests to OverpassQL',
		summary:
			'A hermetic environment and benchmark for turning natural-language map requests into OverpassQL queries. Each query runs on a frozen OpenStreetMap world and on synthetic witness worlds built so that near misses return different objects, and it passes only if it matches an accepted reading on all of them.',
		loop: [
			{
				label: 'Observes',
				text: 'A map request, the world it is about and, when needed, a map view'
			},
			{
				label: 'Acts',
				text: 'Writes one query, or first makes up to 10 tool calls: run a query, resolve a place, look up tags'
			},
			{
				label: 'Reward',
				text: '1 if the submitted query passes on the real world and on every witness world, else 0'
			},
			{
				label: 'Benchmark',
				text: '27 tasks over 4 real worlds and 54 witness worlds, with a public leaderboard'
			}
		],
		highlight:
			'A reference agent that copies the right object ids scores 100% when graded on the real map alone, and 0% once the witness worlds are graded too.',
		stack: [
			'OverpassQL',
			'OpenStreetMap',
			'Overpass API',
			'Docker',
			'MCP',
			'Inspect',
			'FastAPI',
			'Hugging Face'
		],
		links: [
			{
				label: 'Live Space',
				href: 'https://huggingface.co/spaces/Melikshah/geoql-env',
				icon: 'external'
			},
			{
				label: 'Leaderboard',
				href: 'https://melikshah-geoql-env.hf.space/leaderboard',
				icon: 'trophy'
			},
			{
				label: 'Code',
				href: 'https://huggingface.co/spaces/Melikshah/geoql-env/tree/main',
				icon: 'code'
			}
		]
	},
	{
		name: 'DC-Ops environment',
		icon: 'monitor',
		kinds: ['RL environment'],
		tagline: 'Datacenter operations on OpenEnv',
		summary:
			'A physics-based simulator of a small datacenter for training LLM agents as operators, built on OpenEnv. Cooling units, UPS batteries, a diesel generator and a transfer switch respond to every command, and each incident decides for itself when it is resolved.',
		loop: [
			{
				label: 'Observes',
				text: 'A text NOC dashboard: the alert, every unit, temperatures and power readings'
			},
			{
				label: 'Acts',
				text: 'One of 14 operator commands per step, such as diagnose CRAC-3'
			},
			{
				label: 'Reward',
				text: 'Six parts every step: thermal and power safety, efficiency, progress, procedure and action quality'
			},
			{
				label: 'Scenarios',
				text: '6 incidents from easy to hard: overcooling, cooling failures, a UPS alarm, a generator test and a utility outage'
			}
		],
		highlight:
			'Used to train a 7B model with imitation and GRPO. It learned to act instead of waiting, but never resolved a hard incident.',
		stack: ['OpenEnv', 'Python', 'FastAPI', 'Pydantic', 'WebSocket', 'Docker', 'Hugging Face'],
		links: [
			{
				label: 'Live Space',
				href: 'https://huggingface.co/spaces/Melikshah/dc_ops_env',
				icon: 'external'
			},
			{
				label: 'Code',
				href: 'https://github.com/TheDeadcoder/dc_ops_environment',
				icon: 'github'
			},
			{ label: 'Blog post', href: '/blog/when-the-cooling-fails', icon: 'book' }
		]
	}
];
