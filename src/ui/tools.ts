import $, { Cash } from 'cash-dom';

import { DIVIDER } from '../types';

export const renderOption = (value: string, customOption?: string) => {
  if (value === DIVIDER) {
    return `<option disabled>---------</option>`;
  }
  return customOption ? customOption : `<option value="${value}">${value}</option>`;
};

const $allSections = $('section');
const $sectionMain = $('#sectionMain');
const $sectionError = $('#sectionError');
const $sectionSettings = $('#sectionSettings');

const showSection = ($section: Cash) => {
  $allSections.addClass('h');
  $section.removeClass('h');
};

export const showErrorSection = (message: string | string[]) => {
  let ui = '';
  if (typeof message === 'string') {
    ui = message;
  } else if (Array.isArray(message)) {
    ui = `<div>${message.map((paragraph) => `<p>${paragraph}</p>`).join('')}</div>`;
  }
  $sectionError.html(ui);

  showSection($sectionError);
};

export const showMainSection = () => showSection($sectionMain);

export const showSettingsSection = () => showSection($sectionSettings);
