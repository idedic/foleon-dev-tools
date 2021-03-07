import $, { Cash } from 'cash-dom';

import { lsGet, lsSet } from '../services/ls';
import { Api, App, DIVIDER, Env, Info, LOCALHOST, LsKeys } from '../types';
import { getApiUrl, getDashboardFullUrl, getEditorFullUrl, getPreviewerFullUrl, getItemPreviewerFullUrl } from '../services/urls';
import { renderOption } from './tools';
import { additionalEnvs, apis, defaultEnvs, getInfo } from '../services/data';
import { createTab, getActiveTab, updateTab } from '../services/chrome';
import { FLAGS } from '../extensionFlags';

type NewTabData = {
  app: string;
  env: string;
  api: string;
  prId: string;
  print: boolean;
};

const hideRow = ($el: Cash) => $el.closest('p').hide();
const showRow = ($el: Cash) => $el.closest('p').show();
const hideRows = (rowArray: Cash[]) => rowArray.map(hideRow);
const showRows = (rowArray: Cash[]) => rowArray.map(showRow);

const getNewTabData = () => (lsGet(LsKeys.NEW_TAB_DATA) || {}) as NewTabData;
const setNewTabData = (newTabData: NewTabData) => lsSet(LsKeys.NEW_TAB_DATA, newTabData);

const $newTabApp = $('#newTabApp');
const $newTabEnv = $('#newTabEnv');
//----- fields depending on selected app -------
const $newTabPublicationId = $('#newTabPublicationId');
const $newTabPageId = $('#newTabPageId');
const $newTabOverlayId = $('#newTabOverlayId');
const $newTabItemId = $('#newTabItemId');
const $newTabCompositionId = $('#newTabCompositionId');
const $newTabApi = $('#newTabApi');
const $newTabPrint = $('#newTabPrint');
const $newTabOpen = $('#newTabOpen');
const $newTabPrId = $('#newTabPrId');

const $newTabOpenMore = $('#newTabOpenMore');
const $newTabMoreWrap = $('#newTabMoreWrap');
const $newTabMoreShowUrl = $('#newTabMoreShowUrl');
const $newTabMoreThisTab = $('#newTabMoreThisTab');

const getAppOptions = (currentApp: App): App[] => {
  switch (currentApp) {
    case App.DASHBOARD:
    case App.PREVIEWER:
    case App.ITEM_PREVIEWER:
      return [App.DASHBOARD];
    default:
      // App.EDITOR
      return [App.EDITOR, App.PREVIEWER, App.ITEM_PREVIEWER, App.DASHBOARD];
  }
};

const renderAppOptionsUI = (currentApp: App) => {
  const appOptions = getAppOptions(currentApp);

  const ui = appOptions.map((appOption, index) => renderOption(appOption)).join('');
  $newTabApp.html(ui);
};

const renderNewTabEnvsUI = () => {
  const envs: string[] = [...defaultEnvs, DIVIDER, ...(FLAGS.SHOW_NAMED_ENVS ? [additionalEnvs, DIVIDER] : []), LOCALHOST];
  const ui = envs.map((env) => renderOption(env)).join('');
  $newTabEnv.html(ui);
};

const renderApisUI = () => {
  const ui = apis.map((api) => renderOption(api, `<option value="${getApiUrl(api)}">${api}</option>`)).join('');
  $newTabApi.html(ui);
};

const setNewTabDataUI = (info: Info) => {
  const newTabData = getNewTabData();
  const possibleApps = getAppOptions(info.app);
  const firstPossibleApp = possibleApps.length > 0 && possibleApps[0];
  $newTabApp.val(possibleApps.includes(newTabData.app as App) ? newTabData.app : possibleApps.includes(info.app) ? info.app : firstPossibleApp);
  $newTabEnv.val(newTabData.env || Env.ACCEPTANCE);
  $newTabPrId.val(newTabData.prId || info.prId);
  $newTabPublicationId.val(info.pubId);
  $newTabPageId.val(info.pageId);
  $newTabOverlayId.val(info.overlayId);
  $newTabApi.val(newTabData.api || getApiUrl(Api.ACCEPTANCE));
  $newTabPrint.prop('checked', !!newTabData.print || false);
};

const hideMoreWrapHandler = () => {
  $newTabMoreWrap.addClass('h');
  document.removeEventListener('click', hideMoreWrapHandler);
};

export const initOpen = () => {
  const info = getInfo();

  renderAppOptionsUI(info.app);
  renderNewTabEnvsUI();
  renderApisUI();

  setNewTabDataUI(info);

  $newTabApp
    .on('change', () => {
      const app = $newTabApp.val();
      switch (app) {
        case App.PREVIEWER:
          hideRows([$newTabPageId, $newTabOverlayId, $newTabItemId, $newTabCompositionId]);
          showRows([$newTabPublicationId, $newTabApi, $newTabPrint]);
          break;
        case App.ITEM_PREVIEWER:
          hideRows([$newTabPublicationId, $newTabPageId, $newTabOverlayId, $newTabPrint]);
          showRows([$newTabItemId, $newTabCompositionId, $newTabApi]);
          break;
        case App.EDITOR:
          hideRows([$newTabItemId, $newTabCompositionId, $newTabApi, $newTabPrint]);
          showRows([$newTabPublicationId, $newTabPageId, $newTabOverlayId]);
          break;
        default:
          //DASHBOARD
          hideRows([$newTabPageId, $newTabPublicationId, $newTabOverlayId, $newTabItemId, $newTabCompositionId, $newTabApi, $newTabPrint]);
          break;
      }

      // these fields will be hidden for now (looks like they will not be neccessary)
      // TODO: remove these fields (from popup.html and this file) if they are not needed after some time
      if (!FLAGS.SHOW_ADDITIONAL_FIELDS) {
        hideRows([$newTabPublicationId, $newTabPageId, $newTabOverlayId]);
      }
    })
    .trigger('change');

  $newTabEnv
    .on('change', () => {
      const env = $newTabEnv.val();
      switch (env) {
        case Env.PR:
          showRows([$newTabPrId]);
          break;
        default:
          hideRows([$newTabPrId]);
          break;
      }
    })
    .trigger('change');

  const getOpenUrl = () => {
    const app = $newTabApp.val() as string;
    const env = $newTabEnv.val() as string;
    const api = $newTabApi.val() as string;
    const prId = $newTabPrId.val() as string;
    const publicationId = $newTabPublicationId.val() as string;
    const pageId = $newTabPageId.val() as string;
    const overlayId = $newTabOverlayId.val() as string;
    const itemId = $newTabItemId.val() as string;
    const compositionId = $newTabCompositionId.val() as string;
    const print = $newTabPrint.prop('checked');

    let url = '';

    if (app === App.EDITOR) {
      url = getEditorFullUrl(env, publicationId, pageId, overlayId, prId);
    } else if (app === App.PREVIEWER) {
      url = getPreviewerFullUrl(env, publicationId, api, print, prId);
    } else if (app === App.ITEM_PREVIEWER) {
      url = getItemPreviewerFullUrl(env, itemId, compositionId, api, undefined, prId);
    } else if (app === App.DASHBOARD) {
      url = getDashboardFullUrl(env, prId);
    }

    setNewTabData({ app, env, api, prId, print });

    return url;
  };

  $newTabOpen.on('click', () => {
    const url = getOpenUrl();
    createTab({ url, active: true });
    window.close();
  });

  $newTabOpenMore.on('click', () => {
    $newTabMoreWrap.removeClass('h');
    document.addEventListener('click', hideMoreWrapHandler, true);
  });

  $newTabMoreShowUrl.on('click', () => {
    alert(getOpenUrl());
  });

  $newTabMoreThisTab.on('click', () => {
    getActiveTab((activeTab) => {
      updateTab(activeTab.id, { url: getOpenUrl() });
      window.close();
    });
  });
};
