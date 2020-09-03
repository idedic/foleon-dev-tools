export interface Info {
  env?: string;
  pubId?: string;
  pageId?: string;
  title?: string;
}

export type Tab = chrome.tabs.Tab;

export enum UISections {
  logo = 'sectionLogo',
  error = 'sectionError',
  main = 'sectionMain',
}
