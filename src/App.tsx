import { BrowserRouter, useRoutes } from "react-router-dom";
import Layout from "./components/Layout";
import { routes } from "./config/routes";
import Button from "./components/common/Button";

function AppRoutes() {
  const element = useRoutes(routes);
  return <Layout>{element}</Layout>;
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <Button className="fixed top-1/2 right-0 rotate-270 shadow-[-4px_0px_0_rgb(13,13,13)]! transform-[translate(25%,100%)] rounded-b-none! h-[44px] hover:h-[48px] hover:transform-[translate(25%,88%)]">
        Resume
      </Button>
    </BrowserRouter>
  );
}

export default App;
