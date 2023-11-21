// PlayListCard.js
import { Card, CardMedia, CardContent, CardActions, Typography, Box, Button, Stack } from "@mui/material";
import { PlayArrow, Star, StarBorder } from "@mui/icons-material";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useStoreActions, useStoreState } from "easy-peasy";

const PlayListCard = ({ playlist }) => {
  const { playlistThumbnails, playlistTitle, channelTitle, playlistId } = playlist;
  const addFavorite = useStoreActions(actions => actions.favourites.addFavorite);
  const removeFavorite = useStoreActions(actions => actions.favourites.removeFavorite);
  const recentPlaylists = useStoreActions(actions => actions.recentPlaylists.addRecent);
  const isFavorite = useStoreState(state => state.favourites.items.includes(playlistId));

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFavorite(playlistId);
    } else {
      addFavorite(playlistId);
    }
  };

  const handlePlaylistClick = () => {
    // Add to recent playlists when clicked
    recentPlaylists(playlistId);
  };

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column", margin: 1 }}>
      <CardMedia component="img" image={playlistThumbnails.url} alt={playlistTitle} />
      <CardContent>
        <Typography variant="h6" color="text.primary">
          {playlistTitle.length > 50 ? playlistTitle.substr(0, 50) + "..." : playlistTitle}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {channelTitle}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <CardActions disableSpacing>
        <Button to={`/player/${playlistId}`} component={Link} onClick={handlePlaylistClick}>
          <Stack spacing={1} direction={"row"} alignItems={"center"}>
            <PlayArrow />
            <Typography variant="body2" fontWeight={600}>
              START TUTORIAL
            </Typography>
          </Stack>
        </Button>
        <Button onClick={handleFavoriteToggle}>
          {isFavorite ? <Star /> : <StarBorder />}
        </Button>
      </CardActions>
    </Card>
  );
};

PlayListCard.propTypes = {
  playlist: PropTypes.shape({
    playlistThumbnails: PropTypes.shape({ url: PropTypes.string }),
    playlistTitle: PropTypes.string,
    channelTitle: PropTypes.string,
    playlistId: PropTypes.string,
  }),
};

export default PlayListCard;
