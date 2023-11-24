import { Link, useMatch } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import styles from "./MenuBar.module.scss";
import HomeIcon from "@mui/icons-material/Home";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import PropTypes from "prop-types";

const MenuBar = ({ menuBarTrig }) => {
  return (
    <div
      className={styles.menubar}
      style={
        !menuBarTrig ? { left: "-220px", transform: "translateX(100)" } : null
      }
    >
      <Link to={"/"}>
        {" "}
        <div className={styles.logo}>
          <img src={logo} alt="" width={40} height={40} />
          <span>Clean YouTube</span>
        </div>
      </Link>
      <div className={styles.menu}>
        <ul className={styles.lists}>
          <Link
            to={"/"}
            className={Boolean(useMatch("/")) ? styles.active : null}
          >
            <i>
              <HomeIcon />
            </i>
            <span>Home</span>
          </Link>

          <li>
            <Link
              to={"/recents"}
              className={Boolean(useMatch("/recents")) ? styles.active : null}
            >
              <i>
                <WatchLaterIcon />
              </i>
              <span>Recents</span>
            </Link>
          </li>
          <li>
            <Link
              to={"/playlists"}
              className={Boolean(useMatch("/playlists")) ? styles.active : null}
            >
              <i>
                <PlaylistPlayIcon />
              </i>
              <span>Playlists</span>
            </Link>
          </li>
          <li>
            <Link
              to={"/favorites"}
              className={Boolean(useMatch("/favorites")) ? styles.active : null}
            >
              <i>
                <FavoriteBorderOutlinedIcon />
              </i>
              <span>Favorites</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

MenuBar.propTypes = {
  menuBarTrig: PropTypes.bool,
};

export default MenuBar;
