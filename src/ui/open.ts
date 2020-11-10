import $, { Cash } from 'cash-dom';

import { lsGet, lsSet } from '../services/ls';
import { Api, App, DIVIDER, Env, LOCALHOST, LsKeys } from '../types';
import { getApiUrl, getDashboardFullUrl, getEditorFullUrl, getPreviewerFullUrl } from '../services/urls';
import { renderOption } from './tools';
import { additionalEnvs, apis, defaultEnvs, getInfo } from '../services/data';
import { createTab, getActiveTab, updateTab } from '../services/chrome';

const hideRow = ($el: Cash) => $el.closest('p').hide();
const showRow = ($el: Cash) => $el.closest('p').show();

const $owApp = $('#owApp');
const $owEnv = $('#owEnv');
const $owApi = $('#owApi');
const $owPrint = $('#owPrint');
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
  $owPrint.prop('checked', owData.print || false);
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
    const print = $owPrint.prop('checked');

    let url = '';

    if (app === App.EDITOR) {
      url = getEditorFullUrl(info, env);
    } else if (app === App.PREVIEWER) {
      url = getPreviewerFullUrl(env, info.pubId, api, print);
    } else if (app === App.DASHBOARD) {
      url = getDashboardFullUrl(env);
    }

    lsSet(LsKeys.OW_DATA, { app, env, api, print });

    return url;
  };

  $owApp
    .on('change', () => {
      const app = $owApp.val();
      if (app === App.EDITOR || app === App.DASHBOARD) {
        hideRow($owApi);
        hideRow($owPrint);
      } else {
        showRow($owApi);
        showRow($owPrint);
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
