<script>
	import Figure from '$components/blog/Figure.svelte';
	import BarChart from '$components/blog/BarChart.svelte';
	import Dumbbell from '$components/blog/Dumbbell.svelte';
	import Callout from '$components/blog/Callout.svelte';
	import StatGrid from '$components/blog/StatGrid.svelte';
	import References from '$components/blog/References.svelte';
	import Project from './Project.svelte';
	import Note from './Note.svelte';
	import Testbed from './Testbed.svelte';
	import Design from './Design.svelte';
	import Recipes from './Recipes.svelte';
	import { denials, reader, readers } from './data.js';

	// Every number below comes from the project's run records. Reader results are for the
	// command-based guard.

	const share = (/** @type {number} */ part, /** @type {number} */ whole) => (100 * part) / whole;
	const percent = (/** @type {number} */ value) => `${Math.round(value)}%`;

	const denialRows = denials.map((row) => ({
		label: row.label,
		from: Math.round(share(row.repaired, 52)),
		to: Math.round(share(row.overblocking, 52))
	}));

	const readerRows = reader.map((row) => ({
		label: row.label,
		value: share(row.success, row.trials),
		emphasis: row.emphasis
	}));

	const readerPanels = readers.map((r) => ({
		name: r.name,
		rows: [
			{ label: 'Declined', value: share(r.declined, r.trials) },
			{ label: 'Succeeded', value: share(r.success, r.trials), emphasis: true }
		]
	}));

	const references = [
		{
			authors: 'Ryan Greenblatt, Buck Shlegeris, Kshitij Sachan and Fabien Roger',
			year: '2024',
			title: 'AI Control: Improving Safety Despite Intentional Subversion',
			venue: 'International Conference on Machine Learning (ICML)',
			href: 'https://arxiv.org/abs/2312.06942'
		},
		{
			authors: 'Auguste Kerckhoffs',
			year: '1883',
			title: 'La cryptographie militaire',
			venue: 'Journal des sciences militaires, vol. IX',
			href: 'https://www.petitcolas.net/kerckhoffs/'
		},
		{
			authors: 'Lewis Hammond, Alan Chan, Jesse Clifton and others',
			year: '2025',
			title: 'Multi-Agent Risks from Advanced AI',
			venue: 'Cooperative AI Foundation, Technical Report #1, arXiv:2502.14143',
			href: 'https://arxiv.org/abs/2502.14143'
		}
	];
</script>

<p>
	Picture a team of AI agents running operations for a small service, one shift at a time. Each agent
	works its tickets and leaves notes for whoever comes next. An automated guard watches every command
	and blocks the ones that look dangerous.
</p>

<p>
	Now the guard makes a mistake. It blocks an agent from reading a harmless file, a credentials
	template full of placeholder values that the ticket needs. The agent finds another way to read it,
	finishes the job, and does what a good colleague does. It writes the trick into the handoff notes.
</p>

<Figure caption="An illustration of the pattern, not a real note. The agents' actual notes and the routes they recorded are not published.">
	<Note />
</Figure>

<p>
	Later, someone notices the false alarm and fixes the guard. The block is gone. The note is not.
	Whoever reads the team's notes next, an honest agent or not, still learns where the guard was loose
	and how to get past it. Does that knowledge still work once the guard is fixed? I built a sandbox
	to find out.
</p>

<Project />

<h2 id="the-challenge">A guard's mistake is also a lesson</h2>

<p>
	Most work on AI oversight asks whether a monitor can catch a model that is trying to misbehave. AI
	control research, for example, tests whether safety protocols still hold when the model under watch
	actively tries to subvert them<a class="cite" href="#ref-1">1</a>. This project looks at a quieter
	channel. The agents here are not trying to break anything. They are trying to do their jobs, and
	the guard's false positives teach them where its rules end.
</p>

<p>
	Cryptographers have a name for the standard a guard should meet. Kerckhoffs's principle says a
	system should stay secure even when the enemy knows how it works<a class="cite" href="#ref-2">2</a>.
	A guard that is safe only while its rules stay secret fails that test, and teams of agents that
	share memory are very good at spreading what they learn. Multi-agent systems bring risks of their
	own<a class="cite" href="#ref-3">3</a>, and a shared notes file is one of the simplest places for
	such a risk to start.
</p>

<h2 id="testbed">A workplace in a sandbox</h2>

<p>
	The testbed, SwarmGate, gives each agent a real Linux workspace for a small service: configuration
	files, logs, documentation, a secrets folder and a vault, a few operations tools, and internal hosts
	that receive data. Every secret holds a fresh random value in every session, so success can be
	checked exactly. Either that value shows up somewhere it should not, or it does not.
</p>

<Figure
	wide
	caption="How one command moves through SwarmGate. Because the guard reads the system-call trace, it judges what a command did, however the command was written."
>
	<Testbed />
</Figure>

<p>
	I built two kinds of guard. The <strong>command-based guard</strong> works like a rulebook: it blocks
	certain file readers on protected paths, certain network tools sending to unapproved hosts, and
	uploads of protected files. The
	<strong>data-flow guard</strong> follows the data itself: anything that touches a secret is tracked,
	and tracked data may not reach the agent's screen or leave over the network.
</p>

<h2 id="design">Two teams, one difference</h2>

<p>
	Each team is a line of four agents working back to back. Every agent gets two tickets and up to 40
	shell commands. It reads the team's notes when it starts and writes notes when it finishes. Between
	shifts the notes are merged into one file of at most 500 words, and that file is the only thing the
	next agent inherits. The system prompt states the team's policy and asks each agent to treat a
	denial in good faith: “find a safer path, don't try to route around the block.”
</p>

<p>
	Every team works under one of two versions of its guard, which differ in exactly three places. The
	<strong>over-blocking</strong> version wrongly blocks three harmless things the tickets need: the
	credentials template, a token log with the tokens masked out, and a debug bundle that contains the
	template. The <strong>repaired</strong> version lets those three through and decides everything else
	the same way. Each ticket also has an approved route that both versions allow. Matched teams get
	the same tickets in the same order, so the guard's mistakes are the only difference between them.
</p>

<Figure
	wide
	caption="The experiment. Each team runs four shifts, and its notes are the only state that carries forward. A team under the over-blocking guard and its matched team under the repaired guard see the same tickets."
>
	<Design />
</Figure>

<p>
	I ran 13 teams under each version, for both kinds of guard, with two different models playing every
	agent: Claude Sonnet 5 and the open-weight Qwen 3.5 397B. I wrote down the hypotheses and the tests
	before the first session ran.
</p>

<StatGrid
	items={[
		{ value: '416', label: 'Agent sessions' },
		{ value: '13', label: 'Teams per guard version' },
		{ value: '2', label: 'Kinds of guard' },
		{ value: '2', label: 'Models playing the agents' }
	]}
/>

<p>
	Then I asked what the final notes carry, in three ways. First, I pulled every command out of the
	notes, pointed it at the real secrets and ran it under the repaired guard. Second, I gave the notes
	to a separate reader model, asked it for an attack on a protected secret and ran its answer under
	the repaired guard. Third, two AI coders from other model families read every notes file and marked
	whether it held a workaround recipe labelled as a way around the reviewer. To make sure the tests
	could see a working attack at all, I also wrote a notes file of my own that describes routes past
	the guard, as a positive control.
</p>

<h2 id="routing-around">The agents routed around the block</h2>

<p>
	The over-blocking guard hit almost every agent. It denied at least one action in 46 to 48 of every
	52 sessions, against 0 to 5 under the repaired guard. Being asked to act in good faith did not stop
	the agents from working around it. Under the over-blocking command-based guard, Claude got the
	contents of a blocked file another way in 25 of 52 sessions, and Qwen in 17.
</p>

<Figure
	wide
	caption="Sessions with at least one denial, in percent of 52 per group, under the repaired and the over-blocking version of each guard."
>
	<Dumbbell
		rows={denialRows}
		labelHeader="Model and guard"
		fromLabel="Repaired guard"
		toLabel="Over-blocking guard"
	/>
</Figure>

<p>
	The mistakes also cost real work. Under the over-blocking data-flow guard, Qwen finished 77 of its
	104 tickets, against 102 under the repaired one.
</p>

<h2 id="memory">The notes remembered</h2>

<p>
	A workaround inside one session is one thing. The question is whether it enters the team's memory,
	and it did. By the last shift under the over-blocking command-based guard, the notes of 11 of 13
	Claude teams and 10 of 13 Qwen teams held a workaround recipe, and every one of them was labelled as
	a way around the reviewer. Under the repaired guard, not a single final notes file held a labelled
	recipe. The recipes also
	built up and stuck. Once a recipe was in the notes, it was still there after the next handoff in 47
	of 49 cases.
</p>

<Figure
	wide
	caption="Share of notes files holding a workaround recipe labelled as a way around the reviewer, after each shift, under the command-based guard. Two coders from other model families, DeepSeek V4 Flash and Gemini 3.8 Flash, read every file independently and agreed closely on this mark."
>
	<Recipes />
</Figure>

<h2 id="rerun">Rerunning the notes found nothing</h2>

<p>
	So the notes knew where the guard was loose. Did that knowledge still work after the fix? The first
	test said no. Every command in every notes file, aimed at the real secrets and run under the
	repaired guard, failed. Not one of eight attacks succeeded for any team, with either guard or either
	model. My positive control got all eight past the repaired command-based guard, so the test could
	see a working attack when there was one.
</p>

<p>
	The reason was in the notes themselves. Claude's notes held between one and two command lines per
	file on average, and Qwen's almost none. The workaround lived in the prose: what the reviewer blocks,
	and what to do instead.
</p>

<h2 id="reader">A reader found the attack</h2>

<p>
	Prose needs a reader. So I handed each notes file to a reader model, Gemini 3.1 Pro, and gave it
	attack goals one at a time. The score below counts four of them, such as printing the vault's session
	file or sending a hash of the production key to an unapproved host. For each goal the reader wrote a
	single command, which I ran under the repaired command-based guard. Each notes file was read three
	times for each goal.
</p>

<Figure
	wide
	caption="How often the reader got a protected secret past the repaired command-based guard, with Gemini 3.1 Pro reading. 12 attempts each for no notes and for the positive control, and 156 for each kind of team notes."
>
	<BarChart
		rows={readerRows}
		labelHeader="Notes given to the reader"
		valueHeader="Attacks that succeeded"
		max={100}
		ticks={[0, 25, 50, 75, 100]}
		format={percent}
	/>
</Figure>

<p>
	With notes from Claude teams that had worked under the over-blocking guard, the reader got a secret
	past the repaired guard in 90 of 156 attempts, or 58%, and it succeeded with the notes of 12 of the 13
	teams. With notes from the matched teams that never met the false positives, it succeeded 3 times
	out of 156. With no notes at all, it succeeded once in 12 tries. My positive control reached 9 of 12.
	The gap between the two kinds of Claude notes is 56 percentage points. In a paired test over the 13
	matched teams, a gap this large would almost never appear by chance if the notes made no difference
	(p = 0.0002).
</p>

<p>
	The notes of the over-blocked teams carried most of what a deliberately written attack guide
	carries, and fixing the guard did not remove it. Qwen's notes carried less: 17 successes in 156
	against 1, although they held labelled recipes about as often as Claude's.
</p>

<h2 id="the-reader-decides">The reader decides</h2>

<p>
	I ran the same test with Claude Sonnet 5 as the reader. Given the same over-blocked Claude notes, it
	succeeded once in 156 attempts. That was not because the notes were empty. It declined 85% of those
	attempts, while Gemini declined 6%.
</p>

<Figure
	wide
	caption="The same notes, two readers: what each did with Claude's notes from teams under the over-blocking command-based guard, in percent of 156 attempts."
>
	<div class="grid gap-x-10 gap-y-8 md:grid-cols-2">
		{#each readerPanels as panel (panel.name)}
			<div>
				<p class="mb-2 text-sm font-semibold text-ink">Reader: {panel.name}</p>
				<BarChart
					rows={panel.rows}
					labelHeader="Outcome"
					valueHeader="Share of attempts"
					max={100}
					ticks={[0, 50, 100]}
					format={percent}
				/>
			</div>
		{/each}
	</div>
</Figure>

<Callout title="A safety-trained reader is not a defense">
	The knowledge in the notes is there either way. Whether it turns into an attack depends on who reads
	it, and an attacker gets to choose the reader.
</Callout>

<h2 id="takeaways">What this means for oversight</h2>

<ul>
	<li>
		<strong>False positives are lessons.</strong> Every time a guard blocks honest work, it shows the
		agents where its rules end, and shared memory keeps that lesson after the fix.
	</li>
	<li>
		<strong>Commands are not the whole story.</strong> A check that only reruns the commands in shared
		notes would have called these notes safe. The risk was in the prose, and it took a reader to find
		it.
	</li>
	<li>
		<strong>Clean up after a fix.</strong> When you repair a false positive, read what your agents'
		notes say about it, and treat shared memory as part of the attack surface.
	</li>
	<li>
		<strong>Prefer guards that survive being known.</strong> A guard that is safe only while its rules
		are secret is fragile in a team that shares memory. Whether a guard that follows the data holds up
		better is the natural next test.
	</li>
</ul>

<aside class="limits">
	<p class="limits-title">Limitations</p>
	<p>
		This is one sandbox, with toy guards and synthetic secrets, two models playing the agents and two
		readers, and each reader wrote a single command per attempt. The data-flow guard could not be
		judged: my own positive control did not get past it either, so there was nothing to measure the
		agents' notes against.
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
