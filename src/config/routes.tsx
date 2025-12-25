import { RouteObject, Navigate } from "react-router-dom";
import WhoAmI from "../pages/WhoAmI/WhoAmI";
import Hobbies from "../pages/Hobbies/Hobbies";
import Contact from "../pages/Contact";
import { ROUTES } from "./../constants";
import Art from "../pages/Hobbies/components/Art";
import Music from "../pages/Hobbies/components/Music";
import Coffee from "../pages/Hobbies/components/Coffee";
import Plants from "../pages/Hobbies/components/Plants";
import Fishes from "../pages/Hobbies/components/Fishes";
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
