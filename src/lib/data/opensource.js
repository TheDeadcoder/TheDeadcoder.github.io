/**
 * Shown in the About view, in this order. Each project lists its contributions,
 * newest first. status: 'merged' | 'in review' | 'released'
 */
export const openSource = [
	{
		name: 'SREGym',
		href: 'https://github.com/SREGym/SREGym',
		tagline: 'Live benchmark for AI SRE agents',
		contributions: [
			{
				status: 'in review',
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
