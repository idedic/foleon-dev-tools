import $ from 'cash-dom';

import { getActiveTab, sendMsgToActiveTab, createTab, reloadTab } from './chrome';
import { set as lsSet, get as lsGet } from './ls';
import { Info, Tab } from './types';

const lsKeys = {
  api: 'X-Api-Override',
  auth: 'X-Auth-Override',
  previewer: 'X-Previewer-Override',
  previewBtn: 'X-Show-Preview-Button',
  debug: 'X-EDITOR-DEBUG',
};

const apiKeys = {
  'https://api.foleon.com': {
    [lsKeys.api]: 'https://api.foleon.com',
    [lsKeys.auth]: 'https://auth.foleon.com',
  },
  'https://api-acceptance.foleon.dev': {
    [lsKeys.api]: 'https://api-acceptance.foleon.dev',
    [lsKeys.auth]: 'https://auth-acceptance-dot-instant-magazine.appspot.com',
  },
  'https://api-staging.foleon.dev': {
    [lsKeys.api]: 'https://api-staging.foleon.dev',
    [lsKeys.auth]: 'https://auth-staging-dot-instant-magazine.appspot.com',
  },
  default: {
    [lsKeys.api]: false,
    [lsKeys.auth]: false,
  },
};

const additionalEnvs = ['arsenije', 'zdravko', 'igor', 'slobodan', 'petar', 'anja', 'svetlana', 'maja', 'dusan'];

const sections = {
  logo: 'sectionLogo',
  error: 'sectionError',
  main: 'sectionMain',
};

let lsData: { [key: string]: any } = {};
let info: Info = {};

// info card
const $info = $('#info');
// flags card
const $api = $('#api');
const $previewer = $('#previewer');
const $previewerCustomDivider = $('#previewerCustomDivider');
const $previewBtn = $('#previewBtn');
const $debug = $('#debug');
const $saveAndReload = $('#saveAndReload');
// open with card
const $owPubId = $('#owPubId');
const $owApp = $('#owApp');
const $owEnv = $('#owEnv');
const $owEnvCustomDivider = $('#owEnvCustomDivider');
const $owApi = $('#owApi');
const $owOpen = $('#owOpen');

const parseInfo = (tab: Tab) => {
  const { url, title } = tab;

  const matchLocal = url.match(/\/\/localhost:/);
  const matchProduction = url.match(/\/\/editor\.foleon\.com\//);
  const matchEnv = url.match(/\/\/editor-(.+)\.foleon\.dev\//);
  const matchPubId = url.match(/\/publication\/(\d+)/);
  const matchPageId = url.match(/\/pages\/(\d+)/);

  info = {
    env: (() => {
      if (matchLocal) return 'localhost';
      if (matchProduction) return 'production';
      if (matchEnv) return matchEnv[1];
    })(),
    pubId: matchPubId && matchPubId[1],
    pageId: matchPageId && matchPageId[1],
    title: (title || '').split(' - ')[1] || '',
  };

  generateInfoUI();

  console.log('info', info);
};

const generateInfoUI = () => {
  const ui = `
    ${info.title}<br>
    <span>env:</span> ${info.env} <span>id:</span> ${info.pubId} <span>page:</span> ${info.pageId}
  `;
  $info.html(ui);
};

const generatePreviewerCustomEnvsUI = () => {
  const ui = additionalEnvs.map((env) => `<option value="https://previewer-${env}.foleon.dev">${env}</option>`).join('');
  $previewerCustomDivider.after(ui);
};

const generateOwEnvCustomEnvsUI = () => {
  const ui = additionalEnvs.map((env) => `<option value="${env}">${env}</option>`).join('');
  $owEnvCustomDivider.after(ui);
};

const setOwDataUI = () => {
  const owData = lsGet('owData') || {};
  $owApp.val(owData.app || 'editor');
  $owEnv.val(owData.env || 'acceptance');
  $owApi.val(owData.api || 'https://api-acceptance.foleon.dev');
};

const showSection = (sectionId: string) => {
  $('section').addClass('h');
  $(`#${sectionId}`).removeClass('h');
};

const showErrorSection = (message: string | string[]) => {
  let ui = '';
  if (typeof message === 'string') {
    ui = message;
  } else if (Array.isArray(message)) {
    ui = `<div>${message.map((paragraph) => `<p>${paragraph}</p>`).join('')}</div>`;
  }
  $(`#${sections.error}`).html(ui);

  showSection(sections.error);
};

// ------------------------------
// GO!
// ------------------------------

generatePreviewerCustomEnvsUI();
generateOwEnvCustomEnvsUI();
setOwDataUI();

getActiveTab((activeTab) => {
  console.log('activeTab', activeTab);
  parseInfo(activeTab);

  if (!info.pubId || !info.pageId) {
    showErrorSection([
      "It looks like you're not in the Editor tab.",
      'If you are sure that this is the Editor tab, please refresh the page and reopen the extension popup.',
    ]);
    return;
  }

  sendMsgToActiveTab(
    { msgId: 'foleonDevTools.request', data: Object.values(lsKeys) },
    (response) => {
      lsData = response;
      console.log('lsData', lsData);

      try {
        // flags card
        $api.val(lsData[lsKeys.api] || 'default');
        $previewer.val(lsData[lsKeys.previewer] || 'default');
        $previewBtn.prop('checked', lsData[lsKeys.previewBtn] === 'true');
        $debug.prop('checked', lsData[lsKeys.debug] === 'true');

        // open with card
        $owPubId.val(info.pubId);

        showSection(sections.main);
      } catch (e) {
        showErrorSection([
          'Something went wrong while getting the data from the Editor.',
          'Please refresh the Editor tab and reopen the extension popup.',
          '...',
          "If you're feeling wild today, try clearing Editor's localStorage, and then refresh and reopen.",
          'If this keeps failing, contact the developer.',
        ]);
      }
    },
    activeTab,
  );
});

$saveAndReload.on('click', () => {
  const sendObj = {
    // @ts-ignore
    ...apiKeys[$api.val()],
    [lsKeys.previewer]: $previewer.val() === 'default' ? false : $previewer.val(),
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

$owApp
  .on('change', () => {
    const app = $owApp.val();
    if (app === 'editor') {
      $owPubId.parent().hide();
      $owApi.parent().hide();
    } else {
      $owPubId.parent().show();
      $owApi.parent().show();
    }
  })
  .trigger('change');

$owOpen.on('click', () => {
  const app = $owApp.val();
  const pubId = $owPubId.val();
  const env = $owEnv.val();
  const api = $owApi.val();

  let url = '';

  if (app === 'editor') {
    if (env === 'production') {
      url = `https://editor.foleon.com/publication/${info.pubId}/pages/${info.pageId}`;
    } else {
      url = `https://editor-${env}.foleon.dev/publication/${info.pubId}/pages/${info.pageId}`;
    }
  } else if (app === 'previewer') {
    if (env === 'production') {
      url = `https://previewer.foleon.com/?publicationId=${pubId}&api=${api}`;
    } else {
      url = `https://previewer-${env}.foleon.dev/?publicationId=${pubId}&api=${api}`;
    }
  }

  lsSet('owData', { app, env, api });

  createTab({ url, active: true });
  window.close();
});
