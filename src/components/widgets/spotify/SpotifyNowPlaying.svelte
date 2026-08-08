<script lang="ts">
import { onMount } from "svelte";

const PROXY = "https://spotify.nachaos.xyz"; // widget worker (/current, CORS enabled)
const REFRESH_MS = 45_000;

type Track = {
	name: string;
	artist: string;
	album_image_url: string | null;
	track_url: string | null;
	is_playing: boolean;
};

let track: Track | null = $state(null);
let error: string | null = $state(null);
let theme = $state("dark"); // follows the blog's html.light / html.dark class

const isRecent = $derived(track !== null && !track.is_playing);

// Spotify music code (scannable in the app) — same source as the original widget
const scanSrc = $derived.by(() => {
	if (!track?.track_url) return null;
	const id = track.track_url.split("/").pop();
	if (!id) return null;
	const colors = theme === "light" ? "000000/white" : "FFFFFF/black";
	return `https://scannables.scdn.co/uri/plain/png/${colors}/500/spotify:track:${id}`;
});

function currentTheme() {
	return document.documentElement.classList.contains("light") ? "light" : "dark";
}

async function load() {
	try {
		const res = await fetch(`${PROXY}/current`);
		if (!res.ok) throw new Error(`HTTP ${res.status}`);
		const data: { ok?: boolean; error?: string; track?: Track | null } = await res.json();
		if (!data || !data.ok) throw new Error(data?.error ?? "proxy error");
		track = data.track ?? null;
		error = null;
	} catch (e) {
		error = e instanceof Error ? e.message : String(e);
	}
}

onMount(() => {
	theme = currentTheme();
	const observer = new MutationObserver(() => {
		theme = currentTheme();
	});
	observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
	load();
	const timer = setInterval(load, REFRESH_MS);
	return () => {
		clearInterval(timer);
		observer.disconnect();
	};
});
</script>

{#if error && !track}
	<div class="sp-card sp-card--error" role="alert">
		<span class="sp-logo" aria-hidden="true">
			<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
		</span>
		<span class="sp-body">
			<span class="sp-error">Spotify 状态暂不可用</span>
			<span class="sp-error-detail">{error}</span>
		</span>
		<button type="button" class="sp-retry" onclick={load}>重试</button>
	</div>
{:else if track}
	<a
		class="sp-card"
		href={track.track_url ?? "https://open.spotify.com"}
		target="_blank"
		rel="noopener noreferrer"
		aria-label={`在 Spotify 打开：${track.name} — ${track.artist}`}
	>
		{#if scanSrc}
			<div class="sp-scan-box">
				<img class="sp-scan" src={scanSrc} alt="" loading="lazy" />
			</div>
		{/if}
		<div class="sp-aside">
			{#if track.album_image_url}
				<img class="sp-cover" src={track.album_image_url} alt="" width="120" height="120" loading="lazy" />
			{:else}
				<span class="sp-cover sp-cover--placeholder" aria-hidden="true">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
				</span>
			{/if}
		</div>
		<section class="sp-section">
			<div class="sp-info">
				<div class="sp-top">
					<span class="sp-title">{track.name}</span>
					<span class="sp-logo" aria-hidden="true">
						<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
					</span>
				</div>
				<span class="sp-artist">{track.artist}</span>
			</div>
			<div class="sp-bar-container" class:recent={isRecent} aria-hidden="true">
				<span class="sp-bar"></span><span class="sp-bar"></span><span class="sp-bar"></span><span class="sp-bar"></span><span class="sp-bar"></span><span class="sp-bar"></span><span class="sp-bar"></span><span class="sp-bar"></span><span class="sp-bar"></span><span class="sp-bar"></span>
				<span class="sp-status-label">{isRecent ? "最近播放" : "正在听"}</span>
			</div>
		</section>
	</a>
{:else}
	<div class="sp-card" aria-busy="true">
		<div class="sp-aside">
			<span class="sp-cover sp-skeleton"></span>
		</div>
		<section class="sp-section">
			<div class="sp-info">
				<span class="sp-skeleton sp-skeleton--title"></span>
				<span class="sp-skeleton sp-skeleton--artist"></span>
			</div>
		</section>
	</div>
{/if}

<style>
.sp-card {
	--sp-bg: #161b22; /* original dark theme */
	--sp-fg: #ffffff;
	--sp-muted: #808080;
	--sp-border: rgb(255 255 255 / 0.08);
	display: flex;
	align-items: stretch;
	gap: 0;
	width: 495px; /* original widget size */
	max-width: 100%;
	min-height: 160px;
	padding: 20px;
	border-radius: 5px;
	background: var(--sp-bg);
	color: var(--sp-fg);
	text-decoration: none;
	box-sizing: border-box;
	box-shadow: 0 1px 3px rgb(0 0 0 / 0.1);
}
:global(html.light) .sp-card {
	--sp-bg: #f6f8fa; /* original light theme */
	--sp-fg: #000000;
	--sp-muted: #808080;
	--sp-border: rgb(0 0 0 / 0.08);
}
a.sp-card:hover .sp-title {
	text-decoration: underline;
}
.sp-aside {
	flex-shrink: 0;
	margin-right: 20px;
}
.sp-cover {
	display: block;
	width: 120px;
	height: 120px;
	border-radius: 50%;
	object-fit: cover;
	background: var(--sp-border);
	animation: sp-spin 10s linear infinite;
	max-width: none !important; /* blog global img rules must not squeeze the cover */
}
.sp-cover--placeholder {
	display: flex;
	align-items: center;
	justify-content: center;
	color: var(--sp-muted);
}
.sp-cover--placeholder svg {
	width: 40px;
	height: 40px;
}
.sp-section {
	flex: 1;
	min-width: 0;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
}
.sp-info {
	margin-top: 8px;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 5px;
	min-width: 0;
	max-width: 100%;
}
.sp-top {
	display: flex;
	align-items: center;
	gap: 8px;
	min-width: 0;
	max-width: 100%;
}
.sp-title {
	font-size: 20px;
	font-weight: 600;
	line-height: 1.25;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
	max-width: 260px;
}
.sp-artist {
	font-size: 18px;
	font-weight: 500;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
	max-width: 260px;
	color: var(--sp-muted);
}
.sp-logo {
	display: flex;
	flex-shrink: 0;
	color: #1db954;
}
.sp-logo svg {
	width: 24px;
	height: 24px;
}
.sp-bar-container {
	display: flex;
	align-items: flex-end;
	gap: 6px;
	height: 30px;
	animation: sp-rainbow 2s linear infinite;
}
.sp-bar {
	width: 21px;
	height: 30px;
	border-radius: 3px 3px 0 0;
	background: #ff0000;
	transform-origin: bottom;
	animation: sp-resize 700ms ease-in-out infinite alternate;
}
.sp-bar:nth-child(2) { background: #ff4000; animation-duration: 559ms; }
.sp-bar:nth-child(3) { background: #ff8000; animation-duration: 569ms; }
.sp-bar:nth-child(4) { background: #ffbf00; animation-duration: 516ms; }
.sp-bar:nth-child(5) { background: #ffff00; animation-duration: 704ms; }
.sp-bar:nth-child(6) { background: #bfff00; animation-duration: 662ms; }
.sp-bar:nth-child(7) { background: #80ff00; animation-duration: 511ms; }
.sp-bar:nth-child(8) { background: #40ff00; animation-duration: 541ms; }
.sp-bar:nth-child(9) { background: #00ff00; animation-duration: 519ms; }
.sp-bar:nth-child(10) { background: #00ff40; animation-duration: 744ms; }
.sp-bar-container.recent .sp-bar {
	background: var(--sp-muted);
	animation: none;
	transform: scaleY(0.45);
}
.sp-bar-container.recent {
	animation: none;
}
.sp-status-label {
	font-size: 12px;
	font-weight: 500;
	color: var(--sp-muted);
	margin-left: 4px;
	align-self: center;
	white-space: nowrap;
}
/* Spotify music code strip — left edge, clean rotation, no distortion */
.sp-scan-box {
	position: relative;
	flex-shrink: 0;
	align-self: center;
	width: 56px;
	height: 112px;
	margin-right: 24px;
	overflow: hidden;
	border-radius: 5px;
}
.sp-scan {
	position: absolute;
	top: 50%;
	left: 50%;
	width: 112px;
	height: 56px;
	object-fit: cover;
	transform: translate(-50%, -50%) rotate(90deg);
	max-width: none !important; /* blog global img rules must not squeeze the code */
}
.sp-error {
	font-size: 0.95rem;
	font-weight: 600;
}
.sp-error-detail {
	font-size: 0.75rem;
	color: var(--sp-muted);
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	max-width: 16rem;
}
.sp-retry {
	margin-left: auto;
	flex-shrink: 0;
	padding: 0.35rem 0.75rem;
	border: 1px solid var(--sp-border);
	border-radius: 0.5rem;
	background: transparent;
	color: var(--sp-fg);
	font-size: 0.78rem;
	cursor: pointer;
}
.sp-retry:hover {
	border-color: #1db954;
	color: #1db954;
}
.sp-skeleton {
	position: relative;
	overflow: hidden;
	background: var(--sp-border);
}
.sp-skeleton::after {
	content: "";
	position: absolute;
	inset: 0;
	transform: translateX(-100%);
	background: linear-gradient(90deg, transparent, rgb(255 255 255 / 0.25), transparent);
	animation: sp-shimmer 1.4s ease infinite;
}
:global(html.light) .sp-skeleton::after {
	background: linear-gradient(90deg, transparent, rgb(0 0 0 / 0.08), transparent);
}
.sp-skeleton--title {
	display: block;
	width: 200px;
	height: 20px;
	border-radius: 4px;
	margin-top: 8px;
}
.sp-skeleton--artist {
	display: block;
	width: 140px;
	height: 18px;
	border-radius: 4px;
	margin-top: 6px;
}
@keyframes sp-spin {
	100% { transform: rotate(360deg); }
}
@keyframes sp-rainbow {
	100% { filter: hue-rotate(360deg); }
}
@keyframes sp-resize {
	0% { transform: scaleY(0); opacity: 0.05; }
	100% { transform: scaleY(1); opacity: 0.95; }
}
@keyframes sp-shimmer {
	100% { transform: translateX(100%); }
}
@media (prefers-reduced-motion: reduce) {
	.sp-cover,
	.sp-bar-container,
	.sp-bar,
	.sp-skeleton::after {
		animation: none;
	}
	.sp-bar {
		transform: scaleY(0.7);
	}
}
@media (width < 480px) {
	.sp-card {
		padding: 14px;
		min-height: auto;
	}
	.sp-aside {
		margin-right: 14px;
	}
	.sp-cover {
		width: 88px;
		height: 88px;
	}
	.sp-title {
		font-size: 16px;
		max-width: 180px;
	}
	.sp-artist {
		font-size: 14px;
		max-width: 180px;
	}
	.sp-bar {
		width: 14px;
	}
	.sp-status-label {
		display: none;
	}
	.sp-scan-box {
		display: none;
	}
}
</style>
