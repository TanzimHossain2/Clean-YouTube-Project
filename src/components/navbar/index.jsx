import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button, Container, Stack } from "@mui/material";
import { useState } from "react";
import PlayListForm from "../playlist form";
import PropsType from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";

const Navbar = ({ PlaylistById }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getPlaylistId = (playlistId) => {
    PlaylistById(playlistId);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="default" sx={{ py: 2 }}>
        <Container maxWidth="lg">
          <Toolbar>
            <Stack sx={{ flexGrow: 1 }}>
              <Link
                to="/"
                component={RouterLink}
                sx={{ textDecoration: "none" }}
              >
                <Typography variant="h5">Clean YouTube</Typography>
              </Link>

              <Typography variant="body1">
                Free of ads, comments, and other distractions.
              </Typography>
            </Stack>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClickOpen}
            >
              ADD PLAYLIST
            </Button>
            <PlayListForm
              open={open}
              handleClose={handleClose}
              getPlaylistId={getPlaylistId}
            />
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

Navbar.propTypes = {
  PlaylistById: PropsType.func.isRequired,
};

export default Navbar;
