import buet from '$lib/logos/buet.svg';
import ndc from '$lib/logos/ndc.svg';
import czs from '$lib/logos/czs.svg';

export const education = [
	{
		institution: 'Bangladesh University of Engineering and Technology',
		short: 'BUET',
		logo: buet,
		degree: 'B.Sc. in Computer Science & Engineering',
		period: 'Jan 2020 – Mar 2025',
		location: 'Dhaka, Bangladesh',
		result: { label: 'CGPA', value: '3.82 / 4.00' },
		notes: [
			'Top 20% of class by academic performance.',
			'4.00 / 4.00 in the final semester.'
		],
		links: [
			{
				label: 'Final semester result',
				href: 'https://ik.imagekit.io/sakib61/portfolio/result.png'
			}
		],
		honours: {
			title: "Dean's List Scholar",
			description: "Enlisted in the Dean's List three times for academic excellence.",
			items: [
				{
					label: "1st Year Dean's List",
					href: 'https://ik.imagekit.io/sakib61/portfolio/deans_list_1st_year.pdf'
				},
				{
					label: "2nd Year Dean's List",
					href: 'https://ik.imagekit.io/sakib61/portfolio/Deans_list_2nd_year.pdf'
				},
				{
					label: "4th Year Dean's List",
					href: 'https://ik.imagekit.io/sakib61/portfolio/deans_list_4th_year.pdf'
				}
			]
		},
		courses: [
			{ code: 'CSE 471', name: 'Machine Learning' },
			{ code: 'CSE 317', name: 'Artificial Intelligence' },
			{ code: 'CSE 307', name: 'Software Engineering' },
			{ code: 'CSE 309', name: 'Compiler Design' },
			{ code: 'CSE 313', name: 'Operating Systems' },
			{ code: 'CSE 321', name: 'Computer Networks' },
			{ code: 'CSE 405', name: 'Computer Security' },
			{ code: 'CSE 409', name: 'Computer Graphics' },
			{ code: 'CSE 463', name: 'Introduction to Bioinformatics' },
			{ code: 'CSE 305', name: 'Computer Architecture' },
			{ code: 'MATH 245', name: 'Statistics and Probability' },
			{ code: 'MATH 247', name: 'Linear Algebra' }
		]
	},
	{
		institution: 'Notre Dame College',
		short: 'NDC',
		logo: ndc,
		degree: 'Higher Secondary Certificate – Science',
		period: '2017 – 2019',
		location: 'Dhaka, Bangladesh',
		notes: [],
		honours: null,
		awards: [
			{
				title: 'Outstanding Award',
				description: 'Ranked 3rd overall in academics.',
				href: 'https://ik.imagekit.io/sakib61/portfolio/ndc.jpg'
			},
			{
				title: 'Board Merit Scholarship',
				description: 'Ranked 26th in Dhaka Board (HSC).',
				href: 'https://ik.imagekit.io/sakib61/portfolio/hsc-sch-dhaka.pdf#page=5'
			}
		]
	},
	{
		institution: 'Cumilla Zilla School',
		short: 'CZS',
		logo: czs,
		degree: 'Secondary School Certificate – Science',
		period: '2011 – 2017',
		location: 'Cumilla, Bangladesh',
		notes: [],
		honours: null,
		awards: [
			{
				title: 'Academic Excellence',
				description: 'Ranked 1st for five consecutive years (Class 6–10).',
				href: ''
			},
			{
				title: 'National Creative Talent Hunt – Champion',
				description: 'First place in the national round.',
				href: 'https://ik.imagekit.io/sakib61/portfolio/national_talent_hunt.jpg'
			},
			{
				title: 'IPhO National Camp',
				description: 'Selected as a national camper for the International Physics Olympiad.',
				href: 'https://ik.imagekit.io/sakib61/portfolio/ipho.jpg'
			},
			{
				title: 'National Science Olympiad',
				description: 'Competed at the national level.',
				href: 'https://ik.imagekit.io/sakib61/portfolio/science_olympiad.jpg'
			},
			{
				title: 'Talentpool Scholarship',
				description: 'Awarded in SSC (Board 1st), JSC (Board 8th) and PSC.',
				href: 'https://ik.imagekit.io/sakib61/portfolio/ssc_result.pdf#page=3'
			}
		]
	}
];
