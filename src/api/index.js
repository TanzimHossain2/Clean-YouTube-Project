import axios from 'axios';

const KEY = import.meta.env.VITE_YouTube_API_KEY; 

/**
 * @description Fetches playlist items from the YouTube API for a given playlist ID.
 * @param {string} playlistId - ID of the YouTube playlist.
 * @param {string} pageToken - Token for paginating through results.
 * @param {Array} result - Array to accumulate playlist items.
 * @returns {Array} - Array of playlist items with content details and snippet information.
 */
const getPlaylistItems = async (playlistId, pageToken = '', result = []) => {
  try {
    const URL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${KEY}&part=contentDetails,snippet,id&maxResults=50&playlistId=${playlistId}&pageToken=${pageToken}`;

    const { data } = await axios.get(URL);
    result = [...result, ...data.items];

    if (data.nextPageToken) {
      // If there are more pages, recursively fetch them
      result = await getPlaylistItems(playlistId, data.nextPageToken, result);
    }

    return result;
  } catch (error) {
    console.error('Error fetching playlist items:', error.message);
    throw new Error('Failed to fetch playlist items. Please try again.');
  }
};

/**
 * @description Fetches details of a YouTube playlist.
 * @param {string} playlistId - ID of the YouTube playlist.
 * @returns {Object} - Object containing details of the playlist.
 */
const getPlaylist = async (playlistId) => {
  try {
    const URL = `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2Cid&id=${playlistId}&key=${KEY}`;

    const { data } = await axios.get(URL);
    if (!data.items || data.items.length === 0) {
      throw new Error('Playlist not found.');
    }

    let playlistItems = await getPlaylistItems(playlistId);

    const firstItem = data.items[0];
    const { channelId, title: playlistTitle, description: playlistDescription, thumbnails, channelTitle } = firstItem.snippet;

    playlistItems = playlistItems.map((item) => {
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
      playlistItems,
    };
  } catch (error) {
    console.error('Error fetching playlist details:', error.message);
    throw new Error('Failed to fetch playlist details. Please try again.');
  }
};

export default getPlaylist;