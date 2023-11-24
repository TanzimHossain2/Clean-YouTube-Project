// FavoritePlaylists.js
import { useState, useEffect } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import PlayListCard from '../playlist-card-itms';
import { Container, Grid } from '@mui/material';

const FavoritePlaylists = () => {
  const favoritePlaylistIds = useStoreState((state) => state.favorites.items);
  const getPlaylistById = useStoreActions((actions) => actions.playlists.getPlaylistById);
  const [favoritePlaylists, setFavoritePlaylists] = useState([]);

  useEffect(() => {
    // Fetch and update playlists when the component mounts
    const fetchPlaylists = async () => {
      const playlists = await Promise.all(favoritePlaylistIds.map((playlistId) => getPlaylistById(playlistId)));
      setFavoritePlaylists(playlists);
    };

    fetchPlaylists();
  }, [favoritePlaylistIds, getPlaylistById]);

  // Conditionally render the component
  if (favoritePlaylists.length === 0) {
    return null; 
  }

  return (
    <Container maxWidth={'lg'} sx={{ marginTop: 16 }}>
      <h2>Favorite Playlists</h2>
      {favoritePlaylists.length > 0 && (
        <Grid container alignItems={'stretch'}>
          {favoritePlaylists.map((playlist, index) => (
            <Grid item xs={12} md={6} lg={4} mb={2} key={index}>
              <PlayListCard playlist={playlist} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default FavoritePlaylists;
