import { Api, DEFAULT, Env, Info, LOCALHOST } from '../types';
import { localhostDashboardPort, localhostEditorPort, localhostPreviewerPort, localhostViewerPort } from './data';

// editor
export const getEditorRootUrl = (env: string, prId?: string) => {
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
      return `https://editor-release.foleon.dev`;
    case Env.RELEASE_BETA:
      return `https://editor-beta.foleon.dev`;
    case Env.PR:
      return `https://${prId}-editor.qa.staging.foleon.cloud`;
    default:
      return `https://editor.${env}.foleon.cloud`;
  }
};

export const getEditorFullUrl = (env: string, publicationId: string, pageId: string, overlayId?: string, prId?: string) => {
  const path = `/publication/${publicationId}/pages/${pageId}${overlayId ? `/overlay/${overlayId}` : ''}`;
  return `${getEditorRootUrl(env, prId)}${path}`;
};

// previewer
export const getPreviewerRootUrl = (env: string, prId?: string) => {
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
      return `https://previewer-release.foleon.dev`;
    case Env.RELEASE_BETA:
      return `https://previewer-beta.foleon.dev`;
    case Env.PR:
      return `https://${prId}-previewer.qa.staging.foleon.cloud`;
    default:
      return `https://previewer.${env}.foleon.cloud`;
  }
};

export const getPreviewerFullUrl = (env: string, pubId: string, api: string, print?: boolean, prId?: string) => {
  const path = `/?publicationId=${pubId}&api=${api}${print ? '&_print_=1' : ''}`;
  return `${getPreviewerRootUrl(env, prId)}${path}`;
};

export const getItemPreviewerFullUrl = (env: string, itemId: string, compositionId: string, api: string, screenshotHeight = 840, prId?: string) => {
  const path = `/?itemId=${itemId}&compositionId=${compositionId}&_screenshots_=1&screenheight=${screenshotHeight}&api=${api}`;
  return `${getPreviewerRootUrl(env, prId)}${path}`;
};

// viewer
export const getViewerRootUrl = (env: string) => {
  switch (env) {
    case DEFAULT:
      return DEFAULT;
    case LOCALHOST:
      return `http://localhost:${localhostViewerPort}`;
    // TODO add others later...
    default:
      return `http://viewer.${env}.foleon.cloud`;
  }
};

export const getViewerFullUrl = (env: string, pubId: string, api: string) => {
  const path = `/a?publicationId=${pubId}&api=${api}`;
  return `${getViewerRootUrl(env)}${path}`;
};

// dashboard
export const getDashboardRootUrl = (env: string, prId?: string) => {
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
      return `https://app-release.foleon.dev`;
    case Env.RELEASE_BETA:
      return `https://app-beta.foleon.dev`;
    case Env.PR:
      return `https://${prId}-app.qa.staging.foleon.cloud`;
    default:
      return `https://app.${env}.foleon.cloud`;
  }
};

export const getDashboardFullUrl = getDashboardRootUrl;

// api
export const getApiUrl = (api: string) => {
  switch (api) {
    case DEFAULT:
      return DEFAULT;
    case Api.PRODUCTION:
      return `https://api.foleon.com`;
    default:
      return `https://api.${api}.foleon.cloud`;
  }
};
