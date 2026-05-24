import { Section } from "./section";

// Orion — coordinates tuned for a 200x140 viewbox.
const STARS = [
	{ x: 60, y: 30, r: 1.6 },
	{ x: 95, y: 38, r: 2.2 },
	{ x: 140, y: 28, r: 1.4 },
	{ x: 80, y: 70, r: 2.1 },
	{ x: 100, y: 75, r: 2.4 },
	{ x: 120, y: 78, r: 2.1 },
	{ x: 102, y: 100, r: 1.7 },
	{ x: 100, y: 112, r: 1.5 },
	{ x: 104, y: 122, r: 1.3 },
	{ x: 50, y: 110, r: 2.0 },
	{ x: 160, y: 108, r: 1.5 },
];

const LINES = [
	[3, 4],
	[4, 5],
	[5, 6],
	[6, 7],
	[7, 8],
	[1, 3],
	[2, 5],
	[3, 9],
	[5, 10],
];

export function Into() {
	return (
		<Section id="into" label="aside · 04" heading="stuff i'm into">
			<div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-center md:gap-16">
				<div className="space-y-4 text-[color:var(--color-text-muted)] leading-[1.75]">
					<p>
						when i'm not at a keyboard you'll find me at the cricket ground,
						reading about{" "}
						<span className="text-[color:var(--color-text)]">outer space</span>,
						hanging out with{" "}
						<span className="text-[color:var(--color-text)]">cats</span>, or
						watching{" "}
						<span className="text-[color:var(--color-accent)]">Virat Kohli</span>{" "}
						bat (could be all four in a single day).
					</p>
					<p>
						i'm also into{" "}
						<span className="text-[color:var(--color-text)]">financial markets</span>{" "}
						- stocks, commodities, indices, crypto... still very much figuring it out.
					</p>
					<p>and i'm on x/twitter more than i should be.</p>
				</div>

				<figure className="flex flex-col items-center gap-3">
					<svg
						viewBox="0 0 200 150"
						className="h-44 w-auto"
						aria-label="orion constellation, roughly"
					>
						<g
							stroke="var(--color-accent)"
							strokeWidth="0.4"
							opacity="0.35"
							fill="none"
						>
							{LINES.map(([a, b], i) => (
								<line
									key={i}
									x1={STARS[a].x}
									y1={STARS[a].y}
									x2={STARS[b].x}
									y2={STARS[b].y}
								/>
							))}
						</g>
						<g fill="white">
							{STARS.map((s, i) => (
								<g key={i}>
									<circle cx={s.x} cy={s.y} r={s.r + 1.4} fill="var(--color-accent)" opacity="0.18" />
									<circle cx={s.x} cy={s.y} r={s.r} />
								</g>
							))}
						</g>
					</svg>
					<figcaption className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-text-faint)]">
						orion · roughly
					</figcaption>
				</figure>
			</div>
		</Section>
	);
}
