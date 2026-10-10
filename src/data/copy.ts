export const product = {
  name: 'WSLc Desktop',
  version: 'v0.1.0',
  versionNumber: '0.1.0',
  msiName: 'WSLc.Desktop-0.1.0-x86_64.msi',
  license: 'Apache-2.0',
} as const;

export const links = {
  msi: 'https://github.com/timeroute/wslc-desktop/releases/download/v0.1.0/WSLc.Desktop-0.1.0-x86_64.msi',
  releases: 'https://github.com/timeroute/wslc-desktop/releases',
  repo: 'https://github.com/timeroute/wslc-desktop',
  license: 'https://www.apache.org/licenses/LICENSE-2.0',
  websiteRepo: 'https://github.com/timeroute/wslc-desktop-website',
} as const;

export const meta = {
  title: {
    zh: 'WSLc Desktop，Windows 上的 WSL 容器管理器',
    en: 'WSLc Desktop, WSL container manager for Windows',
  },
  description: {
    zh: 'WSLc Desktop 是 Windows 上的 WSL 容器桌面管理器，用来管理容器、镜像和卷。',
    en: 'WSLc Desktop is a Windows desktop manager for WSL containers, images, and volumes.',
  },
} as const;

export type Localized = {
  zh: string;
  en: string;
};

export const nav = [
  { href: '#features', zh: '功能', en: 'Features' },
  { href: '#screenshots', zh: '界面', en: 'Screenshots' },
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
      zh: '版本和资源占用。',
      en: 'Versions and resource use.',
    },
    alt: {
      zh: 'WSLc Desktop 总览',
      en: 'WSLc Desktop overview',
    },
  },
  {
    src: 'screenshots/containers-logs.png',
    width: 2164,
    height: 1442,
    zh: '容器日志',
    en: 'Containers logs',
    caption: {
      zh: '容器日志。',
      en: 'Container logs.',
    },
    alt: {
      zh: 'WSLc Desktop 容器日志',
      en: 'WSLc Desktop container logs',
    },
  },
  {
    src: 'screenshots/images-pull.png',
    width: 2164,
    height: 1442,
    zh: '拉取镜像',
    en: 'Pull image',
    caption: {
      zh: '拉取镜像。',
      en: 'Pull an image.',
    },
    alt: {
      zh: 'WSLc Desktop 拉取镜像',
      en: 'WSLc Desktop pull image',
    },
  },
] as const;

export const features: {
  zh: string;
  en: string;
  line: Localized;
}[] = [
  {
    zh: '容器',
    en: 'Containers',
    line: { zh: '创建、启动、停止、看日志。', en: 'Create, start, stop, and read logs.' },
  },
  {
    zh: '镜像',
    en: 'Images',
    line: { zh: '拉取、删除。', en: 'Pull and delete.' },
  },
  {
    zh: '卷',
    en: 'Volumes',
    line: { zh: '创建、删除。', en: 'Create and delete.' },
  },
  {
    zh: '总览',
    en: 'Overview',
    line: { zh: '版本、资源、语言、主题。', en: 'Versions, resources, language, and theme.' },
  },
];
