// this component is used to add a new playlist to the list of playlists

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import PropTypes from "prop-types";

const PlayListForm = ({ open, handleClose, getPlaylistId }) => {
  const [url, setUrl] = useState("");

  const handleChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = () => {
    //Todo handle url later
    if (!url) {
      alert("Please enter a valid URL or ID.");
    } else {
      getPlaylistId(url);
      setUrl("");
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Playlist</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To add a new playlist, please enter the playlist URL or ID below.
          Please make sure the URL is correct. Otherwise it will not work.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Playlist URL or ID"
          type="text"
          fullWidth
          variant="standard"
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}> Add Playlist </Button>
      </DialogActions>
    </Dialog>
  );
};

PlayListForm.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  getPlaylistId: PropTypes.func.isRequired,
};

export default PlayListForm;
