<script lang="ts">
	import Icon from "@iconify/svelte";
	import { onMount } from "svelte";
	import I18nKey from "../../i18n/i18nKey";
	import { i18n } from "../../i18n/translation";
	import {
		calculateDimensions,
		drawDateBadge,
		drawDecorativeCircles,
		drawRoundedRect,
		getLines,
		loadImage,
		type PosterConfig,
		parseDate,
		type SizeConfig,
	} from "./utils/poster-renderer";

	// 使用 $props() 接收参数
	let {
		title,
		author,
		description = "",
		pubDate,
		coverImage = null,
		url,
		siteTitle,
		vatar = null,
	} = $props();

	const SCALE = 2;
	const WIDTH = 425 * SCALE;
	const PADDING = 24 * SCALE;
	const CONTENT_WIDTH = WIDTH - PADDING * 2;
	const FONT_FAMILY = "'Roboto', sans-serif";

	let showModal = $state(false); // 建议使用 Svelte 5 的 $state，如果是 Svelte 4 请改回 let
	let posterImage = $state<string | null>(null);
	let generating = $state(false);
	let themeColor = $state("#558e88");

	function isDarkMode(): boolean {
		if (typeof document === "undefined") return false;
		return document.documentElement.classList.contains("dark");
	}

	function getPosterColors() {
		const dark = isDarkMode();
		return {
			background: dark ? "#1a1a1a" : "#ffffff",
			title: dark ? "#e5e5e5" : "#111827",
			descBg: dark ? "#2a2a2a" : "#e5e7eb",
			descText: dark ? "#a3a3a3" : "#4b5563",
			separator: dark ? "#2e2e2e" : "#f3f4f6",
			metaText: dark ? "#6b6b6b" : "#9ca3af",
			primaryText: dark ? "#d4d4d4" : "#1f2937",
			qrBg: dark ? "#2a2a2a" : "#ffffff",
			qrDark: dark ? "#ffffff" : "#000000",
			qrLight: dark ? "#1a1a1a" : "#ffffff",
			avatarBorder: dark ? "#2a2a2a" : "#ffffff",
		};
	}

	async function generatePoster() {
		showModal = true;
		if (posterImage || generating) return;

		generating = true;
		const colors = getPosterColors();

		try {
			// 1. 加载必要的资源
			const QRCode = await import("qrcode");
			const [qrDataUrl, coverImg, avatarImg] = await Promise.all([
				QRCode.toDataURL(url, {
					margin: 1,
					width: 100 * SCALE,
					color: { dark: colors.qrDark, light: colors.qrLight },
				}),
				coverImage ? loadImage(coverImage) : Promise.resolve(null),
				avatar ? loadImage(avatar) : Promise.resolve(null),
			]);

			const qrImg = await loadImage(qrDataUrl);

			// 2. 准备画布
			const canvas = document.createElement("canvas");
			const ctx = canvas.getContext("2d");
			if (!ctx) throw new Error("Canvas context not available");

			const config: SizeConfig = {
				scale: SCALE,
				width: WIDTH,
				padding: PADDING,
				contentWidth: CONTENT_WIDTH,
			};

			const { coverHeight, descHeight, canvasHeight } =
				calculateDimensions(
					!!coverImage,
					title,
					description,
					ctx,
					config,
				);

			canvas.width = WIDTH;
			canvas.height = canvasHeight;

			// 3. 绘制背景和装饰
			ctx.fillStyle = colors.background;
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			drawDecorativeCircles(
				ctx,
				canvas.width,
				canvas.height,
				themeColor,
				SCALE,
			);

			// 4. 绘制封面图
			if (coverImg) {
				const imgRatio = coverImg.width / coverImg.height;
				const targetRatio = WIDTH / coverHeight;
				let sx, sy, sWidth, sHeight;
				if (imgRatio > targetRatio) {
					sHeight = coverImg.height;
					sWidth = sHeight * targetRatio;
					sx = (coverImg.width - sWidth) / 2;
					sy = 0;
				} else {
					sWidth = coverImg.width;
					sHeight = sWidth / targetRatio;
					sx = 0;
					sy = (coverImg.height - sHeight) / 2;
				}
				ctx.drawImage(
					coverImg,
					sx,
					sy,
					sWidth,
					sHeight,
					0,
					0,
					WIDTH,
					coverHeight,
				);
			} else {
				ctx.fillStyle = themeColor;
				ctx.globalAlpha = 0.2;
				ctx.fillRect(0, 0, WIDTH, coverHeight);
				ctx.globalAlpha = 1.0;
			}

			// 5. 绘制日期、标题、描述 (省略具体绘制细节保持精简，逻辑同你原稿)
			// ... 此处保留你原有的 ctx 绘图逻辑 ...

			posterImage = canvas.toDataURL("image/png");
		} catch (error) {
			console.error("Failed to generate poster:", error);
		} finally {
			generating = false;
		}
	}

	onMount(() => {
		// 获取主题颜色
		const temp = document.createElement("div");
		temp.style.color = "var(--primary)";
		document.body.appendChild(temp);
		themeColor = getComputedStyle(temp).color || "#558e88";
		document.body.removeChild(temp);

		const observer = new MutationObserver(() => (posterImage = null));
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"],
		});
	});

	function downloadPoster() {
		if (!posterImage) return;
		const a = document.createElement("a");
		a.href = posterImage;
		a.download = `poster-${title.replace(/\s+/g, "-")}.png`;
		a.click();
	}

	function closeModal() {
		showModal = false;
	}

	let copied = $state(false);
	async function copyLink() {
		await navigator.clipboard.writeText(url);
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}

	function portal(node: HTMLElement) {
		document.body.appendChild(node);
		return {
			destroy() {
				if (node.parentNode) node.parentNode.removeChild(node);
			},
		};
	}
</script>

<button
	class="btn-regular px-6 py-3 rounded-lg inline-flex items-center gap-2"
	onclick={generatePoster}
	aria-label="Generate Share Poster"
>
	<span>{i18n(I18nKey.shareArticle)}</span>
</button>

{#if showModal}
	<div
		use:portal
		class="fixed inset-0 z-[9999] flex items-center justify-center p-4 transition-opacity"
		style="background-color: rgba(0, 0, 0, 0.6); backdrop-filter: blur(4px);"
		onclick={closeModal}
		role="button"
		tabindex="0"
		onkeydown={(e) => {
			if (e.key === "Enter" || e.key === " ") {
				closeModal();
			}
		}}
	>
		<div
			class="rounded-2xl max-w-sm w-full max-h-[90vh] overflow-y-auto flex flex-col shadow-2xl transform transition-all"
			style="background-color: var(--float-panel-bg);"
			onclick={(e) => {
				e.stopPropagation();
			}}
			onkeydown={(e) => {
				e.stopPropagation();
			}}
			role="dialog"
			tabindex="0"
		>
			<div
				class="p-6 flex justify-center min-h-[200px] items-center"
				style="background-color: var(--card-bg);"
			>
				{#if posterImage}
					<img
						src={posterImage}
						alt="Poster"
						class="max-w-full h-auto shadow-lg rounded-lg"
					/>
				{:else}
					<div class="flex flex-col items-center gap-3">
						<div
							class="w-8 h-8 border-2 rounded-full animate-spin"
							style="border-color: oklch(0.35 0.02 var(--hue)); border-top-color: {themeColor};"
						></div>
						<span
							class="text-sm"
							style="color: var(--content-meta);"
							>{i18n(I18nKey.generatingPoster)}</span
						>
					</div>
				{/if}
			</div>

			<div
				class="p-4 grid grid-cols-2 gap-3"
				style="border-top: 1px solid var(--line-color);"
			>
				<button
					class="py-3 rounded-xl font-medium active:scale-[0.98] transition-all flex items-center justify-center gap-2"
					style="background-color: var(--btn-card-bg-hover); color: var(--btn-content);"
					onmouseenter={(e) =>
						(e.currentTarget.style.backgroundColor =
							"var(--btn-card-bg-active)")}
					onmouseleave={(e) =>
						(e.currentTarget.style.backgroundColor =
							"var(--btn-card-bg-hover)")}
					onclick={copyLink}
				>
					{#if copied}
						<Icon
							icon="material-symbols:check"
							width="20"
							height="20"
						/>
						<span>{i18n(I18nKey.copied)}</span>
					{:else}
						<Icon
							icon="material-symbols:link"
							width="20"
							height="20"
						/>
						<span>{i18n(I18nKey.copyLink)}</span>
					{/if}
				</button>
				<button
					class="py-3 rounded-xl font-medium active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
					style="background-color: {themeColor}; color: white;"
					onclick={downloadPoster}
					disabled={!posterImage}
				>
					<Icon
						icon="material-symbols:download"
						width="20"
						height="20"
					/>
					{i18n(I18nKey.savePoster)}
				</button>
			</div>
		</div>
	</div>
{/if}

<style lang="css">
	button.btn-regular {
		transition:
			background-color 150ms,
			color 150ms;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background-color: var(--btn-regular-bg);
	}

	button.btn-regular:hover {
		background-color: var(--btn-regular-bg-hover);
	}

	button.btn-regular:active {
		background-color: var(--btn-regular-bg-active);
	}
</style>
