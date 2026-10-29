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
        "w-full h-dvh flex flex-col justify-end items-center overflow-x-hidden pt-[5vh] md:pt-[8vh] transition-colors duration-400 ease-in-out",
        backgroundClass
      )}
    >
      <div className="w-[94%] sm:w-[90%] md:w-[85%] lg:w-[80%] flex min-h-0 flex-1 items-end relative">
        {/* <svg width="63" height="44" viewBox="0 0 63 44" fill="none">
          <path d="M63 0 A 63 44 0 0 0 0 44 L 63 44 Z" fill="black" />
        </svg> */}
        <Groove
          className={classNames(
            "h-auto w-7 shrink-0 sm:w-9 md:w-[53px]",
            grooveClass
          )}
        />


        {children}

        {/* <svg width="63" height="44" viewBox="0 0 63 44" fill="none">
          <path d="M0 0 A 63 44 0 0 1 63 44 L 0 44 Z" fill="black" />
        </svg> */}
        <Groove
          className={classNames(
            "h-auto w-7 shrink-0 sm:w-9 md:w-[53px]",
            grooveClass,
            "-scale-x-100"
          )}
        />
      </div>

      {/* <motion.div className="w-[70%] h-[3px] bg-black rounded-sm mb-2"></motion.div> */}
      <Navigation pathname={location.pathname} />
    </div>
  );
}

export default Layout;
