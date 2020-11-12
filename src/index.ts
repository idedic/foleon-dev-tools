import { getActiveTab, sendMsgToActiveTab } from './services/chrome';
import { showErrorSection, showMainSection } from './ui/tools';
import { flagsKeys, parseInfo, parseLsData } from './services/data';
import { initInfo } from './ui/info';
import { initFlags } from './ui/flags';
import { initOpen } from './ui/open';
import { initSettings } from './ui/settings';
import { getFavData, initFavorites } from './ui/favorites';

getActiveTab((activeTab) => {
  const info = parseInfo(activeTab);

  if (!info.pubId || !info.pageId) {
    const favData = getFavData();
    showErrorSection([
      "It looks like you're not in the Editor tab.",
      'If you are sure that this is the Editor tab, please refresh the page and reopen the extension popup.',
      '...',
      ...favData.map((fav: any) => `<a class="favLinkIndex" href="${fav.url}" target="_blank">${fav.name}</a>`),
    ]);
    return;
  }

  sendMsgToActiveTab(
    { msgId: 'foleonDevTools.request', data: Object.values(flagsKeys) },
    (response) => {
      parseLsData(response);

      try {
        initInfo();
        initFlags();
        initOpen();
        initFavorites();
        initSettings();

        showMainSection();
      } catch (e) {
        console.error('foleonDevTools.request', e);
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
