<script>
  import woa_logo from "$lib/logos/woa.png"; 

  const researchInterests = [
    'Natural Language Processing',
    'Large Language Models', 
    'LLM Web Agents',
    'Human Computer Interaction (HCI)',
    'Deep Learning',
    'Software Engineering & Testing',
    'Distributed Systems'
  ];

  const researchCollaborations = [
    {
      title: 'MemAgent: A cache-inspired framework for augmenting conversational Web Agents with task-specific information',
      supervisor: {
        name: 'Professor Dr. Anindya Iqbal',
        url: 'https://scholar.google.com/citations?user=jAuiNFgAAAAJ&hl=en'
      },
      collaborators: [
        {
          name: 'Faria Huq',
          url: 'https://scholar.google.com/citations?user=u-HabqEAAAAJ&hl=en'
        },
        {
          name: 'Abhik Bhattacharjee', 
          url: 'https://scholar.google.com/citations?user=J3ScR4cAAAAJ&hl=en'
        }
      ],
      publication: {
        venue: 'WOA-2025',
        publisherUrl: 'https://ceur-ws.org/Vol-4028/',
        logo: woa_logo,
        paperUrl: 'https://ceur-ws.org/Vol-4028/paper8.pdf'
      }
    }
  ];
</script>

<svelte:head>
  <title>Research - Nazmus Sakib</title>
</svelte:head>

<div class="min-h-screen text-white py-16 px-4">
  <div class="max-w-6xl mx-auto">
    <!-- Header -->
    <div class="text-center mb-16">
      <h1 class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        Research & Publications
      </h1>
      <p class="text-xl text-slate-300 max-w-3xl mx-auto">
        Exploring the frontiers of AI, NLP, and Human-Computer Interaction
      </p>
    </div>

    <!-- Research Interests -->
    <section class="mb-16">
      <h2 class="text-3xl font-bold mb-8 text-center">Research Interests</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {#each researchInterests as interest}
          <div class="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-4 hover:bg-slate-700/50 transition-all duration-300 hover:scale-105">
            <div class="flex items-center space-x-3">
              <div class="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span class="text-slate-200 font-medium">{interest}</span>
            </div>
          </div>
        {/each}
      </div>
    </section>

    <!-- Research Collaborations -->
    <section>
      <h2 class="text-3xl font-bold mb-8 text-center">Research Collaborations</h2>
      
      {#each researchCollaborations as collaboration}
        <div class="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-8 mb-8 hover:border-slate-600 transition-all duration-300">
          <!-- Publication Info -->
          <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
            <div class="flex-1">
              <h3 class="text-xl md:text-2xl font-bold text-white mb-4 leading-relaxed">
                {collaboration.title}
              </h3>
              
              <!-- Supervisor -->
              <div class="mb-4">
                <span class="text-slate-400 font-medium">Supervised by: </span>
                <a href={collaboration.supervisor.url} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   class="text-blue-400 hover:text-blue-300 font-medium hover:underline transition-colors">
                  {collaboration.supervisor.name}
                </a>
              </div>

              <!-- Collaborators -->
              <div class="mb-4">
                <span class="text-slate-400 font-medium">Mentors: </span>
                {#each collaboration.collaborators as collaborator, index}
                  <a href={collaborator.url} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     class="text-blue-400 hover:text-blue-300 font-medium hover:underline transition-colors">
                    {collaborator.name}
                  </a>
                  {#if index < collaboration.collaborators.length - 1}, {/if}
                {/each}
              </div>
            </div>

            <!-- Publication Logo -->
            <div class="flex flex-col items-center lg:items-end mt-4 lg:mt-0 lg:ml-8">
              <img src={collaboration.publication.logo} 
                   alt="{collaboration.publication.venue} logo" 
                   class="w-20 h-20 object-contain mb-3 rounded-lg bg-white/10 p-2">
              <span class="text-sm text-slate-300 font-medium">{collaboration.publication.venue}</span>
            </div>
          </div>

          <!-- Publication Link -->
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-6 border-t border-slate-700">
            <div class="text-sm text-slate-400 mb-3 sm:mb-0">
              Published in <a href={collaboration.publication.publisherUrl} target="_blank"><span class="text-blue-400 font-medium">{collaboration.publication.venue}</span></a>
            </div>
            <a href={collaboration.publication.paperUrl} 
               target="_blank" 
               rel="noopener noreferrer"
               class="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 w-fit">
              <i class="fas fa-file-pdf"></i>
              <span>View Paper</span>
              <i class="fas fa-external-link-alt text-xs"></i>
            </a>
          </div>
        </div>
      {/each}
    </section>

    <!-- Future Research Section -->
    <section class="mt-16 text-center">
      <div class="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-8">
        <h3 class="text-2xl font-bold mb-4">Looking Ahead</h3>
        <p class="text-slate-300 text-lg max-w-3xl mx-auto">
          I'm actively seeking opportunities to collaborate on cutting-edge research in AI, NLP, and HCI. 
          If you're interested in working together or discussing research ideas, feel free to reach out!
        </p>
        <div class="mt-6">
          <a href="#connect" 
             class="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105">
            <i class="fas fa-envelope"></i>
            <span>Get In Touch</span>
          </a>
        </div>
      </div>
    </section>
  </div>
</div>

<style>
  :global(body) {
    font-family: 'Poppins', sans-serif;
  }
</style>