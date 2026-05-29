import type { LiveStatus } from "@/lib/github";
import { ExternalLink, Lock } from "lucide-react";
import { RelativeTime } from "./relative-time";

export function NowWidget({ status }: { status: LiveStatus }) {
	return (
		<div className="group relative max-w-xl overflow-hidden rounded-[var(--radius-card)] border border-[color:var(--color-border-strong)] bg-[color:var(--color-surface)]/80 backdrop-blur-sm">
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 rounded-[var(--radius-card)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
				style={{
					boxShadow:
						"inset 0 0 0 1px var(--color-accent), 0 0 40px -10px var(--color-accent-glow)",
				}}
			/>

			<div className="relative px-5 py-4">
				<Header username={status.username} />

				{status.mode === "live" ? (
					<LiveView status={status} />
				) : (
					<p className="font-mono text-[13px] text-[color:var(--color-text-muted)]">
						couldn't reach github right now — try refreshing in a sec.
					</p>
				)}
			</div>
		</div>
	);
}

function Header({ username }: { username: string }) {
	return (
		<div className="mb-4 flex items-center justify-between">
			<div className="flex items-center gap-2">
				<span className="relative flex h-2 w-2">
					<span
						className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--color-accent)] opacity-60"
						style={{ animationDuration: "1.8s" }}
					/>
					<span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--color-accent)]" />
				</span>
				<span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-accent)]">
					live · from github
				</span>
			</div>
			<a
				href={`https://github.com/${username}`}
				target="_blank"
				rel="noreferrer noopener"
				className="font-mono text-[11px] text-[color:var(--color-text-muted)] transition-colors hover:text-[color:var(--color-text)]"
			>
				@{username}
			</a>
		</div>
	);
}

function LiveView({ status }: { status: LiveStatus }) {
	const push = status.lastPush;
	return (
		<div className="space-y-4">
			<div className="grid grid-cols-3 gap-2 sm:gap-4">
				<Stat
					value={status.totalThisYear.toLocaleString()}
					label="contributions"
					sub="this year · incl. private"
				/>
				<Stat
					value={status.prsThisYear.toLocaleString()}
					label="pull requests"
					sub="opened this year"
				/>
				<Stat
					value={status.reposContributedTo.toLocaleString()}
					label="repos"
					sub="contributed to"
				/>
			</div>

			<div className="space-y-2 border-t border-[color:var(--color-border)] pt-3 font-mono text-[13px]">
				<Row
					label="last commit"
					value={
						push ? (
							push.isPrivate ? (
								<span className="inline-flex items-center gap-1.5">
									<span className="text-[color:var(--color-text)]">
										<RelativeTime iso={push.when} initial={push.relative} />
									</span>
									<span className="text-[color:var(--color-text-faint)]">·</span>
									<span className="inline-flex items-center gap-1 text-[color:var(--color-text-muted)]">
										<Lock
											size={11}
											className="text-[color:var(--color-text-faint)]"
											aria-label="private repo"
										/>
										{push.repo}
									</span>
								</span>
							) : (
								<a
									href={push.commitUrl ?? push.url}
									target="_blank"
									rel="noreferrer noopener"
									className="link inline-flex items-center gap-1.5"
								>
									<span className="text-[color:var(--color-text)]">
										<RelativeTime iso={push.when} initial={push.relative} />
									</span>
									<span className="text-[color:var(--color-text-faint)]">·</span>
									<span className="text-[color:var(--color-text-muted)]">{push.repo}</span>
									<ExternalLink size={11} className="opacity-50" />
								</a>
							)
						) : (
							<span className="text-[color:var(--color-text-faint)]">—</span>
						)
					}
				/>

				{push?.message && (
					<p className="truncate font-mono text-[12px] italic text-[color:var(--color-text-muted)]">
						“{push.message}”
					</p>
				)}
			</div>
		</div>
	);
}

function Stat({
	value,
	label,
	sub,
}: {
	value: string;
	label: string;
	sub: string;
}) {
	return (
		<div>
			<div className="font-sans text-2xl font-medium leading-none text-[color:var(--color-text)]">
				{value}
			</div>
			<div className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-text-muted)]">
				{label}
			</div>
			<div className="mt-0.5 font-mono text-[11px] text-[color:var(--color-text-muted)] opacity-70">
				{sub}
			</div>
		</div>
	);
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
	return (
		<div className="flex items-center gap-3">
			<span className="min-w-[100px] text-[color:var(--color-text-faint)]">{label}</span>
			<span className="text-[color:var(--color-text-faint)]">→</span>
			{value}
		</div>
	);
}
