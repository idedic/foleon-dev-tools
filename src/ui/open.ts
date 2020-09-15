import $ from 'cash-dom';

import { lsGet, lsSet } from '../services/ls';
import { Api, App, DIVIDER, Env } from '../types';
import { getApiUrl, getDashboardFullUrl, getEditorFullUrl, getPreviewerFullUrl } from '../services/urls';
import { renderOption } from './tools';
import { additionalEnvs, apis, defaultEnvs, getInfo } from '../services/data';
import { createTab, getActiveTab, updateTab } from '../services/chrome';

const $owPubId = $('#owPubId');
const $owApp = $('#owApp');
const $owEnv = $('#owEnv');
const $owApi = $('#owApi');
const $owOpen = $('#owOpen');
const $owOpenMore = $('#owOpenMore');
const $owMoreWrap = $('#owMoreWrap');
const $owMoreShowUrl = $('#owMoreShowUrl');
const $owMoreThisTab = $('#owMoreThisTab');

const renderOwEnvEnvsUI = () => {
  const envs = [...defaultEnvs, DIVIDER, ...additionalEnvs];
  const ui = envs.map((env) => renderOption(env)).join('');
  $owEnv.html(ui);
};

const renderApisUI = () => {
  const ui = apis.map((api) => renderOption(api, `<option value="${getApiUrl(api)}">${api}</option>`)).join('');
  $owApi.html(ui);
};

const setOwDataUI = () => {
  const owData = lsGet('owData') || {};
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
    const pubId = $owPubId.val() as string;
    const env = $owEnv.val() as string;
    const api = $owApi.val() as string;

    let url = '';

    if (app === App.EDITOR) {
      url = getEditorFullUrl(info, env);
    } else if (app === App.PREVIEWER) {
      url = getPreviewerFullUrl(env, pubId, api);
    } else if (app === App.DASHBOARD) {
      url = getDashboardFullUrl(env);
    }

    lsSet('owData', { app, env, api });

    return url;
  };

  $owPubId.val(info.pubId);

  $owApp
    .on('change', () => {
      const app = $owApp.val();
      if (app === App.EDITOR || app === App.DASHBOARD) {
        $owPubId.parent().hide();
        $owApi.parent().hide();
      } else {
        $owPubId.parent().show();
        $owApi.parent().show();
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
