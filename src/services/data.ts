import { Api, App, DEFAULT, Env, Info, LsKeys, Tab } from '../types';
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
  [getApiUrl(Api.ACCEPTANCE_CLOUD)]: {
    [flagsKeys.api]: 'https://api.acceptance.foleon.cloud',
    [flagsKeys.auth]: 'https://auth.acceptance.foleon.cloud',
  },
  [getApiUrl(Api.STAGING_CLOUD)]: {
    [flagsKeys.api]: 'https://api.staging.foleon.cloud',
    [flagsKeys.auth]: 'https://auth.staging.foleon.cloud',
  },
  [getApiUrl(DEFAULT)]: {
    [flagsKeys.api]: false,
    [flagsKeys.auth]: false,
  },
};

export const apis = [Api.PRODUCTION, Api.ACCEPTANCE, Api.STAGING, Api.ACCEPTANCE_CLOUD, Api.STAGING_CLOUD];
export const defaultEnvs = [
  Env.PRODUCTION,
  Env.BETA,
  Env.RELEASE,
  Env.RELEASE_BETA,
  Env.ACCEPTANCE,
  Env.STAGING,
  Env.ACCEPTANCE_CLOUD,
  Env.STAGING_CLOUD,
];
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

  const matchLocalEnv = url.match(/\/\/localhost:(\d+)/);
  const matchProductionEnv = url.match(/\/\/(editor|previewer|app)\.foleon\.com\//);
  const matchDevEnv = url.match(/\/\/(editor|previewer|app)(-(.+))?\.foleon\.dev/);
  const matchCloudEnv = url.match(/\/\/(editor|previewer|app)\.(.+)\.foleon\.cloud\//);

  const checkIfFoleonApp = (applicationSubdomain: App.EDITOR | App.PREVIEWER | 'app', localhostPort: string) => {
    return (
      (matchLocalEnv && matchLocalEnv[1] === localhostPort) ||
      (matchProductionEnv && matchProductionEnv[1] === applicationSubdomain) ||
      (matchDevEnv && matchDevEnv[1] === applicationSubdomain) ||
      (matchCloudEnv && matchCloudEnv[1] === applicationSubdomain)
    );
  };

  const matchPubId = url.match(/\/publication\/(\d+)/);
  const matchPageId = url.match(/\/pages\/(\d+)/);
  const matchOverlayId = url.match(/\/overlay\/(\d+)/);

  const app = (() => {
    if (checkIfFoleonApp(App.EDITOR, localhostEditorPort)) return App.EDITOR;
    if (checkIfFoleonApp('app', localhostDashboardPort)) return App.DASHBOARD;
    if (checkIfFoleonApp(App.PREVIEWER, localhostPreviewerPort)) return App.PREVIEWER;
  })();

  const env = (() => {
    if (matchLocalEnv) return 'localhost';
    if (matchProductionEnv) return Env.PRODUCTION;
    if (matchDevEnv) return matchDevEnv[3];
    if (matchCloudEnv) return `${matchCloudEnv[2]} cloud`;
  })();

  info = {
    app,
    env,
    pubId: matchPubId && matchPubId[1],
    pageId: matchPageId && matchPageId[1],
    overlayId: matchOverlayId && matchOverlayId[1],
    pubName: (title || '').split(' - ')[1] || '',
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
