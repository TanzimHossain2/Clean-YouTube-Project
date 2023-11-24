import { useStoreActions } from "easy-peasy";
import { Link } from "react-router-dom";
import styles from "./SideNav.module.scss";

import ReorderIcon from '@mui/icons-material/Reorder';
import AddIcon from '@mui/icons-material/Add';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PropsTypes from "prop-types";
import { useState } from "react";
import PlayListForm from '../../components/playlist form'

const SideNav = ({ handleMenuBarTrig }) => {
  const [open, setOpen] = useState(false);
  const getPlaylist = useStoreActions((actions) => actions.playlists.getPlaylist);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleSubmit = (playlistId) => {
    getPlaylist(playlistId);
    handleClose();
  };

  return (
    <div className={styles.sidenav}>
      <div className={styles.top_content}>
        <a className={styles.menu_icon} onClick={handleMenuBarTrig}>
          <i>
            <ReorderIcon />
          </i>
        </a>
        <Link to={"/playlists"} className={styles.logo}>
          <i>
            <YouTubeIcon />
          </i>
        </Link>
        <a
          className={styles.add_icon}
          title={"Add Playlist"}
          onClick={handleClickOpen}
        >
          <i>
            <AddIcon />
          </i>
        </a>
      </div>
      <div className={styles.bottom_content}>
        <div className={styles.about} title={"About"}>
          <i>
            <HelpOutlineIcon />
          </i>
        </div>
      </div>

      <PlayListForm
              open={open}
              handleClose={handleClose}
              handleSubmit={handleSubmit}
            />
    </div>
  );
};

SideNav.propTypes = {
  handleMenuBarTrig: PropsTypes.func.isRequired,
};

export default SideNav;
