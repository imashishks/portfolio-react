import { ReactNode } from "react";
import Navigation from "./Navigation";
import { useLocation } from "react-router-dom";
import { ROUTES } from "../constants";
import classNames from "classnames";
import Groove from "../assets/images/groove.svg?react";
interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  const location = useLocation();

  // Find the matching route by checking if pathname starts with any route key
  const getActiveRoute = () => {
    const pathname = location.pathname;

    // Check each route to see if pathname matches or starts with it
    for (const [key, route] of Object.entries(ROUTES)) {
      const routePath = `/${route.key}`;
      if (pathname === routePath || pathname.startsWith(`${routePath}/`)) {
        return key;
      }
    }

    // Default to WHOAMI if no match
    return "WHOAMI";
  };

  const activeRouteKey = getActiveRoute();
  const backgroundClass =
    ROUTES[activeRouteKey as keyof typeof ROUTES]?.meta.backgroundClass ||
    ROUTES.WHOAMI.meta.backgroundClass;
  const grooveClass = ROUTES[activeRouteKey as keyof typeof ROUTES]?.meta.grooveClass || ROUTES.WHOAMI.meta.grooveClass;
  return (
    <div
      className={classNames(
        "w-screen h-screen flex flex-col justify-end items-center transition-colors duration-400 ease-in-out ",
        backgroundClass
      )}
    >
      <div className="w-[80%] flex items-end h-[85%] relative">
        {/* <svg width="63" height="44" viewBox="0 0 63 44" fill="none">
          <path d="M63 0 A 63 44 0 0 0 0 44 L 63 44 Z" fill="black" />
        </svg> */}
        <Groove className={classNames(grooveClass)} />


        {children}

        {/* <svg width="63" height="44" viewBox="0 0 63 44" fill="none">
          <path d="M0 0 A 63 44 0 0 1 63 44 L 0 44 Z" fill="black" />
        </svg> */}
        <Groove className={classNames(grooveClass, "-scale-x-100")} />
      </div>

      {/* <motion.div className="w-[70%] h-[3px] bg-black rounded-sm mb-2"></motion.div> */}
      <Navigation pathname={location.pathname} />
    </div>
  );
}

export default Layout;
