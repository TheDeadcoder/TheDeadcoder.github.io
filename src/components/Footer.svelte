<script>
    // Import FontAwesome icons if you're using them
    // Make sure you have @fortawesome/free-solid-svg-icons installed
    import {faCode, faBrain, faGraduationCap} from '@fortawesome/free-solid-svg-icons'
    import { 
      faEnvelope, 
      faPhone, 
      faLocationDot,
      faArrowUpRightFromSquare,
      
    } from '@fortawesome/free-solid-svg-icons';
    import { 
      faGithub, 
      faLinkedin, 
      faYoutube,
      faKaggle, 
      faHackerrank 
    } from '@fortawesome/free-brands-svg-icons';
    import Fa from 'svelte-fa';
  
    const contactInfo = [
      {
        icon: faEnvelope,
        label: "Email",
        value: "sakibbuet2k19@gmail.com",
        link: "mailto:sakibbuet2k19@gmail.com"
      },
      {
        icon: faGithub,
        label: "GitHub",
        value: "TheDeadcoder",
        link: "https://github.com/TheDeadcoder"
      },
      {
        icon: faLinkedin,
        label: "LinkedIn",
        value: "nazmus-sakib-touhid-a43533205",
        link: "https://www.linkedin.com/in/nazmus-sakib-touhid-a43533205"
      },
      {
        icon: faPhone,
        label: "Phone",
        value: "+8801759948779",
        link: "tel:+8801759948779"
      },
      {
        icon: faLocationDot,
        label: "Address",
        value: "Dhaka, Bangladesh",
        link: "#"
      },
      {
        icon: faCode,
        label: "Codeforces",
        value: "melikshah",
        link: "https://codeforces.com/profile/melikshah"
      },
      {
        icon: faKaggle,
        label: "Kaggle",
        value: "thedarkstorm",
        link: "https://kaggle.com/thedarkstorm"
      },
      {
        icon: faBrain,
        label: "HuggingFace",
        value: "Melikshah",
        link: "https://huggingface.co/Melikshah"
      },
      {
        icon: faHackerrank,
        label: "HackerRank",
        value: "sakibbuet2k19",
        link: "https://www.hackerrank.com/sakibbuet2k19"
      },
      {
        icon: faYoutube,
        label: "Youtube",
        value: "nazmussakib19061",
        link: "https://www.youtube.com/@nazmussakib19061"
      },
      {
        icon: faGraduationCap,
        label: "Coursera",
        value: "Nazmus Sakib Touhid",
        link: "https://www.coursera.org/user/161b48f30258428976ca2e2cc4855b3e"
      }
    ];
  
    const roles = [
      "Gen-AI Enthusiast",
      "Full Stack Developer",
      "Machine-Learning & Deep-Learning Enthusiast",
      "Competitive Programmer"
    ];
  </script>
  
  <footer class="w-full bg-gradient-to-b from-gray-900 to-black text-white py-12 px-4 border-t border-violet-900", id="connect">
    <div class="max-w-7xl mx-auto">
      <!-- Header Section -->
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold mb-4">Nazmus Sakib</h2>
        <div class="flex flex-wrap justify-center gap-2 mb-8">
          {#each roles as role}
            <span class="px-4 py-2 bg-violet-900/30 rounded-full text-sm border border-violet-700">
              {role}
            </span>
          {/each}
        </div>
        <div class="h-px w-24 bg-violet-600 mx-auto"></div>
      </div>
  
      <!-- Contact Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {#each contactInfo as item}
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            class="group flex items-center gap-4 p-4 rounded-lg bg-gray-800/50 hover:bg-violet-900/20 transition-all duration-300"
          >
            <div class="p-2 rounded-full bg-violet-900/30 group-hover:bg-violet-900/50 transition-colors">
              <Fa icon={item.icon} class="w-5 h-5" />
            </div>
            <div>
              <p class="text-sm text-gray-400">{item.label}</p>
              <p class="text-white group-hover:text-violet-400 transition-colors">
                {item.value}
                <!-- <sup class="text-xs scale-75 pl-0.5">
                  <Fa icon={faArrowUpRightFromSquare} class="scale-75" />
                </sup> -->
              </p>
            </div>
          </a>
        {/each}
      </div>
  
      <!-- Footer Bottom -->
      <div class="text-center text-sm text-gray-400">
        <p>© 2025 Nazmus Sakib. All rights reserved.</p>
        <p class="mt-2">Building the future with AI and Code</p>
      </div>
    </div>
  </footer>