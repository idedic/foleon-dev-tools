export const lsSet = (key: string, value: any) => localStorage.setItem(`foleonDevTools.${key}`, JSON.stringify(value));

export const lsGet = (key: string) => JSON.parse(localStorage.getItem(`foleonDevTools.${key}`));
