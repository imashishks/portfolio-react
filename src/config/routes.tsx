import { RouteObject, Navigate } from "react-router-dom";
import WhoAmI from "../pages/WhoAmI/WhoAmI";
import Hobbies from "../pages/Hobbies";
import Contact from "../pages/Contact";
import { ROUTES } from "./../constants";
export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to={ROUTES.WHOAMI.key} replace />,
  },
  {
    path: ROUTES.WHOAMI.key,
    element: <WhoAmI />,
  },
  {
    path: ROUTES.HOBBIES.key,
    element: <Hobbies />,
  },
  {
    path: ROUTES.CONTACT.key,
    element: <Contact />,
  },
];
