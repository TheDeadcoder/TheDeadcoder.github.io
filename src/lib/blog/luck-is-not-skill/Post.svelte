<script>
	import Figure from '$components/blog/Figure.svelte';
	import Callout from '$components/blog/Callout.svelte';
	import StatGrid from '$components/blog/StatGrid.svelte';
	import PaperCard from '$components/blog/PaperCard.svelte';
	import References from '$components/blog/References.svelte';
	import Advantages from './Advantages.svelte';
	import Schedules from './Schedules.svelte';
	import Spurious from './Spurious.svelte';
	import Curves from './Curves.svelte';
	import Seeds from './Seeds.svelte';
	import Scorecard from './Scorecard.svelte';
	import Probe from './Probe.svelte';
	import Disagree from './Disagree.svelte';

	// Training numbers are taken from the paper; benchmark numbers from the τ-Dice analysis.

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
			authors: 'Paul Glasserman and David D. Yao',
			year: '1992',
			title: 'Some Guidelines and Guarantees for Common Random Numbers',
			venue: 'Management Science, 38(6), 884–908',
			href: 'https://doi.org/10.1287/mnsc.38.6.884'
		},
		{
			authors: 'Vince Buffalo, Carl A. B. Pearson and Daniel Klein',
			year: '2026',
			title: 'Realizing Common Random Numbers: Event-Keyed Hashing for Causally Valid Stochastic Models',
			venue: 'arXiv:2603.11084',
			href: 'https://arxiv.org/abs/2603.11084'
		},
		{
			authors: 'Shunyu Yao, Noah Shinn, Pedram Razavi and Karthik Narasimhan',
			year: '2025',
			title: 'τ-bench: A Benchmark for Tool-Agent-User Interaction in Real-World Domains',
			venue: 'International Conference on Learning Representations (ICLR)',
			href: 'https://arxiv.org/abs/2406.12045'
		}
	];
</script>

<p>
	Ask an AI agent to handle the same customer request eight times and you get eight different attempts.
	Group-relative reinforcement learning, the family of methods that includes GRPO, learns from exactly
	that spread. It scores every attempt, compares each score with the group's average, and nudges the model
	toward the attempts that did better and away from the ones that did worse.
</p>

<p>
	Now give the environment a bad day. One attempt runs into a tool outage and cannot finish the job.
	Another solves the task, but the grader slips and records a failure. Both land below the average, and
	the update pushes the model away from what they did, although neither did anything wrong. They were
	unlucky, and the comparison could not tell luck from skill.
</p>

<p>
	Noise itself is not the enemy. Real tools fail, and an agent has to learn to cope with that. The
	trouble is that each attempt draws its own luck, so every comparison mixes two things: how well the
	attempt played, and how its dice fell. This post is about a simple remedy, giving every attempt in a
	group the same luck, and about a question that turned out to be subtler than it looks: when does that
	actually help? The paper works it out in theory and then tests it on a 2B tool-use agent.
</p>

<PaperCard
	title="Luck Is Not Skill: When Do Paired Rollouts Help Group-Relative RL of LLM Agents?"
	authors={['Nazmus Sakib']}
	status="under review"
	statusText="Under review at TMLR"
	links={[
		{ label: 'arXiv', href: 'https://arxiv.org/abs/2609.24144' },
		{ label: 'Code', href: 'https://github.com/TheDeadcoder/paired-rollouts' }
	]}
/>

<h2 id="group-relative">How group-relative RL learns</h2>

<p>
	GRPO<a class="cite" href="#ref-1">1</a> trains a language model without a separate value network. For
	each task it samples a group of attempts and scores each one. An attempt's
	<strong>advantage</strong> is how far its reward sits above or below the group's average, usually divided
	by the group's spread. Attempts with a positive advantage are made more likely, and attempts with a
	negative one less likely.
</p>

<p>
	Comparing attempts at the same task is what makes this work: the task's difficulty is the same for all
	of them, so it cancels out. Luck does not cancel when every attempt draws its own. The figure shows the
	worst case, a group in which every attempt solved the task.
</p>

<Figure
	caption="Eight attempts that all solved the task, scored with group-standardized advantages. With independent luck, one grading slip turns a correct attempt into the worst of its group. With shared luck, a slip hits all of them or none, and every advantage stays at zero."
>
	<Advantages />
</Figure>

<h2 id="same-dice">Same dice for every attempt</h2>

<p>
	The remedy is an old idea from simulation called <strong>common random numbers</strong><a
		class="cite"
		href="#ref-2">2</a
	>: when you compare two alternatives, run both on the same random draws, so that any difference comes
	from the alternatives rather than from the dice. Reinforcement learning has used it before, for example
	in
	<a href="https://arxiv.org/abs/1301.3878" target="_blank" rel="noopener noreferrer">PEGASUS</a>, which
	fixes a simulator's random numbers in advance to compare policies.
</p>

<p>
	Applied to GRPO, it gives <strong>paired rollouts</strong>. All attempts in a group share one noise
	schedule: the same outages, the same rate limits, the same grading slip. The model's own sampling stays
	independent, so the attempts still differ in what they do. Every group draws a fresh schedule, so each
	attempt faces exactly the same odds of bad luck as before. Only its siblings now share that luck.
</p>

<p>
	One detail matters. Attempts take different paths, so “the third tool call” means different things in
	different attempts. The schedule is therefore keyed by events rather than by call order<a
		class="cite"
		href="#ref-3">3</a
	>: each draw belongs to a tool, the resource it touches and how often that pair has come up before. Two
	attempts that look up the same order for the first time get the same luck, whenever in the conversation
	they do it.
</p>

<Figure
	caption="Fault schedules for four attempts over seven event keys. Independent schedules give each attempt its own faults; a paired schedule gives every attempt the same draw for the same event, although what a fault does can still depend on each attempt's history. Adapted from the paper's Figure 1."
>
	<Schedules />
</Figure>

<h2 id="theory">Cleaner comparisons, not always a quieter gradient</h2>

<p>Before training anything, the paper works out what sharing the dice does to the update.</p>

<ul>
	<li>
		<strong>No added bias.</strong> Luck reaches an attempt only through what the environment shows it,
		and the update only differentiates the model's own choices. For the standard leave-one-out form of
		the update, the expected direction is unchanged.
	</li>
	<li>
		<strong>Cleaner comparisons.</strong> Split the variance of a reward into the part explained by luck
		and the rest, and call the first part's fraction the <strong>luck share</strong>. With shared dice,
		the difference between two siblings' rewards loses exactly that fraction of its variance. If luck
		explains 35% of the reward variance, comparisons get 35% less noisy.
	</li>
	<li>
		<strong>No guarantee for the gradient.</strong> The update multiplies each advantage by a direction
		in parameter space, the one that makes that attempt's actions more likely, so its noise also depends
		on how those directions line up. For grading slips, the paper derives the exact condition under which
		sharing lowers the gradient noise.
	</li>
</ul>

<Callout title="Cleaner rewards, noisier gradient">
	The condition can fail. In a one-parameter bandit with eight attempts and a 10% slip rate, sharing the
	slips cuts the variance of reward differences by 9% but raises the variance of the gradient 2.2-fold. A
	cleaner comparison does not automatically mean a quieter update.
</Callout>

<p>
	For one kind of group, though, sharing can only help: a group whose attempts are all truly correct. Its
	clean update is zero, so any spread in its rewards is pure grading noise. Independent slips create that
	spread surprisingly often. Shared slips never do, because either nobody is flipped or everybody is.
</p>

<Figure
	caption={'How often a group of eight correct attempts looks mixed when each grade slips independently, 1 − (1 − q)⁸ − q⁸; with shared slips it never does. The rings show what training measured at a 10% slip rate: 2,080 of 3,726 independent groups (55.8%) and 0 of 3,989 paired groups. Drag across the chart or use the slider.'}
>
	<Spurious />
</Figure>

<h2 id="experiment">The experiment</h2>

<p>
	To test this on a real agent, I built a simulated back office: customers, orders, products and support
	tickets behind thirteen tools for looking things up, changing them and waiting out rate limits. Each
	task is a customer request with one to three parts, such as an address change, a cancellation or a
	partial refund. A deterministic grader compares the final database with the expected one, field by
	field.
</p>

<p>The environment has two kinds of bad luck, each studied on its own:</p>

<ul>
	<li>
		<strong>Tool faults.</strong> A quarter of tool calls go wrong: a transient error, a rate limit, an
		outage that lasts for the rest of the episode, a stale read or a truncated list. About three quarters
		of episodes run into at least one.
	</li>
	<li><strong>Grader flips.</strong> A correct final state is reported as a failure 10% of the time.</li>
</ul>

<p>
	The agent is Qwen3.5-2B, trained with GRPO and LoRA for 100 steps of 24 tasks with 8 attempts each.
	Each design ran on three seeds; seed for seed, the paired and independent runs saw the same tasks in
	the same order. A reference model was trained without any noise. Every score below is
	<strong>true success</strong>: whether the database really ended up right, whatever a noisy grader
	said. The tests and their pass rules were pre-registered.
</p>

<StatGrid
	items={[
		{ value: '2B', label: 'Parameters in the agent' },
		{ value: '14', label: 'Training runs' },
		{ value: '~27,000', label: 'Episodes per run, with evaluations' },
		{ value: '3', label: 'Seeds per design' }
	]}
/>

<h2 id="results">What happened in training</h2>

<p>
	The mechanism behaved as designed. At the start of training, luck explained about a third of the reward
	variance under tool faults (a luck share of 0.33 to 0.38), so there was plenty for pairing to remove.
	Under grader flips, 55.8% of all-correct independent groups showed fake disagreement, close to the 57%
	the formula predicts, against none of the paired groups.
</p>

<p>Then the part that matters most: did the agent learn better?</p>

<Figure
	wide
	caption="Validation success during training, averaged over seeds. Each panel names the noise used in training and the evaluation; in the recovery challenge, the first try of every write fails. The faint line is the reference trained without noise. Hover, or focus a panel and use the arrow keys."
>
	<Curves />
</Figure>

<p>
	Under tool faults, the paired agent pulled ahead and stayed there. On the final test with faults it
	reached 66.8% against 61.8%, ahead on all three seeds. Both beat the reference trained without noise,
	which reached 56.4% on the same test. On the recovery challenge, pairing finished at 72.2% against
	68.7%.
</p>

<p>
	Under grader flips there is no clear winner. On the clean test, pairing reached 89.4% against 88.0%,
	and the reference trained without noise 89.9%.
</p>

<Figure
	caption="Final test success for each seed, independent (hollow) against paired (filled). The axes are zoomed and differ between the two panels."
>
	<Seeds />
</Figure>

<p>
	The pre-registered tests give the sober reading. Four of the six passed, including both mechanism
	checks and no loss on two fault types never seen in training. The two that asked for faster learning
	did not.
</p>

<Figure
	wide
	caption="The six pre-registered tests, their rules and their outcomes. “Pass by its rule” means the point estimate met the rule while its 95% interval includes zero."
>
	<Scorecard />
</Figure>

<p>
	The miss under tool faults is a near miss. The area under the learning curve was 0.037 higher on
	average, above the 0.03 bar, but the rule asked for every seed to be ahead and one came in 0.002 behind.
	The miss under grader flips is not close: +0.003, with an interval from −0.029 to +0.033. So the final
	scores favour pairing under tool faults, but the registered evidence for faster learning is not there.
</p>

<h2 id="probe">Did the gradient get quieter?</h2>

<p>
	Reward comparisons and gradient noise can disagree, so I also measured the gradient directly. A probe
	froze eight checkpoints from two runs trained with tool faults, sampled groups of attempts at each one,
	and computed every attempt's gradient in full, over all 33.6 million trainable LoRA parameters. It then
	compared the total variance of the group update under shared and independent luck, on the same
	attempts.
</p>

<Figure
	caption="How much lower the gradient noise (the trace of its covariance) is with shared luck, at eight checkpoints from two runs trained with tool faults. Both kinds of noise are applied to the same checkpoints. The values are point estimates without uncertainty intervals."
>
	<Probe />
</Figure>

<p>
	Pairing lowered the gradient noise at every checkpoint: by 21 to 30% under grader flips, and by 40 to
	63% under tool faults. The theory's condition held everywhere too, with room to spare: its left side
	was only about a fifth to a quarter of its right side.
</p>

<Callout title="Lower noise is not faster learning">
	Run B, the run with the most checkpoints, is the paired run of the one seed that came in 0.002 behind on
	the area under the learning curve. Yet its gradient noise under tool faults was 40 to 63% lower. A
	quieter estimate is one ingredient of faster learning, not a guarantee of it.
</Callout>

<h2 id="takeaways">What to take from it</h2>

<ul>
	<li>
		<strong>If you control the randomness, pairing is cheap.</strong> Any simulator, replay layer or
		grader that exposes its random draws can share them across a group. Each attempt keeps its own odds,
		and the basic update stays unbiased.
	</li>
	<li>
		<strong>It has a price.</strong> A shared outage can sink a whole group. Under tool faults, 52 to 54%
		of paired groups gave every attempt the same reward, against about 13% of independent groups, and a
		group without contrast teaches nothing. A batch of 24 paired groups also sees 24 schedules instead of
		192, although the paired agent was not worse on fault types it never saw (+2.3 points).
	</li>
	<li>
		<strong>Measure the gradient, not just the rewards.</strong> The luck share tells you how much of the
		reward is luck. It is not a validated predictor of learning gains, and the exact condition can fail.
	</li>
	<li>
		<strong>Keep three claims apart.</strong> Cleaner reward comparisons, lower gradient noise and faster
		learning are different claims. This study supports the first two on its checkpoints, and only part of
		the third.
	</li>
</ul>

<h2 id="tau-dice">Next: luck in agent benchmarks</h2>

<p>
	Luck does not stop at training. Agent benchmarks such as τ-bench<a class="cite" href="#ref-4">4</a> roll
	dice of their own: a language model plays the customer, the agent samples its replies, a judge grades
	some of the conversations, and faults can be injected into the tools. When one agent beats another by a
	few points, how much of that is skill, and how much is how the dice fell?
</p>

<p>
	The extension I am working on, <span class="whitespace-nowrap">τ-Dice</span>, carries the keyed dice of
	paired rollouts over to evaluation. On
	<a href="https://github.com/sierra-research/tau2-bench" target="_blank" rel="noopener noreferrer"
		>τ³-bench</a
	>, every open-model call and every tool fault gets its own seed, derived from what the draw is: which
	task, which stream, which turn. In principle, any episode can then be replayed, and any one source of
	luck varied while the others stay fixed. I ran it on the airline, retail and telecom domains with three
	open agents (Qwen3.5-4B,
	gpt-oss-20b and Qwen3.6-35B-A3B) and gpt-oss-120b as the customer, plus two more agents for comparison:
	about 24,500 episodes so far.
</p>

<StatGrid
	items={[
		{ value: '1 of 1,403', label: 'Replays with every seed fixed that repeated the conversation exactly' },
		{ value: '~3 in 10', label: 'Replays that ended with a different result' },
		{ value: '<5%', label: 'Within-task variation explained by the customer’s or the agent’s seeds' },
		{ value: '7 of 8', label: 'Neighbouring retail leaderboard pairs not separated beyond trial luck' }
	]}
/>

<p>
	The first lesson was humbling: seeds are not enough. Replaying 1,403 episodes with every seed held fixed
	repeated the conversation word for word exactly once, and about three replays in ten ended with a
	different result. The inference server adds randomness that no seed controls. Under normal load, the
	customer's very first message already differed in about three replays out of four. With one episode at
	a time on the server, that first message almost always matched, but the conversations still drifted
	apart later, and only 4 of 63 replays per agent repeated exactly.
</p>

<p>
	That noise swamps the dice. The customer's seeds and the agent's seeds each explained under 5% of the
	variation within a task, and re-running with identical seeds changed outcomes about as often as drawing
	new ones. Splitting luck by its source will need inference that gives the same answer however busy the
	server is. The amount of luck, on the other hand, is plain to see: about 60% of the variation in
	outcomes happens within tasks, so the same agent on the same task often lands on both sides.
</p>

<p>
	Turning the temperature down to 0 does not remove the luck either; it only hides it. Under τ³-bench's
	official decoding at temperature 0, four identical runs gave different results on 46 to 55% of tasks.
	The public leaderboard shows the same pattern: in all nine text submissions with four trials each,
	results changed between trials on 23 to 44% of tasks.
</p>

<Figure
	caption="Share of tasks whose result changed between four runs with the same settings. Top: the three open agents in τ-Dice at temperature 0, with 95% intervals. Bottom: the nine public τ³-bench text submissions with four trials each. Hover a mark to read its value."
>
	<Disagree />
</Figure>

<p>
	That luck reaches the rankings. With the tasks held fixed and only the trials resampled, 7 of 8
	neighbouring pairs on the retail leaderboard are not separated at 95%, and 4 of 8 in airline and in
	telecom. The judge, at least, adds little luck of its own: grading the same retail conversation four
	more times changed its verdict in 1.9% of cases.
</p>

<p>
	These results are early. Next comes a blind human check of whether the failures <span class="whitespace-nowrap">τ-Dice</span> labels as luck
	look like luck to people, with two annotators judging 200 failures.
</p>

<aside class="limits">
	<p class="limits-title">Limitations</p>
	<p>
		The training study covers one 2B model, one synthetic environment, 100 training steps and three seeds
		per design, and the fault mix was tuned to make luck a large share of the reward. Both registered
		learning tests missed, and the recovery gain's interval includes zero. The test tasks had been looked
		at while setting up the study, so they are not an untouched holdout. The gradient probe covers eight
		checkpoints from two runs trained with tool faults, none trained with grader flips, and reports no
		uncertainty intervals. The <span class="whitespace-nowrap">τ-Dice</span> results are preliminary and await the human check.
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
