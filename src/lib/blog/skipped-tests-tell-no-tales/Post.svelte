<script>
	import Figure from '$components/blog/Figure.svelte';
	import BarChart from '$components/blog/BarChart.svelte';
	import Callout from '$components/blog/Callout.svelte';
	import StatGrid from '$components/blog/StatGrid.svelte';
	import References from '$components/blog/References.svelte';
	import Views from './Views.svelte';
	import Shift from './Shift.svelte';
	import Flip from './Flip.svelte';
	import { price, growth, industrial, allFailures, newFailures, censoringHours, recall } from './data.js';

	// Every number below is taken from the study's results.

	const references = [
		{
			authors: 'Runxiang Cheng, Shuai Wang, Reyhaneh Jabbarvand and Darko Marinov',
			year: '2024',
			title: 'Revisiting Test-Case Prioritization on Long-Running Test Suites',
			venue: 'ACM SIGSOFT International Symposium on Software Testing and Analysis (ISSTA), 615–627',
			href: 'https://2024.issta.org/details/issta-2024-papers/50/Revisiting-Test-Case-Prioritization-on-Long-Running-Test-Suites'
		},
		{
			authors: 'Helge Spieker, Arnaud Gotlieb, Dusica Marijan and Morten Mossige',
			year: '2017',
			title: 'Reinforcement Learning for Automatic Test Case Prioritization and Selection in Continuous Integration',
			venue: 'ACM SIGSOFT International Symposium on Software Testing and Analysis (ISSTA)',
			href: 'https://doi.org/10.1145/3092703.3092709'
		},
		{
			authors: 'Mateusz Machalica, Alex Samylkin, Meredith Porth and Satish Chandra',
			year: '2019',
			title: 'Predictive Test Selection',
			venue: 'International Conference on Software Engineering: Software Engineering in Practice (ICSE-SEIP)',
			href: 'https://arxiv.org/abs/1810.05286'
		}
	];

	const percent = (/** @type {number} */ value) => `${value.toFixed(1)}%`;
	const hours = (/** @type {number} */ value) => `${value.toLocaleString('en-US')} h`;
	const times = (/** @type {number} */ value) => `${value.toFixed(2)}×`;
	const wholePercent = (/** @type {number} */ value) => `${value}%`;
</script>

<p>
	Open a pull request on a large project and its CI pipeline will usually run the entire test suite,
	whether you rewrote a module or fixed a typo in a comment. On the projects in this study, one full run
	takes anywhere from half an hour to 40 hours of test time. Multiply that by every change, every day, and
	you get slow feedback, large cloud bills and a real energy footprint.
</p>

<p>
	The obvious fix is <strong>test selection</strong>: run only the tests that matter for this change and
	skip the rest. It is also the subject of one of the industry challenges posed for ICSE 2027,
	<em>Enhancing CI/CD Pipeline Cost-Effectiveness through Commit-Aware Test Selection</em>. The
	challenge asks for selection that is safe enough for production, stays accurate as a code base keeps
	changing, and saves more than it costs to run. It also poses an open question: can reading what a change
	actually does, rather than only where it sits, make selection both accurate and safe?
</p>

<p>
	While working on that challenge, I ran into a problem one step earlier. Before we can say which selector
	is best, we have to measure them fairly, and the usual way of measuring them quietly lets a selector see
	things it could never see in production. This post is about what happens when you take that away.
</p>

<aside class="my-8 rounded-2xl border border-line bg-surface p-5 sm:p-6">
	<p class="text-[13px] font-medium text-ink-muted">Based on the paper</p>
	<p class="mt-1.5 inline-flex items-center gap-1.5 text-sm text-ink">
		<span aria-hidden="true" class="size-[7px] shrink-0 rounded-full border-[1.5px] border-accent"></span>
		Under review at the ICSE 2027 Industry Challenge Track
	</p>
	<p class="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm">
		<a
			href="https://github.com/TheDeadcoder/FaithfulCut"
			target="_blank"
			rel="noopener noreferrer"
			class="font-medium text-accent underline decoration-accent/35 underline-offset-4 transition-colors hover:decoration-accent"
			>Code: FaithfulCut</a
		>
	</p>
</aside>

<h2 id="how-selectors-are-graded">How test selectors are graded</h2>

<p>
	Test selectors are evaluated by replay. You take a project's recorded CI history, walk through it build
	by build, let the selector choose which tests to run, and check whether it would have caught the
	failures that really happened.
</p>

<p>
	A large recent benchmark of this kind is LRTS, a dataset of long-running test suites from ten
	large open-source projects<a class="cite" href="#ref-1">1</a>. Its authors compared many ways of
	ordering tests and found that a simple one wins: “prioritizing faster tests that recently failed
	performs the best, outperforming the sophisticated techniques.” In this post I call that order
	<strong>recent failures first</strong>.
</p>

<p>
	There is a catch. LRTS studies <em>prioritization</em>: every test still runs, just in a smarter order,
	so every result is legitimately known afterwards. A selector <em>skips</em> tests, and a skipped test
	produces no result. In production, a selector never learns that a test it skipped would have failed.
	Statisticians call this censoring. A replay that keeps feeding the selector every result lets it peek.
	There is a second, smaller leak about time: a replay may also show results from builds that had started
	but not yet finished.
</p>

<Figure
	wide
	caption="What three kinds of replay let a selector see when it picks tests for build 9 (an illustration). Hover over a cell to see why it is visible or hidden."
>
	<Views />
</Figure>

<p>
	Recent failures first depends on exactly the information that censoring removes. If it skips a test
	that then starts failing, it never sees the failure, so it keeps skipping the test. The full replay
	tells it anyway.
</p>

<h2 id="replaying-honestly">Replaying honestly</h2>

<p>
	So I built a replay that only shows a selector what it could have known: results from finished builds,
	and only for the tests it ran. I call it the <strong>faithful</strong> replay and compared it with the
	usual full one, and with one that hides only the unfinished builds, so that the two leaks can be told
	apart.
</p>

<StatGrid
	items={[
		{ value: '10', label: 'Open-source projects (Kafka, Hadoop, Hive, …)' },
		{ value: '21,255', label: 'Builds in the LRTS dataset' },
		{ value: '13,389', label: 'Newer builds from the same projects' },
		{ value: '3', label: 'Industrial CI logs, from ABB and Google' }
	]}
/>

<p>
	The measure is simple. A build with a real failure <strong>escapes</strong> when the selection ran none
	of its failing tests; failures of tests already known to be flaky do not count. To compare selectors
	fairly, every comparison runs them at the same budget, 20% of the suite's test time.
</p>

<p>
	I also wanted the results to be hard to argue with, so I wrote down every hypothesis and analysis before
	evaluating any held-out build, in two stages. Everything was tuned on older builds and then tested twice:
	on the last stretch of the LRTS history, and on the newer builds that came after it.
</p>

<h2 id="history-pays">History pays, the change does not</h2>

<Figure
	wide
	caption="Share of failing builds that escape at 20% of test time, under the full replay and the faithful one, on the newest builds (nine projects; DANTE runs on eight)."
>
	<Shift
		rows={price}
		labelHeader="Order"
		fromLabel="Full replay"
		toLabel="Faithful replay"
		max={50}
		ticks={[0, 10, 20, 30, 40, 50]}
		format={percent}
		tickFormat={wholePercent}
	/>
</Figure>

<p>
	Orders that rank tests by their failure history pay heavily. Recent failures first lets 10.2% of failing
	builds escape under the full replay and 30.5% under the faithful one, three times as many. DANTE, a
	recent data-driven method evaluated on the same dataset that weighs failure history together with the
	change, goes from 12.0% to 28.0%.
</p>

<p>
	Orders that read the change itself barely notice. The change match ranks tests by how closely their
	source text matches the change's diff, with the text-retrieval scoring known as TF-IDF. It escapes 39.9%
	and 40.4% under the two replays. Its cost-aware version pays a little, because even a test's run time is
	history: when a test is skipped, its last known duration goes stale.
</p>

<p>
	The leak about time turned out to be small: hiding only the unfinished builds changes every escape rate in
	these figures by less than 5%. Almost the entire price comes from censoring.
</p>

<Figure
	wide
	caption="The price of censoring, faithful escape divided by full escape, on the held-out end of the LRTS history and on the newer builds after it."
>
	<Shift
		rows={growth}
		labelHeader="Order"
		fromLabel="Held-out builds"
		toLabel="Newest builds"
		min={0.5}
		max={3.5}
		ticks={[1, 2, 3]}
		format={times}
		tickFormat={(value) => `${value}×`}
		reference={{ value: 1, label: '1× = no price' }}
	/>
</Figure>

<p>
	The price also grows. On the held-out end of the LRTS history, recent failures first missed a third
	more failing builds under the faithful replay (1.32×). On the newer builds it missed nearly three times
	as many (2.98×). One plausible reason: the further a selector runs on its own choices, the staler its
	picture of the tests it keeps skipping. Selectors that read the change stay near 1×.
</p>

<h2 id="industrial-logs">Industrial logs say the same</h2>

<p>
	Open-source projects might not behave like company pipelines, so I also replayed three industrial CI
	logs that are widely used in research: two from ABB Robotics and one from Google, in the form released
	with the Retecs study<a class="cite" href="#ref-2">2</a>. The logs ship each test's earlier results as a
	precomputed column, and the Retecs tooling hands that column to the selector as it is. An evaluation
	built on that tooling therefore runs with full history, including the results of tests the selector
	skipped.
</p>

<Figure
	caption="Share of failing test verdicts that recent failures first misses at 20% of each cycle's test time, with full and with faithful history."
>
	<Shift
		rows={industrial}
		labelHeader="Log"
		fromLabel="Full history"
		toLabel="Faithful history"
		format={percent}
		tickFormat={wholePercent}
	/>
</Figure>

<p>
	On Google's log, faithful history raises the share of missed failing verdicts from 17.5% to 21.3%. On
	the two ABB logs a 20% budget misses most failures either way, which leaves little room for a
	difference. Across the three logs, the misses still rise by 3.9% (95% interval 1.2% to 7.9%).
</p>

<h2 id="the-ranking-flips">The ranking can flip</h2>

<p>
	A price paid by every selector alike would be bad news, but it would not change which selector to pick.
	The trouble is that selectors pay very different prices, so the ranking itself can change.
</p>

<p>
	Industry often learns selection from data. Facebook's predictive test selection, for example, trains a
	model on historical test outcomes and halved the cost of testing changes in production<a
		class="cite"
		href="#ref-3">3</a
	>. I built a learned selector in that spirit: a gradient-boosted model that combines change relevance,
	failure history, staleness and run time, and keeps retraining on the outcomes it observes.
</p>

<Figure
	wide
	caption="Four orders ranked by escape at 20% of test time on the newest builds of the five projects with the most of them. Hover over an order to follow it."
>
	<Flip />
</Figure>

<p>
	Judged by the full replay, the learned model comes third, well behind recent failures first. Judged
	faithfully, it comes first: it lets 17.2% of failing builds escape, while recent failures first falls to
	third with 28.3%. A team choosing from the usual replay would pick recent failures first, which in
	production does worse than both the learned model and the hybrid.
</p>

<Callout title="The replay is part of the result">
	A selector's score depends on what the replay lets it see. Under a full replay, the orders that lean
	hardest on history look best, and they are exactly the ones that suffer most once history is censored.
</Callout>

<h2 id="safe-and-self-correcting">Making selection safe and self-correcting</h2>

<p>
	Knowing the problem, can we still run selection safely? The challenge asks for exactly this: bound the
	risk of skipping a failing test, and stay accurate as the code base changes without constant
	recalibration. The design I tested has two parts.
</p>

<ul>
	<li>
		<strong>Random audits.</strong> On a random 10% of builds, the full suite runs anyway. Audits show
		what the selection would have missed, without the bias of only seeing what it chose to run.
	</li>
	<li>
		<strong>An online controller.</strong> After every audited failure it adjusts the budget: up when
		the selection missed it, down when it caught it. Over time this steers the escape rate toward a
		target, here 10%. From what it can see, the failures it catches and the misses the audits reveal, a
		deployment can also compute a statistical certificate: an interval for its own escape rate.
	</li>
</ul>

<StatGrid
	items={[
		{ value: '0.8 vs 4.0', label: 'Points off a 10% target: online vs a budget tuned once' },
		{ value: '0 of 180', label: 'Runs where the certificate missed the true rate' },
		{ value: '28–63%', label: 'Test time saved after audits and selector time' },
		{ value: '14.8 pts', label: 'Fewer escapes when the full suite runs every 8th build' }
	]}
/>

<p>
	On the held-out builds, the online controller stayed on average 0.8 points from its 10% target, while a
	budget tuned once on older builds drifted 4.0 points away. On the newer builds it was 2.0 points off,
	against 4.9 for the tuned budget. The certificate never missed: in 30 seeds on each of six projects,
	the interval contained the true escape rate every time. And even after paying for the audits and for its
	own computation, the controller saved 28% to 63% of test time on Hive, James and Kafka (28% to 66% on
	the newer builds).
</p>

<p>
	Scheduled full runs, the classic “we run everything nightly” fallback, also help. Running the full suite
	on every 8th build gave the history order enough fresh results to cut its escapes by 14.8 points at the
	same selection budget. In my design, though, only the random audits feed the certificate.
</p>

<h2 id="worth-it">Is it worth it?</h2>

<p>
	The challenge also asks whether selection pays for itself, in money and in energy. On the newer builds,
	recent failures first under the controller saves about 8,400 test-hours per 1,000 builds, after audits
	and selector time. At GitHub's price for hosted Linux runners, that is roughly $3,000 to $12,000 per
	1,000 builds, depending on machine size.
</p>

<p>
	Censoring takes a large bite out of that. To protect as well as it appears to under a full replay, recent
	failures first needs about 3,900 more test-hours per 1,000 builds, almost half as much as the controller
	saves. Orders that read the change need far less.
</p>

<Figure
	caption="Extra test-hours per 1,000 builds needed to match the protection each order shows under a full replay at 20% of test time, on the newer builds (nine projects)."
>
	<BarChart
		rows={censoringHours}
		labelHeader="Order"
		valueHeader="Extra test-hours per 1,000 builds"
		max={4000}
		ticks={[0, 1000, 2000, 3000, 4000]}
		format={hours}
		tickFormat={(value) => (value ? `${value / 1000}k` : '0')}
	/>
</Figure>

<h2 id="reading-the-change">What reading the change buys</h2>

<p>
	If history pays for censoring and the change does not, why not simply read the change? Because the
	answer depends on which failures you promise to catch.
</p>

<Figure
	wide
	caption="Share of test time the online controller needs to hold a 10% escape target, when it is certified on all failures and when it is certified on new failures only (newer builds, five projects). The cheapest order in each case is highlighted."
>
	<div class="grid gap-8 md:grid-cols-2">
		<div>
			<p class="mb-3 text-sm font-semibold text-ink">Certified on all failures</p>
			<BarChart rows={allFailures} labelHeader="Order" valueHeader="Share of test time" max={70} ticks={[0, 35, 70]} format={percent} tickFormat={(value) => `${value}%`} />
		</div>
		<div>
			<p class="mb-3 text-sm font-semibold text-ink">Certified on new failures</p>
			<BarChart rows={newFailures} labelHeader="Order" valueHeader="Share of test time" max={70} ticks={[0, 35, 70]} format={percent} tickFormat={(value) => `${value}%`} />
		</div>
	</div>
</Figure>

<p>
	Certified on all failures, recent failures first is the cheapest way to hold the target. Many failing
	builds are repeats of something that already broke, and history is very good at catching repeats. But
	the failures that matter most are often new ones, tests the pipeline has never seen fail. Certified on
	those, history becomes the most expensive order (50.0% of test time), and the hybrid that fuses history
	with the change needs about 10 points less.
</p>

<p>
	Reading the change also beats the structural footprint. Ordering tests by how far their module sits
	from the changed modules in the build's dependency graph needed 7.7 points more test time than the
	change match for the same risk.
</p>

<p>
	And what about LLMs? On 232 held-out builds where a test failed for the first time, I asked Gemini 3.5
	Flash-Lite to read each change and rank the tests by risk.
</p>

<Figure
	caption="Builds with a first-time failure whose failing test lands in the first 5% of predicted test time (232 held-out builds). The LLM's lead over the change match is within noise."
>
	<BarChart rows={recall} labelHeader="Order" valueHeader="Share of builds" max={100} ticks={[0, 25, 50, 75, 100]} format={percent} tickFormat={(value) => `${value}%`} />
</Figure>

<p>
	The LLM put the first-time failure within the first 5% of test time in 84.1% of these builds, against
	81.9% for the change match. That difference of 2.2 points is too small to rule out chance (the 95%
	interval runs from −0.5 to +5.0 points). Both read the change, and both are far ahead of recent failures
	first, which finds only 33.6%: a test failing for the first time has no failure history to go on. Most of the
	value comes from reading the change at all, and a cheap text match already captures most of it.
</p>

<h2 id="takeaways">Takeaways</h2>

<ol>
	<li>
		<strong>Evaluate selectors faithfully.</strong> Hide the results of tests a selector skipped and of
		builds that had not finished. Without that, history-based selectors look far better than they are, and
		the ranking between selectors can flip.
	</li>
	<li>
		<strong>Audit at random and let a controller steer.</strong> A small random sample of full runs keeps
		the risk measurable, and an online controller holds the target as the project changes.
	</li>
	<li>
		<strong>Decide which failures you are protecting against.</strong> If repeats are fine to catch late
		and new failures are not, read the change.
	</li>
	<li>
		<strong>Start cheap.</strong> Plain text matching between the change and the tests gets most of the
		benefit of reading the change. An LLM adds a little at most.
	</li>
</ol>

<aside class="limits">
	<p class="limits-title">Limitations</p>
	<p>
		These are replays of recorded builds, not live deployments. The projects are ten open-source projects
		and three industrial logs, so other pipelines may behave differently. Which failures count as real
		depends on how known flaky tests are filtered out. The learned model is one reasonable design, not the
		best possible one, and the LLM result covers one model at one budget.
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
