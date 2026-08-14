<script>
	import SectionHeading from '../SectionHeading.svelte';
	import Icon from '../Icon.svelte';
	import Logo from '../Logo.svelte';
	import Tag from '../Tag.svelte';
	import { reveal } from '$lib/actions/reveal.js';
	import { experience } from '$data/experience.js';
</script>

<SectionHeading
	icon="briefcase"
	eyebrow="Experience"
	title="Where I've built things"
	lead="Six roles across AI research, applied LLM engineering and full-stack product work, from founding-engineer seats at early-stage ventures to teaching at university."
/>

<ol class="relative space-y-4">
	{#each experience as company, i (company.company)}
		<li use:reveal={{ delay: i * 50 }}>
			<article class="rounded-2xl border border-line bg-surface p-5 sm:p-7">
				<div class="flex items-start gap-4">
					<Logo src={company.logo} mark={company.mark} name={company.company} size={44} />

					<div class="min-w-0 flex-1">
						<div class="flex flex-wrap items-center gap-x-3 gap-y-1.5">
							{#if company.url && company.url !== '#'}
								<a
									href={company.url}
									target="_blank"
									rel="noopener noreferrer"
									class="group inline-flex items-center gap-1.5 text-[17px] font-semibold transition-colors hover:text-accent"
								>
									{company.company}
									<Icon
										name="arrowUpRight"
										size={13}
										class="text-ink-subtle opacity-0 transition-opacity group-hover:opacity-100"
									/>
								</a>
							{:else}
								<h3 class="text-[17px] font-semibold">{company.company}</h3>
							{/if}

							{#if company.current}
								<span
									class="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400"
								>
									<span class="size-1.5 rounded-full bg-emerald-500"></span>
									Current
								</span>
							{/if}
						</div>

						<p class="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-ink-subtle">
							<span class="inline-flex items-center gap-1.5">
								<Icon name="pin" size={13} />
								{company.location}
							</span>
							{#if company.note}
								<span aria-hidden="true">·</span>
								<span>{company.note}</span>
							{/if}
						</p>
					</div>
				</div>

				{#each company.roles as role (role.title)}
					<div class="mt-6 border-t border-line pt-5 first:mt-5">
						<div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
							<h4 class="text-[15px] font-semibold text-ink">{role.title}</h4>
							<span
								class="rounded-md bg-surface-2 px-2 py-0.5 font-mono text-[11.5px] text-ink-muted"
							>
								{role.period}
							</span>
						</div>

						<ul class="mt-4 space-y-3">
							{#each role.highlights as point}
								<li class="flex gap-3 text-[14.5px] leading-relaxed text-ink-muted">
									<span
										class="mt-2 size-1.5 shrink-0 rounded-full bg-accent/60"
										aria-hidden="true"
									></span>
									<span>{point}</span>
								</li>
							{/each}
						</ul>

						{#if role.projects?.length}
							<div class="mt-6">
								<p
									class="mb-3 font-mono text-[10.5px] tracking-[0.14em] text-ink-subtle uppercase"
								>
									Products shipped
								</p>
								<div class="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
									{#each role.projects as project (project.name)}
										{@const todo = project.summary.startsWith('TODO')}
										<div
											class="flex flex-col rounded-xl border border-line bg-surface-2/60 p-4
												{todo ? 'border-dashed' : ''}"
										>
											<div class="mb-2.5 flex items-center gap-2.5">
												<Logo
													src={project.logo}
													mark={project.mark}
													name={project.name}
													size={26}
													rounded="rounded-lg"
												/>
												{#if project.url}
													<a
														href={project.url}
														target="_blank"
														rel="noopener noreferrer"
														class="inline-flex items-center gap-1 text-[14px] font-semibold transition-colors hover:text-accent"
													>
														{project.name}
														<Icon name="arrowUpRight" size={12} class="text-ink-subtle" />
													</a>
												{:else}
													<span class="text-[14px] font-semibold">{project.name}</span>
												{/if}
											</div>

											<p
												class="flex-1 text-[13.5px] leading-relaxed {todo
													? 'text-ink-subtle italic'
													: 'text-ink-muted'}"
											>
												{todo ? 'Description pending.' : project.summary}
											</p>

											{#if project.stack?.length}
												<div class="mt-3 flex flex-wrap gap-1.5">
													{#each project.stack as tech}
														<Tag>{tech}</Tag>
													{/each}
												</div>
											{/if}
										</div>
									{/each}
								</div>
							</div>
						{/if}
					</div>
				{/each}
			</article>
		</li>
	{/each}
</ol>
