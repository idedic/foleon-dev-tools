import { Api, DEFAULT, Env, Info, LOCALHOST } from '../types';
import { localhostDashboardPort, localhostEditorPort, localhostPreviewerPort } from './data';

// editor

export const getEditorRootUrl = (env: string) => {
  switch (env) {
    case DEFAULT:
      return DEFAULT;
    case LOCALHOST:
      return `https://localhost:${localhostEditorPort}`;

    case Env.PRODUCTION:
      return `https://editor.foleon.com`;
    case Env.BETA:
      return `https://editor-beta.foleon.com`;
    case Env.RELEASE:
      return `https://editor.foleon.dev`;
    case Env.RELEASE_BETA:
      return `https://editor-beta.foleon.dev`;

    case Env.ACCEPTANCE_CLOUD:
      return `https://editor.acceptance.foleon.cloud`;
    case Env.STAGING_CLOUD:
      return `https://editor.staging.foleon.cloud`;

    default:
      return `https://editor-${env}.foleon.dev`;
  }
};

export const getEditorFullUrl = (env: string, publicationId: string, pageId: string, overlayId?: string) => {
  const path = `/publication/${publicationId}/pages/${pageId}${overlayId ? `/overlay/${overlayId}` : ''}`;
  return `${getEditorRootUrl(env)}${path}`;
};

// previewer

export const getPreviewerRootUrl = (env: string) => {
  switch (env) {
    case DEFAULT:
      return DEFAULT;
    case LOCALHOST:
      return `http://localhost:${localhostPreviewerPort}`;

    case Env.PRODUCTION:
      return `https://previewer.foleon.com`;
    case Env.BETA:
      return `https://previewer-beta.foleon.com`;
    case Env.RELEASE:
      return `https://previewer.foleon.dev`;
    case Env.RELEASE_BETA:
      return `https://previewer-beta.foleon.dev`;

    case Env.ACCEPTANCE_CLOUD:
      return `https://previewer.acceptance.foleon.cloud`;
    case Env.STAGING_CLOUD:
      return `https://previewer.staging.foleon.cloud`;

    default:
      return `https://previewer-${env}.foleon.dev`;
  }
};

export const getPreviewerFullUrl = (env: string, pubId: string, api: string) => {
  const path = `/?publicationId=${pubId}&api=${api}`;
  return `${getPreviewerRootUrl(env)}${path}`;
};

export const getItemPreviewerFullUrl = (env: string, itemId: string, compositionId: string, api: string, screenshotHeight = 840) => {
  const path = `/?itemId=${itemId}&compositionId=${compositionId}&_screenshots_=1&screenheight=${screenshotHeight}&api=${api}`;
  return `${getPreviewerRootUrl(env)}${path}`;
};

// dashboard

export const getDashboardRootUrl = (env: string) => {
  switch (env) {
    case DEFAULT:
      return DEFAULT;
    case LOCALHOST:
      return `http://localhost:${localhostDashboardPort}`;

    case Env.PRODUCTION:
      return `https://app.foleon.com`;
    case Env.BETA:
      return `https://app-beta.foleon.com`;
    case Env.RELEASE:
      return `https://app.foleon.dev`;
    case Env.RELEASE_BETA:
      return `https://app-beta.foleon.dev`;

    case Env.ACCEPTANCE_CLOUD:
      return `https://app.acceptance.foleon.cloud`;
    case Env.STAGING_CLOUD:
      return `https://app.staging.foleon.cloud`;

    default:
      return `https://app-${env}.foleon.dev`;
  }
};

export const getDashboardFullUrl = (env: string) => getDashboardRootUrl(env);

// api

export const getApiUrl = (api: string) => {
  switch (api) {
    case DEFAULT:
      return DEFAULT;
    case Api.PRODUCTION:
      return `https://api.foleon.com`;
    case Api.ACCEPTANCE_CLOUD:
      return `https://api.acceptance.foleon.cloud`;
    case Api.STAGING_CLOUD:
      return `https://api.staging.foleon.cloud`;
    default:
      return `https://api-${api}.foleon.dev`;
  }
};
