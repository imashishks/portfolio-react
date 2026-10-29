import { BrowserRouter, useRoutes } from "react-router-dom";
import Layout from "./components/Layout";
import { routes } from "./config/routes";

function AppRoutes() {
  const element = useRoutes(routes);
  return <Layout>{element}</Layout>;
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
