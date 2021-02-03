import { getActiveTab, sendMsgToActiveTab } from './services/chrome';
import { showErrorSection, showMainSection } from './ui/tools';
import { flagsKeys, localhostEditorPort, localhostDashboardPort, localhostPreviewerPort, parseInfo, parseLsData } from './services/data';
import { initInfo } from './ui/info';
import { initFlags } from './ui/flags';
import { initOpen } from './ui/open';
import { initSettings } from './ui/settings';
import { getFavData, initFavorites } from './ui/favorites';

getActiveTab((activeTab) => {
  parseInfo(activeTab);
  const isFoleonApp = activeTab.url.match(/\/\/(localhost:|.+foleon\.(dev|com|cloud))/);

  if (!isFoleonApp) {
    const favData = getFavData();
    showErrorSection([
      "It looks like you're not in the Foleon application tab (Dashboard, Editor or Previewer).",
      'If you are sure that this is the Foleon application tab, please refresh the page and reopen the extension popup.',
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
          'Something went wrong while getting the data from the Foleon application.',
          'Please refresh current tab and reopen the extension popup.',
          '...',
          "If you're feeling wild today, try clearing localStorage of the current application, and then refresh and reopen.",
          'If this keeps failing, contact the developer.',
        ]);
      }
    },
    activeTab,
  );
});
