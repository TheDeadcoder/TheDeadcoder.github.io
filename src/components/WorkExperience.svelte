<!-- WorkExperience.svelte -->
<script>
    import { Fa } from 'svelte-fa';
    import { faCircle } from '@fortawesome/free-solid-svg-icons';
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    let mounted = false;
    onMount(() => {
        mounted = true;
    });
    export let experiences = [];
  </script>
  
  <section class="w-full max-w-4xl mx-auto px-4 py-8 font-['Poppins']">
    <h1 class="text-4xl font-bold text-white text-center mb-12 font-poppins">
        Work Experiences
    </h1>

    {#each experiences as experience, i}
     {#if mounted}
      <div in:fly="{{ y: 50, duration: 500, delay: i * 100 }}" out:fade class="mb-12 last:mb-0">
        <!-- Company Header -->
        <div class="flex items-center gap-3 mb-6">
          {#if experience.logo}
            <img 
              src={experience.logo} 
              alt={`${experience.company} logo`}
              class="w-10 h-10 object-contain"
            />
          {/if}
          <a href={experience.url}>
            <h2 class="text-2xl font-bold text-white hover:text-violet-400 duration-300">{experience.company}</h2>
          </a>
        </div>
  
        <!-- Roles -->
        <div class="ml-4">
          {#each experience.roles as role}
            <div class="relative mb-8 last:mb-0">
              <!-- Role Header -->
              <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-1 pl-6 border-l-2 border-gray-700">
                <h3 class="text-lg font-medium text-white">{role.title}</h3>
                <span class="text-sm text-yellow-500">
                  {role.period}
                </span>
              </div>
  
              <!-- Role Location -->
              <div class="pl-6 mb-3 text-sm text-gray-400 border-l-2 border-gray-700">
                {role.location}
              </div>
  
              <!-- Achievements -->
              <div class="pl-6 border-l-2 border-gray-700">
                {#each role.achievements as achievement, i}
                  <div class="relative mb-3 last:mb-0 pl-6">
                    <div class="absolute left-0 top-2 w-4 h-0.5 bg-gray-700"></div>
                    <div class="text-gray-300">
                      {achievement}
                    </div>
                  </div>
                {/each}
              </div>
            </div>
          {/each}
        </div>
      </div>
     {/if}
    {/each}
  </section>
  
  <style>
    :global(.font-['Poppins']) {
      font-family: 'Poppins', sans-serif;
    }
  </style>