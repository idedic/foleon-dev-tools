export interface Info {
  env?: string;
  pubId?: string;
  pageId?: string;
  overlayId?: string;
  title?: string;
}

export type Tab = chrome.tabs.Tab;
export type UpdateProperties = chrome.tabs.UpdateProperties;

export enum UISection {
  logo = 'sectionLogo',
  error = 'sectionError',
  main = 'sectionMain',
}

export enum Api {
  PRODUCTION = 'production',
  ACCEPTANCE = 'acceptance',
  STAGING = 'staging',
}

export enum Env {
  PRODUCTION = 'production',
  BETA = 'beta',
  RELEASE = 'release',
  RELEASE_BETA = 'release beta',
  ACCEPTANCE = 'acceptance',
  STAGING = 'staging',
}

export enum App {
  EDITOR = 'editor',
  PREVIEWER = 'previewer',
  DASHBOARD = 'dashboard',
}

export const DEFAULT = 'default';
export const DIVIDER = '-';
