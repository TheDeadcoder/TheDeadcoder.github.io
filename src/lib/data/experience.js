import buet from '$lib/logos/buet.svg';
import priyo from '$lib/logos/priyo.svg';
import oleyn from '$lib/logos/oleyn.svg';
import yobo from '$lib/logos/yobo.svg';
import sluqe from '$lib/logos/sluqe.svg';

/**
 * Reverse-chronological. `projects` renders as a nested list inside a role —
 * use it when one role covered several distinct products.
 *
 * Entries marked TODO need your input; search this file for "TODO".
 */
export const experience = [
	{
		company: 'BRAC University',
		logo: null,
		url: 'https://www.bracu.ac.bd/',
		location: 'Dhaka, Bangladesh',
		current: true,
		roles: [
			{
				title: 'Lecturer',
				period: 'Present',
				location: 'Dhaka, Bangladesh',
				highlights: [
					// TODO: replace with your actual teaching / research responsibilities.
					'Teaching undergraduate Computer Science and Engineering coursework.'
				]
			}
		]
	},
	{
		company: 'boet.io',
		logo: null,
		mark: 'BO',
		url: 'https://boet.io',
		location: 'Warszawa, Poland (Remote)',
		roles: [
			{
				title: 'AI/ML Engineer',
				period: 'Apr 2025 — May 2026',
				location: 'Warszawa, Poland (Remote)',
				highlights: [
					'Shipped three products end to end — an AI voice-notes platform, an IoT emergency-alert pipeline and a Flutter mapping app for pilots — covering LLM orchestration, serverless and event-driven backends, device protocol integration, and cross-platform mobile.'
				],
				projects: [
					{
						name: 'Sluqe',
						logo: sluqe,
						url: 'https://www.sluqe.com/',
						summary:
							'Record a voice note; it is transcribed, structured, and becomes searchable and chattable. Built the Next.js dashboard and the Flutter iOS/Android app on Firebase Cloud Functions and Firestore, with Genkit flows orchestrating a chat agent that answers over the user’s own notes — plus in-chat web search, a deep-research mode, folders, share links and Notion export. Groq for inference, vector indexing behind search, Stripe for billing.',
						stack: [
							'Next.js',
							'Flutter',
							'TypeScript',
							'Firebase Cloud Functions',
							'Firestore',
							'Genkit',
							'Groq',
							'Vector search',
							'Stripe',
							'Zustand',
							'shadcn/ui'
						]
					},
					{
						name: 'IoT SOS Alert System',
						logo: null,
						mark: 'SOS',
						url: '',
						summary:
							'A device-agnostic emergency pipeline: raw device frames are normalised into structured events, stored, and escalated to a phone call to registered contacts. Built two runtimes — a Terraform-provisioned serverless backend (API Gateway → Lambda → DynamoDB → SNS → Twilio) and an asyncio TCP bridge on a DigitalOcean droplet — with per-device adapters behind a protocol router, so new hardware plugs in without touching the core. Integrated three devices across Tuya cloud WSS push, a binary 4G button protocol and a text-framed GPS bracelet; traced a 30-second reconnect loop down to ACK ordering and a big-endian battery decode. 235 unit tests.',
						stack: [
							'Python',
							'asyncio',
							'AWS Lambda',
							'API Gateway',
							'DynamoDB',
							'SNS',
							'Terraform',
							'LocalStack',
							'Twilio',
							'Docker',
							'Tuya SDK'
						]
					},
					{
						name: 'Aviators Spring',
						logo: null,
						mark: 'AV',
						url: '',
						summary:
							'A Flutter app for pilots — a Mapbox base map with three stacked layers: airports, weather and VFR sectional charts. Rebuilt the FAA NASR ingestion into a two-tier GeoJSON pipeline (a light layer for the map, a full one for detail lookups) that preserves cockpit-critical fields the original dropped, notably magnetic variation and traffic pattern altitude. Delivered ~3.5 GB of FAA sectional GeoTIFFs as Mapbox tilesets through a parallel uploader that publishes, polls and code-generates the Dart constants, so the app never hardcodes tileset IDs.',
						stack: [
							'Flutter',
							'Dart',
							'Mapbox',
							'Python',
							'GeoJSON',
							'GeoTIFF',
							'FAA NASR',
							'NOAA API',
							'Firebase Storage'
						]
					}
				]
			}
		]
	},
	{
		company: 'Intellesphere',
		logo: buet,
		url: '#',
		location: 'Dhaka, Bangladesh',
		note: 'BUET-affiliated venture',
		roles: [
			{
				title: 'Founding Engineer (Backend & AI)',
				period: 'Mar 2024 — Mar 2025',
				location: 'Dhaka, Bangladesh',
				highlights: [
					'Pubali–Intellesphere: engineered a banking RAG assistant handling complex PDF and table parsing with LlamaParse and Qdrant hybrid indexing, serving both public bank data and personalised customer queries with a human-in-the-loop escalation path. Secured access with Keycloak, authentication with Supabase, and analytics with Metabase.',
					'Shajgoj-AI: built a multimodal product search engine over text and image inputs using CLIP embeddings and ChromaDB, with reranking and a recommendation layer. Collected the catalogue via Scrapy and Playwright, and ran the pipeline on Celery with Redis caching behind FastAPI.',
					'CivilMate: developed a civil-engineering automation tool using multimodal reasoning to compare design drawings against construction site imagery, automating project logging, blocker detection and stakeholder notification.',
					'Titas Gas: shipped a RAG chat platform blending an internal knowledge base with real-time web results via the Serper API.',
					'Optimised RAG pipelines end to end — query normalisation, knowledge integration and reranking.'
				]
			}
		]
	},
	{
		company: 'Priyo',
		logo: priyo,
		url: 'https://www.priyo.com/',
		location: 'Dhaka, Bangladesh',
		roles: [
			{
				title: 'Software Engineer (Backend)',
				period: 'Jun 2024 — Dec 2024',
				location: 'Dhaka, Bangladesh · On-site',
				highlights: [
					'Priyo-Penguin: deployed an AI customer-support assistant on Django, Nginx and the OpenAI API, handling concurrent real-time queries against a curated knowledge base built with LlamaIndex, hybrid indexing and a vector store.',
					'Dolphin-Priyo: built a CRM and data-warehousing application unifying user management across Priyo platforms — REST APIs in Django and PostgreSQL, Docker containerisation, Nginx reverse proxy and a CI/CD pipeline.',
					'Shipped Priyo Play (play.priyo.com), a platform for quizzes, contests and games.',
					'Implemented bot protection with Cloudflare Turnstile, dynamic email campaigns via SendGrid and Twilio, and business dashboards in Metabase.'
				]
			}
		]
	},
	{
		company: 'Oleyn',
		logo: oleyn,
		url: 'https://www.oleyn.ai/',
		location: 'Remote',
		roles: [
			{
				title: 'Founding Engineer (Backend & AI)',
				period: 'May 2024 — Dec 2024',
				location: 'Remote',
				highlights: [
					'Shrobon: engineered an AI-powered CX and marketing-campaign system for large customer centres. Built a Bengali ASR stack with fine-tuned models and NVIDIA NeMo speaker diarization for low-latency transcript generation, fronted by a RAG assistant on FastAPI with Redis caching and Docker deployment.',
					'SuperAttorney: architected a legal research assistant for high-speed document parsing and retrieval, streamlining research, drafting and decision-making for legal professionals.'
				]
			}
		]
	},
	{
		company: 'Yobo',
		logo: yobo,
		url: 'https://www.helloyobo.com/',
		location: 'Remote',
		roles: [
			{
				title: 'Software Engineer Intern',
				period: 'Jan 2024 — May 2024',
				location: 'Remote',
				highlights: [
					'Built YoboSQL, a text-to-SQL chat interface over large live SQL and NoSQL databases using LangChain, FastAPI and SvelteKit.',
					'Optimised database interactions against MariaDB and handled deployment on cPanel environments.'
				]
			}
		]
	}
];
