import type { FullscreenWallpaperConfig } from "../types/config";

export const fullscreenWallpaperConfig: FullscreenWallpaperConfig = {
  enable: true,
  src: {
    desktop: ["Dorathy_Jill_smallver.webp"], // 已恢复旧配置桌面壁纸
    mobile: ["Dorathy_Jill.webp"], // 已恢复旧配置移动端壁纸
  },
  position: "center",
  carousel: {
    enable: false, // 恢复旧配置：禁用全屏壁纸轮播
    interval: 5,
  },
  zIndex: -1,
  opacity: 0.8,
  blur: 1,
  switchable: true,
  overlay: {
    opacity: 0.8, // 壁纸不透明度，0-1
    blur: 1.5, // 背景模糊半径（px）
    cardOpacity: 0.8, // 卡片不透明度，0-1
    switchable: {
      opacity: true,
      blur: true,
      cardOpacity: true,
    },
  },
  fullscreen: {
    switchable: {
      opacity: true,
      blur: true,
    },
  },
};
