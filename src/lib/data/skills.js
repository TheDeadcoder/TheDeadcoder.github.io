import cpp from 'devicon/icons/cplusplus/cplusplus-original.svg';
import java from 'devicon/icons/java/java-original.svg';
import python from 'devicon/icons/python/python-original.svg';
import javascript from 'devicon/icons/javascript/javascript-original.svg';
import typescript from 'devicon/icons/typescript/typescript-original.svg';
import react from 'devicon/icons/react/react-original.svg';
import svelte from 'devicon/icons/svelte/svelte-original.svg';
import nextjs from 'devicon/icons/nextjs/nextjs-original.svg';
import nodejs from 'devicon/icons/nodejs/nodejs-original.svg';
import express from 'devicon/icons/express/express-original.svg';
import django from 'devicon/icons/django/django-plain.svg';
import spring from 'devicon/icons/spring/spring-original.svg';
import fastapi from 'devicon/icons/fastapi/fastapi-original.svg';
import flutter from 'devicon/icons/flutter/flutter-original.svg';
import postgresql from 'devicon/icons/postgresql/postgresql-original.svg';
import mysql from 'devicon/icons/mysql/mysql-original.svg';
import oracle from 'devicon/icons/oracle/oracle-original.svg';
import redis from 'devicon/icons/redis/redis-original.svg';
import supabase from 'devicon/icons/supabase/supabase-original.svg';
import firebase from 'devicon/icons/firebase/firebase-original.svg';
import sqlalchemy from 'devicon/icons/sqlalchemy/sqlalchemy-original.svg';
import docker from 'devicon/icons/docker/docker-original.svg';
import git from 'devicon/icons/git/git-original.svg';
import nginx from 'devicon/icons/nginx/nginx-original.svg';
import selenium from 'devicon/icons/selenium/selenium-original.svg';
import opencv from 'devicon/icons/opencv/opencv-original.svg';
import pytorch from 'devicon/icons/pytorch/pytorch-original.svg';
import scikitlearn from 'devicon/icons/scikitlearn/scikitlearn-original.svg';
import cloudflare from 'devicon/icons/cloudflare/cloudflare-original.svg';
import jest from 'devicon/icons/jest/jest-plain.svg';
import figma from 'devicon/icons/figma/figma-original.svg';
import jira from 'devicon/icons/jira/jira-original.svg';
import tailwind from 'devicon/icons/tailwindcss/tailwindcss-original.svg';

import drizzle from '$lib/logos/drizzle.svg';
import scrapy from '$lib/logos/scrapy.svg';
import metabase from '$lib/logos/metabase.svg';
import qdrant from '$lib/logos/qdrant.svg';
import chroma from '$lib/logos/chroma.svg';
import rag from '$lib/logos/RAG.svg';
import huggingface from '$lib/logos/huggingface.svg';
import llamaindex from '$lib/logos/llamaindex.svg';
import langchain from '$lib/logos/langchain.svg';
import unsloth from '$lib/logos/unsloth.svg';
import llamacpp from '$lib/logos/llamacpp.svg';
import vllm from '$lib/logos/vllm.svg';
import rocm from '$lib/logos/rocm.svg';
import grpo from '$lib/logos/grpo.svg';
import trl from '$lib/logos/trl.svg';
import mlflow from '$lib/logos/mlflow.svg';
import yolo from '$lib/logos/yolo.svg';

export const skillGroups = [
	{
		name: 'AI & Machine Learning',
		icon: 'sparkles',
		summary: 'Fine-tuning, RL post-training, retrieval and evaluation.',
		skills: [
			{ name: 'PyTorch', icon: pytorch },
			{ name: 'Unsloth', icon: unsloth },
			{ name: 'TRL', icon: trl },
			{ name: 'GRPO', icon: grpo },
			{ name: 'vLLM', icon: vllm },
			{ name: 'llama.cpp', icon: llamacpp },
			{ name: 'Hugging Face', icon: huggingface },
			{ name: 'PEFT / LoRA', icon: huggingface },
			{ name: 'RAG', icon: rag },
			{ name: 'LlamaIndex', icon: llamaindex },
			{ name: 'LangChain', icon: langchain },
			{ name: 'scikit-learn', icon: scikitlearn },
			{ name: 'OpenCV', icon: opencv },
			{ name: 'YOLO', icon: yolo },
			{ name: 'ROCm', icon: rocm },
			{ name: 'MLflow', icon: mlflow }
		]
	},
	{
		name: 'Languages',
		icon: 'code',
		summary: 'Day-to-day working languages.',
		skills: [
			{ name: 'Python', icon: python },
			{ name: 'C / C++', icon: cpp },
			{ name: 'TypeScript', icon: typescript },
			{ name: 'JavaScript', icon: javascript },
			{ name: 'Java', icon: java },
			{ name: 'SQL', icon: postgresql }
		]
	},
	{
		name: 'Backend',
		icon: 'server',
		summary: 'API design, async pipelines and service deployment.',
		skills: [
			{ name: 'FastAPI', icon: fastapi },
			{ name: 'Django', icon: django },
			{ name: 'Node.js', icon: nodejs },
			{ name: 'Express', icon: express },
			{ name: 'Spring Boot', icon: spring },
			{ name: 'Firebase Functions', icon: firebase }
		]
	},
	{
		name: 'Frontend & Mobile',
		icon: 'layout',
		summary: 'Typed, accessible interfaces across web and mobile.',
		skills: [
			{ name: 'SvelteKit', icon: svelte },
			{ name: 'Next.js', icon: nextjs },
			{ name: 'React', icon: react },
			{ name: 'Tailwind CSS', icon: tailwind },
			{ name: 'Flutter', icon: flutter }
		]
	},
	{
		name: 'Data & Vector Stores',
		icon: 'database',
		summary: 'Relational, cached and embedding-native storage.',
		skills: [
			{ name: 'PostgreSQL', icon: postgresql },
			{ name: 'pgvector', icon: postgresql },
			{ name: 'MySQL', icon: mysql },
			{ name: 'Oracle', icon: oracle },
			{ name: 'Redis', icon: redis },
			{ name: 'Qdrant', icon: qdrant },
			{ name: 'ChromaDB', icon: chroma },
			{ name: 'Supabase', icon: supabase },
			{ name: 'SQLAlchemy', icon: sqlalchemy },
			{ name: 'Drizzle', icon: drizzle }
		]
	},
	{
		name: 'Infrastructure & Tooling',
		icon: 'wrench',
		summary: 'Shipping, observing and scraping at scale.',
		skills: [
			{ name: 'Docker', icon: docker },
			{ name: 'Nginx', icon: nginx },
			{ name: 'Git', icon: git },
			{ name: 'Cloudflare', icon: cloudflare },
			{ name: 'Scrapy', icon: scrapy },
			{ name: 'Selenium', icon: selenium },
			{ name: 'Metabase', icon: metabase },
			{ name: 'Jest', icon: jest },
			{ name: 'Jira', icon: jira },
			{ name: 'Figma', icon: figma }
		]
	}
];

import cdeep from '$lib/logos/cdeep.svg';
import cdeepstan from '$lib/logos/cdeepstan.svg';
import cmi from '$lib/logos/cmi.svg';
import cuc from '$lib/logos/cuc.svg';
import udemy from '$lib/logos/udem.svg';
import hackerrank from '$lib/logos/hackerrank.svg';

export const certifications = [
	{
		name: 'Machine Learning Specialization',
		issuer: 'Stanford University & DeepLearning.AI',
		logo: cdeepstan,
		topics: [
			'Linear & Logistic Regression',
			'Neural Networks',
			'Decision Trees',
			'Tree Ensembles',
			'Unsupervised Learning',
			'Recommender Systems'
		],
		href: 'https://coursera.org/share/d38657af387438d731d72b918cda7901'
	},
	{
		name: 'Deep Learning Specialization',
		issuer: 'DeepLearning.AI',
		logo: cdeep,
		topics: ['CNN', 'RNN / LSTM / GRU', 'Attention', 'ResNet', 'YOLO', 'Transfer Learning'],
		href: 'https://coursera.org/share/fa2ef1ba4d66870b112577f7301d330a'
	},
	{
		name: 'PyTorch for Deep Learning',
		issuer: 'DeepLearning.AI',
		logo: cdeep,
		topics: [
			'PyTorch',
			'Lightning',
			'Optuna',
			'ONNX',
			'Quantization',
			'Pruning',
			'Stable Diffusion',
			'Interpretability'
		],
		href: 'https://coursera.org/share/beae38e6d59a2427c2e8d539b7779250'
	},
	{
		name: 'Generative AI with Large Language Models',
		issuer: 'DeepLearning.AI & AWS',
		logo: cdeep,
		topics: ['Prompt Engineering', 'Fine-tuning', 'PEFT / LoRA', 'RLHF', 'ReAct', 'Scaling Laws'],
		href: 'https://coursera.org/share/51eaf3162114dd12932cda8a8ac9cdbb'
	},
	{
		name: 'AI Agents Course',
		issuer: 'Hugging Face',
		logo: huggingface,
		topics: ['smolagents', 'LangGraph', 'Agentic RAG', 'LlamaIndex', 'Multi-agent Workflows'],
		href: 'https://ycjfhirkrwhkotpadfln.supabase.co/storage/v1/object/public/statics//hg_agent.png'
	},
	{
		name: 'Django Specialization',
		issuer: 'University of Michigan',
		logo: cmi,
		topics: ['Django REST Framework', 'Django ORM', 'Models & Views', 'Templates'],
		href: 'https://coursera.org/share/18164d8616045be347e3bfef0a771e5b'
	},
	{
		name: 'Algorithmic Toolbox',
		issuer: 'UC San Diego',
		logo: cuc,
		topics: [
			'Greedy Algorithms',
			'Divide & Conquer',
			'Dynamic Programming',
			'Graph Algorithms',
			'NP-Completeness'
		],
		href: 'https://coursera.org/share/b9e3c77399de3f593199cd5f7a403437'
	},
	{
		name: 'The Complete JavaScript Course',
		issuer: 'Udemy',
		logo: udemy,
		topics: ['ES6+', 'DOM', 'OOP', 'Async JavaScript', 'Webpack', 'Parcel'],
		href: 'https://www.udemy.com/certificate/UC-f19c5a86-ebd9-4d61-a0d4-7130c8bb8ce5/'
	},
	{
		name: 'Problem Solving (Intermediate)',
		issuer: 'HackerRank',
		logo: hackerrank,
		topics: ['Data Structures', 'Algorithms', 'C++'],
		href: 'https://www.hackerrank.com/certificates/cbbc7e2a288f'
	},
	{
		name: 'SQL (Intermediate)',
		issuer: 'HackerRank',
		logo: hackerrank,
		topics: ['Joins', 'Aggregation', 'Subqueries', 'Window Functions'],
		href: 'https://www.hackerrank.com/certificates/2cf3ee20ebc8'
	}
];
