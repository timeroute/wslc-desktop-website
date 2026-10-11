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

`npm run dev` 和 `npm run build` 会按 `src/data/copy.ts` 里的 `versionNumber` 拉取对应 tag 上的更新日志，例如当前 v0.1.2：

https://raw.githubusercontent.com/timeroute/wslc-desktop/v0.1.2/CHANGELOG.md

拉到的文件写到 `src/content/changelog.md`（不提交），页面在 `/changelog/`。这样页面和正在提供的 MSI 是同一版。上游还没有这个文件，或请求失败时，页面显示「暂无更新日志」，构建继续。部署工作流在 `astro build` 之前会再拉一次。

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

当前版本 **v0.1.2**：

https://github.com/timeroute/wslc-desktop/releases/download/v0.1.2/WSLc.Desktop-0.1.2-x86_64.msi

不要把 `.msi` 提交进这个仓库。

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

The changelog page (`/changelog/`) is rendered from `CHANGELOG.md` on the `timeroute/wslc-desktop` tag that matches `versionNumber` in `src/data/copy.ts` (currently `v0.1.2`), so the page matches the MSI. Dev and build fetch it first. A missing file shows “暂无更新日志” / “No changelog yet.” and does not fail the build. The Pages workflow fetches it again before `astro build`.
