import $ from 'cash-dom';

import { getInfo } from '../services/data';

const $info = $('#info');

const renderInfo = (infoName: string, infoValue: string) => (infoValue ? `<span>${infoName}:</span> ${infoValue}<br />` : '');

const renderInfoUI = () => {
  const info = getInfo();
  console.log(info);
  const ui = `
    ${renderInfo('application', info.app)}
    ${renderInfo('env', info.env)}
    ${renderInfo('pub name', info.pubName)}
    ${renderInfo('pub id', info.pubId)}
    ${renderInfo('page id', info.pageId)}`;
  $info.html(ui);
};

export const initInfo = () => {
  renderInfoUI();
};
