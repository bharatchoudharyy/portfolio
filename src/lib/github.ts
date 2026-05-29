// Live GitHub data for the hero NOW widget. Cached 60s via Next fetch.
//
// Needs GITHUB_TOKEN in env (classic PAT: repo + read:user, with the profile
// setting "Include private contributions on my profile" enabled).

import { relativeTime } from "./relative-time";

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
		when: string; // ISO — client recomputes relative time from this
		relative: string; // server-computed, used as SSR fallback
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
				when: best.commit.committedDate,
				relative: relativeTime(best.commit.committedDate),
				url: best.repo.url,
				message: best.commit.message.split("\n")[0],
				commitUrl: best.commit.url,
			};
		} else if (repos[0]?.pushedAt) {
			lastPush = {
				repo: repos[0].name,
				isPrivate: repos[0].isPrivate,
				when: repos[0].pushedAt,
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
