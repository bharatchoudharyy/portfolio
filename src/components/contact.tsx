import { Mail, ArrowUpRight, FileText } from "lucide-react";
import { Section } from "./section";
import { GithubIcon, LinkedinIcon } from "./icons";

const LINKS = [
	{
		label: "email",
		value: "bharatchoudhary1602@gmail.com",
		href: "mailto:bharatchoudhary1602@gmail.com",
		Icon: Mail,
	},
	{
		label: "resume",
		value: "bharat-choudhary-resume.pdf",
		href: "/bharat-choudhary-resume.pdf",
		Icon: FileText,
	},
	{
		label: "github",
		value: "github.com/bharatchoudharyy",
		href: "https://github.com/bharatchoudharyy",
		Icon: GithubIcon,
	},
	{
		label: "linkedin",
		value: "linkedin.com/in/bharatchoudharyy",
		href: "https://linkedin.com/in/bharatchoudharyy",
		Icon: LinkedinIcon,
	},
];

export function Contact() {
	return (
		<Section id="contact" label="contact · 05" heading="if any of this resonates, say hi.">
			<p className="mb-10 max-w-prose leading-[1.7] text-[color:var(--color-text-muted)]">
				best way to reach me is email. i actually read it. response time is usually
				within a day, sometimes two if i'm deep in something.
			</p>

			<ul className="divide-y divide-[color:var(--color-border)] border-y border-[color:var(--color-border)]">
				{LINKS.map(({ label, value, href, Icon }) => (
					<li key={label}>
						<a
							href={href}
							target={href.startsWith("mailto:") ? undefined : "_blank"}
							rel={href.startsWith("mailto:") ? undefined : "noreferrer noopener"}
							className="group flex items-center justify-between gap-4 py-5 transition-colors hover:bg-[color:var(--color-surface)]/40"
						>
							<div className="flex items-center gap-4">
								<Icon
									size={16}
									className="text-[color:var(--color-text-faint)] transition-colors group-hover:text-[color:var(--color-accent)]"
								/>
								<span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-text-faint)]">
									{label}
								</span>
								<span className="font-mono text-sm text-[color:var(--color-text)]">
									{value}
								</span>
							</div>
							<ArrowUpRight
								size={16}
								className="text-[color:var(--color-text-faint)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[color:var(--color-accent)]"
							/>
						</a>
					</li>
				))}
			</ul>
		</Section>
	);
}
