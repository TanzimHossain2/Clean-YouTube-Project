import { useEffect, useState } from "react";
import styles from "./Layout.module.scss";
import MenuBar from "./MenuBar";
import SideNav from "./SideNav";
import PropTypes from "prop-types";

const Layout = ({ children }) => {
  const [menuBarTrig, setMenuBarTrig] = useState(true);

  useEffect(() => {
    if (window.innerWidth < 576) {
      setMenuBarTrig(false);
    }
  }, [window.innerWidth]);

  const handleMenuBarTrig = () => {
    if (menuBarTrig) {
      setMenuBarTrig(false);
    } else {
      setMenuBarTrig(true);
    }
  };

  return (
    <div>
      <SideNav handleMenuBarTrig={handleMenuBarTrig} />
      <MenuBar menuBarTrig={menuBarTrig} />
      <div className={`${styles.main} ${menuBarTrig && styles.with_menu}`}>
        {children}
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
