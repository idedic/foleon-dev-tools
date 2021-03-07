import $ from 'cash-dom';

import { ICurrentApp, DEFAULT, DIVIDER, Api, App } from '../types';
import { renderOption } from './tools';
import { getApiUrl, getPreviewerRootUrl } from '../services/urls';
import { additionalEnvs, apiKeys, apis, defaultEnvs, getLsData, flagsKeys, getInfo } from '../services/data';
import { getActiveTab, reloadTab, sendMsgToActiveTab } from '../services/chrome';
import { FLAGS } from '../extensionFlags';

const $api = $('#api');
const $previewBtn = $('#previewBtn');
const $previewer = $('#previewer');
const $debug = $('#debug');
const $saveAndReload = $('#saveAndReload');

const renderApisUI = () => {
  const apisToRender = [DEFAULT, DIVIDER, ...apis];
  const ui = apisToRender.map((api) => renderOption(api, `<option value="${getApiUrl(api)}">${api}</option>`)).join('');
  $api.html(ui);
};

const renderPreviewerEnvsUI = () => {
  const envs = [DEFAULT, DIVIDER, ...defaultEnvs, ...(FLAGS.SHOW_NAMED_ENVS ? [DIVIDER, ...additionalEnvs] : [])];
  const ui = envs.map((env) => renderOption(env, `<option value="${getPreviewerRootUrl(env)}">${env}</option>`)).join('');
  $previewer.html(ui);
};

const showOptionsBasedOnCurrentApp = (app: App) => {
  if (app !== App.EDITOR) {
    $previewBtn.parent().parent().hide();
    $previewer.parent().hide();
    $debug.parent().parent().hide();
  }
};

export const initFlags = () => {
  renderApisUI();
  renderPreviewerEnvsUI();

  const info = getInfo();
  showOptionsBasedOnCurrentApp(info.app);

  const lsData = getLsData();

  $api.val(lsData[flagsKeys.api] || DEFAULT);
  $previewBtn.prop('checked', lsData[flagsKeys.previewBtn] === 'true');
  $previewer.val(lsData[flagsKeys.previewer] || DEFAULT);
  $debug.prop('checked', lsData[flagsKeys.debug] === 'true');

  $saveAndReload.on('click', () => {
    const sendObj = {
      // @ts-ignore
      ...apiKeys[$api.val()],
      [flagsKeys.previewer]: $previewer.val() === DEFAULT ? false : $previewer.val(),
      [flagsKeys.previewBtn]: $previewBtn.prop('checked'),
      [flagsKeys.debug]: $debug.prop('checked'),
    };

    sendMsgToActiveTab({ msgId: 'foleonDevTools.set', data: sendObj }, () => {
      getActiveTab((activeTab) => {
        reloadTab(activeTab.id);
        window.close();
      });
    });
  });
};
