import $ from 'cash-dom';

import { getInfo } from '../services/data';

const $info = $('#info');

const renderInfo = (infoName: string, infoValue: string, newLine = true) =>
  infoValue ? `<span>${infoName}:</span> ${infoValue}${newLine ? '<br />' : ', '}` : '';

const renderInfoUI = () => {
  const info = getInfo();
  console.log(info);
  const ui = `
    ${renderInfo('application', info.app)}
    ${renderInfo('env', info.env, !Boolean(info.prId))}
    ${renderInfo('PR id', info.prId)}
    ${renderInfo('doc name', info.docName)}
    ${renderInfo('doc id', info.docId, false)}
    ${renderInfo('page id', info.pageId)}`;
  $info.html(ui);
};

export const initInfo = () => {
  renderInfoUI();
};
