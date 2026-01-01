import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import googleGLogo from "../../../../assets/images/google-g-logo.svg";
import { useAppDispatch } from "../../../../hooks/useTypedSelector";
import { loginUser } from "../../../../redux/features/auth/authSlice";

const Form: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const from = location?.state?.from?.pathname;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => setVisible(!visible);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await dispatch(loginUser(values)).unwrap();
        console.log("Response in the form login : ", response);
        toast.success("Login successful", { position: "top-right" });
        navigate(from || "/tasks");
        // if (response.payload.status === "success") {
        //   toast.success(response.payload.msg, { position: "top-right" });
        //   navigate(from || "/tasks");
        // } else {
        //   toast.error(response.payload.msg || "Login failed", {
        //     position: "top-right",
        //   });
        // }
      } catch (err: unknown) {
        if (typeof err === "string") {
          setError(err); // unwrap returns rejectWithValue string
          toast.error(err, { position: "top-right" });
        } else if (err instanceof Error) {
          setError(err.message);
          toast.error(err.message, { position: "top-right" });
        } else {
          setError("Something went wrong");
          toast.error("Something went wrong", { position: "top-right" });
        }
        // if (err instanceof Error) {
        //   setError(err.message);
        // } else {
        //   setError("Something went wrong");
        // }
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => setError(""), 4000);
      return () => clearTimeout(timeout);
    }
  }, [error]);

  // const handleGoogleLogin = () => {
  //   window.location.href = "http://localhost:4040/api/ecommerce/v1/auth/google";
  // };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded-md">
      <h2 className="text-2xl font-semibold mb-2">Welcome Back!</h2>
      <p className="text-gray-500 mb-6">
        Login to your Platform account to claim a task of your choice
      </p>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter Email"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type={visible ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter Password"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <button
              type="button"
              onClick={toggleVisibility}
              className="absolute right-2 top-2 text-gray-500"
            >
              {visible ? <Visibility /> : <VisibilityOff />}
            </button>
          </div>
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.password}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 text-blue-600"
            />
            <span className="text-gray-700 text-sm">Remember me</span>
          </label>
          <Link
            to="/auth/forgot_password"
            className="text-blue-500 text-sm hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50 flex justify-center items-center"
        >
          {loading ? (
            <CircularProgress size={20} style={{ color: "#fff" }} />
          ) : (
            "Log in"
          )}
        </button>

        <div className="text-center mt-4">
          <span className="text-gray-600">New to Platform? </span>
          <Link to="/auth/register" className="text-blue-500 hover:underline">
            Create Account
          </Link>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Form;
