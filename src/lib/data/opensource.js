/**
 * Every open-source project, in display order. The Projects tab lists them all; the
 * About view leaves out projects marked `home: false`. Each project lists its
 * contributions, newest first. status: 'merged' | 'in review' | 'released'
 */
export const allOpenSource = [
	{
		name: 'OpenEnv',
		href: 'https://github.com/openenv/OpenEnv',
		tagline: 'Interface library for RL post-training with environments',
		home: false,
		contributions: [
			{
				status: 'merged',
				summary:
					'Reported and fixed rubrics that kept a nested child’s state across environment resets, so a trajectory rubric inside a container carried one episode into the next. Resetting a rubric now resets its children.',
				links: [
					{ label: 'Issue #1533', href: 'https://github.com/openenv/OpenEnv/issues/1533' },
					{ label: 'Pull request #1535', href: 'https://github.com/openenv/OpenEnv/pull/1535' }
				]
			}
		]
	},
	{
		name: 'CloudOpsBench',
		href: 'https://github.com/CloudOpsBench/CloudOpsBench',
		tagline: 'Benchmark of real-world cloud operations tasks for AI agents',
		home: false,
		contributions: [
			{
				status: 'in review',
				summary:
					'Audited the v1.0 graders and grouped the defects by root cause: checks that pass when nothing was done, fail correct work or crash. Opened the first fixes: CI now runs every unit test, and the Kinesis policy grader checks that only the producer can write.',
				links: [
					{ label: 'Issue #14', href: 'https://github.com/CloudOpsBench/CloudOpsBench/issues/14' },
					{
						label: 'Pull request #15',
						href: 'https://github.com/CloudOpsBench/CloudOpsBench/pull/15'
					},
					{
						label: 'Pull request #16',
						href: 'https://github.com/CloudOpsBench/CloudOpsBench/pull/16'
					}
				]
			}
		]
	},
	{
		name: 'SREGym',
		href: 'https://github.com/SREGym/SREGym',
		tagline: 'Live benchmark for AI SRE agents',
		contributions: [
			{
				status: 'merged',
				summary:
					"Reported that the alert check can fail a correct fix while the fault's own alerts are still clearing, so faster fixes failed more often, and opened a fix that waits for alerts to resolve.",
				links: [
					{ label: 'Issue #1116', href: 'https://github.com/SREGym/SREGym/issues/1116' },
					{ label: 'Pull request #1117', href: 'https://github.com/SREGym/SREGym/pull/1117' }
				]
			},
			{
				status: 'merged',
				summary:
					'Added a Kafka poison-pill problem: one malformed record stalls a consumer while every pod still looks healthy.',
				links: [{ label: 'Pull request #790', href: 'https://github.com/SREGym/SREGym/pull/790' }]
			}
		]
	},
	{
		name: 'ITBench',
		href: 'https://github.com/itbench-hub/ITBench',
		tagline: 'Open-source benchmark for IT automation',
		contributions: [
			{
				status: 'merged',
				summary:
					'Reported problems in five OpenTelemetry demo scenarios and fixed three: a network policy fault that blocked nothing, an alert that fired on healthy idle services, and a fault aimed at a Deployment that does not exist.',
				links: [
					{ label: 'Issue #1339', href: 'https://github.com/itbench-hub/ITBench/issues/1339' },
					{ label: 'Pull request #1340', href: 'https://github.com/itbench-hub/ITBench/pull/1340' }
				]
			},
			{
				status: 'merged',
				summary:
					'Reported and fixed an OpenTelemetry demo install that timed out after a chart update renamed its span metrics connector.',
				links: [
					{ label: 'Issue #1323', href: 'https://github.com/itbench-hub/ITBench/issues/1323' },
					{ label: 'Pull request #1324', href: 'https://github.com/itbench-hub/ITBench/pull/1324' }
				]
			}
		]
	},
	{
		name: 'AIOpsLab',
		href: 'https://github.com/microsoft/AIOpsLab',
		tagline: 'Framework for evaluating autonomous AIOps agents',
		contributions: [
			{
				status: 'in review',
				summary:
					'Reported that the mitigation check passes when the broken workload is deleted or scaled to zero, and opened a fix that also catches unschedulable pods.',
				links: [
					{ label: 'Issue #208', href: 'https://github.com/microsoft/AIOpsLab/issues/208' },
					{ label: 'Pull request #209', href: 'https://github.com/microsoft/AIOpsLab/pull/209' }
				]
			}
		]
	},
	{
		name: 'Kestra',
		href: 'https://github.com/kestra-io',
		contributions: [
			{
				status: 'merged',
				summary:
					'Reported and fixed custom tool schemas that did not reach the Anthropic API intact, and added a blueprint that labels support tickets in Postgres with Claude Message Batches.',
				links: [
					{ label: 'Issue #147', href: 'https://github.com/kestra-io/plugin-anthropic/issues/147' },
					{ label: 'Pull request #148', href: 'https://github.com/kestra-io/plugin-anthropic/pull/148' },
					{ label: 'Pull request #979', href: 'https://github.com/kestra-io/blueprints/pull/979' }
				]
			}
		]
	},
	{
		name: 'Hugging Face',
		href: 'https://huggingface.co/Melikshah',
		contributions: [
			{
				status: 'released',
				summary:
					'Models and datasets, including a clinical chain-of-thought GPT-OSS-20B in GGUF with over 4,000 downloads, and GeoQL-4B for text to OverpassQL.',
				links: [
					{
						label: 'gpt-oss-20b-clinical-cot-gguf',
						href: 'https://huggingface.co/Melikshah/gpt-oss-20b-clinical-cot-gguf'
					},
					{ label: 'GeoQL-4B-SFT', href: 'https://huggingface.co/Melikshah/GeoQL-4B-SFT' }
				]
			}
		]
	}
];

/** Shown in the About view, in this order. */
export const openSource = allOpenSource.filter((project) => project.home !== false);
