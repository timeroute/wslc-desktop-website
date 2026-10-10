export const product = {
  name: 'WSLc Desktop',
  version: 'v0.1.0',
  versionNumber: '0.1.0',
  msiName: 'WSLc.Desktop-0.1.0-x86_64.msi',
  session: 'wslc-desktop',
  sessionRoot: '%LOCALAPPDATA%\\WSLcDesktop\\',
  license: 'Apache-2.0',
} as const;

export const links = {
  msi: 'https://github.com/timeroute/wslc-desktop/releases/download/v0.1.0/WSLc.Desktop-0.1.0-x86_64.msi',
  releases: 'https://github.com/timeroute/wslc-desktop/releases',
  repo: 'https://github.com/timeroute/wslc-desktop',
  fork: 'https://github.com/timeroute/wslc-rs',
  gpui: 'https://gpui-kit.com',
  license: 'https://www.apache.org/licenses/LICENSE-2.0',
  wsl: 'https://learn.microsoft.com/windows/wsl/install',
  vcredist: 'https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist',
  websiteRepo: 'https://github.com/timeroute/wslc-desktop-website',
} as const;

export const meta = {
  title: {
    zh: 'WSLc Desktop — WSL 容器桌面管理器',
    en: 'WSLc Desktop — Desktop manager for WSL Containers',
  },
  description: {
    zh: 'WSLc Desktop 是面向 Windows WSL Containers 的轻量级桌面管理器，在独立会话 wslc-desktop 中管理容器、镜像与 VHD 卷。',
    en: 'Lightweight desktop manager for Windows WSL Containers. Manage containers, images, and VHD volumes in the isolated wslc-desktop session.',
  },
} as const;

export type Localized = {
  zh: string;
  en: string;
};

export const nav = [
  { href: '#screenshots', zh: '界面', en: 'Screenshots' },
  { href: '#features', zh: '功能', en: 'Features' },
  { href: '#requirements', zh: '环境', en: 'Requirements' },
  { href: '#download', zh: '下载', en: 'Download' },
] as const;

export const screenshots = [
  {
    src: 'screenshots/overview.png',
    width: 2164,
    height: 1442,
    zh: '总览',
    en: 'Overview',
    caption: {
      zh: '引擎为 LIVE，并显示资源与会话 wslc-desktop。',
      en: 'The engine is LIVE, with resources and the wslc-desktop session.',
    },
    alt: {
      zh: 'WSLc Desktop 总览：引擎 LIVE、资源，以及会话 wslc-desktop',
      en: 'WSLc Desktop Overview: engine LIVE, resources, and the wslc-desktop session',
    },
  },
  {
    src: 'screenshots/containers-logs.png',
    width: 2164,
    height: 1442,
    zh: '容器日志',
    en: 'Containers logs',
    caption: {
      zh: '查看 nginx 容器的日志。',
      en: 'Container logs for nginx.',
    },
    alt: {
      zh: 'WSLc Desktop 容器页：nginx 容器日志窗口',
      en: 'WSLc Desktop Containers: logs window for an nginx container',
    },
  },
  {
    src: 'screenshots/images-pull.png',
    width: 2164,
    height: 1442,
    zh: '拉取镜像',
    en: 'Pull image',
    caption: {
      zh: '拉取镜像 alpine:latest。',
      en: 'Pull dialog for alpine:latest.',
    },
    alt: {
      zh: 'WSLc Desktop 镜像页：拉取 alpine:latest',
      en: 'WSLc Desktop Images: pull dialog for alpine:latest',
    },
  },
] as const;

export const features: {
  id: string;
  index: string;
  zh: string;
  en: string;
  hint: Localized;
  points: Localized[];
}[] = [
  {
    id: 'overview',
    index: '01',
    zh: '总览',
    en: 'Overview',
    hint: { zh: '版本、资源与摘要', en: 'Versions, resources, and summaries' },
    points: [
      { zh: '引擎、SDK 与应用版本', en: 'Engine, SDK, and app versions' },
      { zh: '会话 CPU 与内存', en: 'Session CPU and memory' },
      { zh: '容器、镜像与卷的摘要', en: 'Summaries of containers, images, and volumes' },
    ],
  },
  {
    id: 'containers',
    index: '02',
    zh: '容器',
    en: 'Containers',
    hint: { zh: '创建、操作与恢复', en: 'Create, operate, and restore' },
    points: [
      {
        zh: '创建时配置端口、bind 挂载与命名卷',
        en: 'Create with ports, bind mounts, and named volumes',
      },
      { zh: '启动、停止、重启', en: 'Start, stop, and restart' },
      {
        zh: '日志、检查（inspect）、执行（exec）与删除',
        en: 'Logs, inspect, exec, and remove',
      },
      { zh: '通过 catalog 恢复', en: 'Restore from the catalog' },
    ],
  },
  {
    id: 'images',
    index: '03',
    zh: '镜像',
    en: 'Images',
    hint: { zh: '拉取、创建与删除', en: 'Pull, create, and delete' },
    points: [
      { zh: '拉取镜像', en: 'Pull an image' },
      { zh: '从镜像创建容器', en: 'Create a container from an image' },
      { zh: '删除镜像', en: 'Delete an image' },
    ],
  },
  {
    id: 'volumes',
    index: '04',
    zh: '卷',
    en: 'Volumes',
    hint: { zh: '1、2、5、10 GiB', en: '1, 2, 5, and 10 GiB' },
    points: [
      {
        zh: '创建 1、2、5 或 10 GiB 的 VHD 卷',
        en: 'Create a VHD volume of 1, 2, 5, or 10 GiB',
      },
      { zh: '删除卷', en: 'Delete a volume' },
    ],
  },
  {
    id: 'settings',
    index: '05',
    zh: '设置',
    en: 'Settings',
    hint: { zh: '语言、主题与下次会话', en: 'Language, theme, and the next session' },
    points: [
      { zh: '中文 / English 界面', en: 'Chinese / English UI' },
      { zh: '主题', en: 'Theme' },
      {
        zh: '会话 CPU 与内存，下次会话生效',
        en: 'Session CPU and memory for the next session',
      },
    ],
  },
];

export const steps: Localized[] = [
  {
    zh: '使用 Windows 10 或 Windows 11，x64。',
    en: 'Use Windows 10 or Windows 11, x64.',
  },
  {
    zh: '安装或更新到 WSL 2.9.3 或更高版本。',
    en: 'Install or update to WSL 2.9.3 or newer.',
  },
  {
    zh: '从 Releases 下载 MSI 并安装。',
    en: 'Download the MSI from Releases and install it.',
  },
  {
    zh: '首次启动时，在阻塞对话框中安装或更新 SDK。',
    en: 'On first launch, install or update the SDK in the blocking dialog.',
  },
];
