import { Tab } from './types';

export const getActiveTab = (callback: (activeTab: Tab) => void) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    callback(activeTab);
  });
};

export const sendMsgToActiveTab = (msgObj: any, responseCallback: (response?: any) => void = () => {}, tab?: Tab) => {
  if (tab) {
    chrome.tabs.sendMessage(tab.id, msgObj, responseCallback);
  } else {
    getActiveTab((activeTab) => {
      chrome.tabs.sendMessage(activeTab.id, msgObj, responseCallback);
    });
  }
};

export const createTab = ({ url, active = false }: { url: string; active?: boolean }) => chrome.tabs.create({ url, active });

export const reloadTab = (tabId: number) => chrome.tabs.reload(tabId);
