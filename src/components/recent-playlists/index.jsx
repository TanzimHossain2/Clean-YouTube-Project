// RecentPlaylists.js
import { useStoreActions, useStoreState } from "easy-peasy";
import PlayListCard from "../playlist-card-itms";
import { Container, Grid } from "@mui/material";
const RecentPlaylists = () => {
    const recentPlaylistIds = useStoreState((state) => state.recentPlaylists.items);
    const getPlaylistById = useStoreActions((actions) => actions.playlists.getPlaylistById);

    // Conditionally render the component
    if (recentPlaylistIds.length === 0) {
        return null;
    }

  return (
    <Container maxWidth={"lg"} sx={{ marginTop: 16 }}>
      <h4>Recent Playlists</h4>
      {recentPlaylistIds.length > 0 && (
        <Grid container alignItems={"stretch"}>
          {recentPlaylistIds.map((playlistId, index) => (
            <Grid item xs={12} md={6} lg={4} mb={2} key={index}>
              <PlayListCard playlist={getPlaylistById(playlistId)} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default RecentPlaylists;