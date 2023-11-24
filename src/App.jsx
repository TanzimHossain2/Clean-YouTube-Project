import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "./components/navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import NotFound from "./pages/Error404";
import PlayerPage from "./pages/PlayerPage";
import RecentPlaylists from "./components/recent-playlists";
import FavoritePlaylists from "./components/favorite-playlists";
import Layout from "./layouts/Layout";

const App = () => {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Layout>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/playlists" element={<HomePage />} />
          <Route path="/recents" element={<RecentPlaylists />} />
          <Route path="/favorites" element={<FavoritePlaylists />} />
          <Route path="/player/:playlistId" element={<PlayerPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
