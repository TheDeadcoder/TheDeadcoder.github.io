<script>
	import About from '$components/sections/About.svelte';
	import Experience from '$components/sections/Experience.svelte';
	import Projects from '$components/sections/Projects.svelte';
	import Research from '$components/sections/Research.svelte';
	import Education from '$components/sections/Education.svelte';
	import Achievements from '$components/sections/Achievements.svelte';
	import Skills from '$components/sections/Skills.svelte';

	import { site, socials } from '$data/site.js';
	import { tabs, tabState } from '$lib/tabs.svelte.js';

	const panels = {
		about: About,
		experience: Experience,
		projects: Projects,
		research: Research,
		education: Education,
		achievements: Achievements,
		skills: Skills
	};

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: site.name,
		url: site.url,
		image: `${site.url}${site.avatarFallback}`,
		email: `mailto:${site.email}`,
		jobTitle: 'Lecturer & AI/ML Engineer',
		description: site.description,
		address: { '@type': 'PostalAddress', addressLocality: 'Dhaka', addressCountry: 'BD' },
		alumniOf: { '@type': 'CollegeOrUniversity', name: site.alumniOf },
		worksFor: { '@type': 'CollegeOrUniversity', name: site.worksFor },
		knowsAbout: site.keywords,
		sameAs: socials.map((s) => s.href)
	};

	const websiteLd = {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: `${site.name} | Portfolio`,
		url: site.url,
		inLanguage: 'en'
	};
</script>

<svelte:head>
	<title>{site.name}</title>
	<meta name="description" content={site.description} />
	<meta name="author" content={site.name} />
	<meta name="keywords" content={site.keywords.join(', ')} />
	<link rel="canonical" href={site.url} />

	<meta property="og:type" content="profile" />
	<meta property="og:site_name" content={site.name} />
	<meta property="og:title" content={site.name} />
	<meta property="og:description" content={site.description} />
	<meta property="og:url" content={site.url} />
	<meta property="og:image" content="{site.url}{site.ogImage}" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="{site.name} | {site.role}" />
	<meta property="og:locale" content="en_US" />
	<meta property="profile:first_name" content="Nazmus" />
	<meta property="profile:last_name" content="Sakib" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={site.name} />
	<meta name="twitter:description" content={site.description} />
	<meta name="twitter:image" content="{site.url}{site.ogImage}" />

	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</` + `script>`}
	{@html `<script type="application/ld+json">${JSON.stringify(websiteLd)}</` + `script>`}
</svelte:head>

<!--
  All panels stay in the DOM and are toggled with `hidden`, so the prerendered
  HTML contains every section for crawlers while the UI stays tabbed.
-->
<div id="panels" class="mx-auto w-full max-w-6xl scroll-mt-28 px-4 pb-8 sm:px-6 lg:px-8">
	{#each tabs as tab (tab.id)}
		{@const Panel = panels[tab.id]}
		<div
			id={tab.id}
			role="tabpanel"
			aria-labelledby="tab-{tab.id}"
			tabindex="-1"
			hidden={tabState.active !== tab.id}
			class="pt-6 pb-10 focus:outline-none sm:pt-8 sm:pb-14"
		>
			<Panel />
		</div>
	{/each}
</div>
