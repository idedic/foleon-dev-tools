import $ from 'cash-dom';

import { getInfo } from '../services/data';
import { ICurrentApp } from '../types';

const $info = $('#info');

const getApplicationName = (currentApp: ICurrentApp) => {
  return currentApp.isEditor ? 'editor' : currentApp.isDashboard ? 'dashboard' : currentApp.isPreviewer ? 'previewer' : 'unknown';
};

const renderInfoUI = (currentApp: ICurrentApp) => {
  const info = getInfo();
  const currentAppName = getApplicationName(currentApp);
  const ui = `
    <span>application:</span> ${currentAppName}<br />
    ${
      currentApp.isEditor
        ? `
          <span>env:</span> ${info.env} <br />
          <span>pub name:</span> ${info.pubName}<br />
          <span>pub id:</span> ${info.pubId} <br />
          <span>page id:</span> ${info.pageId}`
        : ''
    }
  `;
  $info.html(ui);
};

export const initInfo = (currentApp: ICurrentApp) => {
  renderInfoUI(currentApp);
};
