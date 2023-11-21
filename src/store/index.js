import { createStore } from 'easy-peasy';
import PlaylistModel from './playlistModel';
import favoriteModel from './favoriteModel';
import recentModel from './recentsModel';

const store = createStore({
  Playlists: PlaylistModel,
  favourites: favoriteModel,
  recentPlaylists: recentModel,
});

export default store;