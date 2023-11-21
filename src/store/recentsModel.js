// recentModel.js
import { action, persist } from "easy-peasy";

const recentModel = persist({
  items: [],

  addRecent: action((state, playlistId) => {
    // Check if the playlistId is already in the list
    if (!state.items.includes(playlistId)) {
      // Add to the beginning of the list
      state.items.unshift(playlistId);

      // Keep only the first 3 items
      state.items = state.items.slice(0, 3);
    }
  }),
});

export default recentModel;
