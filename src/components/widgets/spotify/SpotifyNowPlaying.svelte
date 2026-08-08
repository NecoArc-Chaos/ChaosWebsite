<script lang="ts">
import { onMount } from "svelte";

const PROXY = "https://sp.nachaos.xyz"; // Solian Spotify proxy (/current, CORS enabled)
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

const isRecent = $derived(track !== null && !track.is_playing);

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
	load();
	const timer = setInterval(load, REFRESH_MS);
	return () => clearInterval(timer);
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
		{#if track.album_image_url}
			<img class="sp-cover" src={track.album_image_url} alt="" width="56" height="56" loading="lazy" />
		{:else}
			<span class="sp-cover sp-cover--placeholder" aria-hidden="true">
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
			</span>
		{/if}
		<span class="sp-body">
			<strong class="sp-title">{track.name}</strong>
			<span class="sp-artist">{track.artist}</span>
			<span class="sp-status" class:recent={isRecent}>
				<span class="sp-eq" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span>
				{isRecent ? "最近播放" : "正在听"}
			</span>
		</span>
		<span class="sp-logo" aria-hidden="true">
			<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
		</span>
	</a>
{:else}
	<div class="sp-card" aria-busy="true">
		<span class="sp-cover sp-skeleton"></span>
		<span class="sp-body">
			<span class="sp-skeleton sp-skeleton--line"></span>
			<span class="sp-skeleton sp-skeleton--line sp-skeleton--short"></span>
		</span>
	</div>
{/if}

<style>
.sp-card {
	--sp-bg: #f6f6f7;
	--sp-fg: #18181b;
	--sp-muted: #71717a;
	--sp-border: rgb(0 0 0 / 0.08);
	--sp-accent: #1db954;
	display: flex;
	align-items: center;
	gap: 0.875rem;
	width: 100%;
	max-width: 26rem;
	min-height: 5.5rem;
	padding: 0.75rem 1rem;
	border-radius: 0.875rem;
	border: 1px solid var(--sp-border);
	background: var(--sp-bg);
	color: var(--sp-fg);
	text-decoration: none;
	box-sizing: border-box;
	transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
:global(html.dark) .sp-card {
	--sp-bg: #232326;
	--sp-fg: #fafafa;
	--sp-muted: #a1a1aa;
	--sp-border: rgb(255 255 255 / 0.1);
	--sp-accent: #1ed760;
}
a.sp-card:hover {
	border-color: var(--sp-accent);
	box-shadow: 0 2px 12px rgb(0 0 0 / 0.08);
}
.sp-cover {
	width: 56px;
	height: 56px;
	border-radius: 0.625rem;
	object-fit: cover;
	flex-shrink: 0;
	background: var(--sp-border);
}
.sp-cover--placeholder {
	display: flex;
	align-items: center;
	justify-content: center;
	color: var(--sp-muted);
}
.sp-cover--placeholder svg {
	width: 24px;
	height: 24px;
}
.sp-body {
	display: flex;
	flex-direction: column;
	gap: 0.15rem;
	min-width: 0;
	flex: 1;
}
.sp-title {
	font-size: 0.95rem;
	font-weight: 600;
	line-height: 1.3;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.sp-artist {
	font-size: 0.8rem;
	color: var(--sp-muted);
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.sp-status {
	display: inline-flex;
	align-items: center;
	gap: 0.4rem;
	margin-top: 0.2rem;
	font-size: 0.72rem;
	font-weight: 500;
	letter-spacing: 0.02em;
	color: var(--sp-accent);
}
.sp-status.recent {
	color: var(--sp-muted);
}
.sp-eq {
	display: inline-flex;
	align-items: flex-end;
	gap: 2px;
	height: 13px;
}
.sp-eq i {
	width: 3px;
	height: 100%;
	border-radius: 2px;
	background: currentColor;
	transform-origin: bottom;
	animation: sp-bounce 0.9s ease-in-out infinite;
}
.sp-eq i:nth-child(2) { animation-delay: 0.12s; }
.sp-eq i:nth-child(3) { animation-delay: 0.24s; }
.sp-eq i:nth-child(4) { animation-delay: 0.36s; }
.sp-eq i:nth-child(5) { animation-delay: 0.48s; }
.sp-status.recent .sp-eq i {
	animation: none;
	transform: scaleY(0.4);
}
.sp-logo {
	flex-shrink: 0;
	display: flex;
	color: var(--sp-accent);
}
.sp-logo svg {
	width: 22px;
	height: 22px;
}
.sp-error {
	font-size: 0.85rem;
	font-weight: 600;
}
.sp-error-detail {
	font-size: 0.72rem;
	color: var(--sp-muted);
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	max-width: 16rem;
}
.sp-retry {
	margin-left: auto;
	flex-shrink: 0;
	padding: 0.3rem 0.7rem;
	border: 1px solid var(--sp-border);
	border-radius: 0.5rem;
	background: transparent;
	color: var(--sp-fg);
	font-size: 0.75rem;
	cursor: pointer;
	transition: border-color 0.2s ease, color 0.2s ease;
}
.sp-retry:hover {
	border-color: var(--sp-accent);
	color: var(--sp-accent);
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
	background: linear-gradient(90deg, transparent, rgb(255 255 255 / 0.35), transparent);
	animation: sp-shimmer 1.4s ease infinite;
}
.sp-skeleton--line {
	display: block;
	height: 0.9rem;
	border-radius: 0.25rem;
	margin-bottom: 0.35rem;
}
.sp-skeleton--line.sp-skeleton--short {
	width: 55%;
	height: 0.75rem;
	margin-bottom: 0;
}
@keyframes sp-bounce {
	0%, 100% { transform: scaleY(0.3); }
	50% { transform: scaleY(1); }
}
@keyframes sp-shimmer {
	100% { transform: translateX(100%); }
}
@media (prefers-reduced-motion: reduce) {
	.sp-eq i,
	.sp-skeleton::after {
		animation: none;
	}
}
</style>
