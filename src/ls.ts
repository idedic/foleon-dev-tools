export const set = (key: string, value: any) => localStorage.setItem(`foleonDevTools.${key}`, JSON.stringify(value));

export const get = (key: string) => JSON.parse(localStorage.getItem(`foleonDevTools.${key}`));

export const remove = (key: string) => localStorage.removeItem(`foleonDevTools.${key}`);
