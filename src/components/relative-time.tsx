"use client";

import { useEffect, useState } from "react";
import { relativeTime } from "@/lib/relative-time";

// Renders the server-computed value first (matches SSR, no hydration mismatch),
// then recomputes from the raw timestamp on the client and ticks every minute
// so "Nm ago" stays truthful between page regenerations.
export function RelativeTime({ iso, initial }: { iso: string; initial: string }) {
	const [text, setText] = useState(initial);

	useEffect(() => {
		const update = () => setText(relativeTime(iso));
		update();
		const id = setInterval(update, 60_000);
		return () => clearInterval(id);
	}, [iso]);

	return <>{text}</>;
}
