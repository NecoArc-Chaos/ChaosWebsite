import type { CommentConfig } from "../types/config";
import { SITE_LANG } from "./siteConfig";

// 评论系统配置
export const commentConfig: CommentConfig = {
  enable: true, // 已开启评论功能
  system: "twikoo", // 评论系统选择: "twikoo" | "giscus"
  twikoo: {
    envId: "https://twikoo.necoarcchaos.xyz/", // 已恢复你专属的 Twikoo 地址
    lang: SITE_LANG,
  },
  giscus: {
    repo: "your-github-username/your-repo-name",
    repoId: "your-repo-id",
    category: "Announcements",
    categoryId: "your-category-id",
    mapping: "pathname",
    strict: "0",
    reactionsEnabled: "1",
    emitMetadata: "0",
    inputPosition: "top",
    theme: "preferred_color_scheme",
    lang: SITE_LANG,
    loading: "lazy",
  },
};
