import { action, persist } from "easy-peasy";

const recentModel = persist({
    items:[],
    addRecent: action((state, playlistId) => {
        state.items.unshift(playlistId);
        state.items = state.items.slice(0, 5);
    }),
})

export default recentModel;