import { ReactNode, useState } from "react";
import Navigation from "./Navigation";
import { useLocation } from "react-router-dom";
import { ROUTES } from "../constants";
import classNames from "classnames";
import { motion } from "motion/react";
import TabLayout from "./TabLayout";

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
        "w-screen h-screen flex flex-col justify-end items-center transition-colors duration-400 ease-in-out ",
        backgroundClass
      )}
    >
      <div className="w-[80%] flex items-end h-[75%] relative">
        <svg width="63" height="44" viewBox="0 0 63 44" fill="none">
          <path d="M63 0V44H0L63 0Z" fill="black" />
        </svg>

        {children}

        <svg width="63" height="44" viewBox="0 0 63 44" fill="none">
          <path d="M5.32134e-07 0V44H63L5.32134e-07 0Z" fill="black" />
        </svg>
      </div>

      <motion.div className="w-[80%] h-[3px] bg-black rounded-sm mb-6"></motion.div>
      <Navigation activeRoute={activeRoute} />
    </div>
  );
}

export default Layout;
