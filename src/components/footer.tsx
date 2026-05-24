export function Footer() {
	return (
		<footer className="border-t border-[color:var(--color-border)] py-10">
			<div className="mx-auto flex max-w-5xl flex-col items-start gap-3 px-6 sm:flex-row sm:items-center sm:justify-between">
				<p className="font-mono text-xs text-[color:var(--color-text-faint)]">
					© bharat choudhary · hand-built, line by line
				</p>
				<p className="font-mono text-xs text-[color:var(--color-text-faint)]">
					⌥ + ↑ to scroll up · {new Date().getFullYear()}
				</p>
			</div>
		</footer>
	);
}
