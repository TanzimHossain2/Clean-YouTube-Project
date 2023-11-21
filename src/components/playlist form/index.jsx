import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import PropTypes from "prop-types";

const PlayListForm = ({ open, handleClose, handleSubmit }) => {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const parsePlaylistId = (input) => {
    // Check if the input is a valid URL
    try {
      const url = new URL(input);
      const urlParams = new URLSearchParams(url.search);

      // If it's a URL with "list" parameter, extract the playlist ID
      if (url.hostname.includes("youtube.com") && urlParams.has("list")) {
        return urlParams.get("list");
      }
    } catch (error) {
      // If it's not a valid URL, treat it as a playlist ID
      return input;
    }

    // If it's already a playlist ID, return it
    return input;
  };

  const handleFormSubmit = () => {
    if (!input) {
      alert("Please enter a valid URL or ID.");
    } else {
      const playlistId = parsePlaylistId(input);
      handleSubmit(playlistId);
      setInput("");
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Playlist</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To add a new playlist, please enter the playlist URL or ID below.
          Please make sure the URL is correct. Otherwise, it will not work.
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
        <Button onClick={handleFormSubmit}>Add Playlist</Button>
      </DialogActions>
    </Dialog>
  );
};

PlayListForm.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default PlayListForm;
