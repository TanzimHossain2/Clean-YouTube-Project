import { useStoreActions } from "easy-peasy";
import { useEffect } from "react";
import { Container, Grid } from "@mui/material";
import PlayListCard from "../playlist-card-itms";
import PropsTypes from "prop-types";

const playlistID = "PL_XxuZqN0xVD0op-QDEgyXFA4fRPChvkl";

const HomePage = ({ playlistArray }) => {
  
  const playlist = useStoreActions((actions) => actions.Playlists);
  useEffect(() => {
    playlist.getPlaylist(playlistID);
  }, []);

  return (
    <Container maxWidth={"lg"} sx={{ marginTop: 16 }}>
      {playlistArray.length > 0 && (
        <Grid container alignItems={"stretch"}>
          {playlistArray.map((item, index) => (
            <Grid item xs={12} md={6} lg={4} mb={2} key={index}>
              <PlayListCard
                key={item.id}
                channelTitle={item.channelTitle}
                playlistThumbnails={item.playlistThumbnails}
                playlistTitle={item.playlistTitle}
                playlistId={item.playlistId}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

HomePage.propTypes = {
  playlistArray: PropsTypes.array.isRequired,
};

export default HomePage;
