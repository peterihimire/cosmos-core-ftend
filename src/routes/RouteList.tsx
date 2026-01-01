import type { RouteObject } from "react-router-dom";
import WebsiteLayout from "../layouts/website";
import { TasksList } from "../pages/tasksList";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <WebsiteLayout />,
    children: [
      {
        path: "/tasks",
        element: <TasksList />,
      },
    ],
  },
];
