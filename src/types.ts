export interface Info {
  env?: string;
  pubId?: string;
  pageId?: string;
  overlayId?: string;
  title?: string;
}

export type Tab = chrome.tabs.Tab;

export enum UISection {
  logo = 'sectionLogo',
  error = 'sectionError',
  main = 'sectionMain',
}

export enum Env {
  PRODUCTION = 'production',
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
