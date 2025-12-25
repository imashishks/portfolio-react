import { ReactNode, useEffect, useState } from "react";
import { motion } from "motion/react";
import { useLocation, useNavigate } from "react-router-dom";

interface TabLayoutProps {
  children: ReactNode;
  tabs?: {
    id: string;
    label: string;
  }[];
  basePath?: string;
}

function TabLayout({ children, tabs, basePath = "" }: TabLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("");

  // Sync activeTab with current route
  useEffect(() => {
    if (Array.isArray(tabs) && tabs.length > 0) {
      // Extract the current tab from the pathname
      const currentPath = location.pathname.split("/").pop() || "";
      const matchingTab = tabs.find((tab) => tab.id === currentPath);

      if (matchingTab) {
        setActiveTab(matchingTab.id);
      } else {
        // Default to first tab if no match
        setActiveTab(tabs[0].id);
      }
    }
  }, [location.pathname, tabs]);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    if (basePath) {
      navigate(`/${basePath}/${tabId}`);
    } else {
      navigate(tabId);
    }
  };
  return (
    <motion.div
      initial={{ height: "0" }}
      animate={{ height: "100%" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="content bg-white bg-[radial-gradient(circle,#e0e0e0_1px,transparent_1px)] bg-size-[20px_20px] w-4/6  rounded-t-xl pt-8 p-6 pb-0 grow h-full  relative"
    >
      {Array.isArray(tabs) && tabs.length > 0 && (
        <motion.div
          initial={{ opacity: "0" }}
          animate={{ opacity: "100%" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="flex gap-1 absolute rotate-90 right-[-220px] transform-[translate(50%,-100%)] top-0"
        >
          {tabs.map((item) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0.75, y: 4 }}
              animate={{
                opacity: activeTab === item.id ? 1 : 0.75,
                y: activeTab === item.id ? 0 : 4,
              }}
              whileHover={{ y: 0 }}
              whileTap={{ opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-white p-2 pl-6 pr-6 rounded-t-sm cursor-pointer"
              onClick={() => handleTabClick(item.id)}
            >
              {item.label}
            </motion.button>
          ))}
        </motion.div>
      )}
      <main className="flex-1 h-full relative">
        <motion.div
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.4 }}
          className="flex justify-center items-center h-full overflow-y-auto scroll-fade"
        >
          {children}
        </motion.div>
      </main>
    </motion.div>
  );
}

export default TabLayout;
