import { useRoutes } from "react-router-dom";
import { routes } from "./RouteList";

export const AllRoutes = () => {
  return useRoutes(routes);
};
