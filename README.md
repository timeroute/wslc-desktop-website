# WSLc Desktop 网站

[WSLc Desktop](https://github.com/timeroute/wslc-desktop) 的产品介绍与下载页。页面以中文为默认语言，可切换英文。安装包不在本仓库内，下载链接指向 GitHub Releases 上的 MSI。`public/screenshots/` 里是应用的真实界面，不要换成示意图。

线上地址：**https://timeroute.github.io/wslc-desktop-website/**

## 本地开发

需要 Node.js 22 或更高版本。

```bash
npm ci
npm run dev
```

开发服务器使用与 GitHub Pages 项目站相同的 base：`/wslc-desktop-website/`。

```bash
npm run build
npm run preview
```

构建产物在 `dist/`。

## 更新日志

`npm run dev` 和 `npm run build` 会请求 [wslc-desktop 的最新正式发布](https://github.com/timeroute/wslc-desktop/releases/latest)，读取版本号、MSI 地址和更新说明。更新说明优先用该 tag 上的 `CHANGELOG.md`；仓库里还没有这个文件时，改用 Release 正文。结果写到 `src/content/changelog.md`（不提交），页面在 `/changelog/`，和正在提供的 MSI 是同一版。

发布 API 不可用、超时，或这次发布里没有 MSI 时，改用仓库里上次已知的发布：`src/data/release.json`（版本号和下载地址）和 `src/data/changelog.fallback.md`（更新说明）。构建继续，页面仍能打开。部署工作流在 `astro build` 之前会再拉一次。

首页和英文页上的版本号、安装包文件名、下载链接，以及结构化数据里的 `softwareVersion` / `downloadUrl`，都读这次解析出的发布，不在页面里手写版本。

## 部署到 GitHub Pages

工作流 `.github/workflows/deploy.yml` 在推送到 `main` 时构建静态站点，并用 `actions/deploy-pages` 发布。

`astro.config.mjs` 已按项目站写好：

- `site`: `https://timeroute.github.io`
- `base`: `/wslc-desktop-website/`

仓库管理员需要在 GitHub 上打开 Pages 的 Actions 来源，否则工作流无法成为线上站点：

1. 打开本仓库 **Settings → Pages**。
2. 在 **Build and deployment** 里，将 **Source** 设为 **GitHub Actions**（不要选 Deploy from a branch）。
3. 把站点合并进 `main`。推送到 `main` 会运行 **Deploy to GitHub Pages**。
4. 部署完成后访问 https://timeroute.github.io/wslc-desktop-website/ 。

如果 Actions 被禁用，先在 **Settings → Actions → General** 允许运行 Actions。首次部署时，GitHub 通常会自动创建 `github-pages` 环境。

仓库名如果改了，需要同时修改 `base`，否则资源路径会 404。

## 下载链接

下载按钮指向本次构建解析到的 MSI：最新正式发布上的安装包，或发布 API 不可用时 `src/data/release.json` 里的上次已知地址。不要把 `.msi` 提交进这个仓库。

## English

Marketing and download site for [WSLc Desktop](https://github.com/timeroute/wslc-desktop). The UI defaults to Chinese and can switch to English. The MSI is not vendored here; download buttons point at the GitHub Releases asset.

Live URL: **https://timeroute.github.io/wslc-desktop-website/**

```bash
npm ci
npm run dev
npm run build
```

GitHub Pages setup:

1. **Settings → Pages**
2. **Build and deployment → Source = GitHub Actions**
3. Merge to `main`. The **Deploy to GitHub Pages** workflow builds the site and publishes it with `actions/deploy-pages`.

Astro is configured with `site: 'https://timeroute.github.io'` and `base: '/wslc-desktop-website/'`.

Dev and build request the latest stable GitHub release of `timeroute/wslc-desktop` and read its version, MSI URL, and notes. Notes come from `CHANGELOG.md` on that tag, or from the release body when that file is missing. The changelog page (`/changelog/`) renders the result, so it matches the MSI. If the release API is unavailable, times out, or has no MSI, the build uses the last known release in `src/data/release.json` and `src/data/changelog.fallback.md` and still succeeds. Version text, download links, and the `softwareVersion` / `downloadUrl` structured data on the Chinese and English pages all read this resolved release. The Pages workflow fetches again before `astro build`.
