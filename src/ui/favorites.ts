import $ from 'cash-dom';

import { getInfo } from '../services/data';
import { getActiveTab } from '../services/chrome';
import { lsGet, lsSet } from '../services/ls';
import { LsKeys } from '../types';

type Fav = {
  id: string;
  name: string;
  url: string;
};
type FavData = Array<Fav>;

const $favAdd = $('#favAdd');
const $favRowsWrap = $('#favRowsWrap');

const generateId = () => Math.random().toString(36).substr(2, 9);

export const getFavData = () => lsGet(LsKeys.FAV_DATA) as FavData;
const setFavData = (_favData: FavData) => lsSet(LsKeys.FAV_DATA, _favData);

const favData = getFavData() || [];

const addToFavorite = () => {
  const info = getInfo();

  let name = `${info.title} - ${info.pubId} - ${info.env}`;
  const promptResult = prompt('Add to favorites by name:', name);
  if (promptResult === null) {
    // when user hits cancel
    return;
  }
  name = promptResult || name;

  const id = generateId();

  getActiveTab((activeTab) => {
    favData.push({ url: activeTab.url, id, name });
    setFavData(favData);
    renderFavDataUI();
  });
};

const removeFromFavorites = (e: MouseEvent) => {
  const id = $(e.target as any).attr('data-id');

  const indexToRemove = favData.findIndex((fav) => fav.id === id);
  favData.splice(indexToRemove, 1);

  setFavData(favData);
  renderFavDataUI();
};

const FavRow = ({ id, name, url }: Fav) => `
  <p class="favRow">
    <a class="favRowLink" href="${url}" target="_blank">${name}</a>
    <span class="favRowX" data-id="${id}" title="Remove from favorites">x</span>
  </p>
`;

const renderFavDataUI = () => {
  const ui = favData.map((fav) => FavRow(fav)).join('');
  $favRowsWrap.html(ui || `<p>No favorites.</p>`);
};

export const initFavorites = () => {
  renderFavDataUI();

  $favAdd.on('click', addToFavorite);

  $favRowsWrap.on('click', '.favRowX', removeFromFavorites);
};
