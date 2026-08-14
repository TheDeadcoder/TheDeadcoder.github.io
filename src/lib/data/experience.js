import buet from '$lib/logos/buet.svg';
import priyo from '$lib/logos/priyo.svg';
import oleyn from '$lib/logos/oleyn.svg';
import yobo from '$lib/logos/yobo.svg';
import bracu from '$lib/logos/bracu.svg';
import sluqe from '$lib/logos/sluqe.svg';
/**
 * Reverse-chronological. `projects` renders as a nested list inside a role –
 * use it when one role covered several distinct products.
 */
export const experience = [
	{
		company: 'BRAC University',
		logo: bracu,
		url: 'https://www.bracu.ac.bd/',
		location: 'Dhaka, Bangladesh',
		current: true,
		roles: [
			{
				title: 'Lecturer',
				period: 'Present',
				location: 'Dhaka, Bangladesh',
				highlights: [
					'Instructing undergraduate courses including Machine Learning, Operating Systems, Software Engineering, and System Analysis & Design.',
					'Mentoring students on architectural patterns and bridging the gap between theoretical concepts and industry application.'
				]
			}
		]
	},
	{
		company: 'Sluqe',
		logo: sluqe,
		mark: 'BO',
		url: 'https://sluqe.com/',
		location: 'Warszawa, Poland (Remote)',
		roles: [
			{
				title: 'AI/ML Engineer',
				period: 'Apr 2025 – May 2026',
				location: 'Warszawa, Poland (Remote)',
				highlights: [
					'Sluqe: built a voice-notes platform that transcribes, structures and makes recordings searchable and chattable. Delivered the Next.js dashboard and Flutter iOS/Android app on Firebase Cloud Functions and Firestore, with Genkit agent flows for chat over personal notes, web search, deep research, folders, share links, Notion export and Stripe billing.',
					'IoT SOS Alert System: built a device-agnostic emergency pipeline with a Terraform-provisioned serverless backend and an asyncio TCP bridge. Integrated Tuya WiFi buttons, binary 4G terminals and GPS bracelets through protocol adapters, escalating alerts to registered contacts through SNS and Twilio. Covered the system with 235 unit tests.',
					'Aviators Spring: developed a Flutter app for pilots with Mapbox layers for airports, weather and VFR sectional charts. Rebuilt FAA NASR ingestion as a two-tier GeoJSON pipeline and automated the parallel publication of roughly 3.5 GB of FAA sectional GeoTIFFs as Mapbox tilesets.'
				]
			}
		]
	},
	{
		company: 'Intellesphere',
		logo: buet,
		url: '#',
		location: 'Dhaka, Bangladesh (Remote)',
		note: 'BUET-affiliated venture',
		roles: [
			{
				title: 'Founding Engineer (Backend & AI)',
				period: 'Mar 2024 – Mar 2025',
				location: 'Dhaka, Bangladesh (Remote)',
				highlights: [
					'Pubali–Intellesphere: engineered a banking RAG assistant handling complex PDF and table parsing with LlamaParse and Qdrant hybrid indexing, serving both public bank data and personalised customer queries with a human-in-the-loop escalation path. Secured access with Keycloak, authentication with Supabase, and analytics with Metabase.',
					'Shajgoj-AI: built a multimodal product search engine over text and image inputs using CLIP embeddings and ChromaDB, with reranking and a recommendation layer. Collected the catalogue via Scrapy and Playwright, and ran the pipeline on Celery with Redis caching behind FastAPI.',
					'CivilMate: developed a civil-engineering automation tool using multimodal reasoning to compare design drawings against construction site imagery, automating project logging, blocker detection and stakeholder notification.',
					'Titas Gas: shipped a RAG chat platform blending an internal knowledge base with real-time web results via the Serper API.',
					'Optimised RAG pipelines end to end, including query normalisation, knowledge integration and reranking.'
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
				period: 'Jun 2024 – Dec 2024',
				location: 'Dhaka, Bangladesh · On-site',
				highlights: [
					'Priyo-Penguin: deployed an AI customer-support assistant on Django, Nginx and the OpenAI API, handling concurrent real-time queries against a curated knowledge base built with LlamaIndex, hybrid indexing and a vector store.',
					'Dolphin-Priyo: built a CRM and data-warehousing application unifying user management across Priyo platforms, with REST APIs in Django and PostgreSQL, Docker containerisation, an Nginx reverse proxy and a CI/CD pipeline.',
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
		location: 'Dhaka, Bangladesh (Remote)',
		roles: [
			{
				title: 'Founding Engineer (Backend & AI)',
				period: 'May 2024 – Dec 2024',
				location: 'Dhaka, Bangladesh (Remote)',
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
		location: 'Ontario, Canada (Remote)',
		roles: [
			{
				title: 'Software Engineer Intern',
				period: 'Jan 2024 – May 2024',
				location: 'Ontario, Canada (Remote)',
				highlights: [
					'Built YoboSQL, a text-to-SQL chat interface over large live SQL and NoSQL databases using LangChain, FastAPI and SvelteKit.',
					'Optimised database interactions against MariaDB and handled deployment on cPanel environments.'
				]
			}
		]
	}
];
