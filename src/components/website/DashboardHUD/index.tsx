import React from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../hooks/useTypedSelector";
import type { RootState } from "../../../redux/store";
import { logoutUser } from "../../../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const DashboardHUD: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state: RootState) => state.auth.userData);

  const handleLogout = async () => {
    localStorage.removeItem("login_user");
    await dispatch(logoutUser());
    navigate("/auth/login");
  };

  if (!user) return null;

  return (
    <div className="flex items-center justify-between bg-white shadow px-6 py-4 mb-6 rounded">
      <div>
        <h2 className="text-lg font-semibold text-gray-800">
          {user.firstname} {user.lastname}
        </h2>
        <span
          className={`inline-block mt-1 px-3 py-1 text-xs font-medium rounded-full
            ${
              user.role === "ADMIN"
                ? "bg-purple-100 text-purple-700"
                : "bg-blue-100 text-blue-700"
            }`}
        >
          {user.role}
        </span>
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm"
      >
        Logout
      </button>
    </div>
  );
};

export default DashboardHUD;
