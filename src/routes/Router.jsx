import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import RecentPlaylists from "../components/recent-playlists";
import FavoritePlaylists from "../components/favorite-playlists";
import PlayerPage from "../pages/PlayerPage";
import NotFound from "../pages/Error404";

const Routers = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/playlists" element={<HomePage />} />
        <Route path="/recents" element={<RecentPlaylists />} />
        <Route path="/favorites" element={<FavoritePlaylists />} />
        <Route path="/player/:playlistId" element={<PlayerPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default Routers;
