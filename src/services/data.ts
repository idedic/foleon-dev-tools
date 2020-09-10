import { DEFAULT, Env, Info, Tab } from '../types';
import { getApiUrl } from './urls';

export const lsKeys = {
  api: 'X-Api-Override',
  auth: 'X-Auth-Override',
  previewBtn: 'X-Show-Preview-Button',
  previewer: 'X-Previewer-Override',
  debug: 'X-EDITOR-DEBUG',
};

export const apiKeys = {
  [getApiUrl(Env.PRODUCTION)]: {
    [lsKeys.api]: 'https://api.foleon.com',
    [lsKeys.auth]: 'https://auth.foleon.com',
  },
  [getApiUrl(Env.ACCEPTANCE)]: {
    [lsKeys.api]: 'https://api-acceptance.foleon.dev',
    [lsKeys.auth]: 'https://auth-acceptance-dot-instant-magazine.appspot.com',
  },
  [getApiUrl(Env.STAGING)]: {
    [lsKeys.api]: 'https://api-staging.foleon.dev',
    [lsKeys.auth]: 'https://auth-staging-dot-instant-magazine.appspot.com',
  },
  [getApiUrl(DEFAULT)]: {
    [lsKeys.api]: false,
    [lsKeys.auth]: false,
  },
};

export const defaultEnvs = [Env.PRODUCTION, Env.ACCEPTANCE, Env.STAGING];
export const additionalEnvs = ['arsenije', 'zdravko', 'igor', 'slobodan', 'petar', 'anja', 'svetlana', 'maja', 'dusan'];

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

  console.log('Info', info);

  return info;
};

export const getInfo = () => info;

// lsData

let lsData: { [key: string]: any } = {};

export const parseLsData = (data: typeof lsData) => {
  // we don't do anything right now, but maybe in the future...
  lsData = data;

  console.log('lsData', lsData);

  return lsData;
};

export const getLsData = () => lsData;
