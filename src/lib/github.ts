// Live GitHub data for the hero NOW widget. Cached 60s via Next fetch.
//
// Needs GITHUB_TOKEN in env (classic PAT: repo + read:user, with the profile
// setting "Include private contributions on my profile" enabled).

const FALLBACK_USERNAME = "bharatchoudharyy";

export type LiveStatus = {
	ok: boolean;
	mode: "live" | "down";
	username: string;
	totalThisYear: number;
	prsThisYear: number;
	reposContributedTo: number;
	lastPush: {
		repo: string;
		isPrivate: boolean;
		relative: string;
		url: string;
		message: string | null;
		commitUrl: string | null;
	} | null;
};

const DOWN: LiveStatus = {
	ok: false,
	mode: "down",
	username: FALLBACK_USERNAME,
	totalThisYear: 0,
	prsThisYear: 0,
	reposContributedTo: 0,
	lastPush: null,
};

const QUERY = `query {
	viewer {
		login
		contributionsCollection {
			totalPullRequestContributions
			totalRepositoriesWithContributedCommits
			contributionCalendar { totalContributions }
		}
		repositories(
			first: 15
			orderBy: { field: PUSHED_AT, direction: DESC }
			affiliations: [OWNER, COLLABORATOR, ORGANIZATION_MEMBER]
			isFork: false
		) {
			nodes {
				name
				isPrivate
				pushedAt
				url
				defaultBranchRef {
					target {
						... on Commit {
							history(first: 5) {
								edges {
									node {
										message
										committedDate
										url
										author { user { login } }
									}
								}
							}
						}
					}
				}
			}
		}
	}
}`;

type Commit = {
	message: string;
	committedDate: string;
	url: string;
	author?: { user?: { login?: string } | null } | null;
};

type Repo = {
	name: string;
	isPrivate: boolean;
	pushedAt: string | null;
	url: string;
	defaultBranchRef: {
		target?: { history?: { edges?: { node?: Commit | null }[] } };
	} | null;
};

function relativeTime(iso: string): string {
	const diff = Math.max(0, Date.now() - new Date(iso).getTime());
	const mins = Math.floor(diff / 60_000);
	if (mins < 1) return "just now";
	if (mins < 60) return `${mins}m ago`;
	const hours = Math.floor(mins / 60);
	if (hours < 24) return `${hours}h ago`;
	const days = Math.floor(hours / 24);
	if (days === 1) return "yesterday";
	if (days < 7) return `${days}d ago`;
	const weeks = Math.floor(days / 7);
	if (weeks < 5) return `${weeks}w ago`;
	const months = Math.floor(days / 30);
	if (months < 12) return `${months}mo ago`;
	return `${Math.floor(days / 365)}y ago`;
}

export async function getLiveStatus(): Promise<LiveStatus> {
	const token = process.env.GITHUB_TOKEN;
	if (!token) return DOWN;

	try {
		const res = await fetch("https://api.github.com/graphql", {
			method: "POST",
			headers: {
				Authorization: `bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ query: QUERY }),
			next: { revalidate: 60 },
		});
		if (!res.ok) return DOWN;

		const viewer = (await res.json())?.data?.viewer;
		if (!viewer) return DOWN;

		const cc = viewer.contributionsCollection ?? {};
		const viewerLogin: string = viewer.login ?? FALLBACK_USERNAME;
		const repos: Repo[] = viewer.repositories?.nodes ?? [];

		// Find the most recent commit authored by the viewer across all visible
		// repos. Fall back to most-recently-pushed repo if no matching commit
		// (token lacks contents:read, or all recent commits are by teammates).
		let best: { repo: Repo; commit: Commit } | null = null;
		for (const repo of repos) {
			const edges = repo.defaultBranchRef?.target?.history?.edges ?? [];
			for (const edge of edges) {
				const c = edge.node;
				if (!c?.committedDate) continue;
				if (c.author?.user?.login !== viewerLogin) continue;
				if (!best || new Date(c.committedDate) > new Date(best.commit.committedDate)) {
					best = { repo, commit: c };
				}
				break; // commits per repo are sorted newest-first
			}
		}

		let lastPush: LiveStatus["lastPush"] = null;
		if (best) {
			lastPush = {
				repo: best.repo.name,
				isPrivate: best.repo.isPrivate,
				relative: relativeTime(best.commit.committedDate),
				url: best.repo.url,
				message: best.commit.message.split("\n")[0],
				commitUrl: best.commit.url,
			};
		} else if (repos[0]?.pushedAt) {
			lastPush = {
				repo: repos[0].name,
				isPrivate: repos[0].isPrivate,
				relative: relativeTime(repos[0].pushedAt),
				url: repos[0].url,
				message: null,
				commitUrl: null,
			};
		}

		return {
			ok: true,
			mode: "live",
			username: viewerLogin,
			totalThisYear: cc.contributionCalendar?.totalContributions ?? 0,
			prsThisYear: cc.totalPullRequestContributions ?? 0,
			reposContributedTo: cc.totalRepositoriesWithContributedCommits ?? 0,
			lastPush,
		};
	} catch {
		return DOWN;
	}
}
