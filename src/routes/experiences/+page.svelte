<!-- routes/+page.svelte -->
<script>
    import WorkExperience from '../../components/WorkExperience.svelte';
    import priyo_logo from "$lib/logos/priyo.svg";
    import buet from "$lib/logos/buet.svg";
    import oleyn from "$lib/logos/oleyn.svg";
    import yobo from "$lib/logos/yobo.svg";
    const experienceData = [
      {
        company: 'Priyo',
        logo: priyo_logo,
        url: "https://www.priyo.com/",
        roles: [
          {
            title: 'Junior Software Engineer',
            period: 'June 2024 - Present',
            location: 'Dhaka, Bangladesh',
            achievements: [
              'Created a CRM application for better data-warehousing & user-management across different platforms of Priyo. Did REST API Development in Django, PostgreSQL. Used Docker for containerization, NGINX as Proxy-server in deployment, and integrated CI/CD pipeline. Implemented Supabase & Priyo-auth for authentication and authorization. Used Metabase for data visualization and analysis. Implemented Dynamic Email campaigning using SendGrid.',
              'Developed Priyo play (play.priyo.com) - a platform to take part in different quizzes, contests, and games.',
              'Developed an AI-chatbot for Priyo, which can answer user queries, provide information based on Knowledge Base. Used LLamaIndex framework, Hybrid-indexing, Vector database aiming to build an Advanced RAG architecture'
            ]
          }
        ]
      },
      {
        company: 'Intellesphere, BUET',
        logo: buet,
        url: "#",
        roles: [
          {
            title: 'Founding Engineer & Fullstack Developer',
            period: 'Mar 2024 - Dec 2024',
            location: 'Dhaka, Bangladesh',
            achievements: [
              'Developed an AI powered application aimed at serving customers with their banking-related queries. Used different LLM models, Hybrid-indexing, Vector database, Agentic RAG architectures for Leveraging Query performance on Bank\'s Public Data, Users\' Personalized queries and human involvement. Used Keycloak for Authprization, Supabase for authentication, and Metabase for data visualization.',
              'Developed an AI powered search platform for searching for products with natural language, image and even both. Used Multimodal Embeddings, Advenced rerankings, Recommendation-System for the application. Used Celery for task scheduling, Redis for caching, and FastAPI for REST API development. Used Scrapy and Selenium for web scraping and data collection.',
              'Developed a RAG chatting platform to serve the queries of Titas Gas Company Limited. The Response came from both existing internal knowledge-base and Real-time information. Used Serper API for Realtime websearch.'
            ]
          }
        ]
      },
      {
        company: 'Oleyn',
        logo: oleyn,
        url: "https://www.oleyn.ai/",
        roles: [
          {
            title: 'Founding Engineer & Backend Developer',
            period: 'May 2024 - Dec 2024',
            location: 'Dhaka, Bangladesh',
            achievements: [
              'Worked on an AI-powered Customer Experience (CX) management system designed specifically for large organizations with dedicated customer centers, offering key features that enhance service quality and efficiency with the help of AI. Integrated RAG pipeline. Used Diarization model and Finetuned ASR model for transcript generation with low-latency. Used Redis for caching, FastAPI for REST API development, and Docker for containerization.',
              'Developed an advanced AI-assistive technology for legal professionals, offering tools that streamline legal research, drafting, and decision-making processes.'
            ]
          }
        ]
      },
      {
        company: 'Yobo',
        logo: yobo,
        url: "https://www.helloyobo.com/",
        roles: [
          {
            title: 'Software Engineer Intern',
            period: 'Jan 2024 - May 2024',
            location: 'Dhaka, Bangladesh',
            achievements: [
              'I worked on a project that aimed at making an AI powered application for chatting with Large, Live SQL and No-SQL database with natural language. I used Langchain, RAG, Maria-db, Sveltekit and Flask for this project'
            ]
          }
        ]
      }
    ];
  </script>
  
  <WorkExperience experiences={experienceData} />