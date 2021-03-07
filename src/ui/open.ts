import $, { Cash } from 'cash-dom';

import { lsGet, lsSet } from '../services/ls';
import { Api, App, DIVIDER, Env, Info, LOCALHOST, LsKeys } from '../types';
import { getApiUrl, getDashboardFullUrl, getEditorFullUrl, getPreviewerFullUrl, getItemPreviewerFullUrl } from '../services/urls';
import { renderOption } from './tools';
import { additionalEnvs, apis, defaultEnvs, getInfo } from '../services/data';
import { createTab, getActiveTab, updateTab } from '../services/chrome';
import { FLAGS } from '../extensionFlags';

type OwData = {
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

const getOwData = () => (lsGet(LsKeys.OW_DATA) || {}) as OwData;
const setOwData = (owData: OwData) => lsSet(LsKeys.OW_DATA, owData);

const $owApp = $('#owApp');
const $owEnv = $('#owEnv');
//----- fields depending on selected app -------
const $owPublicationId = $('#owPublicationId');
const $owPageId = $('#owPageId');
const $owOverlayId = $('#owOverlayId');
const $owItemId = $('#owItemId');
const $owCompositionId = $('#owCompositionId');
const $owApi = $('#owApi');
const $owPrint = $('#owPrint');
const $owOpen = $('#owOpen');
const $owPrId = $('#owPrId');

const $owOpenMore = $('#owOpenMore');
const $owMoreWrap = $('#owMoreWrap');
const $owMoreShowUrl = $('#owMoreShowUrl');
const $owMoreThisTab = $('#owMoreThisTab');

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
  $owApp.html(ui);
};

const renderOwEnvEnvsUI = () => {
  const envs: string[] = [...defaultEnvs, DIVIDER, ...(FLAGS.SHOW_NAMED_ENVS ? [additionalEnvs, DIVIDER] : []), LOCALHOST];
  const ui = envs.map((env) => renderOption(env)).join('');
  $owEnv.html(ui);
};

const renderApisUI = () => {
  const ui = apis.map((api) => renderOption(api, `<option value="${getApiUrl(api)}">${api}</option>`)).join('');
  $owApi.html(ui);
};

const setOwDataUI = (info: Info) => {
  const owData = getOwData();
  const possibleApps = getAppOptions(info.app);
  const firstPossibleApp = possibleApps.length > 0 && possibleApps[0];
  $owApp.val(possibleApps.includes(owData.app as App) ? owData.app : possibleApps.includes(info.app) ? info.app : firstPossibleApp);
  $owEnv.val(owData.env || Env.ACCEPTANCE);
  $owPrId.val(owData.prId || info.prId);
  $owPublicationId.val(info.pubId);
  $owPageId.val(info.pageId);
  $owOverlayId.val(info.overlayId);
  $owApi.val(owData.api || getApiUrl(Api.ACCEPTANCE));
  $owPrint.prop('checked', !!owData.print || false);
};

const hideMoreWrapHandler = () => {
  $owMoreWrap.addClass('h');
  document.removeEventListener('click', hideMoreWrapHandler);
};

export const initOpen = () => {
  const info = getInfo();

  renderAppOptionsUI(info.app);
  renderOwEnvEnvsUI();
  renderApisUI();

  setOwDataUI(info);

  $owApp
    .on('change', () => {
      const app = $owApp.val();
      switch (app) {
        case App.PREVIEWER:
          hideRows([$owPageId, $owOverlayId, $owItemId, $owCompositionId]);
          showRows([$owPublicationId, $owApi, $owPrint]);
          break;
        case App.ITEM_PREVIEWER:
          hideRows([$owPublicationId, $owPageId, $owOverlayId, $owPrint]);
          showRows([$owItemId, $owCompositionId, $owApi]);
          break;
        case App.EDITOR:
          hideRows([$owItemId, $owCompositionId, $owApi, $owPrint]);
          showRows([$owPublicationId, $owPageId, $owOverlayId]);
          break;
        default:
          //DASHBOARD
          hideRows([$owPageId, $owPublicationId, $owOverlayId, $owItemId, $owCompositionId, $owApi, $owPrint]);
          break;
      }

      // these fields will be hidden for now (looks like they will not be neccessary)
      // TODO: remove these fields (from popup.html and this file) if they are not needed after some time
      if (!FLAGS.SHOW_ADDITIONAL_FIELDS) {
        hideRows([$owPublicationId, $owPageId, $owOverlayId]);
      }
    })
    .trigger('change');

  $owEnv
    .on('change', () => {
      const env = $owEnv.val();
      switch (env) {
        case Env.PR:
          showRows([$owPrId]);
          break;
        default:
          hideRows([$owPrId]);
          break;
      }
    })
    .trigger('change');

  const getOpenUrl = () => {
    const app = $owApp.val() as string;
    const env = $owEnv.val() as string;
    const api = $owApi.val() as string;
    const prId = $owPrId.val() as string;
    const publicationId = $owPublicationId.val() as string;
    const pageId = $owPageId.val() as string;
    const overlayId = $owOverlayId.val() as string;
    const itemId = $owItemId.val() as string;
    const compositionId = $owCompositionId.val() as string;
    const print = $owPrint.prop('checked');

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

    setOwData({ app, env, api, prId, print });

    return url;
  };

  $owOpen.on('click', () => {
    const url = getOpenUrl();
    createTab({ url, active: true });
    window.close();
  });

  $owOpenMore.on('click', () => {
    $owMoreWrap.removeClass('h');
    document.addEventListener('click', hideMoreWrapHandler, true);
  });

  $owMoreShowUrl.on('click', () => {
    alert(getOpenUrl());
  });

  $owMoreThisTab.on('click', () => {
    getActiveTab((activeTab) => {
      updateTab(activeTab.id, { url: getOpenUrl() });
      window.close();
    });
  });
};
