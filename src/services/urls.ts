import { DEFAULT, Env, Info } from '../types';

// editor

export const getEditorRootUrl = (env: string) => {
  if (env === DEFAULT) {
    return DEFAULT;
  } else if (env === Env.PRODUCTION) {
    return `https://editor.foleon.com`;
  } else {
    return `https://editor-${env}.foleon.dev`;
  }
};

export const getEditorFullUrl = (info: Info, env: string) => {
  const path = `/publication/${info.pubId}/pages/${info.pageId}${info.overlayId ? `/overlay/${info.overlayId}` : ''}`;
  return `${getEditorRootUrl(env)}${path}`;
};

// previewer

export const getPreviewerRootUrl = (env: string) => {
  if (env === DEFAULT) {
    return DEFAULT;
  } else if (env === Env.PRODUCTION) {
    return `https://previewer.foleon.com`;
  } else {
    return `https://previewer-${env}.foleon.dev`;
  }
};

export const getPreviewerFullUrl = (env: string, pubId: string, api: string) => {
  const path = `/?publicationId=${pubId}&api=${api}`;
  return `${getPreviewerRootUrl(env)}${path}`;
};

// dashboard

export const getDashboardRootUrl = (env: string) => {
  if (env === DEFAULT) {
    return DEFAULT;
  } else if (env === Env.PRODUCTION) {
    return `https://app.foleon.com`;
  } else {
    return `https://app-${env}.foleon.dev`;
  }
};

export const getDashboardFullUrl = (env: string) => getDashboardRootUrl(env);

// api

export const getApiUrl = (env: string) => {
  if (env === DEFAULT) {
    return DEFAULT;
  } else if (env === Env.PRODUCTION) {
    return `https://api.foleon.com`;
  } else {
    return `https://api-${env}.foleon.dev`;
  }
};
