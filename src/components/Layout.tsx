import { ReactNode } from "react";
import Navigation from "./Navigation";
import { useLocation } from "react-router-dom";
import { ROUTES } from "../constants";
import classNames from "classnames";
import { motion } from "motion/react";

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
  return (
    <div
      className={classNames(
        "w-screen h-screen flex flex-col justify-end items-center transition-colors duration-400 ease-in-out ",
        backgroundClass
      )}
    >
      <div className="w-[90%] flex items-end h-[85%] relative">
        <svg width="63" height="44" viewBox="0 0 63 44" fill="none">
          <path d="M63 0V44H0L63 0Z" fill="black" />
        </svg>

        {children}

        <svg width="63" height="44" viewBox="0 0 63 44" fill="none">
          <path d="M5.32134e-07 0V44H63L5.32134e-07 0Z" fill="black" />
        </svg>
      </div>

      <motion.div className="w-[90%] h-[3px] bg-black rounded-sm mb-2"></motion.div>
      <Navigation pathname={location.pathname} />
    </div>
  );
}

export default Layout;
