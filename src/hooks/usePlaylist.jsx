import { useState } from "react";
import getPlaylist from "../api";

/**
 * @description Custom React Hook for managing playlists and fetching data from an API.
 * @returns {{
 *   playlists: Object,
 *   favourites: Array,
 *   recentPlaylists: Array,
 *   getPlaylistById: Function,
 *   addToFavorites: Function,
 *   addToRecent: Function
 * }}
 * @example
 * const { getPlaylistById, playlists, addToFavorites, addToRecent } = usePlaylist();
 *
 * // Fetch and log a playlist by ID
 * getPlaylistById("PL_XxuZqN0xVD0op-QDEgyXFA4fRPChvkl");
 * console.log(playlists);
 *
 * // Add a playlist to favorites and recent playlists
 * addToFavorites("PL_XxuZqN0xVD0op-QDEgyXFA4fRPChvkl");
 * addToRecent("PL_XxuZqN0xVD0op-QDEgyXFA4fRPChvkl");
 */
const usePlaylist = () => {
  /**
   * @description State management for playlists, favorites, and recent playlists.
   */
  const [state, setState] = useState({
    playlists: {},
    recentPlaylists: [],
    favourites: [],
  });

  /**
   * @description Fetch a playlist by ID from the API.
   * @param {string} playlistId - ID of the playlist to fetch.
   * @param {boolean} force - Force fetching even if the playlist is in the state.
   */
  const getPlaylistById = async (playlistId, force = false) => {
    // If playlist already exists in state and force is false, return
    if (state.playlists[playlistId] && !force) {
      return;
    }

    let result = await getPlaylist(playlistId);
    let cid, ct; // cid and ct are used to store the channel ID and channel title of the playlist.

    result = result.map((item) => {
      /**
       * @description Mapping API response to a simplified object. 
       */
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


    /**
     * @description Updating state with the fetched playlist data.
     */
    setState((pre) => ({
      ...pre,
      playlists: {
        ...pre.playlists,
        [playlistId]: {
          items: result, // Array of simplified playlist items
          playlistId, // ID of the playlist
          channelId: cid, // Channel ID of the playlist
          channelTitle: ct, // Channel title of the playlist
        },
      },
    }));
  };


  /**
   * @description Add a playlist to the favorites list.
   * @param {string} playlistId - ID of the playlist to add to favorites.
   */
  const addToFavorites = (playlistId) => {
    setState((pre) => ({
      ...pre,
      favourites: [...pre.favourites, playlistId],
    }));
  };

  /**
   * @description Add a playlist to the recent playlists list.
   * @param {string} playlistId - ID of the playlist to add to recent playlists.
   */
  const addToRecent = (playlistId) => {
    setState((pre) => ({
      ...pre,
      recentPlaylists: [...pre.recentPlaylists, playlistId],
    }));
  };

  /**
   * @description Get an array of playlists by their IDs.
   * @param {Array} ids - Array of playlist IDs to retrieve.
   * @returns {Array} - Array of playlists.
   */
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
