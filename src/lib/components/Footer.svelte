<script>
	import Icon from './Icon.svelte';
	import { page } from '$app/state';
	import { site, socials } from '$data/site.js';
	import { tabs, setTab } from '$lib/tabs.svelte.js';

	const year = new Date().getFullYear();
	let copied = $state(false);

	async function copyEmail() {
		try {
			await navigator.clipboard.writeText(site.email);
			copied = true;
			setTimeout(() => (copied = false), 1800);
		} catch {
			window.location.href = `mailto:${site.email}`;
		}
	}
</script>

<footer id="contact" class="mt-24 scroll-mt-28 border-t border-line bg-bg-elevated">
	<div class="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
		<div class="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
			<div>
				<p class="font-mono text-[11px] tracking-[0.16em] text-accent uppercase">Contact</p>
				<h2 class="mt-3 text-2xl font-semibold sm:text-3xl">Let's build something.</h2>
				<p class="mt-3 max-w-md text-[15px] leading-relaxed text-ink-muted">
					I'm open to research collaboration, applied AI work and speaking. The fastest way to
					reach me is email.
				</p>

				<div class="mt-6 flex flex-wrap items-center gap-2">
					<a
						href="mailto:{site.email}"
						class="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-accent-contrast transition-colors hover:bg-accent-hover"
					>
						<Icon name="mail" size={16} />
						{site.email}
					</a>
					<button
						type="button"
						onclick={copyEmail}
						class="no-print inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-3 py-2.5 text-sm font-medium text-ink-muted transition-colors hover:border-line-strong hover:text-ink"
						aria-label="Copy email address"
					>
						<Icon name={copied ? 'check' : 'copy'} size={16} />
						{copied ? 'Copied' : 'Copy'}
					</button>
				</div>

				<p class="mt-5 flex items-center gap-2 text-sm text-ink-subtle">
					<Icon name="pin" size={15} />
					{site.location}
				</p>
			</div>

			<nav aria-label="Sections">
				<h3 class="text-[13px] font-semibold tracking-wide text-ink-subtle uppercase">Sections</h3>
				<ul class="mt-4 space-y-2.5">
					{#each tabs as tab (tab.id)}
						<li>
							<a
								href="/#{tab.id}"
								onclick={(e) => {
									if (page.url.pathname !== '/') return;
									e.preventDefault();
									setTab(tab.id);
								}}
								class="text-sm text-ink-muted transition-colors hover:text-accent"
							>
								{tab.label}
							</a>
						</li>
					{/each}
				</ul>
			</nav>

			<div>
				<h3 class="text-[13px] font-semibold tracking-wide text-ink-subtle uppercase">Elsewhere</h3>
				<ul class="mt-4 space-y-2.5">
					{#each socials as s (s.label)}
						<li>
							<a
								href={s.href}
								target="_blank"
								rel="noopener noreferrer"
								class="group inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-accent"
							>
								<Icon name={s.icon} size={15} />
								{s.label}
								<Icon
									name="arrowUpRight"
									size={12}
									class="opacity-0 transition-opacity group-hover:opacity-100"
								/>
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<div
			class="mt-14 flex flex-col gap-3 border-t border-line pt-6 text-[13px] text-ink-subtle sm:flex-row sm:items-center sm:justify-between"
		>
			<p>© {year} {site.name}. All rights reserved.</p>
			<p class="font-mono">Built with SvelteKit &amp; Tailwind CSS</p>
		</div>
	</div>
</footer>
