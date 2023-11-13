import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "./components/navbar";
import usePlaylist from "./hooks/usePlaylist";
const App = () => {
  const { playlists, getPlaylistById, error } = usePlaylist();

  console.log(playlists);
  console.log(error);
  return (
    <>
      <CssBaseline />
      <Navbar PlaylistById={getPlaylistById}/>
    </>
  );
};

export default App;
