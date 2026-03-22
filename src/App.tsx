import { useState } from "react";
import { BrowserRouter, useRoutes } from "react-router-dom";
import Layout from "./components/Layout";
import { routes } from "./config/routes";
import LoaderScreen from "./components/LoaderScreen";

function AppRoutes() {
  const element = useRoutes(routes);
  return <Layout>{element}</Layout>;
}

function App() {
  const [loaderDone, setLoaderDone] = useState(false);

  return (
    <>
      <LoaderScreen onComplete={() => setLoaderDone(true)} />
      {loaderDone && (
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
