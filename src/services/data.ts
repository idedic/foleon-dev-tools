import { Api, DEFAULT, Env, Info, LsKeys, Tab } from '../types';
import { getApiUrl } from './urls';
import { lsGet } from './ls';

export const flagsKeys = {
  api: 'X-Api-Override',
  auth: 'X-Auth-Override',
  previewBtn: 'X-Show-Preview-Button',
  previewer: 'X-Previewer-Override',
  debug: 'X-EDITOR-DEBUG',
};

export const apiKeys = {
  [getApiUrl(Api.PRODUCTION)]: {
    [flagsKeys.api]: 'https://api.foleon.com',
    [flagsKeys.auth]: 'https://auth.foleon.com',
  },
  [getApiUrl(Api.ACCEPTANCE)]: {
    [flagsKeys.api]: 'https://api-acceptance.foleon.dev',
    [flagsKeys.auth]: 'https://auth-acceptance-dot-foleon-staging.appspot.com',
  },
  [getApiUrl(Api.STAGING)]: {
    [flagsKeys.api]: 'https://api-staging.foleon.dev',
    [flagsKeys.auth]: 'https://auth-staging-dot-foleon-staging.appspot.com',
  },
  [getApiUrl(DEFAULT)]: {
    [flagsKeys.api]: false,
    [flagsKeys.auth]: false,
  },
};

export const apis = [Api.PRODUCTION, Api.ACCEPTANCE, Api.STAGING];
export const defaultEnvs = [Env.PRODUCTION, Env.BETA, Env.RELEASE, Env.RELEASE_BETA, Env.ACCEPTANCE, Env.STAGING];
export const additionalEnvs = lsGet(LsKeys.ADDITIONAL_ENVS) || [
  'arsenije',
  'zdravko',
  'igor',
  'slobodan',
  'petar',
  'anja',
  'svetlana',
  'maja',
  'marko',
];
export const localhostEditorPort = lsGet(LsKeys.LOCALHOST_EDITOR_PORT) || 8080;
export const localhostPreviewerPort = lsGet(LsKeys.LOCALHOST_PREVIEWER_PORT) || 8081;
export const localhostDashboardPort = lsGet(LsKeys.LOCALHOST_DASHBOARD_PORT) || 3501;

// Info

let info: Info = {};

export const parseInfo = (tab: Tab) => {
  const { url, title } = tab;

  const matchLocal = url.match(/\/\/localhost:/);
  const matchProduction = url.match(/\/\/editor\.foleon\.com\//);
  const matchEnv = url.match(/\/\/editor-(.+)\.foleon\.dev\//);

  const matchPubId = url.match(/\/publication\/(\d+)/);
  const matchPageId = url.match(/\/pages\/(\d+)/);
  const matchOverlayId = url.match(/\/overlay\/(\d+)/);

  info = {
    env: (() => {
      if (matchLocal) return 'localhost';
      if (matchProduction) return Env.PRODUCTION;
      if (matchEnv) return matchEnv[1];
    })(),
    pubId: matchPubId && matchPubId[1],
    pageId: matchPageId && matchPageId[1],
    overlayId: matchOverlayId && matchOverlayId[1],
    title: (title || '').split(' - ')[1] || '',
  };

  return info;
};

export const getInfo = () => info;

// lsData

let lsData: { [key: string]: any } = {};

export const parseLsData = (data: typeof lsData) => {
  // we don't do anything right now, but maybe in the future...
  lsData = data;

  return lsData;
};

export const getLsData = () => lsData;
