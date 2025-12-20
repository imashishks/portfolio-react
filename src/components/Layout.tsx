import { ReactNode } from "react";
import Navigation from "./Navigation";
import { useLocation } from "react-router-dom";
import { ROUTES } from "../constants";
import classNames from "classnames";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const activeRoute = location.pathname.split("/").pop() || ROUTES.WHOAMI.key;
  const parsedActiveRoute = activeRoute
    .toUpperCase()
    .replace(/[_-]/g, " ") as keyof typeof ROUTES;
  const backgroundClass =
    ROUTES[parsedActiveRoute]?.meta.backgroundClass ||
    ROUTES.WHOAMI.meta.backgroundClass;

  return (
    <div
      className={classNames(
        "w-screen h-screen flex flex-col transition-colors duration-400 ease-in-out",
        backgroundClass
      )}
    >
      <main className="flex-1">{children}</main>
      <Navigation activeRoute={activeRoute} />
    </div>
  );
}

export default Layout;
