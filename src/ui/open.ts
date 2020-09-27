import $ from 'cash-dom';

import { lsGet, lsSet } from '../services/ls';
import { Api, App, DIVIDER, Env, LOCALHOST, LsKeys } from '../types';
import { getApiUrl, getDashboardFullUrl, getEditorFullUrl, getPreviewerFullUrl, getItemPreviewerFullUrl } from '../services/urls';
import { renderOption } from './tools';
import { additionalEnvs, apis, defaultEnvs, getInfo } from '../services/data';
import { createTab, getActiveTab, updateTab } from '../services/chrome';

const $owApp = $('#owApp');
const $owEnv = $('#owEnv');
const $owItemId = $('#owItemId');
const $owCompositionId = $('#owCompositionId');
const $owApi = $('#owApi');
const $owOpen = $('#owOpen');
const $owOpenMore = $('#owOpenMore');
const $owMoreWrap = $('#owMoreWrap');
const $owMoreShowUrl = $('#owMoreShowUrl');
const $owMoreThisTab = $('#owMoreThisTab');

const renderOwEnvEnvsUI = () => {
  const envs = [...defaultEnvs, DIVIDER, ...additionalEnvs, DIVIDER, LOCALHOST];
  const ui = envs.map((env) => renderOption(env)).join('');
  $owEnv.html(ui);
};

const renderApisUI = () => {
  const ui = apis.map((api) => renderOption(api, `<option value="${getApiUrl(api)}">${api}</option>`)).join('');
  $owApi.html(ui);
};

const setOwDataUI = () => {
  const owData = lsGet(LsKeys.OW_DATA) || {};
  $owApp.val(owData.app || App.EDITOR);
  $owEnv.val(owData.env || Env.ACCEPTANCE);
  $owApi.val(owData.api || getApiUrl(Api.ACCEPTANCE));
};

const hideMoreWrapHandler = () => {
  $owMoreWrap.addClass('h');
  document.removeEventListener('click', hideMoreWrapHandler);
};

export const initOpen = () => {
  renderOwEnvEnvsUI();
  renderApisUI();
  setOwDataUI();

  const info = getInfo();

  const getOpenUrl = () => {
    const app = $owApp.val() as string;
    const env = $owEnv.val() as string;
    const api = $owApi.val() as string;
    const itemId = $owItemId.val() as string;
    const compositionId = $owCompositionId.val() as string;

    let url = '';

    if (app === App.EDITOR) {
      url = getEditorFullUrl(info, env);
    } else if (app === App.PREVIEWER) {
      url = getPreviewerFullUrl(env, info.pubId, api);
    } else if (app === App.ITEM_PREVIEWER) {
      url = getItemPreviewerFullUrl(env, itemId, compositionId, api);
    } else if (app === App.DASHBOARD) {
      url = getDashboardFullUrl(env);
    }

    lsSet(LsKeys.OW_DATA, { app, env, api });

    return url;
  };

  $owApp
    .on('change', () => {
      const app = $owApp.val();
      switch (app) {
        case App.PREVIEWER:
          $owItemId.parent().hide();
          $owCompositionId.parent().hide();
          $owApi.parent().show();
          break;
        case App.ITEM_PREVIEWER:
          $owItemId.parent().show();
          $owCompositionId.parent().show();
          $owApi.parent().show();
          break;
        default:
          $owItemId.parent().hide();
          $owCompositionId.parent().hide();
          $owApi.parent().hide();
          break;
      }
    })
    .trigger('change');

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
