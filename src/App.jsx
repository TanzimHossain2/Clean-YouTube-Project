import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "./components/navbar";
import usePlaylist from "./hooks/usePlaylist";
import PlayListCard from "./components/playlist-card-itms";
import { Container, Grid, Typography } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const HomePage = ({ playlistArray }) => {
  return (
    <Container maxWidth={"lg"} sx={{ marginTop: 16 }}>
      {playlistArray.length > 0 && (
        <Grid container alignItems={"stretch"}>
          {playlistArray.map((item,index) => (
              <Grid item xs={12} md={6} lg={4} mb={2} key={index}>
                <PlayListCard
                  key={item.id}
                  channelTitle={item.channelTitle}
                  playlistThumbnails={item.playlistThumbnails}
                  playlistTitle={item.playlistTitle}
                />
              </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

const NotFound = () => {
  return (
    <Container sx={{ marginTop: 16 }}>
      <Typography variant="h1" align="center">
        404
      </Typography>
      <Typography variant="h3" align="center">
        Page Not Found
      </Typography>
    </Container>
  );
};

const PlayerPage = () => {
  return (
    <Container sx={{ marginTop: 16 }}>
      <Typography variant="h1" align="center">
       Clean YouTube Player
      </Typography>
    </Container>
  );
}

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
        <Route path="/player" element={<PlayerPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
