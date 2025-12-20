import Button from "./common/Button";

function Navigation({ activeRoute }: { activeRoute: string }) {
  const isActive = (path: string) => {
    return activeRoute === path;
  };

  return (
    <nav className="flex justify-center h-25">
      <div className="flex justify-around max-w-lg gap-4 items-start pt-2">
        <Button
          variant="link"
          to="whoami"
          className="hover:translate-y-[2px]"
          active={isActive("whoami")}
        >
          Who am I?
        </Button>
        <Button
          variant="link"
          to="hobbies"
          className="hover:translate-y-[2px]"
          active={isActive("hobbies")}
        >
          Hobbies
        </Button>
        <Button
          variant="link"
          to="contact"
          className="hover:translate-y-[2px]"
          active={isActive("contact")}
        >
          Let's Connect?
        </Button>
      </div>

      {/* <ul
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
      </ul> */}
    </nav>
  );
}

export default Navigation;
