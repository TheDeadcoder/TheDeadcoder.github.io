<script>
	import Figure from '$components/blog/Figure.svelte';
	import Callout from '$components/blog/Callout.svelte';
	import StatGrid from '$components/blog/StatGrid.svelte';
	import References from '$components/blog/References.svelte';
	import Project from './Project.svelte';
	import Dashboard from './Dashboard.svelte';
	import Scenarios from './Scenarios.svelte';
	import Pipeline from './Pipeline.svelte';
	import Scores from './Scores.svelte';
	import Runs from './Runs.svelte';
	import Findings from './Findings.svelte';

	// Numbers come from the project's logs: the dataset statistics, the GRPO run report and
	// the verbatim evaluation log. None of the review fixes has been rerun.

	const references = [
		{
			authors:
				'Joseph Spisak, Davide Testuggine, Zach Wentz, Pierre Andrews, Sanyam Bhutani, Hamid Shojanazeri, Pankit Thapar, Emre Guven, Lewis Tunstall and Vaibhav Srivastav',
			year: '2025',
			title: 'Building the Open Agent Ecosystem Together: Introducing OpenEnv',
			venue: 'Hugging Face blog',
			href: 'https://huggingface.co/blog/openenv'
		},
		{
			authors: 'DeepSeek-AI',
			year: '2025',
			title: 'DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning',
			venue: 'arXiv:2501.12948',
			href: 'https://arxiv.org/abs/2501.12948'
		},
		{
			authors: 'Qwen Team',
			year: '2024',
			title: 'Qwen2.5 Technical Report',
			venue: 'arXiv:2412.15115',
			href: 'https://arxiv.org/abs/2412.15115'
		},
		{
			authors:
				'Zhihong Shao, Peiyi Wang, Qihao Zhu, Runxin Xu, Junxiao Song, Xiao Bi, Haowei Zhang, Mingchuan Zhang, Y. K. Li, Y. Wu and Daya Guo',
			year: '2024',
			title: 'DeepSeekMath: Pushing the Limits of Mathematical Reasoning in Open Language Models',
			venue: 'arXiv:2402.03300',
			href: 'https://arxiv.org/abs/2402.03300'
		}
	];
</script>

<p>
	A datacenter is a building full of heat. Every server turns the power it draws into heat, and a
	row of cooling units carries it away. When one of those units fails, someone in the operations
	center sees the alert, reads the dashboard and decides what to do: which unit to inspect, which
	survivors to push harder, which racks to shed. When the utility power drops, batteries carry the
	load while a diesel generator starts, and the clock is running.
</p>

<p>
	I wanted to know whether a small language model could learn that job. Not talk about it, but read
	a live dashboard and type commands that a physical system obeys. Fluent text earns nothing here. A
	command that sounds right but names the wrong unit wastes a step, and the temperatures do not
	wait. The physics decides what worked.
</p>

<p>
	That rules out the usual shortcuts. There is no dataset of expert operators working through these
	incidents, and nobody rehearses a cooling cascade on real hardware. So the project builds the whole
	chain: a physics simulator of a small facility, a dataset written by a larger reasoning model
	playing inside it, and a 7B model trained first to imitate that teacher and then to practise
	against the live simulation. This post walks through all three, the head-to-head results, and what
	a closer look at the evaluation says about them.
</p>

<Project />

<h2 id="simulator">A datacenter in a text box</h2>

<p>
	The simulator, DC-Ops, is built on OpenEnv<a class="cite" href="#ref-1">1</a>, an open framework
	for packaging the environments that agents learn in. It models a small facility: two zones with
	twenty racks and 160 kW of IT load, four cooling units known as CRACs, two UPS battery systems, a
	diesel generator and a transfer switch between utility and generator power. Temperatures follow a
	lumped thermal model: each zone stores heat, the servers add it, the cooling units remove it, and
	the walls exchange it with the outside. Batteries drain while they carry the load, and the
	generator needs time to start.
</p>

<p>
	The agent gets no state vector. It reads the same text dashboard an operator would, with the
	alert, the state of every unit, temperatures and power readings, and answers with one of fourteen
	commands, such as <code>diagnose CRAC-3</code> or <code>set_fan_speed CRAC-2 100</code>. Each
	command advances the simulation, and the next screen shows what happened.
</p>

<Figure
	wide
	caption="The opening screen of the thermal event scenario, condensed from the simulator’s text dashboard, and the reply the model wrote for it after imitation training. At every step the model writes a short reasoning block and exactly one command."
>
	<Dashboard />
</Figure>

<p>
	Six scenarios cover cooling and power at three levels of difficulty, from units that overcool the
	room to a double cooling failure and a full loss of utility power. Each scenario injects its fault
	and decides for itself when the incident counts as resolved, and every step earns a reward of six
	parts: thermal safety, power safety, efficiency, progress, procedure and the quality of the action.
	The simulator is open source and runs live on Hugging Face Spaces, so you can try an incident in
	your browser.
</p>

<Figure
	caption="The six scenarios by subsystem and difficulty. The two hard ones are the scenarios used in the head-to-head evaluation."
>
	<Scenarios />
</Figure>

<h2 id="training">Three steps of training</h2>

<p>
	Without expert logs, the training data has to come from somewhere else. The pipeline has three
	phases, and each one hands its result to the next.
</p>

<Figure
	caption="The three training phases. The teacher’s episodes become the student’s imitation data, and the imitation model is where RL starts. The first and last phases run inside the simulator."
>
	<Pipeline />
</Figure>

<h3>A teacher plays the scenarios</h3>

<p>
	A reasoning model, DeepSeek-R1-Distill-Qwen-32B from the DeepSeek-R1 family<a
		class="cite"
		href="#ref-2">2</a
	>, played live episodes in the simulator. At every turn it wrote a free chain of thought, a short
	structured reasoning block and one command. Of the 1,520 episodes it played, 1,083 survived
	filtering, which dropped episodes with no usable turn, an invalid command or an escalation to a
	human. The teacher was far from perfect: it resolved 179 of the 1,083, about one in six.
</p>

<h3>A 7B student imitates it</h3>

<p>
	The student is Qwen2.5-7B-Instruct<a class="cite" href="#ref-3">3</a>, fine-tuned through a small
	LoRA adapter. It is not a reasoning model, so the teacher’s chain of thought was cut out of every
	turn: the student learns to write the short reasoning block and the command, nothing else. This
	phase used the 934 episodes from the six scenarios, 7,107 turns in all.
</p>

<h3>The student practises against the simulator</h3>

<p>
	Imitation copies the teacher, mistakes included. To go further, the student practised with GRPO<a
		class="cite"
		href="#ref-4">4</a
	>, reinforcement learning that compares several attempts at the same problem instead of training a
	separate critic. Each training prompt is a live screen, captured either at the start of an incident
	or a few scripted moves in. The model writes eight replies to that screen, each reply’s command
	runs in its own fresh copy of the simulator, and the replies that score above their group’s average
	become more likely.
</p>

<Figure
	caption="The four scores added up for every reply during RL. Bars span each score’s possible range on a shared scale, and dots mark its mean over the whole training run."
>
	<Scores />
</Figure>

<p>
	The physics score has the widest range. It replays the screen’s history in a fresh simulator, runs
	the command, lets four more steps pass and rewards replies that leave the facility healthier, with
	a bonus if the incident resolves along the way. The command rules encode what an operator would
	expect, such as diagnosing the failed unit first and leaving broken units alone. Every phase, the
	teacher included, ran on a single AMD Instinct MI300X, and getting the training stack to work on
	AMD’s ROCm software took its own set of fixes, which the repository documents.
</p>

<StatGrid
	items={[
		{ value: '1,083', label: 'Teacher episodes kept, of 1,520 played' },
		{ value: '1 in 6', label: 'Episodes the teacher itself resolved' },
		{ value: '7,107', label: 'Turns the student imitated' },
		{ value: '8', label: 'Replies scored for each screen during RL' }
	]}
/>

<h2 id="training-results">What training showed</h2>

<p>
	Imitation did its job before RL began. At every logged step of RL, every reply was well formed: a
	reasoning block of reasonable length and one known command. The format score never moved from
	0.15, and since GRPO learns only from differences within a group, all of the learning went to the
	other three scores.
</p>

<p>
	The mean training reward rose 66% from the first 50 logged steps to the last 50, and most of that
	came early. By quarters of the run it averaged 1.33, 1.38, 1.41 and 1.18. The repeat penalty, which
	punished redoing a scripted warm-up command, had fallen to zero by the end.
</p>

<p>
	Those numbers say the model got better at earning its reward. Whether it got better at running a
	datacenter is a question for the evaluation.
</p>

<h2 id="head-to-head">Head to head with the base model</h2>

<p>
	To see what training changed, I ran the base Qwen2.5-7B-Instruct and the trained model on the two
	hard scenarios, the cooling cascade (A4) and the power failure (B4), with five runs each and ten
	steps per run.
</p>

<Figure
	wide
	caption="Every command from every evaluation run, ten steps per run. Each row is one run, and the number at its end is the run’s total reward from the simulator. Hover or tap a step to read the command."
>
	<Runs />
</Figure>

<p>
	The change in behavior is the clearest result. The base model waited on 92 of its 100 steps. The
	trained model waited once. On the cooling cascade it opened every run by diagnosing CRAC-1, one of
	the two failed units, and then adjusted setpoints for the rest of the run, almost always on the two
	surviving units and mostly to 22°C. Its mean reward was 0.430 against the base model’s 0.041, and
	each of its five runs scored higher than every base run.
</p>

<p>
	The power failure is murkier. The trained model sent <code>start_generator</code> in the first two
	steps of every run and then turned to rack loads. Nine of its 40 rack commands named racks that do
	not exist, such as A-4 for A-04, and the simulator rejected them. Of the 31 it accepted, 17 raised a
	rack above its starting 8 kW, the opposite of shedding load during an outage. Four of its five runs
	ended below zero, and its mean of −0.092 against the base model’s −0.147 hides a spread from −0.388
	to +0.540.
</p>

<p>
	No run resolved either incident, and the logs show why. Each scenario counts as solved only after
	the facility has held steady for two steps and a specific check has been made: the cooling cascade
	needs both failed units diagnosed, CRAC-1 and CRAC-3, and the power failure needs a UPS diagnosed.
	In twenty runs, neither model ever diagnosed CRAC-3 or a UPS.
</p>

<p>
	Two more details temper the gains. In the power failure the generator starts on its own: the
	opening alert already says so, and in the simulator a run of plain waits brings it online exactly
	as fast as one that starts with <code>start_generator</code>. And the repeat penalty that reached
	zero in training did not stop loops: ten times, the trained model sent the very command it had just
	sent. In training it was only ever compared with a short scripted history, and at each step the
	model sees the current screen, not a list of what it has already done.
</p>

<StatGrid
	items={[
		{ value: '92 of 100', label: 'Steps the base model spent waiting' },
		{ value: '1 of 100', label: 'Steps the trained model spent waiting' },
		{ value: '0 of 20', label: 'Runs that resolved the incident' },
		{ value: '9 of 40', label: 'Trained rack commands naming a rack that does not exist' }
	]}
/>

<h2 id="insights">What the evaluation can and cannot claim</h2>

<p>
	A review of the evaluation code turned up six problems. Five now have fixes written, and one is
	still open. None of the runs above has been repeated with the fixes, so every number in this post
	comes from the original runs, and the points below are insights into what those numbers can claim.
</p>

<Figure
	wide
	caption="Six problems the review found, and what the next round of evaluation changes. The fixes have not been rerun, so the results in this post come from the original evaluation."
>
	<Findings />
</Figure>

<Callout title="What the numbers support">
	The cooling-cascade gap was measured from one starting screen that the model had trained on, at
	half the scenario’s horizon, and scored with the reward it was trained to raise. It shows that
	training changed the policy. It does not yet show that the model handles a cooling failure better
	by measures it was never trained on.
</Callout>

<h2 id="takeaways">What to take from it</h2>

<ul>
	<li>
		<strong>Imitation teaches the format.</strong> From the first step of RL, every reply had the
		right shape. Here, 7,107 teacher turns were enough to give a 7B model a strict output format.
	</li>
	<li>
		<strong>Training changed the behavior, but which phase did it is open.</strong> The trained model
		acted where the base model waited and aimed most of its commands at the right subsystem. Without
		an imitation-only baseline, the share that RL contributed is unknown.
	</li>
	<li>
		<strong>Read the success check before the reward curve.</strong> Both hard scenarios needed a
		specific diagnosis before they could count as solved, and no run made it. A rising training curve
		could not show that. The logs could.
	</li>
	<li>
		<strong>Check that seeds change what the agent sees.</strong> One ignored argument made five runs
		into one and left the training set with 48 distinct screens. A test that two seeds give two
		different screens would have caught it.
	</li>
</ul>

<aside class="limits">
	<p class="limits-title">Limitations</p>
	<p>
		This is a project, not a paper. The evidence covers one 7B model in one simulated facility, and
		the evaluation covers two scenarios with five runs per model, all starting from the same screen.
		The scores come from the simulator’s own reward, no run resolved a hard incident, and none of the
		fixes has been rerun yet.
	</p>
</aside>

<h2 id="references">References</h2>

<References items={references} />

<style>
	code {
		border-radius: 0.3125rem;
		background: var(--surface-2);
		padding: 0.0625rem 0.375rem;
		font-family: var(--font-mono);
		font-size: 0.84em;
	}

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
