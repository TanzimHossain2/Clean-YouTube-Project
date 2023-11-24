// HomePage.js
import { Container, Grid } from "@mui/material";
import PlayListCard from "../components/playlist-card-itms";
import { useStoreState } from "easy-peasy";

const HomePage = () => {
  const playlistData = useStoreState((state) => state.playlists.data);
  const playlistArray = Object.values(playlistData);

  return (
    <Container maxWidth={"lg"} sx={{ marginTop: 16 }}>
        <h3>All Playlists</h3>
      {playlistArray && playlistArray.length > 0 && (
        <Grid container alignItems={"stretch"}>
        
          {playlistArray.map((item, index) => (
            <Grid item xs={12} md={6} lg={4} mb={2} key={index}>
              <PlayListCard playlist={item} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default HomePage;
