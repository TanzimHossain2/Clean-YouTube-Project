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
 *   addToRecent: Function,
 *   error: string,
 *   loading: boolean
 * }}
 * @example
 * const {
 *   getPlaylistById,
 *   playlists,
 *   addToFavorites,
 *   addToRecent,
 *   error,
 *   loading
 * } = usePlaylist();
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
   * @description State management for playlists, favorites, recent playlists, error, and loading.
   */
  const [state, setState] = useState({
    playlists: {},
    recentPlaylists: [],
    favourites: [],
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

    // If playlist doesn't exist in state, fetch it from the API
    setLoading(true);

    try {
      const playlist = await getPlaylist(playlistId);
      setError("");
      setState((pre) => ({
        ...pre,
        playlists: {
          ...pre.playlists,
          [playlistId]: playlist,
        },
      }));
    } catch (error) {
      setError(error.response?.data?.error?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
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
    error,
    loading,
  };
};

export default usePlaylist;
