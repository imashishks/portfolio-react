import { ReactNode } from "react";
import Navigation from "./Navigation";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div>
      <main>{children}</main>
      <Navigation />
    </div>
  );
}

export default Layout;
