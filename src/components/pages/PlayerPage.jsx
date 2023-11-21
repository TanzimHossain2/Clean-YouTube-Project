import { Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import NotFound from "./Error404";
import PropsTypes from "prop-types";

const PlayerPage = ({ playlists }) => {
  const { playlistId } = useParams();
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

PlayerPage.propTypes = {
  playlists: PropsTypes.object.isRequired,
};

export default PlayerPage;
