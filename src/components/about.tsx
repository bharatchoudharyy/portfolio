import { Section } from "./section";

export function About() {
	return (
		<Section id="about" label="about · 01" heading="who's writing this">
			<div className="space-y-5 text-[clamp(1rem,2vw,1.15rem)] leading-[1.75] text-[color:var(--color-text-muted)]">
				<p>
					Bharat Choudhary, 22, born and raised in Mumbai, India.
				</p>
				<p>
					B.E in Information Technology from Mumbai University - 8.8 GPA if that matters.
				</p>
				<p>
					full-stack dev, currently at{" "}
					<a href="#experience" className="link text-[color:var(--color-text)]">
						Oren
					</a>{" "}
					building ESG software. UI/UX, backend, frontend, ops - everything.
				</p>
				<p>
					i don't beat around the bush. i find things that suck and i make them
					better, even when nobody asked. i'll spend an extra day polishing
					something rather than ship it half-baked.
				</p>
			</div>
		</Section>
	);
}
