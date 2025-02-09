<script>
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { slide } from 'svelte/transition';
    export let y;
    export let tabs = [
      { name: "About me", link: "/#about" },
      { name: "Education ", link: "/education" },
      { name: "Experiences ", link: "/experiences" },
      { name: "Achievements ", link: "/achievements" },
      { name: "Projects", link: "/projects" },
      { name: "Skills & Certifications ", link: "/skill_certifications" },
      { name: "Research & Blogs", link: "/research_blogs" },
    ];
  
    let isMenuOpen = false;
    let isMounted = false;
  
    onMount(() => {
      isMounted = true;
    });
  
    function toggleMenu() {
      isMenuOpen = !isMenuOpen;
    }
  
    // Close menu when clicking outside
    function handleClickOutside(event) {
      if (isMounted && isMenuOpen && !event.target.closest('.mobile-menu') && !event.target.closest('.menu-button')) {
        isMenuOpen = false;
      }
    }
  </script>
  
  <svelte:window on:click={handleClickOutside}/>
  
  <header
    class={"sticky z-[10] top-0 duration-200 px-6 flex items-center justify-between border-b border-solid " +
      (y > 0
        ? " py-4 bg-slate-950 border-violet-950"
        : " py-6 bg-transparent border-transparent")}
  >
    <a href="/">
        <h1 class="font-medium">
        <b class="font-bold poppins">Nazmus</b> <span class="">Sakib</span>
        </h1>
    </a>
  
    <!-- Desktop Menu -->
    <div class="sm:flex items-center gap-4 hidden">
      {#each tabs as tab, index}
        <a
          href={tab.link}
          class="duration-200 hover:text-violet-400"
        >
          <p>{tab.name}</p>
        </a>
      {/each}
      <a href="#connect">
        <button
          class="blueShadow relative overflow-hidden px-5 py-2 group rounded-full bg-white text-slate-950"
        >
          <div
            class="absolute top-0 right-full w-full h-full bg-violet-400 opacity-20 group-hover:translate-x-full z-0 duration-200"
          />
          <h4 class="relative z-9">Get in touch</h4>
        </button>
      </a>
    </div>
  
    <!-- Mobile Menu Button -->
    <button
      class="sm:hidden menu-button p-2 hover:bg-violet-900/20 rounded-lg duration-200"
      on:click={toggleMenu}
      aria-label="Toggle menu"
    >
      <svg
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        {#if isMenuOpen}
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        {:else}
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        {/if}
      </svg>
    </button>
  
    <!-- Mobile Menu -->
    {#if isMenuOpen}
      <div
        class="mobile-menu fixed top-[72px] left-0 right-0 bg-slate-950 border-b border-violet-950 sm:hidden"
        transition:slide={{ duration: 200 }}
      >
        <nav class="flex flex-col p-4">
          {#each tabs as tab}
            <a
              href={tab.link}
              class="py-3 px-4 hover:bg-violet-900/20 rounded-lg duration-200"
              on:click={() => isMenuOpen = false}
            >
              {tab.name}
            </a>
          {/each}
          <a
            href="#connect"
            class="mt-4 px-4"
            on:click={() => isMenuOpen = false}
          >
            <button
              class="blueShadow relative overflow-hidden px-5 py-2 group rounded-full bg-white text-slate-950 w-full"
            >
              <div
                class="absolute top-0 right-full w-full h-full bg-violet-400 opacity-20 group-hover:translate-x-full z-0 duration-200"
              />
              <h4 class="relative z-9">Get in touch</h4>
            </button>
          </a>
        </nav>
      </div>
    {/if}
  </header>
  
  <style>
    /* Add any custom styles here */
    :global(.blueShadow) {
      box-shadow: 0 0 0.5rem rgba(139, 92, 246, 0.5);
    }
  </style>