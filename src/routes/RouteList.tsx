import type { RouteObject } from "react-router-dom";
import WebsiteLayout from "../layouts/website";
import { Home } from "../pages/home";
import { TasksList } from "../pages/tasksList";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <WebsiteLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/tasks",
        element: <TasksList />,
      },
    ],
  },
];
