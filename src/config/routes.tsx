import { RouteObject, Navigate } from 'react-router-dom'
import WhoAmI from '../pages/WhoAmI'
import ArtAndMusic from '../pages/ArtAndMusic'
import Contact from '../pages/Contact'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/who-am-i" replace />,
  },
  {
    path: '/who-am-i',
    element: <WhoAmI />,
  },
  {
    path: '/artandmusic',
    element: <ArtAndMusic />,
  },
  {
    path: '/contact',
    element: <Contact />,
  },
]

