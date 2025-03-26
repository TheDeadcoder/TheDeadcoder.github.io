<!-- src/routes/education/+page.svelte -->
<script>
    import Fa from 'svelte-fa';
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    import { faGraduationCap, faTrophy, faMedal, faAward, faScroll, faFileAlt,faBook } from '@fortawesome/free-solid-svg-icons';
    import buet_logo from "$lib/logos/buet.svg";
    import ndc from "$lib/logos/ndc.svg";
    import czs from "$lib/logos/czs.svg";
    let mounted = false;
    onMount(() => {
        mounted = true;
    });
    const achievements = {
      university: {
        cgpa: {
          value: "3.82/4.00",
          subtext: "Among top 20% in Academic Performance",
          perfect: {
            value: "4.00/4.00 in the final Semester",
            result_url:"https://ycjfhirkrwhkotpadfln.supabase.co/storage/v1/object/public/statics//result.png"
          }
        },
        deansList: {
          title: "Dean's List Scholar",
          description: "Enlisted in the prestigious Dean's List thrice",
          certificates: [
            { year: "1st Year", url: "https://ycjfhirkrwhkotpadfln.supabase.co/storage/v1/object/public/statics/deans_list/deans_list_1st_year.pdf" },
            { year: "2nd Year", url: "https://ycjfhirkrwhkotpadfln.supabase.co/storage/v1/object/public/statics/deans_list/Deans_list_2nd_year.pdf" },
            { year: "4th Year", url: "https://ycjfhirkrwhkotpadfln.supabase.co/storage/v1/object/public/statics/deans_list/deans_list_4th_year.pdf" }
          ]
        }
      },
      college: {
        mainAchievements: [
          {
            title: "Outstanding Award",
            description: "Ranked 3rd overall in academics",
            certificateUrl: "https://ycjfhirkrwhkotpadfln.supabase.co/storage/v1/object/public/statics/college/ndc.jpg"
          },
          {
            title: "Board Merit",
            description: "Ranked 26th in Dhaka Board (HSC)",
            certificateUrl: "https://ycjfhirkrwhkotpadfln.supabase.co/storage/v1/object/public/statics/college/hsc-sch-dhaka.pdf#page=5"
          }
        ]
      },
      school: {
        mainAchievements: [
          {
            title: "Academic Excellence",
            description: "Ranked 1st for 5 consecutive years (Class 6-10)",
            certificateUrl: "#"
          },
          {
            title: "National Creative Talent Hunt Champion",
            description: "Secured first place in the national round",
            certificateUrl: "https://ycjfhirkrwhkotpadfln.supabase.co/storage/v1/object/public/statics/school/20210205_173303.jpg"
          },
          {
            title: "IPHO National Camp",
            description: "Selected as national camper for International Physics Olympiad",
            certificateUrl: "https://ycjfhirkrwhkotpadfln.supabase.co/storage/v1/object/public/statics/school/20210205_173345.jpg"
          },
          {
            title: "Science Olympiad",
            description: "Competed in National Science Olympiad",
            certificateUrl: "https://ycjfhirkrwhkotpadfln.supabase.co/storage/v1/object/public/statics/school/20210205_173521.jpg"
          },
          {
            title: "Talentpool Scholarship",
            description: "Got Talentpool Scholarship in SSC (Board Position: 1st), JSC (Board Position: 8th) and PSC",
            certificateUrl: "#"
          }
        ]
      }
    };
    let notableCourses = {
        columnOne: [
            { code: "CSE 305", name: "Computer Architecture" },
            { code: "CSE 307", name: "Software Engineering" },
            { code: "CSE 309", name: "Compiler Design" },
            { code: "CSE 313", name: "Operating Systems" },
            { code: "CSE 317", name: "Artificial Intelligence" },
            { code: "CSE 321", name: "Computer Networks" },
        ],
        columnTwo: [
            { code: "CSE 405", name: "Computer Security" },
            { code: "CSE 409", name: "Computer Graphics" },
            { code: "CSE 463", name: "Introduction to Bioinformatics" },
            { code: "CSE 471", name: "Machine Learning" },
            { code: "MATH 245", name: "Statistics and Probability" },
            { code: "MATH 247", name: "Linear Algebra" },
        ]
    };
</script>
<svelte:head>
    <title>Education - Nazmus Sakib</title>
</svelte:head>
<div class="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
    <div class="max-w-7xl mx-auto">
        <h1 class="text-4xl font-bold text-white text-center mb-12 font-poppins">
            Education
        </h1>
        
        {#if mounted}
        <!-- University Section -->
        <div in:fly="{{ y: 50, duration: 500, delay: 1 * 100 }}" out:fade class="mb-16 p-6" >
            <div class="flex items-center space-x-4 mb-8">
                <img src={buet_logo} alt="BUET Logo" class="w-16 h-16" />
                <div>
                    <h2 class="text-2xl font-semibold text-white font-poppins">Bangladesh University of Engineering and Technology</h2>
                    <p class="text-lg text-white font-poppins">B.Sc. in Computer Science & Engineering</p>
                    <p class="text-base text-white font-poppins">2020-2025</p>
                </div>
            </div>

            <!-- Tree Structure -->
            <div class="ml-8 relative">
                <!-- CGPA Branch -->
                <div class="border-l-2 border-blue-500 pl-8 pb-8 relative">
                    <div class="absolute -left-[6px] top-0 w-3 h-3 rounded-full bg-blue-500"></div>
                    <div class="flex items-center space-x-3 mb-2">
                        <Fa icon={faGraduationCap} class="text-blue-500" />
                        <span class="text-white font-semibold font-poppins">CGPA: {achievements.university.cgpa.value}</span>
                    </div>
                    <p class="text-gray-300 ml-7 font-poppins">{achievements.university.cgpa.subtext}</p>
                    <a href={achievements.university.cgpa.perfect.result_url} class="text-blue-400 hover:text-blue-300 transition-colors ml-7 mt-2 inline-block font-poppins">
                        Perfect CGPA in Last Semester
                    </a>
                </div>

                <!-- Dean's List Branch -->
                <div class="border-l-2 border-blue-500 pl-8 pb-8 relative">
                    <div class="absolute -left-[6px] top-0 w-3 h-3 rounded-full bg-blue-500"></div>
                    <div class="flex items-center space-x-3 mb-4">
                        <Fa icon={faScroll} class="text-blue-500" />
                        <span class="text-white font-semibold font-poppins">{achievements.university.deansList.title}</span>
                    </div>
                    <p class="text-gray-300 mb-4 ml-7 font-poppins">{achievements.university.deansList.description}</p>
                    
                    <!-- Certificate Links -->
                    <div class="space-y-3 ml-7">
                        {#each achievements.university.deansList.certificates as cert}
                            <div class="flex items-center space-x-2 relative">
                                <div class="absolute -left-[22px] top-[10px] w-4 h-[2px] bg-blue-500"></div>
                                <Fa icon={faFileAlt} class="text-blue-400" />
                                <a href={cert.url} class="text-blue-400 hover:text-blue-300 transition-colors font-poppins">
                                    {cert.year} Dean's List Scholarship
                                </a>
                            </div>
                        {/each}
                    </div>
                    
                </div>
                <div class="border-l-2 border-blue-500 pl-8 pb-6 relative">

                    <div class="absolute -left-[6px] top-0 w-3 h-3 rounded-full bg-blue-500"></div>
                    <div class="flex items-center space-x-3 mb-6">
                        <Fa icon={faBook} class="text-blue-500" />
                        <span class="text-white font-semibold text-xl font-poppins">Notable Courses</span>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 ml-7">
                        <!-- Column One -->
                        <div class="space-y-3">
                            {#each notableCourses.columnOne as course}
                                <div class="flex items-center space-x-2 relative group">
                                    <div class="absolute -left-[22px] top-[10px] w-4 h-[2px] bg-blue-500"></div>
                                    <div class="text-gray-300 font-poppins group-hover:text-blue-400 transition-colors">
                                        <span class="text-blue-400">{course.code}</span> - {course.name}
                                    </div>
                                </div>
                            {/each}
                        </div>
                        
                        <!-- Column Two -->
                        <div class="space-y-3">
                            {#each notableCourses.columnTwo as course}
                                <div class="flex items-center space-x-2 relative group">
                                    <div class="absolute -left-[22px] top-[10px] w-4 h-[2px] bg-blue-500"></div>
                                    <div class="text-gray-300 font-poppins group-hover:text-blue-400 transition-colors">
                                        <span class="text-blue-400">{course.code}</span> - {course.name}
                                    </div>
                                </div>
                            {/each}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- College Section -->
        <div in:fly="{{ y: 50, duration: 500, delay: 2 * 100 }}" out:fade class="mb-16 p-6">
            <div class="flex items-center space-x-4 mb-8">
                <img src={ndc} alt="Notre Dame College Logo" class="w-16 h-16" />
                <div>
                    <h2 class="text-2xl font-semibold text-white font-poppins">Notre Dame College</h2>
                    <p class="text-lg text-white font-poppins">Higher Secondary Education</p>
                    <p class="text-base text-white font-poppins">2017-2019</p>
                </div>
            </div>

            <div class="ml-8">
                {#each achievements.college.mainAchievements as achievement, index}
                    <div class="border-l-2 border-blue-500 pl-8 pb-8 relative last:pb-0">
                        <div class="absolute -left-[6px] top-0 w-3 h-3 rounded-full bg-blue-500"></div>
                        <div class="flex items-center space-x-3 mb-2">
                            <Fa icon={faTrophy} class="text-blue-500" />
                            <span class="text-white font-semibold font-poppins">{achievement.title}</span>
                        </div>
                        <p class="text-gray-300 ml-7 font-poppins">{achievement.description}</p>
                        <a href={achievement.certificateUrl} class="text-blue-400 hover:text-blue-300 transition-colors ml-7 mt-2 inline-block font-poppins">
                            View Certificate
                        </a>
                    </div>
                {/each}
            </div>
        </div>

        <!-- School Section with similar tree structure -->
        <div in:fly="{{ y: 50, duration: 500, delay: 3 * 100 }}" out:fade class="p-6">
            <div class="flex items-center space-x-4 mb-8">
                <img src={czs} alt="Cumilla Zilla School Logo" class="w-16 h-16" />
                <div>
                    <h2 class="text-2xl font-semibold text-white font-poppins">Cumilla Zilla School</h2>
                    <p class="text-lg text-white font-poppins">Secondary Education</p>
                    <p class="text-base text-white font-poppins">2011-2017</p>
                </div>
            </div>

            <div class="ml-8">
                {#each achievements.school.mainAchievements as achievement, index}
                    <div class="border-l-2 border-blue-500 pl-8 pb-8 relative last:pb-0">
                        <div class="absolute -left-[6px] top-0 w-3 h-3 rounded-full bg-blue-500"></div>
                        <div class="flex items-center space-x-3 mb-2">
                            <Fa icon={faTrophy} class="text-blue-500" />
                            <span class="text-white font-semibold font-poppins">{achievement.title}</span>
                        </div>
                        <p class="text-gray-300 ml-7 font-poppins">{achievement.description}</p>
                        <a href={achievement.certificateUrl} class="text-blue-400 hover:text-blue-300 transition-colors ml-7 mt-2 inline-block font-poppins">
                            View Certificate
                        </a>
                    </div>
                {/each}
            </div>
        </div>
        {/if}
    </div>
</div>