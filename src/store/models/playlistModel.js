import { action, thunk, persist } from 'easy-peasy';
import  getPlaylist  from './../../api';
import noteModel from './noteModel';
import videoProgressModel from './videoProgressModel';

const playlistModel = persist(
    {
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

        // Thunk to fetch playlist details by playlistId
        getPlaylist: thunk(async (actions, playlistId, helpers) => {
            if (helpers.getState().data[playlistId]) return;

            actions.setLoading(true);
            try {
                const playlistDetails = await getPlaylist(playlistId);
                actions.addPlaylist(playlistDetails);
            } catch (error) {
                actions.setError(error.message || 'Something went wrong');
            } finally {
                actions.setLoading(false);
            }
        }),

        // Selector to get playlist by playlistId
        getPlaylistById: thunk((actions, playlistId, helpers) => {
            const playlist = helpers.getState().data[playlistId];
            if (playlist) return playlist;

            console.log('Playlist not found in state, fetching from API');
    
            return actions.getPlaylist(playlistId);
        }),

        // Action to remove playlist from state
        removePlaylist: action((state, playlistId) => {
            delete state.data[playlistId];
        }),


        deletePlaylist: thunk(async (actions, playlistId) => {
            try {
                // Remove playlist from state
                actions.removePlaylist(playlistId);

                // Remove notes for the deleted playlist
                noteModel.deleteNotesForPlaylist(playlistId);

                // Remove video progress for the deleted playlist
                videoProgressModel.deleteVideoProgressForPlaylist(playlistId);

            } catch (error) {
                console.error('Error deleting playlist:', error.message);
            }
        }),
    },
    { storage: 'localStorage', allow: ['data'] }
);

export default playlistModel;
