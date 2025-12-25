import { RouteObject, Navigate } from "react-router-dom";
import WhoAmI from "../pages/WhoAmI/WhoAmI";
import Interests from "../pages/Interests/Interests";
import Contact from "../pages/Contact";
import { ROUTES } from "./../constants";
import Art from "../pages/Interests/components/Art";
import Music from "../pages/Interests/components/Music";
import Coffee from "../pages/Interests/components/Coffee";
import Plants from "../pages/Interests/components/Plants";
import Fishes from "../pages/Interests/components/Fishes";
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
    path: ROUTES.INTERESTS.key,
    element: <Interests />,
    children: [
      {
        index: true,
        element: <Navigate to="art" replace />,
      },
      {
        path: "art",
        element: <Art />,
      },
      {
        path: "music",
        element: <Music />,
      },
      {
        path: "coffee",
        element: <Coffee />,
      },
      {
        path: "plants",
        element: <Plants />,
      },
      {
        path: "fishes",
        element: <Fishes />,
      },
    ],
  },
  {
    path: ROUTES.CONTACT.key,
    element: <Contact />,
  },
];
