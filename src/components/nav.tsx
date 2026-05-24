"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
	{ id: "about", label: "about" },
	{ id: "projects", label: "projects" },
	{ id: "experience", label: "experience" },
	{ id: "into", label: "into" },
	{ id: "contact", label: "contact" },
];

export function Nav() {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 20);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<header
			className="fixed top-0 left-0 right-0 z-40"
			style={{
				transition: "background-color 400ms ease-out, box-shadow 400ms ease-out, backdrop-filter 400ms ease-out",
				backgroundColor: scrolled ? "rgba(8, 8, 10, 0.72)" : "rgba(8, 8, 10, 0)",
				backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
				WebkitBackdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
				boxShadow: scrolled
					? "0 1px 0 0 rgba(255, 255, 255, 0.04), 0 8px 24px -16px rgba(0, 0, 0, 0.6)"
					: "0 1px 0 0 rgba(255, 255, 255, 0), 0 8px 24px -16px rgba(0, 0, 0, 0)",
			}}
		>
			<nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
				<a
					href="#top"
					className="font-mono text-sm text-[color:var(--color-text-muted)] transition-colors hover:text-[color:var(--color-text)]"
				>
					bharat.
				</a>
				<ul className="hidden gap-7 md:flex">
					{SECTIONS.map((s) => (
						<li key={s.id}>
							<a
								href={`#${s.id}`}
								className="font-mono text-xs text-[color:var(--color-text-muted)] transition-colors hover:text-[color:var(--color-accent)]"
							>
								{s.label}
							</a>
						</li>
					))}
				</ul>
				<div className="flex items-center gap-5">
					<a
						href="/bharat-choudhary-resume.pdf"
						target="_blank"
						rel="noreferrer noopener"
						className="hidden font-mono text-xs text-[color:var(--color-text-muted)] transition-colors hover:text-[color:var(--color-text)] sm:inline-block"
					>
						resume ↗
					</a>
					<a
						href="#contact"
						className="font-mono text-xs text-[color:var(--color-accent)] transition-opacity hover:opacity-80"
					>
						say hi ↗
					</a>
				</div>
			</nav>
		</header>
	);
}
