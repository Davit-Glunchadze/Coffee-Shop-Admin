import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const { pathname } = useLocation();

  const isActive = (path) => pathname === path;

  return (
    <aside
      style={{
        width: "220px",
        backgroundColor: "#6f4e37",
        color: "white",
        padding: "1rem",
        minHeight: "100vh",
      }}
    >
      <h2 style={{ marginBottom: "2rem" }}>Coffee Admin</h2>

      <nav style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Link
          to="/dashboard"
          style={{
            color: isActive("/dashboard") ? "#fff" : "#ccc",
            textDecoration: "none",
            fontWeight: isActive("/dashboard") ? "bold" : "normal",
          }}
        >
          Dashboard
        </Link>
        <Link
          to="/coffee"
          style={{
            color: isActive("/coffee") ? "#fff" : "#ccc",
            textDecoration: "none",
            fontWeight: isActive("/coffee") ? "bold" : "normal",
          }}
        >
          Add Coffee
        </Link>
        <Link
          to="/ingredients"
          style={{
            color: isActive("/ingredients") ? "#fff" : "#ccc",
            textDecoration: "none",
            fontWeight: isActive("/ingredients") ? "bold" : "normal",
          }}
        >
          Manage Ingredients
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
