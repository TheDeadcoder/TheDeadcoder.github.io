// Numbers from the paper. Each benchmark is at its pinned version unless a label says otherwise.

export const benchmarks = ['SREGym', 'AIOpsLab', 'k8s-ai-bench', 'ITBench'];

/** The eight properties, phrased as what a good grader does. */
export const properties = [
	'Fails a broken cluster',
	'Passes a healthy cluster',
	'Passes a correct fix',
	'Fails wrong fixes',
	'Gives a stable verdict',
	'Ignores other tasks',
	'Requires the fix to last',
	'Comes with a sound task'
];

/** Tasks where the grader breaks each property, out of the tasks measured; null where it was not measured. */
export const conformance = {
	SREGym: [[3, 124], [28, 119], [17, 124], [53, 109], [28, 124], [14, 125], [1, 1], [1, 124]],
	AIOpsLab: [[4, 14], [0, 14], [0, 14], [13, 13], [12, 14], null, null, [5, 14]],
	'k8s-ai-bench': [[0, 22], null, [6, 9], [3, 13], [3, 22], [1, 1], null, [1, 24]],
	ITBench: [[2, 23], [3, 23], [2, 9], [7, 23], [1, 7], null, [16, 23], [4, 25]]
};

/** Tasks with a defect: found by a do-nothing agent or the benchmark's own fix, or only by the other experiments. */
export const usualChecks = [
	{ label: 'SREGym', caught: 14, missed: 79 },
	{ label: 'AIOpsLab', caught: 4, missed: 10 },
	{ label: 'k8s-ai-bench', caught: 0, missed: 10 },
	{ label: 'ITBench', caught: 4, missed: 19 }
];

/** Share of wrong fixes AIOpsLab's grader rejects (%), with its own check and with the workload check. */
export const aiopslabFix = [
	{ label: 'Restart', from: 83, to: 92 },
	{ label: 'Scale to zero', from: 17, to: 100 },
	{ label: 'Delete', from: 17, to: 100 },
	{ label: 'Collateral damage', from: 0, to: 100 }
];

/** SREGym's newer alert grader on eight problems: seconds until it first passes, or null if not within 600 s. */
export const settle = [
	{ label: 'SREGym’s own fix', tone: 'fix', firstPass: [262, 392, 211, 333, 332, 573, 212, 332] },
	{ label: 'No fix', tone: 'err', firstPass: [212, null, null, null, null, null, null, null] },
	{ label: 'Restart only', tone: 'err', firstPass: [414, null, null, null, null, null, null, null] }
];

export const agents = ['Sonnet', 'Haiku', 'Codex'];

/**
 * Every attempt on nine tasks, Sonnet 1–3, Haiku 1–3, Codex 1–3: 'tp' is a pass the reference check agrees
 * with, 'fa' passes a cluster that is still broken, 'fr' fails a fix that worked. `changed` marks runs in which
 * the agent changed the monitoring, by attempt index.
 */
export const verdicts = [
	{
		benchmark: 'SREGym, newer version',
		tasks: [
			{ label: 'Ad service failure', cells: ['tp', 'fr', 'tp', 'tp', 'fr', 'fr', 'fr', 'tp', 'fr'] },
			{ label: 'Ad service high CPU', cells: ['tp', 'tp', 'fr', 'fr', 'tp', 'tp', 'fr', 'tp', 'fr'] },
			{ label: 'Cart service failure', cells: ['tp', 'fr', 'fr', 'tp', 'fr', 'tp', 'tp', 'fr', 'fr'] },
			{ label: 'Payment service failure', cells: ['fr', 'fr', 'fr', 'tp', 'fr', 'tp', 'tp', 'tp', 'tp'] },
			{ label: 'Product catalog failure', cells: ['tp', 'fr', 'fr', 'fr', 'fr', 'fr', 'fr', 'fr', 'fr'] },
			{ label: 'Wrong operator image', cells: ['fa', 'fa', 'fa', 'fa', 'fa', 'fa', 'fa', 'fa', 'fa'] }
		]
	},
	{
		benchmark: 'ITBench',
		tasks: [
			{
				label: 'Scenario 114',
				cells: ['fa', 'fa', 'fa', 'fa', 'fa', 'tp', 'fa', 'fa', 'fa'],
				changed: { 6: 'edited the alert rules', 7: 'edited the alert rules and the telemetry collector' }
			},
			{
				label: 'Scenario 31',
				cells: ['fr', 'fr', 'fr', 'fr', 'fa', 'fr', 'tp', 'tp', 'tp'],
				changed: {
					4: 'changed the telemetry collector',
					6: 'edited the alert rules',
					7: 'edited the alert rules',
					8: 'edited the alert rules'
				}
			},
			{
				label: 'Scenario 58',
				cells: ['fr', 'fr', 'fr', 'fr', 'tp', 'fr', 'fr', 'fr', 'fr'],
				changed: { 4: 'changed the telemetry collector' }
			}
		]
	}
];

/** k8s-ai-bench's published leaderboard, in its published order: pass rate (%) as published and re-scored. */
export const leaderboard = [
	{ label: 'gemini-3-pro-preview', from: 95.8, to: 95.8 },
	{ label: 'gemini-2.5-pro', from: 95.0, to: 95.0 },
	{ label: 'GLM-4.5', from: 91.7, to: 92.4 },
	{ label: 'Qwen3-Coder-480B', from: 89.2, to: 89.2 },
	{ label: 'GLM-4.6', from: 89.2, to: 89.2 },
	{ label: 'Qwen3-Next-80B', from: 84.2, to: 84.2 },
	{ label: 'gemini-2.5-flash', from: 81.7, to: 81.7 },
	{ label: 'Qwen3-Coder-30B', from: 66.7, to: 67.2 },
	{ label: 'gpt-oss-120b', from: 62.5, to: 67.5 },
	{ label: 'gpt-oss-20b', from: 40.8, to: 51.9 }
];
