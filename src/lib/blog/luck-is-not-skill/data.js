// Training study numbers come from the paper and its run registers; benchmark numbers from the
// τ-Dice analysis.

/** Figure 1 of the paper: fault (true) or no fault (false) per rollout and event key. */
export const schedules = {
	independent: [
		[true, true, false, false, true, false, false],
		[true, false, true, false, false, false, false],
		[false, false, true, false, false, true, true],
		[false, true, false, false, false, false, false]
	],
	paired: Array.from({ length: 4 }, () => [true, true, false, false, true, false, false])
};

/** Validation true success by training step, mean over seeds. */
export const steps = [0, 20, 40, 60, 80, 100];

export const curves = [
	{
		id: 'faults',
		title: 'Tool faults: validation',
		domain: [0.45, 0.8],
		ticks: [0.5, 0.6, 0.7, 0.8],
		paired: [0.5442, 0.6041, 0.6068, 0.6771, 0.6458, 0.6797],
		independent: [0.5208, 0.5599, 0.5729, 0.5886, 0.6615, 0.6354],
		clean: [0.5156, 0.5586, 0.5508, 0.5742, 0.5586, 0.5664]
	},
	{
		id: 'challenge',
		title: 'Tool faults: recovery challenge',
		domain: [0.45, 0.8],
		ticks: [0.5, 0.6, 0.7, 0.8],
		paired: [0.5573, 0.5833, 0.6771, 0.7188, 0.7656, 0.7656],
		independent: [0.5625, 0.6406, 0.6458, 0.6719, 0.6823, 0.6979],
		clean: [0.5469, 0.5391, 0.5703, 0.5703, 0.5859, 0.5781]
	},
	{
		id: 'flips',
		title: 'Grader flips: clean validation',
		domain: [0.75, 0.95],
		ticks: [0.75, 0.8, 0.85, 0.9, 0.95],
		paired: [0.8177, 0.8255, 0.8646, 0.875, 0.8984, 0.8984],
		independent: [0.8177, 0.8359, 0.8672, 0.8594, 0.8984, 0.8776],
		clean: [0.8125, 0.8164, 0.8828, 0.9258, 0.9102, 0.8945]
	}
];

/** Final test success (%) per seed: independent, then paired. */
export const finals = [
	{
		id: 'faults',
		title: 'Trained and tested with tool faults',
		domain: [55, 75],
		ticks: [55, 60, 65, 70, 75],
		rows: [
			{ label: 'Seed 0', from: 61.4, to: 65.4 },
			{ label: 'Seed 1', from: 63.1, to: 64.1 },
			{ label: 'Seed 2', from: 60.8, to: 71.0 },
			{ label: 'Mean', from: 61.8, to: 66.8, mean: true }
		]
	},
	{
		id: 'flips',
		title: 'Trained with grader flips, tested clean',
		domain: [84, 92],
		ticks: [84, 86, 88, 90, 92],
		rows: [
			{ label: 'Seed 0', from: 90.2, to: 90.5 },
			{ label: 'Seed 1', from: 85.8, to: 88.5 },
			{ label: 'Seed 2', from: 87.9, to: 89.1 },
			{ label: 'Mean', from: 88.0, to: 89.4, mean: true }
		]
	}
];

/** Paired over independent covariance-trace ratio of the mean-centered gradient, per checkpoint. */
export const probe = {
	checkpoints: [
		{ run: 'B', step: 0 },
		{ run: 'B', step: 20 },
		{ run: 'B', step: 40 },
		{ run: 'B', step: 60 },
		{ run: 'B', step: 80 },
		{ run: 'B', step: 100 },
		{ run: 'A', step: 80 },
		{ run: 'A', step: 100 }
	],
	flips: [0.789, 0.759, 0.706, 0.736, 0.719, 0.707, 0.697, 0.731],
	faults: [0.601, 0.517, 0.421, 0.387, 0.384, 0.37, 0.388, 0.385]
};

/** Share of tasks whose outcome differs across four runs with identical settings. */
export const disagreement = {
	agents: [
		{ label: 'Qwen3.5-4B', value: 0.55, interval: [0.46, 0.65] },
		{ label: 'gpt-oss-20b', value: 0.47, interval: [0.37, 0.57] },
		{ label: 'Qwen3.6-35B-A3B', value: 0.46, interval: [0.36, 0.56] }
	],
	leaderboard: [0.4388, 0.4353, 0.3273, 0.3201, 0.3022, 0.277, 0.2626, 0.241, 0.2266]
};
