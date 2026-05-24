// Seeded PRNG so SSR + client render the same star positions.

type Star = {
	x: number;
	y: number;
	size: number;
	opacity: number;
	twinkle: boolean;
	delay: number;
};

function mulberry32(seed: number) {
	let a = seed >>> 0;
	return () => {
		a = (a + 0x6d2b79f5) | 0;
		let t = a;
		t = Math.imul(t ^ (t >>> 15), t | 1);
		t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

function generateStars(count: number, seed: number): Star[] {
	const rand = mulberry32(seed);
	const stars: Star[] = [];
	for (let i = 0; i < count; i++) {
		const r = rand();
		stars.push({
			x: rand() * 100,
			y: rand() * 100,
			size: r < 0.88 ? 0.55 + rand() * 0.55 : 1.1 + rand() * 1.0,
			opacity: 0.14 + rand() * 0.4,
			twinkle: rand() < 0.14,
			delay: rand() * 6,
		});
	}
	return stars;
}

export function Starfield() {
	const stars = generateStars(220, 42);

	return (
		<div
			aria-hidden
			className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
			style={{
				background:
					"radial-gradient(ellipse 90% 60% at 50% 0%, rgba(163, 230, 53, 0.05), transparent 60%), radial-gradient(ellipse 70% 50% at 50% 100%, rgba(34, 211, 238, 0.03), transparent 70%), #08080a",
			}}
		>
			<svg
				width="100%"
				height="100%"
				className="absolute inset-0"
				preserveAspectRatio="xMidYMid slice"
			>
				{stars.map((s, i) => (
					<circle
						key={i}
						cx={`${s.x}%`}
						cy={`${s.y}%`}
						r={s.size}
						fill="white"
						style={
							s.twinkle
								? {
										opacity: s.opacity,
										animation: `twinkle ${3 + s.delay}s ${s.delay}s ease-in-out infinite`,
										// @ts-expect-error – CSS custom properties drive @keyframes twinkle bounds
										"--twinkle-min": String(s.opacity * 0.25),
										"--twinkle-max": String(Math.min(1, s.opacity * 1.2)),
								  }
								: { opacity: s.opacity }
						}
					/>
				))}
			</svg>

			<div
				className="absolute inset-0"
				style={{
					background:
						"radial-gradient(ellipse 100% 70% at 50% 50%, transparent 40%, rgba(8, 8, 10, 0.6) 100%)",
				}}
			/>
		</div>
	);
}
