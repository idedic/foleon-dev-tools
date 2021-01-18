import { getActiveTab, sendMsgToActiveTab } from './services/chrome';
import { showErrorSection, showMainSection } from './ui/tools';
import { flagsKeys, localhostEditorPort, localhostDashboardPort, localhostPreviewerPort, parseInfo, parseLsData } from './services/data';
import { initInfo } from './ui/info';
import { initFlags } from './ui/flags';
import { initOpen } from './ui/open';
import { initSettings } from './ui/settings';

const isUrlFoleonEditor = (url: string) => {
  return url.includes('editor') || url.includes(`localhost:${localhostEditorPort}`);
};

const isUrlFoleonDashboard = (url: string) => {
  return url.includes('app') || url.includes(`localhost:${localhostDashboardPort}`);
};

const isUrlFoleonPreviewer = (url: string) => {
  return url.includes('previewer') || url.includes(`localhost:${localhostPreviewerPort}`);
};

getActiveTab((activeTab) => {
  console.log('activeTab', activeTab);
  parseInfo(activeTab);

  const isEditor = isUrlFoleonEditor(activeTab.url);
  const isDashboard = isUrlFoleonDashboard(activeTab.url);
  const isPreviewer = isUrlFoleonPreviewer(activeTab.url);

  const isFoleonApp = isEditor || isDashboard || isPreviewer;

  if (!isFoleonApp) {
    showErrorSection([
      "It looks like you're not in the Foleon application tab (Dashboard, Editor or Previewer).",
      'If you are sure that this is the Foleon application tab, please refresh the page and reopen the extension popup.',
    ]);
    return;
  }

  sendMsgToActiveTab(
    { msgId: 'foleonDevTools.request', data: Object.values(flagsKeys) },
    (response) => {
      parseLsData(response);

      const currentApp = { isEditor, isDashboard, isPreviewer };
      try {
        initInfo(currentApp);
        initFlags(currentApp);
        initOpen();
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
