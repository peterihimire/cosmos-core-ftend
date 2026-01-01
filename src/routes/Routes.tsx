import { BrowserRouter, Route, Routes } from "react-router-dom";
import type { RootState } from "../redux/store";
import { useAppSelector } from "../hooks/useTypedSelector";
import WebsiteLayout from "../layouts/website";
import AuthLayout from "../layouts/auth";
import { Home } from "../pages/home";
import { LoginForm } from "../pages/loginform";
import { RegisterForm } from "../pages/registerform";
import { TasksList } from "../pages/tasksList";
import ProtectedRoutes from "../hoc/ProtectedRoutes";
import RenderTop from "../utils/RenderTop";

const AllRoutes = () => {
    const currentUser = useAppSelector((state: RootState) => state.auth);
  return (
    <BrowserRouter>
      <RenderTop />
      <Routes>
        <Route element={<WebsiteLayout />}>
          <Route path="/" index={true} element={<Home />} />
          {/* <Route path="/tasks" element={<TasksList />} /> */}
          <Route
            path="/tasks"
            element={
              <ProtectedRoutes isAllowed={!!currentUser.authenticated}>
                <TasksList/>
              </ProtectedRoutes>
            }
          />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginForm />} />
          <Route path="/auth/register" element={<RegisterForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default AllRoutes;
