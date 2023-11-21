import axios from "axios";

/**
 * @description Fetches playlist items from the YouTube API for a given playlist ID.
 * @param {string} playlistId - ID of the YouTube playlist.
 * @param {string} pageToken - Token for paginating through results.
 * @param {Array} result - Array to accumulate playlist items.
 * @returns {Array} - Array of playlist items with content details and snippet information.
 */
const KEY = import.meta.env.VITE_YouTube_API_KEY; // API key stored in .env file

/**
 * @description Helper function to recursively fetch playlist items.
 * @param {string} playlistId - ID of the YouTube playlist.
 * @param {string} pageToken - Token for paginating through results.
 * @param {Array} result - Array to accumulate playlist items.
 * @returns {Array} - Array of playlist items with content details and snippet information.
 */
const getPlaylistItem = async (playlistId, pageToken = '', result = []) => {
  const URL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${KEY}&part=contentDetails,snippet,id&maxResults=50&playlistId=${playlistId}&pageToken=${pageToken}`;

  const { data } = await axios.get(URL);
  result = [...result, ...data.items];

  if (data.nextPageToken) {
    // If there are more pages, recursively fetch them
    result = await getPlaylistItem(playlistId, data.nextPageToken, result);
  }

  return result;
};


/**
 * @description Fetches details of a YouTube playlist.
 * @param {string} playlistId - ID of the YouTube playlist.
 * @returns {Object} - Object containing details of the playlist.
 */
const getPlaylist = async (playlistId) => {
  const URL = `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2Cid&id=${playlistId}&key=${KEY}`;

  const { data } = await axios.get(URL);
  let playListItems = await getPlaylistItem(playlistId);

  const firstItem = data.items[0];
  const { channelId, title: playlistTitle, description: playlistDescription, thumbnails, channelTitle } = firstItem ? firstItem.snippet : {};

  playListItems = playListItems.map((item) => {
    const {
      title,
      description,
      thumbnails: { medium },
    } = item.snippet;

    return {
      id: item.id,
      title,
      description,
      thumbnail: medium,
      contentDetails: item.contentDetails,
    };
  });

  return {
    playlistId,
    playlistDescription,
    channelId,
    playlistTitle,
    playlistThumbnails: thumbnails.medium,
    channelTitle,
    playListItems,
  };
};

export default getPlaylist;
