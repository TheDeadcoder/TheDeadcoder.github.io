// Study numbers come from the result registers. The example group and the simulated draws are
// illustrations and are labelled as such in the post.

/** Illustration: eight attempts at one issue. 1 = passes, 0 = fails. */
export const example = {
	pr: [1, 1, 1, 1, 1, 1, 0, 0],
	full: [1, 0, 1, 0, 1, 0, 0, 0]
};

/** Large-suite sample: every task with a confirmed flip, and the passing attempts inside them. */
export const blindSpots = {
	tasks: 248,
	flipTasks: 18,
	passesInFlipTasks: 179,
	flips: 49
};

/**
 * Flips caught by each check, out of 49, and the mean share of full-suite test time it takes
 * on 100 passing attempts. Each selection is judged on the attempt's full run.
 */
export const selectors = [
	{ id: 'pr', label: 'PR’s own tests', caught: 1, share: 0.07, tone: 'flip' },
	{ id: 'namerts', label: 'NameRTS', caught: 20, share: 0.321, tone: 'neutral' },
	{ id: 'line', label: 'Covered lines', caught: 20, share: 0.419, tone: 'neutral' },
	{ id: 'file', label: 'Covered files', caught: 36, share: 0.463, tone: 'neutral' },
	{ id: 'full', label: 'Full suite', caught: 49, share: 1, tone: 'good' }
];

/** What the 49 confirmed flips are. */
export const mechanisms = [
	{ label: 'Ordinary regression', value: 28, emphasis: true },
	{ label: 'Fails only in the full run', value: 10 },
	{ label: 'Fails only sometimes', value: 11 }
];

/**
 * Added noise relative to the learning signal (audit variance over signal energy, summed over
 * groups), mean-centred advantages, at the same expected audit cost.
 */
export const designs = [
	{ label: 'Audit rate 10%', from: 4.2, to: 2.5 },
	{ label: 'Audit rate 20%', from: 1.9, to: 1.1 },
	{ label: 'Audit rate 30%', from: 1.1, to: 0.6 }
];

/** Test time relative to always running the full suite, weighted over the surveyed repositories. */
export const policies = [
	{ label: 'Always the full suite', value: 100 },
	{ label: 'Group audits (unbiased)', value: 23, emphasis: true },
	{ label: 'PR’s tests only (biased)', value: 10 }
];
