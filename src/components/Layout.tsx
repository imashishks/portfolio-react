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
      <div className="w-5/6 flex items-end h-[75%]">
        <svg width="63" height="44" viewBox="0 0 63 44" fill="none">
          <path d="M63 0V44H0L63 0Z" fill="black" />
        </svg>

        <motion.div
          key={activeRoute}
          initial={{ height: "0" }}
          animate={{ height: "100%" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="content bg-white bg-[radial-gradient(circle,#e0e0e0_1px,transparent_1px)] bg-size-[20px_20px] w-4/6  rounded-t-xl pt-8 p-6 pb-0 grow h-full border-2"
        >
          <main className="flex-1 h-full">
            <motion.div
              key={activeRoute}
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.3, ease: "easeOut", delay: 0.4 }}
              className="flex justify-center items-center h-full overflow-y-auto scroll-fade"
            >
              {children}
            </motion.div>
          </main>
        </motion.div>
        <svg width="63" height="44" viewBox="0 0 63 44" fill="none">
          <path d="M5.32134e-07 0V44H63L5.32134e-07 0Z" fill="black" />
        </svg>
      </div>

      <motion.div className="w-5/6 h-[3px] bg-black rounded-sm mb-6"></motion.div>
      <Navigation activeRoute={activeRoute} />
    </div>
  );
}

export default Layout;
