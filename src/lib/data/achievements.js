import devSprint from '$lib/assets/dev-sprint-2024.webp';
import genDev from '$lib/assets/gen-dev-2024.webp';
import lablab from '$lib/assets/lablab-2024.webp';
import itVerse from '$lib/assets/itverse-2023.webp';
import iutNationalICT from '$lib/assets/iut-ict-fest-2024.webp';
import secCSEFest from '$lib/assets/sec-cse-fest-2022.webp';
import sustCSECarnival from '$lib/assets/sust-carnival-2024.webp';
import bcolbd from '$lib/assets/bcolbd-2024.webp';

/** rank: 'gold' | 'silver' | 'bronze' — drives the badge colour only. */
export const achievements = [
	{
		year: 2024,
		events: [
			{
				name: 'IUT 11th National ICT Fest — OpenAPI Hackathon',
				result: '1st Place',
				rank: 'gold',
				certificate: iutNationalICT
			},
			{
				name: 'Code Crafters Dev Sprint 2024',
				result: '1st Place',
				rank: 'gold',
				certificate: devSprint
			},
			{
				name: 'SUST CSE Carnival 2024 — Hackathon',
				result: '1st Place',
				rank: 'gold',
				certificate: sustCSECarnival
			},
			{
				name: 'Gen-Dev AI Hackathon — Gender Knowledge Augmentation',
				result: 'Runner-up',
				rank: 'silver',
				certificate: genDev
			},
			{
				name: 'BCOLBD 2024 — AI Category',
				result: 'Honorable Mention',
				rank: 'bronze',
				certificate: bcolbd
			},
			{
				name: 'Lablab AI — Reasoning with o1',
				result: 'Final Round Participant',
				rank: 'bronze',
				certificate: lablab
			}
		]
	},
	{
		year: 2023,
		events: [
			{
				name: 'Cefalo ITverse 2023 — Project Showcase',
				result: '1st Place',
				rank: 'gold',
				certificate: itVerse
			}
		]
	},
	{
		year: 2022,
		events: [
			{
				name: 'SEC Inter-University Junior Programming Contest 2022',
				result: '7th Place',
				rank: 'silver',
				certificate: secCSEFest
			}
		]
	}
];
