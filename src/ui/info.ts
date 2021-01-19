import $ from 'cash-dom';

import { getInfo } from '../services/data';

const $info = $('#info');

const generateInfo = (infoName: string, infoValue: string) => (infoValue ? `<span>${infoName}:</span> ${infoValue}<br />` : '');

const renderInfoUI = () => {
  const info = getInfo();
  console.log(info);
  const ui = `
    ${generateInfo('application', info.app)}
    ${generateInfo('env', info.env)}
    ${generateInfo('pub name', info.pubName)}
    ${generateInfo('pub id', info.pubId)}
    ${generateInfo('page id', info.pageId)}`;
  $info.html(ui);
};

export const initInfo = () => {
  renderInfoUI();
};
