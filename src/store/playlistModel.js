import { action, thunk, persist } from "easy-peasy";
import getPlaylists from "../api";

const playlistModel = persist({
    data: {},
    error: '',
    isLoading: false,
    setLoading: action((state, payload) => {
        state.isLoading = payload;
    }),
    setError: action((state, payload) => {
        state.error = payload;
    }),
    addPlaylist: action((state, payload) => {
        state.data[payload.playlistId] = payload;
    }),

    getPlaylist: thunk(async (actions, playlistId, helpers) => {
        if (helpers.getState().data[playlistId]) return;

        actions.setLoading(true);
        try {
            const playlist = await getPlaylists(playlistId);
            actions.addPlaylist(playlist);
        } catch (error) {
            actions.setError(error.response?.data?.error?.message || "Something went wrong");
        } finally {
            actions.setLoading(false);
        }
    }),

    // Correctly define getPlaylistById as a thunk
    getPlaylistById: thunk((actions, playlistId, helpers) => {
        const playlist = helpers.getState().data[playlistId];
        if (playlist) return playlist;

        return actions.getPlaylist(playlistId);
    }),
});

export default playlistModel;
