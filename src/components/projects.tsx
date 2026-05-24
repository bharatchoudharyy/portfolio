import { ExternalLink } from "lucide-react";
import { Section } from "./section";
import { GithubIcon } from "./icons";

type Project = {
	name: string;
	tagline: string;
	description: string;
	tech: string[];
	live?: { label: string; url: string };
	repo?: { label: string; url: string };
	highlight?: string;
};

const PROJECTS: Project[] = [
	{
		name: "DevPod",
		tagline: "cloud dev environments in one click",
		description:
			"browser-based VS Code, docker-isolated workspaces. pick a template (python, node, MERN, java), get a full IDE in seconds. share workspaces via link — anyone can clone with one click.",
		tech: ["react", "vite", "express", "mongodb", "docker", "nginx", "digitalocean"],
		live: { label: "mydevpod.me", url: "https://mydevpod.me" },
		repo: {
			label: "bharatchoudharyy/DevPod",
			url: "https://github.com/bharatchoudharyy/DevPod",
		},
		highlight: "wildcard SSL · HTTPS subdomain per workspace · GitHub OAuth",
	},
	{
		name: "KYCChain",
		tagline: "decentralized KYC on ethereum",
		description:
			"prove your identity once, verify anywhere. personal data never touches the blockchain — only hashes do. raw data gets deleted after a verifier reviews it. any dApp can call isVerified(wallet) for a yes/no.",
		tech: ["solidity", "hardhat", "next.js 16", "ethers v6", "supabase", "sepolia"],
		live: { label: "kyc-chain.vercel.app", url: "https://kyc-chain.vercel.app" },
		repo: {
			label: "bharatchoudharyy/KYCChain",
			url: "https://github.com/bharatchoudharyy/KYCChain",
		},
		highlight: "30 passing contract tests · deployed on sepolia testnet",
	},
];

export function Projects() {
	return (
		<Section
			id="projects"
			label="projects · 02"
			heading="things i've built outside the day job"
		>
			<div className="space-y-8">
				{PROJECTS.map((p) => (
					<ProjectCard key={p.name} project={p} />
				))}
			</div>
		</Section>
	);
}

function ProjectCard({ project }: { project: Project }) {
	return (
		<article
			className="group relative overflow-hidden rounded-[var(--radius-card)] border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-[color:var(--color-border-strong)] hover:bg-[color:var(--color-surface)]/80 sm:p-7"
		>
			<div
				aria-hidden
				className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[140%] -translate-x-1/2 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
				style={{
					background:
						"radial-gradient(ellipse 50% 50% at 50% 50%, rgba(163, 230, 53, 0.08), transparent 70%)",
				}}
			/>

			<div className="relative">
				<div className="flex flex-wrap items-baseline justify-between gap-3">
					<div>
						<h3 className="font-sans text-2xl font-medium tracking-[-0.01em] text-[color:var(--color-text)]">
							{project.name}
						</h3>
						<p className="mt-1 font-mono text-[12px] text-[color:var(--color-text-faint)]">
							{project.tagline}
						</p>
					</div>
					<span className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--color-accent)]/40 bg-[color:var(--color-accent-soft)] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--color-accent)]">
						<span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-accent)]" />
						live
					</span>
				</div>

				<p className="mt-5 leading-[1.7] text-[color:var(--color-text-muted)]">
					{project.description}
				</p>

				{project.highlight && (
					<p className="mt-4 font-mono text-[12px] text-[color:var(--color-text-faint)]">
						▸ {project.highlight}
					</p>
				)}

				<div className="mt-6 flex flex-wrap gap-1.5">
					{project.tech.map((t) => (
						<span
							key={t}
							className="rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-surface-elev)] px-2 py-1 font-mono text-[10px] text-[color:var(--color-text-muted)]"
						>
							{t}
						</span>
					))}
				</div>

				<div className="mt-6 flex flex-wrap gap-5 border-t border-[color:var(--color-border)] pt-5">
					{project.live && (
						<a
							href={project.live.url}
							target="_blank"
							rel="noreferrer noopener"
							className="link inline-flex items-center gap-1.5 font-mono text-xs"
						>
							<ExternalLink size={12} />
							{project.live.label}
						</a>
					)}
					{project.repo && (
						<a
							href={project.repo.url}
							target="_blank"
							rel="noreferrer noopener"
							className="link inline-flex items-center gap-1.5 font-mono text-xs"
						>
							<GithubIcon size={12} />
							{project.repo.label}
						</a>
					)}
				</div>
			</div>
		</article>
	);
}
