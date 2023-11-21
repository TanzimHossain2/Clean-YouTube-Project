import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "./components/navbar";
import usePlaylist from "./hooks/usePlaylist";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./components/pages/HomePage";
import NotFound from "./components/pages/Error404";
import PlayerPage from "./components/pages/PlayerPage";

const App = () => {
  const { playlists, getPlaylistById, error } = usePlaylist();
  if (error) {
    return alert("Something went wrong");
  }
  const playlistArray = Object.values(playlists);
  return (
    <BrowserRouter>
      <CssBaseline />
      <Navbar PlaylistById={getPlaylistById} />
      <Routes>
        <Route path="/" element={<HomePage playlistArray={playlistArray} />} />
        <Route
          path="/player/:playlistId"
          element={<PlayerPage playlists={playlists} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
