import { Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import NotFound from "./Error404";
import { useStoreState } from "easy-peasy";

const PlayerPage = () => {
  const { playlistId } = useParams();
  const playlists = useStoreState((state) => state.Playlists.data);
  const currentPlaylist = playlists[playlistId];

  if (!currentPlaylist) {
    return <NotFound />;
  }

  return (
    <Container sx={{ marginTop: 16 }}>
      <Typography variant="h4">{currentPlaylist?.playlistTitle}</Typography>
      <Typography variant="h6">
        {currentPlaylist?.playlistDescription}
      </Typography>
    </Container>
  );
};

export default PlayerPage;
