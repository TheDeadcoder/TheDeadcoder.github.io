<script>
    import Step from "./Step.svelte";
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    import Fa from 'svelte-fa';
    import { faDownload, faEye } from '@fortawesome/free-solid-svg-icons';
    import resume from '$lib/assets/resume.pdf';
    let mounted = false;
    onMount(() => {
        mounted = true;
    });

    let benefits = [
        {
            name: "Balance between academics & skill-development",
            description:
                "I completed my Bachelor's degree at Computer Science and Engineering from BUET. I can describe my university life as a balance between academics and extra curricular activities. I am a very passionate competitive programmer. I love solving complex problems and break them down to simple tasks. I also participate in different hackathons and programming competitions and have achieved quite a few awards.",
        },
        {
            metric: "10x",
            name: "a self taught developer",
            description:
                "I taught myself to code using free online resources and absolutely fell in love with the creativity and problem solving that is involved in developing and engineering innovative new online experiences. I've worked with languages like Sveltekit, TailwindCSS, TypeScript, Flutter, Java, C/C++, Python, and more. ",
        },
        {
            name: "an AI-enthusiast",
            description:
                "I have been driven by the innovations and works in the field of Generative AI. So I focus on the field of AI and Machine Learning. I have been working on different projects leveraging the power of Gen AI, advanced RAG, Vector databases, Reinforcement learning, Sentiment analysis, Recommendation systems, and more. My interest in Gen AI and Deep learning has led me to dive into several exciting projects, hackathons & datathons, where I've tinkered with a variety of techs, architectures and pipelines",
        },
        {
            name: "an excellent communicator",
            description:
                "Communication is key and it's a paramount value of mine. I believe in transparency and constructive communication above all else. This helps me develop deep relationships and ensures my effectiveness and productivity in any work space with any team.",
        },
        {
            name: "Continuous learning & improvement",
            description:
                "My life motto is to be better than yesterday. I try to learn new things everyday. I like to keep up with the latest tech and programming news. I see problems as opportunities to learn and grow. I am always open to new ideas and suggestions.",
        },
    ];
</script>
<svelte:head>
    <title>Home - Nazmus Sakib</title>
</svelte:head>
<main class="flex flex-col flex-1 p-4">
    <section
        id="about"
        class="grid grid-cols-1 lg:grid-cols-2 gap-10 py-8 sm:py-14"
    >
        <div
            class="flex flex-col lg:justify-center text-center lg:text-left gap-6 md:gap-8 lg:gap-10"
        >
            <h2 class="font-semibold text-4xl sm:text-5xl md:text-6xl">
                Hi! I'm <span class="poppins text-violet-400">Nazmus</span> Sakib
                <br />
                <p class="text-xl font-semibold">
                    Gen-AI Enthusiast | Full Stack Developer | Machine-Learning & Deep-Learning Enthusiast | Competitive Programmer
                </p>
            </h2>
            <p class="text-base sm:text-lg md:text-xl">
                I have completed my Undergrad majoring in Computer Science & Engineering from Bangladesh University of Engineering & Technology (BUET)
            </p>
            <a href="#connect">
                <button
                    class="blueShadow mx-auto lg:mr-auto lg:ml-0 text-base sm:text-lg md:text-xl poppins relative overflow-hidden px-6 py-3 group rounded-full bg-white text-slate-950"
                >
                    <div
                        class="absolute top-0 right-full w-full h-full bg-violet-400 opacity-20 group-hover:translate-x-full z-0 duration-200"
                    />
                    <h4 class="relative z-9">Get in touch &rarr;</h4>
                </button>
            </a>
        </div>
        <div class="relative shadow-2xl grid place-items-center">
            <img
                src={"images/profile.png"}
                alt="Zetane Engine"
                class="object-cover z-[2] max-h-[70vh]"
            />
        </div>
        
    </section>

    <section
        
        class="py-20 pt-10 lg:pt-16 lg:py-32 flex flex-col gap-16 sm:gap-20 md:gap-24 relative"
    >
        <!-- <div class="z-[-1] bg-violet-950 w-screen left-1/2 -translate-x-1/2 top-0 h-full absolute"> </div> -->
        <div
            class="flex flex-col gap-2 text-center relative before:absolute before:top-0 before:left-0 before:w-2/3 before:h-1.5 before:bg-violet-700 after:absolute after:bottom-0 after:right-0 after:w-2/3 after:h-1.5 after:bg-violet-700 py-4"
        >
            <h6 class="text-large sm:text-xl md:text-2xl">
                Want to know more?
            </h6>
            <h3 class="font-semibold text-3xl sm:text-4xl md:text-5xl">
                A bit <span class="poppins text-violet-400">about</span> me.
            </h3>
        </div>
        <div class="flex flex-col gap-20 w-full mx-auto max-w-[800px]">
            {#each benefits as benefit, index}
              {#if mounted}
                <div in:fly="{{ y: 50, duration: 500, delay: index * 100 }}" out:fade class="flex gap-6 sm:gap-8">
                    <p
                        class="poppins text-4xl sm:text-5xl md:text-6xl text-slate-500 font-semibold"
                    >
                        0{index + 1}
                    </p>
                    <div class="flex flex-col gap-6 sm:gap-8">
                        <h3 class="text-2xl sm:text-3xl md:text-5xl">
                            {benefit.name}
                        </h3>
                        <p>{benefit.description}</p>
                    </div>
                </div>
              {/if}
            {/each}
        </div>
        
    </section>
    <section id="resume" class="py-20 lg:py-32 flex flex-col gap-16 sm:gap-20 md:gap-24 relative">
        <!-- Section Header -->
        <div class="flex flex-col gap-2 text-center relative before:absolute before:top-0 before:left-0 before:w-2/3 before:h-1.5 before:bg-violet-700 after:absolute after:bottom-0 after:right-0 after:w-2/3 after:h-1.5 after:bg-violet-700 py-4">
            <h6 class="text-large sm:text-xl md:text-2xl">
                Check out my credentials
            </h6>
            <h3 class="font-semibold text-3xl sm:text-4xl md:text-5xl poppins">
                My <span class="text-violet-400">Resume</span>
            </h3>
        </div>
    
        <!-- Resume Container -->
        {#if mounted}
        <div 
            in:fly="{{ y: 50, duration: 500 }}" 
            out:fade 
            class="max-w-[1000px] mx-auto w-full px-4"
        >
            <!-- Resume Preview Container -->
            <div class="bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div class="relative aspect-[8.5/11] w-full">
                    <iframe
                        src={resume}
                        title="Resume Preview"
                        class="absolute inset-0 w-full h-full"
                        style="pointer-events: none;"
                    ></iframe>
                    
                    <!-- Gradient Overlay -->
                    <div class="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-white to-transparent"></div>
                </div>
                
                <!-- Action Buttons -->
                <div class="flex flex-col sm:flex-row gap-4 justify-center items-center p-6 bg-white">
                    <a 
                        href={resume} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        class="flex items-center gap-2 px-6 py-3 rounded-full bg-violet-500 text-white hover:bg-violet-600 transition-colors duration-200"
                    >
                        <Fa icon={faEye} />
                        <span class="poppins">View Full Resume</span>
                    </a>
                    
                    <a 
                        href={resume} 
                        download
                        class="flex items-center gap-2 px-6 py-3 rounded-full border-2 border-violet-500 text-violet-500 hover:bg-violet-50 transition-colors duration-200"
                    >
                        <Fa icon={faDownload} />
                        <span class="poppins">Download PDF</span>
                    </a>
                </div>
            </div>
    
            <!-- Resume Highlights -->
            <!-- <div class="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {#each ['Education', 'Experience', 'Skills'] as highlight, index}
                <div 
                    in:fly="{{ y: 50, duration: 500, delay: index * 100 }}"
                    class="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-200"
                >
                    <h4 class="text-xl font-semibold mb-3 poppins text-violet-500">{highlight}</h4>
                    <div class="w-12 h-1 bg-violet-400 mb-4"></div>
                    <p class="text-slate-600">
                        {#if highlight === 'Education'}
                            BUET - Bachelor's in Computer Science and Engineering
                        {:else if highlight === 'Experience'}
                            Full Stack Development • AI/ML Projects • Competitive Programming
                        {:else}
                            Python • JavaScript • TypeScript • Svelte • React • TailwindCSS
                        {/if}
                    </p>
                </div>
                {/each}
            </div> -->
        </div>
        {/if}
    </section>
</main>
