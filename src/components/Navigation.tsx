import { Link, useLocation } from "react-router-dom";

function Navigation() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav>
      <ul
        style={{
          display: "flex",
          listStyle: "none",
          gap: "1rem",
          padding: "1rem",
        }}
      >
        <li>
          <Link
            to="/who-am-i"
            style={{
              textDecoration: "none",
              color: isActive("/who-am-i") ? "blue" : "black",
              fontWeight: isActive("/who-am-i") ? "bold" : "normal",
            }}
          >
            Who Am I
          </Link>
        </li>
        <li>
          <Link
            to="/artandmusic"
            style={{
              textDecoration: "none",
              color: isActive("/artandmusic") ? "blue" : "black",
              fontWeight: isActive("/artandmusic") ? "bold" : "normal",
            }}
          >
            Art and Music
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            style={{
              textDecoration: "none",
              color: isActive("/contact") ? "blue" : "black",
              fontWeight: isActive("/contact") ? "bold" : "normal",
            }}
          >
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
