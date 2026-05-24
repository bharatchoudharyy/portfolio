import type { ReactNode } from "react";

type Props = {
	id: string;
	label: string;
	heading: string;
	children: ReactNode;
};

export function Section({ id, label, heading, children }: Props) {
	return (
		<section id={id} className="relative px-6 py-24 sm:py-32">
			<div className="mx-auto w-full max-w-3xl">
				<div className="mb-12 flex items-center gap-3">
					<span className="h-px w-8 bg-[color:var(--color-accent)]" />
					<span className="tag text-[color:var(--color-accent)]">{label}</span>
				</div>
				<h2 className="mb-10 font-sans text-[clamp(1.8rem,4vw,2.6rem)] font-medium leading-tight tracking-[-0.02em] text-[color:var(--color-text)]">
					{heading}
				</h2>
				{children}
			</div>
		</section>
	);
}
