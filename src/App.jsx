import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "./components/navbar";
import usePlaylist from "./hooks/usePlaylist";
import PlayListCard from "./components/playlist-card-itms";
import { Container, Grid } from "@mui/material";
const App = () => {
  const { playlists, getPlaylistById, error } = usePlaylist();
  if (error) {
    return alert("Something went wrong");
  }
  const playlistArray = Object.values(playlists);
  return (
    <>
      <CssBaseline />
      <Container maxWidth={"lg"} sx={{ marginTop: 16 }}>
        <Navbar PlaylistById={getPlaylistById} />
        {playlistArray.length > 0 && (
          <Grid container alignItems={'stretch'} >
            {playlistArray.map((item) => (
              <>
                <Grid item xs={12} md={6} lg={4} mb={2}>
                  <PlayListCard
                    key={item.id}
                    channelTitle={item.channelTitle}
                    playlistThumbnails={item.playlistThumbnails}
                    playlistTitle={item.playlistTitle}
                  />
                </Grid>
              </>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
};

export default App;
