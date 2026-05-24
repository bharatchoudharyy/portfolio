import { Section } from "./section";

const BULLETS = [
	{
		k: "built a standalone CMS solo",
		v: "end-to-end. techstack, schema, backend, frontend, deploy. got the requirements once, next thing was a working product. still being used by the team for company's website.",
	},
	{
		k: "shipped on the main product + admin panel",
		v: "across the OSS monorepo (next.js, tRPC, prisma) and OSS-ADMIN. features that went out to real users.",
	},
	{
		k: "built the chatbot + n8n automation layer",
		v: "an AI-driven chatbot for the platform, plus n8n workflows for the glue between services.",
	},
	{
		k: "ran the notifications + email stack",
		v: "templates, triggers, queueing. when something needs to send, it sends.",
	},
	{
		k: "built the SEO dashboard + helped with SEO",
		v: "google analytics + microsoft clarity integration, a dashboard from scratch, and the actual SEO work alongside it.",
	},
	{
		k: "fixed things i noticed were off",
		v: "broken UX, slow queries, weird states. if something looked wrong, i fixed it without waiting for a ticket.",
	},
];

export function Experience() {
	return (
		<Section id="experience" label="experience · 03" heading="what i've been doing at Oren">
			<div className="mb-8 flex items-center gap-3 font-mono text-[12px] text-[color:var(--color-text-faint)]">
				<span className="text-[color:var(--color-text-muted)]">full-stack developer</span>
				<span>·</span>
				<a
					href="https://orennow.com"
					target="_blank"
					rel="noreferrer noopener"
					className="link"
				>
					Oren
				</a>
				<span>·</span>
				<span>oct 2025 — now</span>
			</div>

			<p className="mb-10 leading-[1.7] text-[color:var(--color-text-muted)]">
				i joined Oren in october 2025. been shipping end-to-end across multiple
				repos since. here's what i've been working on:
			</p>

			<ul className="space-y-6">
				{BULLETS.map((b) => (
					<li key={b.k} className="group relative pl-6">
						<span
							aria-hidden
							className="absolute left-0 top-2.5 h-1.5 w-1.5 rounded-full bg-[color:var(--color-accent)] opacity-70 transition-all duration-300 group-hover:opacity-100 group-hover:shadow-[0_0_12px_var(--color-accent-glow)]"
						/>
						<p className="text-[color:var(--color-text)]">{b.k}</p>
						<p className="mt-1 leading-[1.7] text-[color:var(--color-text-muted)]">{b.v}</p>
					</li>
				))}
			</ul>

			<p className="mt-12 max-w-prose font-mono text-[12px] leading-[1.7] text-[color:var(--color-text-muted)]">
				happy to walk through any of this in detail if you want.
			</p>
		</Section>
	);
}
