<script>
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    // import Icon from 'svelte-awesome';
    import Icon from 'svelte-awesome';
	import {
		faCode,
		faServer,
		faDatabase,
		faMobileAlt,
		faTools,
		faBrain,
		faUsers,
		faCodeBranch,
		faCogs,
		faChartLine,
		faTasks,
		faDatabase as faDb,
		faRobot,
		faLightbulb as faSolidLightbulb,
		faBrain as faSolidBrain
	} from '@fortawesome/free-solid-svg-icons';

	// Add Devicon imports
	import cppIcon from 'devicon/icons/cplusplus/cplusplus-original.svg';
	import javaIcon from 'devicon/icons/java/java-original.svg';
	import pythonIcon from 'devicon/icons/python/python-original.svg';
	import jsIcon from 'devicon/icons/javascript/javascript-original.svg';
	import typescriptIcon from 'devicon/icons/typescript/typescript-original.svg';
	import reactIcon from 'devicon/icons/react/react-original.svg';
	import svelteIcon from 'devicon/icons/svelte/svelte-original.svg';
	import nodejsIcon from 'devicon/icons/nodejs/nodejs-original.svg';
	import springIcon from 'devicon/icons/spring/spring-original.svg';
	import postgresqlIcon from 'devicon/icons/postgresql/postgresql-original.svg';
	import mysqlIcon from 'devicon/icons/mysql/mysql-original.svg';
	import oracleIcon from 'devicon/icons/oracle/oracle-original.svg';
	import flutterIcon from 'devicon/icons/flutter/flutter-original.svg';
	import opencvIcon from 'devicon/icons/opencv/opencv-original.svg';
	import dockerIcon from 'devicon/icons/docker/docker-original.svg';
	import gitIcon from 'devicon/icons/git/git-original.svg';
	import supabaseIcon from 'devicon/icons/supabase/supabase-original.svg';
	import seleniumIcon from 'devicon/icons/selenium/selenium-original.svg';
	import fastAPIIcon from 'devicon/icons/fastapi/fastapi-original.svg';
    import redis from 'devicon/icons/redis/redis-original.svg';
    import nginx from 'devicon/icons/nginx/nginx-original.svg';
    import djangoIcon from 'devicon/icons/django/django-plain.svg';
	import sqlalchemyIcon from 'devicon/icons/sqlalchemy/sqlalchemy-original.svg';
	import expressIcon from 'devicon/icons/express/express-original.svg';
    import scikitlearn from 'devicon/icons/scikitlearn/scikitlearn-original.svg';
    import jira from 'devicon/icons/jira/jira-original.svg';
    import trello from 'devicon/icons/trello/trello-original.svg';
    import figma from 'devicon/icons/figma/figma-original.svg';
    import drizzle from '$lib/logos/drizzle.svg';
    import scrapy from '$lib/logos/scrapy.svg';
    import metabase from '$lib/logos/metabase.svg';
    import qdrant from '$lib/logos/qdrant.svg';
    import yolo from '$lib/logos/yolo.svg';
    import chroma from '$lib/logos/chroma.svg';
    import rag from '$lib/logos/RAG.svg';
    import huggingface from '$lib/logos/huggingface.svg';
    import llamaindex from '$lib/logos/llamaindex.svg';
    import langchain from '$lib/logos/langchain.svg';
    import firebase from 'devicon/icons/firebase/firebase-original.svg';
    import cloudflare from 'devicon/icons/cloudflare/cloudflare-original.svg';
    import jest from 'devicon/icons/jest/jest-plain.svg';
    import nextjs from 'devicon/icons/nextjs/nextjs-original.svg';
    import pytorch from 'devicon/icons/pytorch/pytorch-original.svg';
    import unsloth from '$lib/logos/unsloth.svg';
    import llamacpp from '$lib/logos/llamacpp.svg';

	import { quintOut } from 'svelte/easing';

	const skillIcons = {
		'C/C++': { type: 'devicon', icon: cppIcon }, // Use C++ icon for C/C++
		Java: { type: 'devicon', icon: javaIcon },
		Python: { type: 'devicon', icon: pythonIcon },
		JavaScript: { type: 'devicon', icon: jsIcon },
		TypeScript: { type: 'devicon', icon: typescriptIcon },
		React: { type: 'devicon', icon: reactIcon },
		'Svelte/Sveltekit': { type: 'devicon', icon: svelteIcon },
		'Node.js': { type: 'devicon', icon: nodejsIcon },
        'Django': { type: 'devicon', icon: djangoIcon },
        'drizzle': { type: 'devicon', icon: drizzle },
		Express: { type: 'devicon', icon: expressIcon },
        'Firebase': { type: 'devicon', icon: firebase },
		'Spring Boot': { type: 'devicon', icon: springIcon },
		PostgreSQL: { type: 'devicon', icon: postgresqlIcon },
		MySQL: { type: 'devicon', icon: mysqlIcon },
		Oracle: { type: 'devicon', icon: oracleIcon },
		Supabase: { type: 'devicon', icon: supabaseIcon },
		Flutter: { type: 'devicon', icon: flutterIcon },
		Git: { type: 'devicon', icon: gitIcon },
		Docker: { type: 'devicon', icon: dockerIcon },
		'OpenAI API': faSolidLightbulb, // No Devicon, using FontAwesome
		Selenium: { type: 'devicon', icon: seleniumIcon },
		OpenCV: { type: 'devicon', icon: opencvIcon },
		'Natural Language Processing': faSolidBrain, // No Devicon, using FontAwesome
		Algorithms: faCodeBranch, // No Devicon, using FontAwesome
		'Data Structures': faCodeBranch, // No Devicon, using FontAwesome
		Optimization: faChartLine, // No Devicon, using FontAwesome
		'Critical Thinking': faSolidBrain, // No Devicon, using FontAwesome
		'Problem Solving': faTasks, // No Devicon, using FontAwesome
		'Team Player': faUsers, // No Devicon, using FontAwesome
		FastAPI: { type: 'devicon', icon: fastAPIIcon },
        "Scrapy": { type: 'devicon', icon: scrapy },
        "Cloudflare": {type:'devicon', icon: cloudflare },
        "Metabase": {type:'devicon', icon: metabase },
        "Qdrant": {type:'devicon', icon: qdrant },
        "Chroma": {type:'devicon', icon: chroma },
        "Redis": {type:'devicon', icon: redis },
        "Nginx": {type:'devicon', icon: nginx },
        "Retrieval-Augmented Generation (RAG)": {type:'devicon', icon: rag },
        "scikitlearn": {type:'devicon', icon: scikitlearn },
        "YOLO": {type:'devicon', icon: yolo },
        "Fine-Tuning (PEFT & LORA)": {type:'devicon', icon: huggingface },
        "LLamaIndex": {type:'devicon', icon: llamaindex },
        "LangChain": {type:'devicon', icon: langchain },
        "Jira": {type:'devicon', icon: jira },
        "Trello": {type:'devicon', icon: trello },
        "Figma": {type:'devicon', icon: figma },
		SQLAlchemy: { type: 'devicon', icon: sqlalchemyIcon },
    jest:{ type: 'devicon', icon: jest },
    Nextjs: { type: 'devicon', icon: nextjs },
    pgvector: { type: 'devicon', icon: postgresqlIcon },
    PyTorch: { type: 'devicon', icon: pytorch },
    Unsloth: { type: 'devicon', icon: unsloth },
    "llama.cpp": { type: 'devicon', icon: llamacpp },
	};

	const skillCategories = [
		{
			name: 'Languages',
			icon: faCode,
			color: 'bg-blue-500',
			skills: ['C/C++', 'Java', 'Python', 'JavaScript', 'TypeScript']
		},
		{
			name: 'Backend',
			icon: faServer,
			color: 'bg-green-500',
			skills: [
                'FastAPI',
                'Django',
				'Svelte/Sveltekit',
				'Node.js',
				'Spring Boot',
			]
		},
        {
			name: 'Frontend',
			icon: faServer,
			color: 'bg-indigo-500',
			skills: [
				'React',
				'Svelte/Sveltekit',
        'Nextjs'
			]
		},
		{
			name: 'Data Systems',
			icon: faDatabase,
			color: 'bg-yellow-500',
			skills: ['PostgreSQL', 'MySQL', 'Oracle', 'Supabase','SQLAlchemy', 'drizzle', "Qdrant", "Chroma", "Redis", "pgvector"]
		},
    {
			name: 'AI & ML',
			icon: faSolidLightbulb,
			color: 'bg-indigo-500',
			skills: ['PyTorch', 'OpenCV', 'Natural Language Processing', 'Unsloth', 'Retrieval-Augmented Generation (RAG)', 'llama.cpp','scikitlearn', "YOLO", "Fine-Tuning (PEFT & LORA)", "LLamaIndex", "LangChain"]
		},
		{
			name: 'Tools',
			icon: faTools,
			color: 'bg-purple-500',
			skills: ['Git', 'Docker', "Nginx", 'OpenAI API', 'Selenium', 'Firebase', "Scrapy", "Cloudflare", "Metabase", "jest"]
		},
		{
			name: 'Soft Skills',
			icon: faBrain,
			color: 'bg-pink-500',
			skills: ['Critical Thinking', 'Problem Solving', 'Team Player', 'Jira', 'Trello', 'Figma']
		},
		{
			name: 'Mobile',
			icon: faMobileAlt,
			color: 'bg-red-500',
			skills: ['Flutter']
		},
		{
			name: 'Competitive',
			icon: faChartLine,
			color: 'bg-orange-500',
			skills: ['Algorithms', 'Data Structures', 'Optimization']
		}
	];

	let mounted = false;
  
    // Import project logos
    import cmi from '$lib/logos/cmi.svg';
    import cdeep from '$lib/logos/cdeep.svg';
    import udemy from '$lib/logos/udem.svg';
    import cdeepstan from '$lib/logos/cdeepstan.svg';
    import cuc from '$lib/logos/cuc.svg';
    import hackerrank from '$lib/logos/hackerrank.svg';

  
    const projects = [
      {
        name: "Machine Learning Specialization",
        technologies: ["Logistic Regression", "Artificial Neural Network", "Linear Regression", "Decision Trees", "Boosting", "Normalization", "Recommender Systems", "Tree Ensembles", "Unsupervised Learning"],
        description: "Machine Learning Specialization by Stanford University & DeepLearning.AI on Coursera. This specialization covers the concepts and tools required to understand, evaluate, and implement machine learning algorithms.",
        logo: cdeepstan,
        link: "https://coursera.org/share/d38657af387438d731d72b918cda7901"
      },
      {
        name: "Deep Learning Specialization",
        technologies: ["Applied Machine Learning", "CNN", "RNN", "LSTM", "GRU", "Attention Mechanism", "YOLO", "ResNet", "Sequence Model", "Transfer Learning"],
        description: "Deep Learning Specialization by DeepLearning.AI on Coursera. This specialization covers the concepts and tools required to understand, evaluate, and implement deep learning algorithms.",
        logo: cdeep,
        link: "https://coursera.org/share/fa2ef1ba4d66870b112577f7301d330a"
      },
      {
        name: "PyTorch for Deep Learning",
        technologies: ["PyTorch", "Torchvision", "Neural Networks", "CNN", "RNN", "Transfer Learning", "Optuna", "Lightning", "ONNX", "MLOps", "Stable Diffusion", "Pruning", "Quantization", "Transformers", "Interpretability"],
        description: "PyTorch for Deep Learning Professional Certificate by DeepLearning.AI. This course covers the concepts and tools required to understand, evaluate, and implement deep learning algorithms using PyTorch.",
        logo: cdeep,
        link: "https://coursera.org/share/beae38e6d59a2427c2e8d539b7779250"
      },
      {
        name: "Generative AI with Large Language Models",
        technologies: ["Generative AI", "LLM", "Prompting and prompt engineering", "Fine-tuning", "PEFT", "LoRA", "RLHF", "ReAct", "Program-aided language models (PAL)", "Scaling"],
        description: "Generative AI with Large Language Models by OpenAI. This course covers the concepts and tools required to understand, evaluate, and implement generative AI applications.",
        logo: cdeep,
        link: "https://coursera.org/share/51eaf3162114dd12932cda8a8ac9cdbb"
      },
	  {
        name: "Hugging Face AI Agent Course",
        technologies: ["AI-Agent", "Smolagent", "LangChain", "LangGraph", "Agentic RAG", "LLamaIndex", "Hugging Face Hub", "Multi-Agent Workflows"],
        description: "AI Agent Course by Hugging Face. This course covers the concepts and tools required to understand, evaluate, and implement AI agents.",
        logo: huggingface,
        link: "https://ycjfhirkrwhkotpadfln.supabase.co/storage/v1/object/public/statics//hg_agent.png"
      },
      {
        name: "The Complete Javascript Course",
        technologies: ["JavaScript", "ES6", "DOM Manipulation", "OOP", "Asynchronous JavaScript", "AJAX", "APIs", "NPM", "Webpack", "Parcel"],
        description: "The Complete Javascript Course by Udemy. This course covers the concepts and tools required to understand, evaluate, and implement JavaScript applications.",
        logo: udemy,
        link: "https://www.udemy.com/certificate/UC-f19c5a86-ebd9-4d61-a0d4-7130c8bb8ce5/"
      },
      {
        name: "Django Specialization",
        technologies: ["Django", "Web Development", "Python", "Django REST Framework", "Django ORM", "Django Forms", "Django Templates", "Django Views", "Django Models"],
        description: "Django Specialization course by Coursera. This course covers the concepts and tools required to understand, and implement web applications using Django.",
        logo: cmi,
        link: "https://coursera.org/share/18164d8616045be347e3bfef0a771e5b"
      },
      {
        name: "Algorithmic Toolbox",
        technologies: ["Software Testing", "Algorithmic Toolbox", "Greedy Algorithms", "Divide and Conquer", "Dynamic Programming", "Graph Algorithms", "NP-Completeness", "Complexity Theory"],
        description: "Algorithmic Toolbox course by Coursera. This course covers the concepts and tools required to understand, evaluate, and implement algorithms.",
        logo: cuc,
        link: "https://coursera.org/share/b9e3c77399de3f593199cd5f7a403437"
      },
      {
        name: "Problem Solving (Intermediate) Certificate",
        technologies: ["Problem Solving", "Data Structures", "Algorithms", "C++", "Competitive Programming"],
        description: "Problem Solving (Intermediate) Certificate by HackerRank. This certificate is awarded for solving intermediate-difficulty level problems on HackerRank.",
        logo: hackerrank,
        link: "https://www.hackerrank.com/certificates/cbbc7e2a288f"
      },
      {
        name: "SQL (Intermediate) Certificate",
        technologies: ["SQL", "Database Queries"],
        description: "SQL (Intermediate) Certificate by HackerRank. This certificate is awarded for solving intermediate-difficulty level SQL problems on HackerRank.",
        logo: hackerrank,
        link: "https://www.hackerrank.com/certificates/2cf3ee20ebc8"
      },
    ];
  
    let visibleProjects = [];
  
    onMount(() => {
     mounted = true;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            visibleProjects = [...visibleProjects, entry.target.dataset.project];
          }
        });
      }, { threshold: 0.1 });
  
      document.querySelectorAll('.project-card').forEach(card => {
        observer.observe(card);
      });
    });
  </script>
  
  <svelte:head>
      <title>Skills & Certifications - Nazmus Sakib</title>
  </svelte:head>

  <div class="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
	<h1 class="text-4xl font-bold mb-6 text-center text-white font-poppins">My Skills</h1>

	<div
		class=" from-gray-900 via-slate-800 to-gray-900 container mx-auto px-4 py-16 relative"
	>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each skillCategories as category, i}
				{#if mounted}
					<div
						in:fly={{ y: 50, duration: 800, delay: i * 100, easing: quintOut }}
						class="bg-slate-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 border border-slate-700"
					>
						<div class={`${category.color} p-6 flex items-center`}>
							<Icon data={category.icon} scale={2} class="text-white mr-4" />
							<h3 class="text-2xl font-semibold text-white">{category.name}</h3>
						</div>
						<div class="p-6">
							<ul class="space-y-3">
								{#each category.skills as skill}
									<li
										class="text-slate-300 bg-slate-700 rounded-lg px-4 py-3 text-base flex items-center transition-all duration-200 hover:bg-slate-600"
									>
										{#if typeof skillIcons[skill] === 'object' && skillIcons[skill].type === 'devicon'}
											<img src={skillIcons[skill].icon} alt={skill} class="mr-3 w-6 h-6" />
										{:else}
											<Icon data={skillIcons[skill] || faCode} scale={1.2} class="mr-3" />
										{/if}
										<span class="font-medium">{skill}</span>
									</li>
								{/each}
							</ul>
						</div>
					</div>
				{/if}
			{/each}
		</div>
	</div>
</div>
  
  <div class="container mx-auto px-2 sm:px-4 py-4 sm:py-8" id="Certifications">
    <h1 class="text-4xl font-bold mb-12 text-center text-white font-poppins">
        My Certifications
    </h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each projects as project, i}
        <div 
          class="project-card relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 bg-slate-800/50 backdrop-blur-sm border border-slate-700"
          data-project={project.name}
        >
          {#if visibleProjects.includes(project.name)}
            <div in:fly="{{ y: 50, duration: 500, delay: i * 100 }}" out:fade class="h-full flex flex-col">
              <div class="absolute top-0 left-0 w-full h-full opacity-5 filter blur-sm" style="background-image: url({project.logo}); background-size: cover; background-position: center;"></div>
              <div class="relative z-10 p-6 flex-grow flex flex-col">
                <div class="flex items-center mb-4">
                  <img src={project.logo} alt={project.name} class="w-16 h-16 object-contain mr-4" />
                  <h2 class="text-2xl font-bold text-white">{project.name}</h2>
                </div>
                <p class="text-sm mb-4 text-slate-300 flex-grow">{project.description}</p>
                <div class="flex flex-wrap gap-2 mb-4">
                  {#each project.technologies as tech}
                    <span class="px-2 py-1 bg-slate-700/50 backdrop-blur-sm rounded-full text-xs text-slate-300">{tech}</span>
                  {/each}
                </div>
                
                <a href={project.link} target="_blank" rel="noopener noreferrer" class="w-full py-2 px-4 bg-slate-700/50 backdrop-blur-sm text-white rounded hover:bg-slate-600/50 transition-colors duration-300 flex items-center justify-center">
                  <!-- <Icon data={faExternalLinkAlt} scale={1} class="mr-2" /> -->
                  View Certificate
                </a>
              </div>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
  
  <style>
    :global(body) {
      font-family: 'Inter', sans-serif;
      background-color: #0f172a; /* Tailwind's slate-900 */
    }
    .font-poppins {
      font-family: 'Poppins', sans-serif;
    }
  </style>