# 🌸 Mizuki

<img align='right' src='logo.png' width='200px' alt="Mizuki logo">

一个现代化、功能丰富的静态博客模板，基于 [Astro](https://astro.build) 构建，具有先进的功能和精美的设计。

[![Node.js >= 20](https://img.shields.io/badge/node.js-%3E%3D20-brightgreen)](https://nodejs.org/)
[![pnpm >= 11](https://img.shields.io/badge/pnpm-%3E%3D11-blue)](https://pnpm.io/)
[![Astro](https://img.shields.io/badge/Astro-7.1.3-orange)](https://astro.build/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0.3-blue)](https://www.typescriptlang.org/)
[![License: Apache-2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg?logo=apache)](https://opensource.org/licenses/Apache-2.0)

[**🖥️ 在线演示**](https://mizuki.mysqil.com/) | [**📝 用户文档**](https://docs.mizuki.mysqil.com/)

🌏 **README Languages:**
[**English**](./README.md) / [**中文**](./README.zh.md) / [**日本語**](./README.ja.md) / [**繁體中文**](./README.tw.md) /

通过我们的综合文档快速开始。无论是自定义主题、配置功能，还是部署到生产环境，文档涵盖了您成功启动博客所需的所有内容。

[📚 阅读完整文档](https://docs.mizuki.mysqil.com/) →

![Mizuki Preview](./README.webp)

<table>
  <tr>
    <td><img alt="" src="docs/image/1.webp"></td>
    <td><img alt="" src="docs/image/2.webp"></td>
    <td><img alt="" src="docs/image/3.webp"></td>
  <tr>
  <tr>
    <td><img alt="" src="docs/image/4.webp"></td>
    <td><img alt="" src="docs/image/5.webp"></td>
    <td><img alt="" src="docs/image/6.webp"></td>
  <tr>
</table>

## ✨ Features

### 🎨 Design & Interface

- [x] Built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com)
- [x] Smooth animations and page transitions using [Swup](https://swup.js.org/)
- [x] Light/dark theme switching with system preference detection
- [x] Customizable theme colors, banner carousel, and fullscreen wallpapers
- [x] Switchable wallpaper modes with opacity and blur controls
- [x] Configurable sidebar components, ordering, and responsive layouts
- [x] Optional automatic page scaling for wide screens
- [x] Fully responsive design for all devices
- [x] Custom or system font modes, including JetBrains Mono and CJK fonts

### 🔍 Content & Search

- [x] Advanced search functionality based on [Pagefind](https://pagefind.app/)
- [x] [Markdown and MDX extensions](#-markdown-extensions) with syntax highlighting
- [x] Interactive table of contents with auto-scrolling
- [x] Full-content RSS and Atom feeds using the same Markdown/MDX pipeline as article pages
- [x] Reading time estimation
- [x] Article categorization, tagging, pinning, aliases, and custom permalinks
- [x] Optional password-protected posts with a documented static-site security boundary

### 📱 Special Pages

- [x] **Anime Page** - Track anime watching progress using local data, Bangumi, or Bilibili sources
- [x] **Friends Page** - Showcase friend websites with cards and tags
- [x] **Diary Page** - Share moments with text, images, locations, moods, and tags
- [x] **Albums Page** - Organize local or external photo albums with optional encryption
- [x] **Projects, Skills, Devices, and Timeline Pages** - Showcase structured personal data
- [x] **AI Tools Page** - Maintain a searchable catalog of tools
- [x] **Archive and About Pages** - Browse posts or publish a custom introduction

### 🛠 Technical Features

- [x] **Enhanced code blocks** based on [Expressive Code](https://expressive-code.com/)
- [x] **Math formulas** with KaTeX, plus Mermaid and PlantUML diagrams
- [x] **Image enhancements** including responsive sizing, automatic grids, and Fancybox lightboxes
- [x] **SEO optimization** including sitemap, robots.txt, RSS, Atom, and optional Open Graph images
- [x] **Performance optimization** with lazy loading and caching
- [x] **Comment system** with Twikoo or Giscus integration
- [x] **Music player** with local and Meting modes
- [x] **Live2D mascot** support through Pio

## 🚀 快速开始

### 📦 安装

1. **Clone the repository:**

   ```bash
   git clone https://github.com/LyraVoid/Mizuki.git
   cd Mizuki
   ```

2. **Install dependencies:**

   ```bash
   # Enable the package manager version declared by the project
   corepack enable

   # Install project dependencies
   pnpm install
   ```

3. **Configure your blog (optional):**
   - Set `ENABLE_CONTENT_SYNC=false` in a root `.env` file if you want to use only local content.
   - Edit `src/config/siteConfig.ts` and the other modules in `src/config/` to customize the site.
   - At minimum, replace `siteURL` with the public URL of your deployment.

4. **启动开发服务器：**
   ```bash
   pnpm dev
   ```
   Your blog will be available at `http://localhost:3000`

### 📝 内容管理

- **Create a post:** `pnpm new-post -- <filename>`; both `.md` and `.mdx` are supported.
- **Edit posts:** Modify files in `src/content/posts/`.
- **Edit About or Friends page content:** Modify the corresponding files in `src/content/spec/`.
- **Edit structured page data:** Modify the relevant files in `src/data/`.
- **Add article-local images:** Keep them next to the post and reference them with a relative path such as `./cover.webp`.
- **Add public images:** Place them under `public/` and reference them with a root-relative path such as `/images/example.webp`.

> **Before publishing:** This repository includes demo posts, page data, albums, and images. Remove or replace the sample content before deploying your own site.

### 🚀 部署

将博客部署到任何静态托管平台：

- **Vercel：** 连接 GitHub 仓库到 Vercel
- **Netlify：** 直接从 GitHub 部署
- **GitHub Pages：** 使用包含的 GitHub Actions 工作流
- **Cloudflare Pages：** 连接您的仓库

- **环境变量配置（可选）：** 可参照 `.env.example` 来配置

Before deployment, update `siteURL` in `src/config/siteConfig.ts`. Do not commit `.env` or credentials to Git. For hosted builds, configure environment variables in the hosting provider instead.

The optional `.env.example` settings include Bilibili session data and IndexNow credentials. Only configure them when needed, keep them in local or hosting-provider secrets, and never commit real values.

## 📝 Writing Content

Posts use `.md` or `.mdx` files under `src/content/posts/`. The only required frontmatter fields are `title` and `published`; optional fields cover summaries, images, tags, categories, drafts, pinning, comments, aliases, permalinks, attribution, and browser-side encryption.

Markdown and MDX support callouts, KaTeX math, Expressive Code, Mermaid, PlantUML, GitHub cards, Wiki Links, spoilers, responsive images, image grids, lightboxes, and HTML embeds. Encrypted posts are excluded from RSS and Atom, but browser-side encryption is not server-side access control.

See the complete [Content Authoring Guide](docs/CONTENT_AUTHORING.md) for the frontmatter schema, writing syntax, image rules, diagrams, video embeds, encryption limits, and publishing checklist.

## 🧩 Markdown 扩展语法

Mizuki uses one Markdown/MDX pipeline for article pages, RSS, and Atom. It supports callouts, math, enhanced code blocks, Mermaid, PlantUML, GitHub cards, Wiki Links, spoilers, responsive images, image grids, Fancybox lightboxes, and HTML embeds.

For syntax and examples, see the [Content Authoring Guide](docs/CONTENT_AUTHORING.md). PlantUML uses the public server configured in `src/config/markdownConfig.ts` by default, so diagrams must not contain secrets or private data.

## ⚡ 命令

Run commands from the project root:

| Command | Action |
| :--- | :--- |
| `pnpm install` | Install dependencies. |
| `pnpm dev` | Start the development server at `http://localhost:3000`. |
| `pnpm build` | Build the production site in `./dist/`, generate search data, and run build checks. |
| `pnpm preview` | Preview the production build locally. |
| `pnpm run check` | Run Astro diagnostics. |
| `pnpm run type-check` | Run TypeScript without emitting files. |
| `pnpm test` | Run the Markdown, layout, image, music, and crypto tests. |
| `pnpm run format` | Format source files with Biome. |
| `pnpm run lint` | Check and automatically fix source files with Biome. |
| `pnpm new-post -- <filename>` | Create a new Markdown or MDX post. |
| `pnpm run sync-content` | Synchronize an optional external content repository. |
| `pnpm run init-content` | Interactively initialize external content synchronization. |
| `pnpm astro ...` | Run an Astro CLI command. |

## 🎯 配置指南

### 🔧 基础配置

Configuration is split into focused modules under `src/config/`; `src/config/index.ts` is the shared export entry point. The main site settings live in `src/config/siteConfig.ts`:

```typescript
export const siteConfig: SiteConfig = {
  title: "Your Blog Name",
  subtitle: "Your Blog Description",
  siteURL: "https://example.com/", // Keep the trailing slash
  lang: "en", // e.g. "zh_CN", "ja", or "zh_TW"
  timeZone: "Europe/London", // Any valid IANA time zone
  themeColor: {
    hue: 210, // 0–360
    fixed: false, // Hide the visitor theme-color picker when true
  },
  featurePages: {
    anime: true,
    diary: true,
    friends: true,
    projects: true,
    skills: true,
    timeline: true,
    albums: true,
    devices: true,
    aiTools: true,
  },
  // Keep the remaining fields from the template defaults.
};
```

Other commonly used configuration files include:

- `src/config/navBarConfig.ts` — navigation links and menus.
- `src/config/profileConfig.ts` — avatar, name, bio, and social links.
- `src/config/sidebarConfig.ts` — sidebar widgets, order, positions, and responsive behavior.
- `src/config/backgroundWallpaper.ts` and `src/config/effectsConfig.ts` — wallpaper and visual effects.
- `src/config/commentConfig.ts` — global Twikoo or Giscus settings. Comments are disabled by default; set `enable: true` and configure the selected provider before using them.
- `src/config/musicConfig.ts` — music player mode and playlist source.
- `src/config/markdownConfig.ts` — Wiki Links, automatic image grids, and PlantUML.
- `src/config/permalinkConfig.ts` — optional global permalink format.
- `src/config/expressiveCodeConfig.ts` — code block themes and behavior.

### 📱 Feature Page Content

The page switches are controlled by `siteConfig.featurePages`. Page content and data are kept separate from page templates:

| Page | Content or data source |
| :--- | :--- |
| About | `src/content/spec/about.md` |
| Friends | `src/content/spec/friends.md` and `src/data/friends.ts` |
| Anime | `src/config/siteConfig.ts` for the source mode; `src/data/anime.ts` for local data |
| Diary | `src/data/diary.ts`, or a Memos endpoint configured by `diaryApiUrl` |
| Albums | `public/images/albums/`; each local album uses an `info.json` file |
| Projects | `src/data/projects.ts` |
| Skills | `src/data/skills.ts` |
| Devices | `src/data/devices.ts` |
| Timeline | `src/data/timeline.ts` |
| AI Tools | `src/data/ai-tools.ts` |

Avoid editing `src/pages/*.astro` just to change page content; those files define the layout and rendering behavior.

### 📦 代码内容分离 (可选)

Mizuki can separate theme code from blog content into two repositories. This is useful for private content, independent content versioning, or collaboration, but it is optional.

**快速选择**:

| Use case | Configuration | Content location |
| :--- | :--- | :--- |
| **Local content** | `ENABLE_CONTENT_SYNC=false` | `src/content/`, `src/data/`, and `public/images/` |
| **External content repository** | `ENABLE_CONTENT_SYNC=true` and `CONTENT_REPO_URL=...` | A separate repository synchronized into the paths above |

**一键启用/禁用**:

```bash
# Local content mode (recommended for getting started)
# Put this in .env to disable synchronization explicitly.
ENABLE_CONTENT_SYNC=false
pnpm dev

# External content repository mode
# 1. Copy the example configuration
cp .env.example .env

# 2. Edit .env
ENABLE_CONTENT_SYNC=true
CONTENT_REPO_URL=https://github.com/your-username/Mizuki-Content.git
# CONTENT_DIR=./content  # Optional; this is the default

# 3. Synchronize content and start the site
pnpm run sync-content
pnpm dev
```

An external repository uses this structure:

```text
Mizuki-Content/
├── posts/       # .md and .mdx posts
├── spec/        # About, Friends, and other Markdown page content
├── data/        # Structured page data such as projects or skills
└── images/      # Public images, including albums and post assets
```

The sync script maps these directories to `src/content/posts/`, `src/content/spec/`, `src/data/`, and `public/images/`. `src/data/ai-tools.ts` is owned by the code repository and is preserved during synchronization.

> **Sync warning:** When `ENABLE_CONTENT_SYNC` is enabled, `pnpm dev` and `pnpm build` run the sync hook automatically. If `CONTENT_DIR` already contains a Git repository, the script fetches and resets it to its `main` or `master` remote branch. It can also back up existing runtime directories as `.backup`, create junctions or copies, and commit synchronized changes in the code repository. Commit or back up local content changes before running it, and do not edit synchronized target files directly.

For private repositories, use an SSH URL or configure credentials through the deployment platform. Never commit tokens in `.env` or put them in a public repository URL.

📖 **Detailed Configuration:** [Content Separation Guide](docs/CONTENT_SEPARATION.md)

🔄 **Migration Tutorial:** [Migrate from Single Repo to Separation Mode](docs/MIGRATION_GUIDE.md)

🚀 **Deployment Guide:** [Deployment Guide](docs/DEPLOYMENT.md)

📚 **Documentation Index:** [Documentation Index](docs/README.md)

## ✏️ 贡献

我们欢迎贡献！请随时提交问题和拉取请求。

1. Fork 仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开拉取请求

## 📄 许可证

本项目基于 Apache 许可证 2.0 - 查看 [LICENSE](LICENSE) 文件了解详情。

### 原始项目许可证

本项目基于 [Fuwari](https://github.com/saicaca/fuwari) 开发，该项目使用 MIT 许可证。根据 MIT 许可证要求，原始版权声明和许可声明已包含在 LICENSE.MIT 文件中。

### Third-Party Notices

Portions of the Markdown enhancements are adapted from [Firefly](https://github.com/CuteLeaf/Firefly) under the MIT License. The original copyright and complete license text are retained in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

## 🙏 Acknowledgements

- 基于原始 [Fuwari](https://github.com/saicaca/fuwari) 模板
- 灵感来源于 [Yukina](https://github.com/WhitePaper233/yukina) - 一个美丽优雅的博客模板
- 部分设计灵感来源于 [Firefly](https://github.com/CuteLeaf/Firefly) 和 [Twilight](https://github.com/spr-aachen/Twilight) 模板
- 使用 [Pio](https://github.com/Dreamer-Paul/Pio) 实现可爱的 Live2D 看板娘插件
- 使用 [Astro](https://astro.build) 和 [Tailwind CSS](https://tailwindcss.com) 构建
- 图标来自 [Iconify](https://iconify.design/)

### 🌸 特别感谢

- **[Fuwari](https://github.com/saicaca/fuwari)** by saicaca - 本项目所基于的原始模板。感谢您创建了如此漂亮且功能强大的模板。
- **[Yukina](https://github.com/WhitePaper233/yukina)** - 感谢提供设计灵感和创意，帮助塑造了这个项目。Yukina 是一个优雅的博客模板，展现了出色的设计原则和用户体验。
- **[Firefly](https://github.com/CuteLeaf/Firefly)** - 感谢提供优秀的布局设计思路，双侧边栏布局、文章双列网格等布局，及部分小组件的设计与实现，让 Mizuki 的界面更加丰富。
- **[Twilight](https://github.com/spr-aachen/Twilight)** - 感谢提供灵感和技术支持。Twilight 的动态壁纸模式切换系统、响应式设计和过渡效果显著提升了 Mizuki 的使用体验。

## 🍀 贡献者

## 🍀 Contributors

Thanks to all contributors for their contributions to this project. If you have any questions or suggestions, please submit an [Issue](https://github.com/LyraVoid/Mizuki/issues) or [Pull Request](https://github.com/LyraVoid/Mizuki/pulls).

<a href="https://github.com/LyraVoid/Mizuki/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=LyraVoid/Mizuki" />
</a>

## ⭐ Star History

## [![Star History Chart](https://api.star-history.com/svg?repos=LyraVoid/Mizuki&type=Date)](https://star-history.com/#LyraVoid/Mizuki&Date)

⭐ 如果您觉得这个项目有帮助，请考虑给它一个星标!
