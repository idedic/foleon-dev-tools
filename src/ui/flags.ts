import $ from 'cash-dom';

import { ICurrentApp, DEFAULT, DIVIDER } from '../types';
import { renderOption } from './tools';
import { getApiUrl, getPreviewerRootUrl } from '../services/urls';
import { additionalEnvs, apiKeys, apis, defaultEnvs, getLsData, flagsKeys } from '../services/data';
import { getActiveTab, reloadTab, sendMsgToActiveTab } from '../services/chrome';

const $api = $('#api');
const $previewBtn = $('#previewBtn');
const $previewer = $('#previewer');
const $debug = $('#debug');
const $saveAndReload = $('#saveAndReload');

const renderApisUI = () => {
  const apisToRender = [DEFAULT, DIVIDER, ...apis];
  const ui = apisToRender.map((env) => renderOption(env, `<option value="${getApiUrl(env)}">${env}</option>`)).join('');
  $api.html(ui);
};

const renderPreviewerEnvsUI = () => {
  const envs = [DEFAULT, DIVIDER, ...defaultEnvs, DIVIDER, ...additionalEnvs];
  const ui = envs.map((env) => renderOption(env, `<option value="${getPreviewerRootUrl(env)}">${env}</option>`)).join('');
  $previewer.html(ui);
};

const showOptionsBasedOnCurrentApp = (currentApp: ICurrentApp) => {
  if (!currentApp.isEditor) {
    $previewBtn.parent().parent().hide();
    $previewer.parent().hide();
    $debug.parent().parent().hide();
  }
};

export const initFlags = (currentApp: ICurrentApp) => {
  renderApisUI();
  renderPreviewerEnvsUI();

  showOptionsBasedOnCurrentApp(currentApp);

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
