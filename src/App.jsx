import { useEffect } from "react";
import usePlaylist from "./hooks/usePlaylist";

const App = () => {
  const { getPlaylistById, playlists } = usePlaylist();
  useEffect(() => {
    getPlaylistById("PL_XxuZqN0xVD0op-QDEgyXFA4fRPChvkl");
  }, []);

  console.log(playlists);

  return <div>App</div>;
};

export default App;
