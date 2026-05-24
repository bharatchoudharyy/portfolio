import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "bharat choudhary — full-stack developer";

export default function OGImage() {
	return new ImageResponse(
		(
			<div
				style={{
					height: "100%",
					width: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					padding: "80px 96px",
					background:
						"radial-gradient(ellipse 90% 60% at 50% -10%, rgba(163, 230, 53, 0.08), transparent 60%), #08080a",
					color: "#fafafa",
					fontFamily: "sans-serif",
				}}
			>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: 12,
						fontSize: 18,
						letterSpacing: 4,
						textTransform: "uppercase",
						color: "#a3e635",
					}}
				>
					<span
						style={{
							width: 36,
							height: 2,
							background: "#a3e635",
						}}
					/>
					bharatchoudhary.dev
				</div>

				<div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
					<div
						style={{
							fontSize: 128,
							fontWeight: 600,
							letterSpacing: -3,
							lineHeight: 1,
						}}
					>
						hi, i'm bharat.
					</div>
					<div
						style={{
							fontSize: 38,
							color: "#a3a3a3",
							lineHeight: 1.3,
							maxWidth: 880,
						}}
					>
						full-stack dev. i build software end-to-end — UI/UX, backend, frontend,
						the whole stack.
					</div>
				</div>

				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						fontSize: 18,
						color: "#6b6b70",
						letterSpacing: 2,
						textTransform: "uppercase",
					}}
				>
					<span>oren · weekend projects · the sky</span>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							gap: 10,
							color: "#a3e635",
						}}
					>
						<span
							style={{
								width: 10,
								height: 10,
								borderRadius: 999,
								background: "#a3e635",
								boxShadow: "0 0 18px #a3e635",
							}}
						/>
						live
					</div>
				</div>
			</div>
		),
		{ ...size },
	);
}
