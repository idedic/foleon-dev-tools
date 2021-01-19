export interface Info {
  app?: App;
  env?: string;
  pubId?: string;
  pageId?: string;
  overlayId?: string;
  pubName?: string;
}

export type Tab = chrome.tabs.Tab;
export type UpdateProperties = chrome.tabs.UpdateProperties;

export enum Api {
  PRODUCTION = 'production',
  ACCEPTANCE = 'acceptance',
  ACCEPTANCE_CLOUD = 'acceptance cloud',
  STAGING = 'staging',
  STAGING_CLOUD = 'staging cloud',
}

export enum Env {
  PRODUCTION = 'production',
  BETA = 'beta',
  RELEASE = 'release',
  RELEASE_BETA = 'release beta',
  ACCEPTANCE = 'acceptance',
  ACCEPTANCE_CLOUD = 'acceptance cloud',
  STAGING = 'staging',
  STAGING_CLOUD = 'staging cloud',
}

export enum App {
  EDITOR = 'editor',
  PREVIEWER = 'previewer',
  ITEM_PREVIEWER = 'item-previewer',
  DASHBOARD = 'dashboard',
}

export const DEFAULT = 'default';
export const DIVIDER = '-';
export const LOCALHOST = 'localhost';

export enum LsKeys {
  OW_DATA = 'owData',
  FAV_DATA = 'favData',
  ADDITIONAL_ENVS = 'additionalEnvs',
  LOCALHOST_EDITOR_PORT = 'localhostEditorPort',
  LOCALHOST_PREVIEWER_PORT = 'localhostPreviewerPort',
  LOCALHOST_DASHBOARD_PORT = 'localhostDashboardPort',
}

export interface ICurrentApp {
  isEditor: boolean;
  isDashboard: boolean;
  isPreviewer: boolean;
}
