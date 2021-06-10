export interface Info {
  app?: App;
  env?: string;
  prId?: string;
  docId?: string;
  pageId?: string;
  overlayId?: string;
  docName?: string;
}

export type Tab = chrome.tabs.Tab;
export type UpdateProperties = chrome.tabs.UpdateProperties;

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
  PR = 'PR',
}

export enum App {
  EDITOR = 'editor',
  NEW_EDITOR = 'new-editor',
  PREVIEWER = 'previewer',
  ITEM_PREVIEWER = 'item-previewer',
  DASHBOARD = 'dashboard',
  VIEWER = 'viewer',
}

export const DEFAULT = 'default';
export const DIVIDER = '-';
export const LOCALHOST = 'localhost';

export enum LsKeys {
  NEW_TAB_DATA = 'newTabData',
  FAV_DATA = 'favData',
  ADDITIONAL_ENVS = 'additionalEnvs',
  LOCALHOST_EDITOR_PORT = 'localhostEditorPort',
  LOCALHOST_NEW_EDITOR_PORT = 'localhostNewEditorPort',
  LOCALHOST_PREVIEWER_PORT = 'localhostPreviewerPort',
  LOCALHOST_VIEWER_PORT = 'localhostViewerPort',
  LOCALHOST_DASHBOARD_PORT = 'localhostDashboardPort',
}

export interface ICurrentApp {
  isEditor: boolean;
  isDashboard: boolean;
  isPreviewer: boolean;
}
