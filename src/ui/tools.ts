import $ from 'cash-dom';

import { DIVIDER, UISection } from '../types';

export const renderOption = (value: string, customOption?: string) => {
  if (value === DIVIDER) {
    return `<option disabled>---------</option>`;
  }
  return customOption ? customOption : `<option value="${value}">${value}</option>`;
};

export const showSection = (sectionId: string) => {
  $('section').addClass('h');
  $(`#${sectionId}`).removeClass('h');
};

export const showErrorSection = (message: string | string[]) => {
  let ui = '';
  if (typeof message === 'string') {
    ui = message;
  } else if (Array.isArray(message)) {
    ui = `<div>${message.map((paragraph) => `<p>${paragraph}</p>`).join('')}</div>`;
  }
  $(`#${UISection.error}`).html(ui);

  showSection(UISection.error);
};
