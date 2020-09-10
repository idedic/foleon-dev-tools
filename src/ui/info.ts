import $ from 'cash-dom';

import { getInfo } from '../services/data';

const $info = $('#info');

const renderInfoUI = () => {
  const info = getInfo();
  const ui = `
    ${info.title}<br>
    <span>env:</span> ${info.env} <span>id:</span> ${info.pubId} <span>page:</span> ${info.pageId}
  `;
  $info.html(ui);
};

export const initInfo = () => {
  renderInfoUI();
};
