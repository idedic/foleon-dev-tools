import $ from 'cash-dom';

import { DEFAULT, DIVIDER } from '../types';
import { renderOption } from './tools';
import { getApiUrl, getPreviewerRootUrl } from '../services/urls';
import { additionalEnvs, apiKeys, defaultEnvs, getLsData, lsKeys } from '../services/data';
import { getActiveTab, reloadTab, sendMsgToActiveTab } from '../services/chrome';

const $api = $('#api');
const $previewBtn = $('#previewBtn');
const $previewer = $('#previewer');
const $debug = $('#debug');
const $saveAndReload = $('#saveAndReload');

const renderApisUI = () => {
  const envs = [DEFAULT, DIVIDER, ...defaultEnvs];
  const ui = envs.map((env) => renderOption(env, `<option value="${getApiUrl(env)}">${env}</option>`)).join('');
  $api.html(ui);
};

const renderPreviewerEnvsUI = () => {
  const envs = [DEFAULT, DIVIDER, ...defaultEnvs, DIVIDER, ...additionalEnvs];
  const ui = envs.map((env) => renderOption(env, `<option value="${getPreviewerRootUrl(env)}">${env}</option>`)).join('');
  $previewer.html(ui);
};

export const initFlags = () => {
  renderApisUI();
  renderPreviewerEnvsUI();

  const lsData = getLsData();

  $api.val(lsData[lsKeys.api] || DEFAULT);
  $previewBtn.prop('checked', lsData[lsKeys.previewBtn] === 'true');
  $previewer.val(lsData[lsKeys.previewer] || DEFAULT);
  $debug.prop('checked', lsData[lsKeys.debug] === 'true');

  $saveAndReload.on('click', () => {
    const sendObj = {
      // @ts-ignore
      ...apiKeys[$api.val()],
      [lsKeys.previewer]: $previewer.val() === DEFAULT ? false : $previewer.val(),
      [lsKeys.previewBtn]: $previewBtn.prop('checked'),
      [lsKeys.debug]: $debug.prop('checked'),
    };

    sendMsgToActiveTab({ msgId: 'foleonDevTools.set', data: sendObj }, () => {
      getActiveTab((activeTab) => {
        reloadTab(activeTab.id);
        window.close();
      });
    });
  });
};
