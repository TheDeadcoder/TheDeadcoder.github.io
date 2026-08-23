import pytorch from 'devicon/icons/pytorch/pytorch-original.svg';
import kaggle from 'devicon/icons/kaggle/kaggle-original.svg';
import unsloth from '$lib/logos/unsloth.svg';
import geoql from '$lib/logos/geoql.svg';
import civilgpt from '$lib/logos/civilgpt.svg';
import tokkhok from '$lib/logos/tokkhok.svg';
import shopgenie from '$lib/logos/shopgenie.png';
import coderhub from '$lib/logos/coderhub.png';
import bdehr from '$lib/logos/bdehr.png';
import voyager from '$lib/logos/voyager.png';
import nerd from '$lib/logos/nerd.svg';
import bebshaAI from '$lib/logos/bebshaAI.png';
import huggingface from '$lib/logos/huggingface.svg';
import secu from '$lib/logos/secu.svg';
import googleDrive from '$lib/logos/google-drive.svg';
import scout from '$lib/logos/scout.svg';

/**
 * `category` drives the filter chips: 'ai' | 'web' | 'research'
 * `featured: true` pins a project to the top of the grid with a wider card.
 */
export const projects = [
	{
		name: 'DC-Ops Assistant',
		category: 'ai',
		featured: true,
		context: 'Personal research project',
		logo: pytorch,
		summary:
			'A physics-grounded, three-phase training pipeline that fine-tunes Qwen2.5-7B-Instruct for datacenter NOC operations. Synthesised a 7,107-turn teacher-distilled SFT dataset with DeepSeek-R1-Distill-Qwen-32B against a custom RC-thermal simulation environment, then applied GRPO with a composite reward spanning format compliance, live physics feedback, scenario-aware heuristics and anti-looping penalties.',
		metrics: [
			{ value: '+188%', label: 'reward gain over 7 epochs' },
			{ value: '1×', label: 'AMD MI300X' }
		],
		stack: [
			'Unsloth',
			'TRL',
			'vLLM',
			'GRPO',
			'OpenEnv',
			'Transformers',
			'Hugging Face',
			'LLM-as-a-judge',
			'ROCm',
			'SFT'
		],
		repo: 'https://github.com/TheDeadcoder/dc_ops_training',
		demo: 'https://huggingface.co/spaces/Melikshah/dc_ops_env',
		demoLabel: 'Live Space'
	},
	{
		name: 'Scout',
		category: 'ai',
		featured: true,
		context: 'Personal project · agentic systems',
		logo: scout,
		summary:
			'An autonomous competitive intelligence system that monitors competitor pricing, scores meaningful changes, and produces source-linked weekly briefs. A three-tier escalation pipeline keeps costs low, while transactional job claiming and bitemporal facts ensure reliable processing and historical price tracking.',
		metrics: [
			{ value: '1.00', label: 'precision and recall, detector gate in CI' },
			
			{ value: '197', label: 'tests against a real Postgres' }
		],
		stack: [
			'FastAPI',
			'Next.js',
			'Langfuse',
			'Docker',
			'Bright Data',
			'Playwright',
			'Terraform',
			'PostgreSQL',
			'SQLAlchemy',
			'Alembic',
			'Qdrant',
			'Supabase',
			
			'OpenAI API',
			
			'TypeScript'
		],
		repo: 'https://github.com/TheDeadcoder/scout',
		demo: 'https://www.youtube.com/watch?v=Agw1zf_uz34',
		demoLabel: 'Video demo'
	},
	{
		name: 'Medical CoT Assistant',
		category: 'ai',
		featured: true,
		context: 'Personal research project',
		logo: unsloth,
		summary:
			'Fine-tunes a 20B-parameter model on curated medical reasoning datasets to produce a clinical assistant capable of chain-of-thought reasoning. The pipeline merges and reformats multiple medical QA corpora, applies LoRA fine-tuning with Unsloth, quantises weights to INT4 for efficient deployment, exports to GGUF, and evaluates with an LLM-as-a-judge harness.',
		metrics: [
			{ value: '20B', label: 'parameters fine-tuned' },
			{ value: 'INT4', label: 'quantised for deployment' }
		],
		stack: [
			'Unsloth',
			'llama.cpp',
			'Transformers',
			'Hugging Face',
			'LoRA',
			'GGUF',
			'LLM-as-a-judge',
			'ROCm'
		],
		repo: 'https://github.com/TheDeadcoder/medical-cot-assistant',
		demo: 'https://www.youtube.com/watch?v=IGAzB2DXqoM',
		demoLabel: 'Video demo'
	},
	{
		name: 'GeoQL-4B',
		category: 'ai',
		featured: true,
		context: 'Personal research project · negative result',
		logo: geoql,
		summary:
			'Text-to-OverpassQL model fine-tuned from Qwen3-4B-Instruct-2507 with rank-64 LoRA on 6,352 OverpassNL examples, followed by GRPO with five reward signals. The RL stage improved OQS by only 0.23, within noise. The repository documents the negative result and its likely causes: reward redundancy, a knowledge bottleneck, decoding mismatch, weak proxies and collapsed learning signal.',
		metrics: [
			{ value: '68.49', label: 'OQS after SFT' },
			{ value: '+0.23', label: 'OQS after GRPO' },
			// { value: '~$35', label: 'Compute cost' }
		],
		stack: [
			'Qwen3-4B',
			'LoRA r64',
			'TRL',
			'Unsloth',
			'GRPO',
			'vLLM',
			'Modal',
			'OverpassQL',
			'OpenStreetMap'
		],
		repo: 'https://github.com/TheDeadcoder/GeoQL-4B',
		demo: 'https://huggingface.co/Melikshah/GeoQL-4B-SFT',
		demoLabel: 'Model card'
	},

	{
		name: 'CivilMate',
		category: 'ai',
		context: 'Personal project · ongoing',
		logo: civilgpt,
		summary:
			'An AI assistant for civil engineers built on graph RAG and agentic retrieval, answering questions about building codes and generating site reports from captured imagery. Actively iterating on report-generation quality and image analysis.',
		stack: [
			'FastAPI',
			'OpenAI API',
			'Neo4j',
			'Qdrant',
			'Supabase',
			'Alembic',
			'PostgreSQL',
			'SQLAlchemy',
			'SvelteKit',
			'shadcn'
		],
		repo: 'https://github.com/TheDeadcoder/civilmate-backend',
		demo: 'https://civilmate.vercel.app/',
		demoLabel: 'Live site'
	},
	{
		name: 'তক্ষক (Tokkhok)',
		category: 'ai',
		context: 'KUET BITFEST Hackathon 2025',
		logo: tokkhok,
		summary:
			'A personalised RAG chatbot platform whose hard problem was Banglish, Bengali written in Latin script, which had to be transliterated to Bengali before retrieval. Supports bot sharing, behaviour customisation and few-shot inference.',
		stack: [
			'FastAPI',
			'OpenAI API',
			'Google Transliterate API',
			'Qdrant',
			'Supabase',
			'Alembic',
			'PostgreSQL',
			'SQLAlchemy'
		],
		repo: 'https://github.com/TheDeadcoder/Tokkhok-Backend',
		demo: 'https://youtu.be/2UInbtVz1oE',
		demoLabel: 'Video demo'
	},
	{
		name: 'InsightAI',
		category: 'ai',
		context: 'BCOLBD AI Hackathon 2024',
		logo: 'https://avatars.githubusercontent.com/u/180024020?s=200&v=4',
		summary:
			'An AI-powered productivity suite for students, combining retrieval over course material with real-time web search and task management to consolidate academic and personal workflows.',
		stack: [
			'FastAPI',
			'Spring Boot',
			'SvelteKit',
			'OpenAI API',
			'LlamaIndex',
			'RAG',
			'Serper API',
			'Qdrant',
			'Supabase',
			'Celery',
			'PostgreSQL',
			'Drizzle',
			'TypeScript'
		],
		repo: 'https://github.com/InsightAI-BUET-Genesis',
		demo: 'https://www.youtube.com/watch?v=-VOxQ5Nok_g',
		demoLabel: 'Video demo'
	},
	{
		name: 'BD Prescription OCR',
		category: 'ai',
		context: 'Personal research project',
		logo: kaggle,
		summary:
			'A 78-way handwritten medicine-name classifier on the Doctor’s Handwritten Prescription BD dataset. Built a ResNet50-CRNN that runs a bidirectional LSTM over backbone feature maps to preserve left-to-right word structure, then ensembled a 5-fold StratifiedGroupKFold SWA run with hash-based leakage detection.',
		metrics: [
			{ value: '92.53%', label: 'test accuracy' },
			{ value: '0.9234', label: 'macro-F1 (+6.44 pts over baseline)' }
		],
		stack: ['PyTorch', 'ResNet50', 'CRNN', 'SWA', 'scikit-learn', 'MLflow', 'Grad-CAM', 'CLAHE'],
		repo: 'https://github.com/TheDeadcoder/bd-prescription-medicine-recognize',
		demo: 'https://drive.google.com/drive/folders/1CLAym4i13zzwOQqjEYQ3lZFeEEm83KHM?usp=sharing',
		demoLabel: 'Artefacts'
	},
	{
		name: 'ShopGenie',
		category: 'ai',
		context: 'Lablab AI – Reasoning with o1, 2024',
		logo: shopgenie,
		summary:
			'An AI shopping platform over 21,000 scraped products supporting multimodal search by text, image or both, with a recommendation system and sentiment analysis on reviews.',
		stack: [
			'OpenAI API',
			'CLIP ViT',
			'Selenium',
			'FastAPI',
			'Qdrant',
			'SvelteKit',
			'TypeScript',
			'PostgreSQL',
			'Drizzle'
		],
		repo: 'https://github.com/ShopGenie-O1-Reasoning-Hackathon',
		demo: ''
	},
	{
		name: 'CoderHub',
		category: 'web',
		context: 'Code Crafters Dev Sprint 2024 – 1st place',
		logo: coderhub,
		summary:
			'A developer collaboration platform with project management (upload, diff, download), video calling, collaborative coding, groups, skill-based project matching and an AI chat assistant.',
		stack: [
			'SvelteKit',
			'Agora SDK',
			'Monaco Editor',
			'TypeScript',
			'PostgreSQL',
			'Supabase',
			'TailwindCSS',
			'DaisyUI'
		],
		repo: 'https://github.com/TheDeadcoder/coderhub',
		demo: 'https://www.youtube.com/watch?v=oCtfAYUbqPw',
		demoLabel: 'Video demo'
	},
	{
		name: 'BDeHR',
		category: 'web',
		context: 'Therap JavaFest 2023',
		logo: bdehr,
		summary:
			'A healthcare records platform giving patients and doctors shared access to medical history, designed around data privacy and access control.',
		stack: ['Svelte', 'Spring Boot', 'Java', 'MySQL', 'TypeScript', 'TailwindCSS'],
		repo: 'https://github.com/BDEHR-TherapJavaFest2023',
		demo: 'https://www.youtube.com/watch?v=OwdHvHOskb4&list=PLW5antMpb-_P8iauv8Fe4pwLb0x1JXrfG',
		demoLabel: 'Video demo'
	},
	{
		name: 'Voyager',
		category: 'web',
		context: 'IUT OpenAPI Hackathon 2024 – 1st place',
		logo: voyager,
		summary:
			'An attraction-discovery platform surfacing weather, amenities and reviews for locations, with user-contributed travel experiences and suggestions.',
		stack: [
			'SvelteKit',
			'TypeScript',
			'PostgreSQL',
			'Drizzle',
			'GeoApify',
			'Geolocation',
			'TailwindCSS',
			'DaisyUI'
		],
		repo: 'https://github.com/IUTCS-24-OpenAPI-Hackathon/BUET_Genesis',
		demo: ''
	},
	{
		name: 'NerdHerd',
		category: 'web',
		context: 'CSE 408 – Software Development project',
		logo: nerd,
		summary:
			'A distraction-minimising productivity app bundling collaborative note-taking, video calling, article writing, real-time quizzes and an AI chatbot into one workspace.',
		stack: [
			'SvelteKit',
			'TypeScript',
			'PostgreSQL',
			'Supabase',
			'Agora SDK',
			'Realtime API',
			'TailwindCSS',
			'DaisyUI'
		],
		repo: 'https://github.com/TheDeadcoder/nerdherd2ndrun',
		demo: ''
	},
	{
		name: 'BebshaAI',
		category: 'web',
		context: 'SUST CSE Carnival Hackathon 2024 – 1st place',
		logo: bebshaAI,
		summary:
			'An AI platform helping small and midsize enterprises establish an online presence, generating a storefront where they can list and sell products with minimal setup.',
		stack: ['React', 'Spring Boot', 'Flask', 'Python', 'OpenAI API', 'OpenCV', 'Material UI'],
		repo: 'https://github.com/TheDeadcoder/sust-backend',
		demo: ''
	},
	{
		name: 'Vault',
		category: 'web',
		context: 'Personal project · resilient file transfer',
		logo: googleDrive,
		summary:
			'A private file manager that lets approved users upload large folders directly into the owner’s Google Drive. Its split control and data planes bypass the server for file bytes, while resumable chunks, IndexedDB queue persistence, adaptive chunk sizing, checksum verification and deduplication keep terabyte-scale transfers reliable across dropped connections, browser crashes and server restarts.',
		stack: [
			'FastAPI',
			'React',
			'Google Drive API',
			'IndexedDB',
			'SQLite',
			'Docker',
			'Caddy',
			'GCP',
			'TailwindCSS'
		],
		repo: 'https://github.com/TheDeadcoder/vault',
		demo: ''
	},
	{
		name: 'Scraping Toolkit',
		category: 'ai',
		context: 'Dataset engineering',
		logo: huggingface,
		summary:
			'A collection of large-scale scraping pipelines covering extraction, cleaning and dataset construction, built to produce RAG-ready corpora with several datasets published to Hugging Face.',
		stack: ['Scrapy', 'Playwright', 'Selenium', 'ScrapeOps', 'BeautifulSoup', 'Hugging Face'],
		repo: '',
		demo: 'https://huggingface.co/Melikshah',
		demoLabel: 'Datasets'
	},
	{
		name: 'Subdomain Enumeration',
		category: 'web',
		context: 'CSE 406 – Computer Security lab',
		logo: secu,
		summary:
			'A subdomain discovery and assessment toolchain that enumerates the subdomains of a target domain and probes their authentication surface, built as a controlled security lab exercise.',
		stack: ['Sublist3r', 'Scout', 'Burp Suite', 'Hatch'],
		repo: '',
		demo: 'https://www.youtube.com/watch?v=YlFt_mR3mXE',
		demoLabel: 'Video demo'
	}
];

export const projectFilters = [
	{ id: 'all', label: 'All' },
	{ id: 'ai', label: 'AI / ML' },
	{ id: 'web', label: 'Web & Systems' }
];
