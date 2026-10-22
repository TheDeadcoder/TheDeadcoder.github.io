<script>
	import Figure from '$components/blog/Figure.svelte';
	import BarChart from '$components/blog/BarChart.svelte';
	import Dumbbell from '$components/blog/Dumbbell.svelte';
	import Callout from '$components/blog/Callout.svelte';
	import StatGrid from '$components/blog/StatGrid.svelte';
	import References from '$components/blog/References.svelte';
	import Verdicts from './Verdicts.svelte';
	import BlindSpots from './BlindSpots.svelte';
	import Selection from './Selection.svelte';
	import Convergence from './Convergence.svelte';
	import { mechanisms, designs, policies } from './data.js';

	const references = [
		{
			authors:
				'Zhihong Shao, Peiyi Wang, Qihao Zhu, Runxin Xu, Junxiao Song, Xiao Bi, Haowei Zhang, Mingchuan Zhang, Y. K. Li, Y. Wu and Daya Guo',
			year: '2024',
			title: 'DeepSeekMath: Pushing the Limits of Mathematical Reasoning in Open Language Models',
			venue: 'arXiv:2402.03300',
			href: 'https://arxiv.org/abs/2402.03300'
		},
		{
			authors:
				'Ibragim Badertdinov, Alexander Golubev, Maksim Nekrashevich, Anton Shevtsov, Simon Karasik, Andrei Andriushchenko, Maria Trofimova, Daria Litvintseva and Boris Yangel',
			year: '2025',
			title:
				'SWE-rebench: An Automated Pipeline for Task Collection and Decontaminated Evaluation of Software Engineering Agents',
			venue: 'arXiv:2505.20411',
			href: 'https://arxiv.org/abs/2505.20411'
		},
		{
			authors: 'You Wang, Michael Pradel and Zhongxin Liu',
			year: '2025',
			title: 'Are “Solved Issues” in SWE-bench Really Solved Correctly? An Empirical Study',
			venue: 'arXiv:2503.15223',
			href: 'https://arxiv.org/abs/2503.15223'
		},
		{
			authors: 'You Wang, Michael Pradel and Zhongxin Liu',
			year: '2026',
			title: 'Names Are All You Need: Effective and Safe Regression Test Selection for Python',
			venue: 'arXiv:2605.25356',
			href: 'https://arxiv.org/abs/2605.25356'
		}
	];

	const count = (/** @type {number} */ value) => String(value);
	const percent = (/** @type {number} */ value) => `${value}%`;
</script>

<p>
	Ask a coding agent to fix the same bug eight times and you get eight different patches.
	Reinforcement learning turns that spread into a lesson: run the tests on every patch, reward the ones
	that pass, and nudge the model toward them. Group-relative methods such as GRPO<a
		class="cite"
		href="#ref-1">1</a
	> do exactly this. Each attempt is compared with its siblings, and the ones that beat the group's average
	are reinforced.
</p>

<p>
	Everything rests on a question that is easy to skip: <em>which</em> tests? A real repository can have
	thousands. Benchmarks built from GitHub issues, such as SWE-bench and SWE-rebench<a
		class="cite"
		href="#ref-2">2</a
	>, judge a patch by the test files that the issue's original pull request changed, and many training
	pipelines reuse that check as their reward. We call it the <strong>PR's own tests</strong>. It is fast,
	but it only looks where the original fix looked.
</p>

<p>
	A patch can pass the PR's own tests and still break something elsewhere in the repository. We call such
	a patch a <strong>flip</strong>. A flip still collects the full reward, so training reinforces the very
	edit that broke the code. The gap is known from evaluation: an earlier study found that 7.8% of the
	patches SWE-bench counted as solved, from three agents, fail the repository's full test suite<a
		class="cite"
		href="#ref-3">3</a
	>.
</p>

<p>
	Running the full suite on every attempt would catch flips, but in large repositories it takes tens of
	times longer. This post is about that trade-off: how often flips happen during training-style sampling,
	what they do to the learning signal, and how to get the full suite's verdict, on average, while running
	it on only a small share of attempts.
</p>

<Figure
	caption="An illustrative group of eight attempts at one issue. An attempt's advantage is how far its reward sits above or below the group's average. Rewarded by the PR's own tests, the three flips (shaded) are reinforced exactly as much as the three correct fixes. Switch to the full suite to see the signal training should get."
>
	<Verdicts />
</Figure>

<h2 id="measuring">Measuring the gap on real agents</h2>

<p>
	Measuring this needs no training run. Nebius has released
	<a
		href="https://huggingface.co/datasets/nebius/SWE-rebench-openhands-trajectories"
		target="_blank"
		rel="noopener noreferrer">tens of thousands of trajectories</a
	>
	in which Qwen3-Coder-480B, working in the OpenHands agent scaffold, attempts SWE-rebench issues about ten
	times each. That mirrors what a training step samples: a group of attempts at the same task. For each
	attempt we rebuilt the task's environment in a cloud sandbox, applied the patch and ran two checks, the
	PR's own tests and the repository's full suite.
</p>

<p>
	A survey came first. We timed the full suite for one task in each of 1,427 repositories. In most of them
	it finishes in a few seconds, and the simple answer is to run it. The interesting case is the roughly
	15% of repositories with large suites, where the full suite takes about 40 times as long as the PR's
	own tests. The main study looks there.
</p>

<StatGrid
	items={[
		{ value: '248', label: 'Tasks with large test suites' },
		{ value: '152', label: 'Repositories' },
		{ value: '1,101', label: 'Attempts that pass the PR’s own tests' },
		{ value: '49', label: 'Of those that fail the full suite' }
	]}
/>

<p>
	A failure counted only if it happened again when we reran the attempt in fresh sandboxes, and we fixed
	the hypotheses and analyses before running the study. So: <strong
		>49 of the 1,101 attempts that passed the PR's own tests failed the full suite</strong
	>. That is 4.5%, about one in 22, and at least 2.4% with 95% confidence. It may sound small. It is not
	spread evenly.
</p>

<h2 id="blind-spots">A few blind spots, many slips</h2>

<p>
	All 49 flips come from just 18 of the 248 tasks, in 17 repositories. When a task has a blind spot,
	attempts slip through it together: inside those tasks, a median of 27% of passing attempts are flips, and
	the correlation between attempts in the same group is 0.40.
</p>

<Figure
	caption="Top: the 248 tasks with large suites; the 18 that produced a flip are highlighted. Bottom: inside those 18 tasks, 49 of the 179 attempts that passed the PR's own tests fail the full suite."
>
	<BlindSpots />
</Figure>

<p>
	Clustering makes flips matter more than their rate suggests. Measured on groups of eight attempts, the
	wrong rewards amount to about a quarter of the learning signal, concentrated in about one group in 13.
	These are systematic errors. The same blind spot pays out whenever its task comes up, so the errors do
	not average away the way random noise does.
</p>

<h2 id="what-breaks">What breaks</h2>

<p>
	Most flips are plain regressions: 28 of the 49 break a test that fails even when it runs on its own.
	Ten fail only when the whole suite runs, seven of them because of the order in which the tests run, and
	eleven fail only some of the time.
</p>

<Figure
	caption="The 49 confirmed flips by how they fail. An ordinary regression breaks a test that also fails when run alone."
>
	<BarChart
		rows={mechanisms}
		labelHeader="Kind of flip"
		valueHeader="Flips"
		max={30}
		ticks={[0, 10, 20, 30]}
		format={count}
	/>
</Figure>

<p>
	The full suite is not a perfect judge either. In large suites, about 5% of reruns of attempts that had
	passed it failed, a reminder that the reference itself carries some noise.
</p>

<h2 id="selection">Can smarter test selection fix it?</h2>

<p>
	The classic answer to an expensive suite is regression test selection: run only the tests that a change
	could affect. We tried three selectors on the same 49 flips. Two pick tests by coverage, the lines or
	files each test executed before the change. The third is NameRTS<a class="cite" href="#ref-4">4</a>, a
	recent selector built to be safe: in its own evaluation on human commits, it selected every affected
	test for 99.6% of them.
</p>

<Figure
	wide
	caption="Flips caught against test time for each check; up and to the left is better. Test time is the mean share of the full suite's test time over 100 attempts that passed. Each selection is judged on the attempt's full run, which flatters selection. Hover or focus a point for its exact test time."
>
	<Selection />
</Figure>

<p>
	None of them closes the gap. The PR's own tests catch 1 of the 49 flips. Selecting by covered lines
	catches 20, NameRTS 20, and selecting by covered files 36, at nearly half of the full suite's test time.
	Even the best of them lets about one flip in four through.
</p>

<p>
	Could we at least predict which attempts are risky, and check only those? Not with the obvious signals.
	Patch size, test coverage of the changed code, suite size and whether the agent ran the tests itself
	predict flips no better than chance (an AUC of 0.53). A weaker agent, a 70B Llama model in the SWE-agent
	scaffold, produced flips about as often as the strong one on the same tasks: 7.2% against 7.0%. If you
	cannot tell which attempts to check, check at random.
</p>

<h2 id="audits">Random audits, corrected</h2>

<p>
	Random checking is an old idea from survey sampling. You cannot ask everyone, so you ask a random sample
	and weight each answer by how unlikely it was to be asked, a trick that goes back to
	<a
		href="https://doi.org/10.1080/01621459.1952.10483446"
		target="_blank"
		rel="noopener noreferrer">Horvitz and Thompson</a
	>. For rewards it works in three steps:
</p>

<ol>
	<li>
		<strong>Check every attempt cheaply.</strong> Run the PR's own tests on all of them. An attempt that fails
		them fails the full suite too.
	</li>
	<li>
		<strong>Audit at random.</strong> With a probability fixed in advance, run the full suite on some of the
		attempts that passed.
	</li>
	<li>
		<strong>Correct the reward.</strong> When an audit finds a flip, scale its correction by one over the audit
		probability. At a 20% rate, a flip that is found counts five times over.
	</li>
</ol>

<p>
	On average, the corrected signal equals what the full suite would have given, with no bias. Any single
	step is noisy, because most steps miss and a few correct hard, but the misses and the corrections
	balance out exactly.
</p>

<Figure
	caption="A simulation of attempt 2 from the example group, audited with probability 0.2 each time its group comes up. A draw without an audit gives the PR's value, +0.25; an audit gives the corrected −2.875. The running average settles near the full suite's −0.375; every new set of draws wanders differently but centres on it. Hover or use the arrow keys to step through the draws, or draw again."
>
	<Convergence />
</Figure>

<Callout title="The price of being unbiased">
	The cost is noise, and it has a simple form. Audit a group with probability q and the extra noise is
	(1/q − 1) times that group's distortion: how much the cheap check changed its learning signal. Groups
	where the PR's own tests got everything right add no noise at all, which is why concentrated blind spots
	are cheap to correct.
</Callout>

<h2 id="groups">Audit the group, not the patch</h2>

<p>
	There is a choice in how to toss the coins. One way gives every attempt its own coin. The other tosses
	one coin per group and audits all of its passing attempts together. GRPO only uses differences within a
	group, so an error shared by the whole group cancels out of the update. Flips arrive in clusters, so a
	whole-group audit reveals the cluster at once and corrects the group's comparisons together.
</p>

<Figure
	caption="Extra noise from auditing, relative to the size of the learning signal, measured on the real groups at three audit rates. Both designs run the full suite on the same expected share of attempts. Lower is better."
>
	<Dumbbell
		rows={designs}
		labelHeader="Audit rate"
		fromLabel="Audit attempts one by one"
		toLabel="Audit whole groups"
		max={5}
		ticks={[0, 1, 2, 3, 4, 5]}
		unit=""
	/>
</Figure>

<p>
	At the same cost, <strong>whole-group audits were 42% less noisy</strong> than auditing attempts one by
	one.
</p>

<Callout title="Normalization makes the gap dramatic">
	GRPO usually also divides each advantage by the group's spread. Carrying an unbiased correction through
	that division with one coin per attempt means multiplying corrections together, and the noise explodes:
	on the real groups, per-attempt audits were about 12 times noisier than whole-group audits at a 20%
	rate, and about 540 times at 10%. A whole-group audit corrects the group in one step and stays both
	unbiased and calm.
</Callout>

<p>
	Audits can also go where they count. Auditing a group more often when more of its attempts passed the
	PR's own tests, and when its full suite is cheaper to run, cut the noise by another third at the same
	cost.
</p>

<h2 id="policy">Putting it together</h2>

<p>The pieces add up to a simple policy:</p>

<ul>
	<li>Where the full suite is cheap, as it is in most repositories, run it on every attempt.</li>
	<li>
		Where it is large, run the PR's own tests on every attempt and audit whole groups at random.
	</li>
</ul>

<Figure
	caption="Test time of three reward policies relative to always running the full suite, weighted by how common small and large suites were in our survey. The first two give the full suite's signal; the third is cheaper but keeps the wrong rewards."
>
	<BarChart
		rows={policies}
		labelHeader="Reward policy"
		valueHeader="Test time"
		max={100}
		ticks={[0, 50, 100]}
		format={percent}
	/>
</Figure>

<p>
	Weighted by how common small and large suites are, this gives the full suite's training signal without
	bias at about 23% of the test time of running everything. The PR's own tests alone take about 10%, but keep the wrong
	rewards. The audits pay one more dividend: they give a running upper bound on how often the cheap check
	is wrong, and that bound held in 98% of simulated training runs.
</p>

<h2 id="takeaways">What to take from it</h2>

<ul>
	<li>
		<strong>Which tests run is a reward decision.</strong> A check that only looks where the original fix looked
		will pay for patches that break code elsewhere.
	</li>
	<li>
		<strong>Wrong rewards are rare but clustered.</strong> They come from a few tasks, hit several attempts at
		once and cannot be predicted from the patch, so they behave like systematic errors rather than noise.
	</li>
	<li>
		<strong>Selection narrows the gap but does not close it.</strong> Random audits with a correction close it,
		on average, at a fraction of the cost of running everything.
	</li>
	<li>
		<strong>Audit the group, not the patch.</strong> Group-relative training cancels what a group shares, and
		coupling the audits within a group lets it.
	</li>
</ul>

<aside class="limits">
	<p class="limits-title">Limitations</p>
	<p>
		We measured the fidelity and cost of rewards, not training itself: we have not yet trained an agent on
		audited rewards to see how differently it learns. The study covers Python repositories from SWE-rebench
		and attempts from two public agent datasets, and most flips come from a handful of repositories. The
		full suite serves as the reference, but it is itself a slightly noisy judge.
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
