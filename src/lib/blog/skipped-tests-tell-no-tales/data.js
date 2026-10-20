// Numbers from the study. Escape = share of builds with a real failure in which the selection ran none of the
// failing tests, at 20% of the suite's test time, macro-averaged over projects.

/** Recent failures first (LRTS's best order), the change-text match and the others, as the post names them. */
export const names = {
	latest: 'Recent failures first',
	dante: 'DANTE',
	hybrid: 'Hybrid: failures + change',
	matchCost: 'Change match, cheapest first',
	match: 'Change match',
	learned: 'Learned model',
	shortest: 'Shortest first'
};

/** Escape (%) under a full-information replay and a faithful one, on the newest builds (nine projects; DANTE eight). */
export const price = [
	{ label: names.latest, from: 10.2, to: 30.5 },
	{ label: names.dante, from: 12.0, to: 28.0 },
	{ label: names.hybrid, from: 11.6, to: 22.5 },
	{ label: names.matchCost, from: 32.6, to: 35.6 },
	{ label: names.match, from: 39.9, to: 40.4 }
];

/** Faithful-over-full escape ratio on the held-out builds of the studied period and on the newest builds. */
export const growth = [
	{ label: names.latest, from: 1.32, to: 2.98 },
	{ label: names.dante, from: 1.45, to: 2.34 },
	{ label: names.hybrid, from: 1.25, to: 1.93 },
	{ label: names.matchCost, from: 1.12, to: 1.09 },
	{ label: names.match, from: 0.97, to: 1.01 }
];

/** Industrial logs, recent failures first: failing verdicts missed (%) with full and faithful history. */
export const industrial = [
	{ label: 'Google GSDTSR', from: 17.5, to: 21.3 },
	{ label: 'ABB Paint Control', from: 72.0, to: 75.2 },
	{ label: 'ABB IOF/ROL', from: 68.3, to: 67.4 }
];

/** Escape (%) on the newest builds of the five projects with the most of them, full and faithful replay. */
export const flip = [
	{ label: names.latest, tone: 'history', full: 8.9, faithful: 28.3 },
	{ label: names.hybrid, tone: 'context', full: 10.3, faithful: 19.4 },
	{ label: names.learned, tone: 'learned', full: 18.6, faithful: 17.2 },
	{ label: names.matchCost, tone: 'context', full: 31.2, faithful: 34.8 }
];

/** Share of test time (%) the controller needs at a 10% target, certified on all failures or on new ones. */
export const allFailures = [
	{ label: names.latest, value: 38.5, emphasis: true },
	{ label: names.hybrid, value: 39.2 },
	{ label: names.matchCost, value: 61.2 }
];

export const newFailures = [
	{ label: names.hybrid, value: 40.4, emphasis: true },
	{ label: names.matchCost, value: 48.5 },
	{ label: names.latest, value: 50.0 }
];

/** Extra test-hours per 1,000 builds needed to match full-information protection at 20% of test time. */
export const censoringHours = [
	{ label: names.latest, value: 3936, emphasis: true },
	{ label: names.hybrid, value: 1304 },
	{ label: names.matchCost, value: 280 }
];

/** First-failure builds whose failing test lands in the first 5% of predicted test time (%), 232 builds. */
export const recall = [
	{ label: 'Gemini 3.5 Flash-Lite', value: 84.1, emphasis: true },
	{ label: names.matchCost, value: 81.9 },
	{ label: names.shortest, value: 72.4 },
	{ label: names.latest, value: 33.6 }
];
