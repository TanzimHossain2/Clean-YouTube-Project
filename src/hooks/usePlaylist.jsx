import { useState } from "react";
import getPlaylist from "../api";

const usePlaylist = () => {
  const [state, setState] = useState({
    playlists: {},
    recentPlaylists: [],
    favourites: [],
  });

  const getPlaylistById = async (playlistId, force = false) => {
    if (state.playlists[playlistId] && !force) {
      return;
    }

    let result = await getPlaylist(playlistId);
    let cid, ct;
    result = result.map((item) => {
      const {
        channelId,
        title,
        description,
        thumbnails: { medium },
        channelTitle,
        playlistId,
      } = item.snippet;

      if (!cid) {
        cid = channelId;
      }

      if (!ct) {
        ct = channelTitle;
      }

      return {
        id: item.id,
        title,
        description,
        thumbnail: medium,
        contentDetails: item.contentDetails,
      };
    });

    setState((pre) => ({
      ...pre,
      playlists: {
        ...pre.playlists,
        [playlistId]: {
          itens: result,
          playlistId,
          channelId: cid,
          channelTitle: ct,
        },
      },
    }));
  };

  const addToFavorites = (playlistId) => {
    setState((pre) => ({
      ...pre,
      favourites: [...pre, playlistId],
    }));
  };

  const addToRecent = (playlistId) => {
    setState((pre) => ({
      ...pre,
      recentPlaylists: [...pre, playlistId],
    }));
  };

  const getPlaylistByIds = (ids = []) => {
    return ids.map((id) => state.playlists[id]);
  };

  return {
    playlists: state.playlists,
    favourites: getPlaylistByIds(state.favourites),
    recentPlaylists: getPlaylistByIds(state.recentPlaylists),
    getPlaylistById,
    addToFavorites,
    addToRecent,
  };
};

export default usePlaylist;
