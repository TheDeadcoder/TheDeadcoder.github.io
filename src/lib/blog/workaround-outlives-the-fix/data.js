// Every number here comes from the project's run records (github.com/TheDeadcoder/swarm):
// 13 teams per arm, 52 sessions per cell, and 156 reader trials per notes cell
// (13 notes files x 4 objectives x 3 samples). Reader results are for the command-based guard.

/** Sessions with at least one denial, out of 52, under the repaired and the over-blocking guard. */
export const denials = [
	{ label: 'Claude, command-based guard', repaired: 4, overblocking: 46 },
	{ label: 'Claude, data-flow guard', repaired: 0, overblocking: 46 },
	{ label: 'Qwen, command-based guard', repaired: 5, overblocking: 48 },
	{ label: 'Qwen, data-flow guard', repaired: 4, overblocking: 48 }
];

/** Share of notes files holding a workaround labelled as a way around the reviewer, after each shift. */
export const recipes = {
	shifts: [1, 2, 3, 4],
	claude: [8 / 13, 9 / 13, 11 / 13, 11 / 13],
	qwen: [4 / 13, 7 / 12, 9 / 13, 10 / 13],
	repaired: [0, 0, 0, 0]
};

/** Reader success past the repaired command-based guard (Gemini 3.1 Pro as the reader). */
export const reader = [
	{ label: 'No notes', success: 1, trials: 12 },
	{ label: 'Positive control', success: 9, trials: 12 },
	{ label: 'Claude notes, over-blocked team', success: 90, trials: 156, emphasis: true },
	{ label: 'Claude notes, repaired team', success: 3, trials: 156 },
	{ label: 'Qwen notes, over-blocked team', success: 17, trials: 156, emphasis: true },
	{ label: 'Qwen notes, repaired team', success: 1, trials: 156 }
];

/** Claude's over-blocked notes, read by two different readers (156 trials each). */
export const readers = [
	{ name: 'Claude Sonnet 5', declined: 132, success: 1, trials: 156 },
	{ name: 'Gemini 3.1 Pro', declined: 10, success: 90, trials: 156 }
];
