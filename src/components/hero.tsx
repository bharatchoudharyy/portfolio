import { ArrowDown } from "lucide-react";
import { getLiveStatus } from "@/lib/github";
import { NowWidget } from "./now-widget";

export async function Hero() {
	const status = await getLiveStatus();

	return (
		<section
			id="top"
			className="relative flex min-h-[100dvh] flex-col justify-center px-6 pt-32 pb-24"
		>
			<div className="mx-auto w-full max-w-3xl">
				<p className="tag mb-6">bharat choudhary · full-stack dev</p>

				<h1 className="font-sans text-[clamp(2.4rem,7vw,4.2rem)] font-medium leading-[1.05] tracking-[-0.025em] text-[color:var(--color-text)]">
					hi, i'm bharat.
				</h1>

				<div className="mt-8 max-w-2xl space-y-4 text-[clamp(1.05rem,2.2vw,1.25rem)] leading-[1.6] text-[color:var(--color-text-muted)]">
					<p>
						full-stack dev. i build software end-to-end — UI/UX, backend, frontend, the
						whole stack.
					</p>
					<p>
						i ship fast and i sweat the details. weekends i build my own things or
						look at the sky.
					</p>
				</div>

				<div className="mt-12">
					<NowWidget status={status} />
				</div>

				<a
					href="#about"
					className="mt-16 inline-flex items-center gap-2 font-mono text-xs text-[color:var(--color-text-faint)] transition-colors hover:text-[color:var(--color-accent)]"
				>
					<span>scroll for the rest</span>
					<ArrowDown
						size={12}
						className="animate-bounce"
						style={{ animationDuration: "2s" }}
					/>
				</a>
			</div>
		</section>
	);
}
