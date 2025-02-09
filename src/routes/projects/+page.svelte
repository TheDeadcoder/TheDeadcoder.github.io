<script>
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    // import Icon from 'svelte-awesome';
    import { faCode, faCalendar, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
  
    import bdehr from '$lib/logos/bdehr.png';
    import coderhub from '$lib/logos/coderhub.png';
    import bebshaAI from '$lib/logos/bebshaAI.png';
    import voyager from '$lib/logos/voyager.png';
    import shopgenie from '$lib/logos/shopgenie.png';
    import tokkhok from '$lib/logos/tokkhok.svg';
    import nerd from '$lib/logos/nerd.svg';
    import huggingface from '$lib/logos/huggingface.svg';
    import secu from "$lib/logos/secu.svg";
  
    const projects = [
      {
        name: "তক্ষক",
        technologies: ["FastAPI", "OpenAI API", "google-transliterate-API", "Qdrant Vector Database", "Authentication", "Supabase", "Alembic", "Postgres", "SQLAlchemy"],
        description: "It is a project developed for developing personalized RAG chatbot. The challenging part was to enable users use Banglish (Bangla written in English) and convert it to Bengali. Also it included sharing, customizing bot-behaviour, fewshot inference, transliterate api usage etc",
        event: "KUET-BITFEST Hackathon - 2025",
        logo: tokkhok,
        demo: "https://ycjfhirkrwhkotpadfln.supabase.co/storage/v1/object/public/statics//BUET_GENESIS.pdf",
        link: "https://github.com/yoboBUETGenesis"
      }, 
      {
        name: "InsightAI",
        technologies: ["FastAPI", "Springboot", "Sveltekit", "OpenAI API", "LLamaIndex", "RAG", "Serper-API", "Qdrant Vector Database", "Authentication", "Supabase", "Celery", "Postgres", "SQLAlchemy", "TailwindCSS", "TypeScript", "Drizzle", "bs4"],
        description: "InsightAI is an AI-powered productivity tool; it’s a comprehensive solution tailored to meet the unique needs of today’s students. It combines advanced AI technology with practical features to transform the way students manage their academic and personal lives.",
        event: "BCOLBD AI Hackathon - 2024",
        logo: "https://avatars.githubusercontent.com/u/180024020?s=200&v=4",
        demo: "https://www.youtube.com/watch?v=-VOxQ5Nok_g",
        link: "https://github.com/InsightAI-BUET-Genesis"
      }, 
      {
        name: "ShopGenie",
        technologies: ["OpenAI API", "Selenium", "FastAPI", "Qdrant Vector Database", "Clip-VIT-model", "Sveltekit", "TailwindCSS", "TypeScript", "Postgres", "Drizzle"],
        description: "An AI powered shopping platform with 21000 products scraped from various sites supporting multi-modal search, Recommendation-system & Sentiment Analysis",
        event: "Lablab AI Reasoning with O1, 2024",
        logo: shopgenie,
        demo: "",
        link: "https://github.com/ShopGenie-O1-Reasoning-Hackathon"
      },
      {
        name: "CoderHub",
        technologies: ["Sveltekit", "Agora-SDK", "TailwindCSS", "monaco-editor", "TypeScript", "Postgres", "Supabase", "DaisyUI", "jszip"],
        description: "A platform for developers with features such as project management (upload, compare, download), video call, collaborative coding, groups, skill based matching with projects and AI chat.",
        event: "Code Crafters Dev Sprint 2024",
        logo: coderhub,
        demo: "https://www.youtube.com/watch?v=oCtfAYUbqPw",
        link: "hhttps://github.com/TheDeadcoder/coderhub"
      },
      {
        name: "BDeHR",
        technologies: ["Svelte", "TailwindCSS", "TypeScript", "Java Springboot", "MySQL"],
        description: "A healthcare platform facilitating effortless access to medical records, promoting efficient patient-doctor collaboration while ensuring data privacy and security.",
        event: "Therap Javafest 2023",
        logo: bdehr,
        demo: "https://www.youtube.com/watch?v=OwdHvHOskb4&list=PLW5antMpb-_P8iauv8Fe4pwLb0x1JXrfG",
        link: "https://github.com/BDEHR-TherapJavaFest2023"
      },
      {
        name: "Voyager",
        technologies: ["Sveltekit", "TailwindCSS", "TypeScript", "Postgres", "Drizzle", "DaisyUI", "GeoApify", "Geolocation", "Address autocomplete", "Reverse geo-encoding"],
        description: "An attraction discovery website to help find detailed information, including weather, amenities, and user reviews of locations. Users can contribute their own travel experiences and suggest new attractions for others to explore.",
        event: "IUT OpenAPI Hackathon 2024",
        logo: voyager,
        demo: "",
        link: "https://github.com/IUTCS-24-OpenAPI-Hackathon/BUET_Genesis"
      },
      {
        name: "NerdHerd",
        technologies: ["Sveltekit", "TailwindCSS", "TypeScript", "Postgres", "Supabase", "DaisyUI", "Agora-SDK", "Planner", "Realtime API", "Authorization", "BLOB-Storage" ],
        description: "NerdHerd is a productivity app which focuses on gathering all the productivity features to minimize distraction. Like other learning platforms, our app's mentionable functionalities include collaborative note taking, video calling, article-write, real time quiz, AI chatbot and what not!! ",
        event: "CSE-408 Project",
        logo: nerd,
        demo: "",
        link: "https://github.com/TheDeadcoder/nerdherd2ndrun"
      },
      {
        name: "BebshaAI",
        technologies: ["React", "Spring Boot", "Python", "Flask", "OpenAI API", "OpenCV", "Material UI"],
        description: "An AI powered platform aimed at empowering SMEs (Small and Midsize Enterprises) to establish their online presence by providing them with a website where they can effortlessly add and sell their products.",
        event: "SUST Hackathon 2024",
        logo: bebshaAI,
        demo: "",
        link: "https://github.com/TheDeadcoder/sust-backend"
      },
      {
        name: "Scraping-Projects",
        technologies: ["Scrapy", "Playwright","ScrapeOps","Selenium", "bs4", "HuggingFace"],
        description: "A collection of scraping projects including scraping of various sites, data extraction, data cleaning, and making large datasets for the purpose of using as RAG dataset",
        event: "Any",
        logo: huggingface,
        demo: "https://huggingface.co/Melikshah",
        link: ""
      },
      {
        name: "Computer-Security Project",
        technologies: ["Sublist3r", "Scout","Burp-Suite","Hatch"],
        description: "Project subdomain enumeration aims to discover subdomains of a given domain by using various tools and techniques. The project is developed to find subdomains of a given domain and try to force login to them.",
        event: "CSE-406 Lab Project",
        logo: secu,
        demo: "https://www.youtube.com/watch?v=YlFt_mR3mXE&t=1s",
        link: ""
      },
      
    ];
  
    let visibleProjects = [];
  
    onMount(() => {
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
      <title>Projects - Nazmus Sakib</title>
  </svelte:head>
  
  <div class="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
    <h1 class="text-4xl font-bold mb-12 text-center text-white font-poppins">
      My Projects
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
                  <img src={project.logo} alt={project.name} class="w-12 h-12 object-contain mr-4" />
                  <h2 class="text-2xl font-bold text-white">{project.name}</h2>
                </div>
                <p class="text-sm mb-4 text-slate-300 flex-grow">{project.description}</p>
                <div class="flex flex-wrap gap-2 mb-4">
                  {#each project.technologies as tech}
                    <span class="px-2 py-1 bg-slate-700/50 backdrop-blur-sm rounded-full text-xs text-slate-300">{tech}</span>
                  {/each}
                </div>
                {#if project.course || project.event}
                  <div class="flex items-center text-slate-400 text-sm mb-4">
                    <!-- <Icon data={project.course ? faCode : faCalendar} scale={1} class="mr-2" /> -->
                    <span>{project.course || `Made for ${project.event}`}</span>
                  </div>
                {/if}
                <div class="flex flex-row space-x-4">
                    <a href={project.link} target="_blank" rel="noopener noreferrer" class={`w-full py-2 px-4 bg-slate-700/50 backdrop-blur-sm text-white rounded transition-colors duration-300 flex items-center justify-center ${project.link.length === 0 ? 'pointer-events-none opacity-50' : 'hover:bg-slate-600/50'}`}>
                        View On Github
                    </a>
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" class={`w-full py-2 px-4 bg-slate-700/50 backdrop-blur-sm text-white rounded transition-colors duration-300 flex items-center justify-center ${project.demo.length === 0 ? 'pointer-events-none opacity-50' : 'hover:bg-slate-600/50'}`}>
                        View demo
                    </a>
                </div>
                
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