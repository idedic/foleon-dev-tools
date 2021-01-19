import $ from 'cash-dom';

import { getInfo } from '../services/data';
import { App, ICurrentApp } from '../types';

const $info = $('#info');

const getApplicationName = (currentApp: ICurrentApp) => {
  return currentApp.isEditor ? 'editor' : currentApp.isDashboard ? 'dashboard' : currentApp.isPreviewer ? 'previewer' : 'unknown';
};

const renderInfoUI = () => {
  const info = getInfo();
  const ui = `
    <span>application:</span> ${info.app}<br />
    <span>env:</span> ${info.env} <br />
    ${
      info.app === App.EDITOR
        ? `
          <span>pub name:</span> ${info.pubName}<br />
          <span>pub id:</span> ${info.pubId} <br />
          <span>page id:</span> ${info.pageId}`
        : ''
    }
  `;
  $info.html(ui);
};

export const initInfo = () => {
  renderInfoUI();
};
