import axios from "axios";

/**
 * @description Fetches playlist items from YouTube API for a given playlist ID.
 * @param {string} playlistId - ID of the YouTube playlist.
 * @param {string} pageToken - Token for paginating through results.
 * @param {Array} result - Array to accumulate playlist items.
 * @returns {Array} - Array of playlist items with content details and snippet information.
 */
const getPlaylist = async (playlistId, pageToken = '', result = []) => {

    const KEY = import.meta.env.VITE_API_KEY; // API key stored in .env file
  const URL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${KEY}&part=contentDetails,snippet,id&maxResults=50&playlistId=${playlistId}&pageToken=${pageToken}`;

  const { data } = await axios.get(URL);
  result = [...result, ...data.items];

  if (data.nextPageToken) {
    // If there are more pages, recursively fetch them
    result = await getPlaylist(playlistId, data.nextPageToken, result);
  }

  return result;
};

export default getPlaylist;
