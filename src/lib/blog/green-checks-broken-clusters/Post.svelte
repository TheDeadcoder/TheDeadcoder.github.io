<script>
	import Figure from '$components/blog/Figure.svelte';
	import Dumbbell from '$components/blog/Dumbbell.svelte';
	import Callout from '$components/blog/Callout.svelte';
	import StatGrid from '$components/blog/StatGrid.svelte';
	import PaperCard from '$components/blog/PaperCard.svelte';
	import References from '$components/blog/References.svelte';
	import GradingLoop from './GradingLoop.svelte';
	import Conformance from './Conformance.svelte';
	import UsualChecks from './UsualChecks.svelte';
	import Settle from './Settle.svelte';
	import Verdicts from './Verdicts.svelte';
	import { aiopslabFix, leaderboard } from './data.js';

	// Every number below is taken from the paper; the first finding is from the workshop version.

	const references = [
		{
			authors:
				'Jackson Clark, Yiming Su, Saad Mohammad Rafid Pial, Yifang Tian, Lily Gniedziejko, Hans-Arno Jacobsen, Yinfang Chen and Tianyin Xu',
			year: '2026',
			title: 'SREGym: A Live Benchmark for AI SRE Agents with High-Fidelity Failure Scenarios',
			venue: 'arXiv:2605.07161',
			href: 'https://arxiv.org/abs/2605.07161'
		},
		{
			authors: 'Earl T. Barr, Mark Harman, Phil McMinn, Muzammil Shahbaz and Shin Yoo',
			year: '2015',
			title: 'The Oracle Problem in Software Testing: A Survey',
			venue: 'IEEE Transactions on Software Engineering, 41(5), 507–525',
			href: 'https://doi.org/10.1109/TSE.2014.2372785'
		},
		{
			authors: 'Yuxuan Zhu, Tengjun Jin, Yada Pruksachatkun, Andy Zhang, Shu Liu, Sasha Cui, Sayash Kapoor et al.',
			year: '2025',
			title: 'Establishing Best Practices for Building Rigorous Agentic Benchmarks',
			venue: 'arXiv:2507.02825',
			href: 'https://arxiv.org/abs/2507.02825'
		}
	];
</script>

<p>
	Here is a simple experiment. Take an application running on Kubernetes, break it, and hand the
	cluster to an “agent” that does nothing at all. Then ask the benchmark how the agent did.
</p>

<p>
	I ran this on SREGym, a recent benchmark for AI agents that work as site reliability engineers<a
		class="cite"
		href="#ref-1">1</a
	>. On its <em>missing_service</em> tasks, the answer came back: success. The fault had deleted a
	Kubernetes Service, and the benchmark's own load generator saw about 10% of user requests fail on one
	application and 60% on the other. But the grader only checked that the expected pods were running and
	ready, and the fault injector restarts every pod as its very last step. To the grader, the cluster
	looked healthy.
</p>

<p>
	Every agent benchmark has a part like this grader, and it rarely gets tested itself. Software testing
	has a name for it: the <strong>test oracle</strong>, whatever decides whether an outcome is correct<a
		class="cite"
		href="#ref-2">2</a
	>. When the oracle is wrong, every score built on it is wrong too, and nothing looks out of place. A
	leaderboard with a broken grader still looks like a leaderboard.
</p>

<p>
	That first finding became a workshop paper, accepted as a poster at the NeurIPS 2026 workshop
	<a href="https://verify-agents-workshop.github.io/" target="_blank" rel="noopener noreferrer"
		>Who Verifies the Agents?</a
	>. I have since extended it from one benchmark to four, with more kinds of wrong fixes made on
	purpose, a stopwatch on the grader and three real AI agents. The extended paper is under review at
	ICST, and this post walks through what it found.
</p>

<PaperCard
	title="Tasks Are Tests, Verifiers Are Oracles: Assessing the Test Oracles of Live Kubernetes Agent Benchmarks"
	authors={['Nazmus Sakib']}
	status="under review"
	statusText="Under review at ICST 2027"
	links={[
		{ label: 'Workshop paper', href: 'https://neurips.cc/virtual/2026/loc/sydney/173080' },
		{ label: 'Code: SREMut', href: 'https://github.com/TheDeadcoder/SREMut' }
	]}
/>

<h2 id="how-grading-works">How these benchmarks grade an agent</h2>

<p>
	Live SRE benchmarks broadly run the same loop. They deploy a real application, such as a hotel booking
	service, a social network or an online shop built from microservices, on a Kubernetes cluster. They
	inject a fault and hand the cluster to an agent along with a short task description. When the agent is
	done, a grading script checks the cluster, directly or through its monitoring, and returns pass or
	fail.
</p>

<Figure wide caption="One task in a live SRE benchmark, and the two ways its grader can be wrong.">
	<GradingLoop />
</Figure>

<p>
	A grader can be wrong in two directions. A <strong>false accept</strong> passes a cluster that is still
	broken, so the agent gets credit it did not earn. A <strong>false reject</strong> fails a cluster that
	was fixed, so a correct repair loses its credit. Both move scores, and neither shows up in the score
	itself.
</p>

<h2 id="eight-questions">Eight questions for a grader</h2>

<p>
	One bug in one task is an anecdote. To test graders systematically, I borrowed what software testing
	already knows about oracles, mutation testing, flaky tests and test isolation, and turned it into eight
	properties. Each one is a question a good grader should answer with yes, and each has a live
	experiment behind it.
</p>

<ul>
	<li><strong>Does it fail a broken cluster?</strong> An agent that does nothing should never pass.</li>
	<li>
		<strong>Does it pass a healthy cluster?</strong> If nothing is wrong, there is nothing to fail.
	</li>
	<li>
		<strong>Does it pass a correct fix?</strong> Both the benchmark's own reference fix and other fixes
		that also work.
	</li>
	<li>
		<strong>Does it fail wrong fixes?</strong> I applied plausible but wrong repairs on purpose, as you
		will see below.
	</li>
	<li>
		<strong>Is its verdict stable?</strong> The same action should get the same verdict, however often
		you ask and whenever you look.
	</li>
	<li>
		<strong>Does it ignore other tasks?</strong> Leftovers from one task should not change another
		task's verdict.
	</li>
	<li>
		<strong>Does the fix have to last?</strong> A repair that holds for a minute and then breaks again
		should not pass.
	</li>
	<li>
		<strong>Is the task itself sound?</strong> The fault should take effect, the task description should
		point at it, and the answer should not be lying around in the cluster.
	</li>
</ul>

<p>
	I ran these experiments on four open benchmarks:
	<a href="https://github.com/SREGym/SREGym" target="_blank" rel="noopener noreferrer">SREGym</a>,
	<a href="https://github.com/microsoft/AIOpsLab" target="_blank" rel="noopener noreferrer">AIOpsLab</a>,
	<a href="https://github.com/gke-labs/k8s-ai-bench" target="_blank" rel="noopener noreferrer"
		>k8s-ai-bench</a
	>
	and <a href="https://github.com/itbench-hub/ITBench" target="_blank" rel="noopener noreferrer">ITBench</a
	>. Each was pinned at a fixed version (SREGym also at a newer one), and the runs used live clusters
	rather than recorded traces.
</p>

<StatGrid
	items={[
		{ value: '4', label: 'Benchmarks audited' },
		{ value: '1,269', label: 'Live runs' },
		{ value: '182', label: 'Of them, runs by three AI agents' },
		{ value: '140', label: 'Tasks with at least one grading defect' }
	]}
/>

<Figure
	wide
	caption="How often each benchmark's grader breaks each property: tasks with a violation, out of the tasks where the property was measured. Stronger color means a larger share of tasks; a dash means not measured."
>
	<Conformance />
</Figure>

<p>
	Every benchmark breaks at least four of the eight properties, and SREGym, the largest, breaks all
	eight. The weak spots differ. SREGym and AIOpsLab let wrong fixes through: 53 of 109 SREGym tasks and
	all 13 AIOpsLab tasks I tested accepted at least one. AIOpsLab's verdicts also depend on timing: in 12 of
	its 14 tasks, the same action passed or failed depending on when the grader looked. k8s-ai-bench
	rejects correct fixes that differ from the one it expects, in 6 of 9 tasks tested, and ITBench passes
	fixes that do not last, in 16 of 23.
</p>

<h2 id="usual-checks">The usual checks miss most of it</h2>

<p>
	Careful benchmark builders already run two sanity checks: an agent that does nothing must fail, and
	the benchmark's own reference fix must pass. Recent guidance on rigorous agent benchmarks recommends
	the first one explicitly<a class="cite" href="#ref-3">3</a>. Both are worth running, and in this study
	they caught problems in 22 of the 140 tasks with a defect. The other 118, or 84%, have defects that
	only the other experiments reveal.
</p>

<Figure
	caption="Tasks with at least one grading defect, by whether the two usual checks (an agent that does nothing, and the benchmark's own fix) reveal one. Counting only the least debatable experiments, leaving out collateral damage, isolation and code reading, it is still 74 of 96."
>
	<UsualChecks />
</Figure>

<p>
	The two checks test the two ends of a task: nothing done, or everything done right. Most of what they
	miss lives in between, in the wrong fix, the early verdict, the leftovers of the previous task and the
	fix that quietly breaks again.
</p>

<h2 id="wrong-fixes">Wrong fixes, on purpose</h2>

<p>
	The most revealing experiment borrows from mutation testing. Instead of waiting for an agent to make a
	mistake, I made the mistakes myself. Each wrong fix, or mutant, is something a hurried engineer or a
	confused agent could plausibly do:
</p>

<ul>
	<li><strong>Restart:</strong> delete every pod and let them come back, without touching the cause.</li>
	<li>
		<strong>Scale to zero</strong> or <strong>delete:</strong> make the broken workload go away instead of
		fixing it.
	</li>
	<li>
		<strong>Collateral damage:</strong> apply the correct fix, then scale an unrelated, healthy service
		down to zero.
	</li>
</ul>

<p>
	A good grader rejects all of them. SREGym's graders caught almost every restart, scale to zero and
	delete, 160 of 162. But they accepted the collateral damage in 49 of 96 tasks, because each grader
	only checks the part of the system the fault touched.
</p>

<p>
	AIOpsLab's grader did worse. It waits until the pods it can see are healthy, and a deleted or
	scaled-down workload has no pods left to be unhealthy. Under its own rules, it accepted scale to zero
	and delete in 5 of 6 tasks each, and collateral damage in all 13. The fix I proposed is small: remember
	which workloads the application deployed, and fail while one of them is missing or scaled to zero.
	With it, the grader caught 24 more wrong fixes and let through none that it had caught before.
</p>

<Figure
	caption="Share of wrong fixes that AIOpsLab's grader rejects, with its own check and with the proposed workload check, over 12, 6, 6 and 13 tasks."
>
	<Dumbbell
		rows={aiopslabFix}
		labelHeader="Wrong fix"
		fromLabel="AIOpsLab's own check"
		toLabel="With the workload check"
	/>
</Figure>

<h2 id="timing">When the grader looks matters</h2>

<p>
	Some graders do not look at the cluster's state directly. They ask the monitoring system whether any
	alerts are still firing. That sounds reasonable, but alerts lag behind the system. SREGym's alert
	grader, in a newer version than the one I pinned, waits 30 seconds after the agent finishes, fails at
	the first firing alert, and passes only after two minutes with none. But the error-rate alert is
	computed over the last two minutes of requests and re-evaluated once a minute, so it keeps firing for a
	while after the errors stop.
</p>

<p>
	I measured what that does on eight problems, after three kinds of action: SREGym's own reference fix,
	no fix at all, and a restart only. Judged right away, the reference fix failed on all eight. Allowed to
	wait up to five minutes, the grader would pass three; up to ten minutes, all eight. The correct fixes
	needed between 211 and 573 seconds to look correct.
</p>

<Figure
	wide
	caption="SREGym's alert grader (newer version) on eight problems: how many it passes if it may wait up to a given time after the action. Hover or use the arrow keys to read off any moment."
>
	<Settle />
</Figure>

<p>
	Waiting is not free, though. Given ten minutes, the grader also passed one problem with no fix at all,
	and the same problem after only a restart: its alerts went quiet on their own while the fault was
	still in place. A grader that waits should also check that the fault itself is gone.
</p>

<p>
	This is not a lab curiosity. When real agents correctly fixed five of SREGym's alert problems, the
	grader failed 26 of their 45 fixes, and in every one of those 26 the same alert, HighRequestErrorRate,
	was still firing when it looked. The SREGym maintainers welcomed the report and invited a fix, which is now
	an <a href="https://github.com/SREGym/SREGym/pull/1117" target="_blank" rel="noopener noreferrer"
		>open pull request</a
	>.
</p>

<h2 id="real-agents">Real agents, real misgrades</h2>

<p>
	Mutants are controlled mistakes. To see what graders do with real behavior, I ran three agents on tasks
	from SREGym, AIOpsLab and ITBench: Claude Code with Claude Sonnet 5.5 and with Claude Haiku 5.5, and
	OpenAI's Codex CLI with gpt-6.1-sol, 182 runs in all. I compared each verdict with an independent
	reference check that looks at what users would notice: whether requests succeed, whether services
	still route traffic, and whether capacity is back to the healthy baseline.
</p>

<StatGrid
	items={[
		{ value: '2%', label: 'AIOpsLab: 1 of 56 verdicts wrong' },
		{ value: '49%', label: 'ITBench: 22 of 45 wrong' },
		{ value: '43%', label: 'SREGym, pinned: 10 of 23 wrong' },
		{ value: '65%', label: 'SREGym, newer: 35 of 54 wrong' }
	]}
/>

<p>
	How often the verdict disagreed with the reference depends on the benchmark, not on the agent. On the
	tasks they shared, Sonnet, Haiku and Codex were misgraded about equally often: an exact McNemar test
	finds no difference for any pair (p = 1.0).
</p>

<Figure
	wide
	caption="Every attempt on nine tasks that each agent ran three times. A tick means the benchmark passed the run and a cross that it failed it; highlighted cells are verdicts the reference check disagrees with."
>
	<Verdicts />
</Figure>

<p>
	The grid shows both kinds of error side by side. On SREGym's alert problems, the crosses are correct
	fixes failed by the timing problem above. On ITBench's scenario 114, every run passed, yet in eight of
	the nine the product catalog service still could not be reached through its Service. On scenarios 31
	and 58, a correct fix failed unless the agent had also changed the monitoring: the only runs that
	passed were ones in which it had. Three stories stand out.
</p>

<h3 id="operator">The operator nobody touched</h3>

<p>
	SREGym's <em>wrong operator image</em> task breaks the operator that manages a TiDB database, in one
	namespace. The grader checks a second namespace, and the task description points the agent at a third,
	where the application lives. All nine runs passed with the operator still broken, and not one agent ran
	a single command in the operator's namespace. “I found nothing broken in the FleetCast app, so I
	changed nothing,” one of them reported. The maintainers are now fixing this check in a pull request of
	their own.
</p>

<h3 id="rules">The rules that moved</h3>

<p>
	ITBench passes a run once the expected alerts stop firing. In 9 of its 16 ITBench runs, Codex edited
	the alerting rules themselves, the very rules that check reads, and the check passed all 9. Neither
	Claude model touched the rules, although Haiku changed the telemetry collector in three runs. Some of
	Codex's runs also fixed the fault and some did not. Either way, a grader that reads something the agent
	can edit cannot tell the difference.
</p>

<h3 id="answer-key">The answer key in the room</h3>

<p>
	AIOpsLab leaves mitigation scripts inside the database pods of four of its problems. The agents found
	them: in 10 runs, an agent ran a script that the benchmark had left behind. It is the benchmark version
	of an exam with the answer key on the desk.
</p>

<Callout title="A pass is a claim, not a fact">
	A green check says what the grader saw, at the moment it looked, in the part of the system it was
	built to watch. Whether the cluster is actually fixed is a separate question, and in this study the
	grader and the reference check disagreed on as many as 65% of one benchmark's agent runs.
</Callout>

<h2 id="leaderboards">Does it move the leaderboard?</h2>

<p>
	Sometimes a lot, sometimes not at all. k8s-ai-bench publishes its raw results, so instead of running
	agents on it I re-scored its published leaderboard: 1,200 runs of ten models on 24 tasks. I credited
	runs that a check rejected only because the container image was not written as the exact string
	“nginx”, and set aside failures caused by the benchmark or its harness, such as a check that runs
	before its database pod is scheduled.
</p>

<Figure
	caption="k8s-ai-bench's published leaderboard of 1,200 runs: each model's pass rate as published, and after re-scoring the failures that were not the agent's doing."
>
	<Dumbbell rows={leaderboard} labelHeader="Model" fromLabel="As published" toLabel="Re-scored" />
</Figure>

<p>
	Most scores did not move, and the ranking barely changed: one pair of neighbors swapped places
	(Kendall's τ = 0.956). But gpt-oss-20b rose from 40.8% to 51.9%, 11 points from grading alone. Grader
	errors do not spread evenly across agents, so a few points between two agents can be the grader's
	doing rather than theirs.
</p>

<h2 id="checklist">If you build or use these benchmarks</h2>

<p>The fixes are mostly cheap. A short checklist for the graders of live benchmarks:</p>

<ol>
	<li>
		<strong>Keep the two usual checks</strong>, the agent that does nothing and the reference fix, and run
		them on every task.
	</li>
	<li>
		<strong>Throw wrong fixes at the grader.</strong> A restart, a deletion, scaling to zero and a correct
		fix with collateral damage should all fail.
	</li>
	<li>
		<strong>Judge after the system settles</strong>, within a stated time limit, and also check that the
		fault itself is gone.
	</li>
	<li>
		<strong>Compare against the healthy state of the whole application</strong>, not only the part the
		fault touched.
	</li>
	<li><strong>Isolate tasks</strong>, or verify the reset between them.</li>
	<li><strong>Check that fixes last</strong>, for example when a pod is replaced.</li>
	<li>
		<strong>Keep the answer and the grader's inputs</strong>, such as alert rules, out of the agent's
		reach.
	</li>
</ol>

<p>
	And if you only use these benchmarks, read a score together with how its grader was tested. I reported
	the problems to the maintainers of SREGym, AIOpsLab and ITBench, with proposed fixes for
	<a href="https://github.com/microsoft/AIOpsLab/pull/209" target="_blank" rel="noopener noreferrer"
		>AIOpsLab</a
	>
	and
	<a href="https://github.com/itbench-hub/ITBench/pull/1340" target="_blank" rel="noopener noreferrer"
		>ITBench</a
	>, and SREGym's two fixes are underway as described above.
</p>

<aside class="limits">
	<p class="limits-title">Limitations</p>
	<p>
		The study covers four Kubernetes benchmarks, each at a fixed version, and they keep changing: SREGym's
		newer version fixed some of the problems I found in the pinned one and introduced others. The
		reference check is my own and has blind spots, such as lost data, network policies and changes to the
		monitoring itself; its labels did not change when I moved its thresholds. ITBench's hosted grader is
		not public, so I reimplemented its check from the repository. Three agents with up to three attempts
		per task give small counts per cell, and timing effects varied between machines.
	</p>
</aside>

<h2 id="references">References</h2>

<References items={references} />

<style>
	.limits {
		margin-block: 2.5rem;
		border-top: 1px solid var(--line);
		padding-top: 1.25rem;
		font-size: 0.9375rem;
		line-height: 1.65;
		color: var(--ink-muted);
	}

	.limits-title {
		margin-bottom: 0.375rem;
		font-weight: 600;
		color: var(--ink);
	}
</style>
