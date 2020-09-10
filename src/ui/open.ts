import $ from 'cash-dom';

import { lsGet, lsSet } from '../services/ls';
import { App, DIVIDER, Env } from '../types';
import { getApiUrl, getDashboardFullUrl, getEditorFullUrl, getPreviewerFullUrl } from '../services/urls';
import { renderOption } from './tools';
import { additionalEnvs, defaultEnvs, getInfo } from '../services/data';
import { createTab } from '../services/chrome';

const $owPubId = $('#owPubId');
const $owApp = $('#owApp');
const $owEnv = $('#owEnv');
const $owApi = $('#owApi');
const $owOpen = $('#owOpen');

const renderOwEnvEnvsUI = () => {
  const envs = [...defaultEnvs, DIVIDER, ...additionalEnvs];
  const ui = envs.map((env) => renderOption(env)).join('');
  $owEnv.html(ui);
};

const setOwDataUI = () => {
  const owData = lsGet('owData') || {};
  $owApp.val(owData.app || App.EDITOR);
  $owEnv.val(owData.env || Env.ACCEPTANCE);
  $owApi.val(owData.api || getApiUrl(Env.ACCEPTANCE));
};

export const initOpen = () => {
  renderOwEnvEnvsUI();
  setOwDataUI();

  const info = getInfo();

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

    createTab({ url, active: true });
    window.close();
  });
};
