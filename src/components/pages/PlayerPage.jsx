// PlayerPage.jsx
import { useState, useEffect } from "react";
import YouTube from "react-youtube";
import { Container, Grid, Paper, Typography } from "@mui/material";
import { useStoreActions } from "easy-peasy";
import { useParams } from "react-router-dom";

const PlayerPage = () => {
  const getPlaylistById = useStoreActions(
    (actions) => actions.playlists.getPlaylistById
  );
  const { playlistId } = useParams();
  const playlistData = getPlaylistById(playlistId);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const fetchPlaylist = async () => {
      await getPlaylistById(playlistId);
      // Set the first video as selected when playlist data is available
      setSelectedVideo(
        playlistData?.playlistItems[0]?.contentDetails.videoId || null
      );
    };

    fetchPlaylist();
  }, [getPlaylistById, playlistId, playlistData]);

  // Function to handle video selection
  const handleVideoClick = (videoId) => {
    console.log(videoId);
    setSelectedVideo(videoId);
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: 15 }}>
      <Grid container spacing={2}>
        {/* Left side: Video player */}
        <Grid item xs={12} md={8}>
          <YouTube
            videoId={selectedVideo}
            opts={{ height: "390", width: "100%" }}
          />
        </Grid>

        {/* Right side: List of videos */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{ padding: 2, height: "100%", overflowY: "auto" }}
          >
            <Typography variant="h5" sx={{ marginBottom: 2 }}>
              {playlistData?.playlistTitle} Videos
            </Typography>
            <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
              {playlistData?.playlistItems.map((item) => (
              
                <li
                  key={item.id}
                  onClick={() => handleVideoClick(item.contentDetails.videoId)}
                  // eslint-disable-next-line react/no-unknown-property
                  sx={{
                    marginBottom: 2,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                 
                  <Typography
                    sx={{
                      flex: 1,
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.title}
                  </Typography>

                  <img
                    src={item.thumbnail.url}
                    alt={item.title}
                    style={{ width: "80px", marginRight: "8px" }}
                  />
                </li>
              ))}
            </ul>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PlayerPage;
