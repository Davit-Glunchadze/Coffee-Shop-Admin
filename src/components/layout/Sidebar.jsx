import { Link, useLocation } from "react-router-dom";
import styles from "../../styles/Sidebar.module.css";

const Sidebar = () => {
  const { pathname } = useLocation();

  const isActive = (path) => pathname === path;

  return (
    <aside className={styles.sidebar}>
      <h2>Coffee Admin</h2>
      <h3>Management Panel</h3>
      <nav className={styles.nav}>
        <Link
          to="/dashboard"
          className={`${styles.link} ${
            isActive("/dashboard") ? styles.active : ""
          }`}
        >
          Dashboard
        </Link>
        <Link
          to="/coffee"
          className={`${styles.link} ${
            isActive("/coffee") ? styles.active : ""
          }`}
        >
          Add Coffee
        </Link>
        <Link
          to="/ingredients"
          className={`${styles.link} ${
            isActive("/ingredients") ? styles.active : ""
          }`}
        >
          Manage Ingredients
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
