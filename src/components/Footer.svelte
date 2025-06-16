<script>
    import { 
      faEnvelope, 
      faPhone, 
      faLocationDot ,
      faCode,
    } from '@fortawesome/free-solid-svg-icons';
    import { 
      faGithub, 
      faLinkedin, 
      faYoutube,
      faKaggle, 
      faHackerrank 
    } from '@fortawesome/free-brands-svg-icons';
    import Fa from 'svelte-fa';
  
    const socialLinks = [
      { icon: faGithub, href: "https://github.com/TheDeadcoder", label: "GitHub" },
      { icon: faLinkedin, href: "https://www.linkedin.com/in/nazmus-sakib-touhid-a43533205", label: "LinkedIn" },
      { icon: faYoutube, href: "https://www.youtube.com/@nazmussakib19061", label: "YouTube" },
      { icon: faKaggle, href: "https://kaggle.com/thedarkstorm", label: "Kaggle" },
      { icon: faHackerrank, href: "https://www.hackerrank.com/sakibbuet2k19", label: "HackerRank" },
      { icon: faCode, href: "https://codeforces.com/profile/melikshah", label: "Codeforces"}
    ];
  
    const contactInfo = [
      { icon: faEnvelope, text: "sakibbuet2k19@gmail.com", href: "mailto:sakibbuet2k19@gmail.com" },
      { icon: faPhone, text: "+880*********", href: "tel:+880**********" },
      { icon: faLocationDot, text: "Dhaka, Bangladesh", href: "#" }
    ];
  
    const currentYear = new Date().getFullYear();
  </script>
  
  <footer class="bg-gradient-to-b from-gray-900 to-black text-white py-8 border-t border-violet-900" id="connect">
    <div class="max-w-6xl mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-8">
        <!-- Profile Section -->
        <div class="md:col-span-4 flex flex-col items-center md:items-start">
          <div class="relative w-24 h-24 mb-4">
            <img
              src={"images/profile.png"}
              alt="Nazmus Sakib"
              class="rounded-full border-2 border-violet-500 p-1"
            />
          </div>
          <h3 class="text-xl font-semibold mb-2">Nazmus Sakib</h3>
          <!-- <p class="text-sm text-gray-400 mb-4">Gen-AI Enthusiast | Full Stack Developer</p> -->
        </div>
  
        <!-- Contact Info -->
        <div class="md:col-span-4">
          <h4 class="text-lg font-semibold mb-4 text-center md:text-left">Contact</h4>
          <ul class="space-y-3">
            {#each contactInfo as item}
              <li>
                <a
                  href={item.href}
                  class="flex items-center text-gray-400 hover:text-violet-400 transition-colors group"
                >
                  <span class="mr-3 text-violet-500 group-hover:text-violet-400">
                    <Fa icon={item.icon} size="1x" />
                  </span>
                  <span class="text-sm">{item.text}</span>
                </a>
              </li>
            {/each}
          </ul>
        </div>
  
        <!-- Social Links -->
        <div class="md:col-span-4">
          <h4 class="text-lg font-semibold mb-4 text-center md:text-left">Connect</h4>
          <div class="flex flex-wrap gap-4 justify-center md:justify-start">
            {#each socialLinks as social}
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                class="w-10 h-10 rounded-full bg-violet-900/30 flex items-center justify-center hover:bg-violet-900/50 transition-colors group"
                aria-label={social.label}
              >
                <span class="text-gray-300 group-hover:text-white">
                  <Fa icon={social.icon} size="lg" />
                </span>
              </a>
            {/each}
          </div>
        </div>
      </div>
  
      <!-- Copyright -->
      <div class="mt-8 pt-6 border-t border-gray-800 text-center text-sm text-gray-400">
        <p>© {currentYear} Nazmus Sakib. All rights reserved.</p>
        <p class="mt-1">Building the future with AI and Code</p>
      </div>
    </div>
  </footer>