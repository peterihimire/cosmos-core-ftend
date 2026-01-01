import React, { useState, useEffect } from "react";
import {
  // useLocation,
  Link,
  useNavigate,
} from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "../../../../hooks/useTypedSelector";
import { registerUser } from "../../../../redux/features/auth/authSlice";
import { CircularProgress } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import googleGLogo from "../../../../assets/images/google-g-logo.svg";

const Form: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const location = useLocation();
  // const from = location?.state?.from?.pathname;

  const [logging, setLogging] = useState(false);
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);
  const [visibleSec, setVisibleSec] = useState(false);

  const toggleVisibility = () => setVisible(!visible);
  const toggleVisibilitySec = () => setVisibleSec(!visibleSec);

  const validationSchema = Yup.object({
    firstname: Yup.string()
      .trim()
      .required("First name is required")
      .matches(/^[a-zA-Z0-9]+$/, "First name must be alphanumeric"),
    // .max(50, "First name is too long"),
    lastname: Yup.string()
      .trim()
      .required("Last name is required")
      .matches(/^[a-zA-Z0-9]+$/, "First name must be alphanumeric")
      .max(50, "First name is too long"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email Required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/^(?=.*[a-z])/, "Must contain lowercase")
      .matches(/^(?=.*[A-Z])/, "Must contain uppercase")
      .matches(/^(?=.*\d)/, "Must contain number")
      .matches(/^(?=.*[@$!%*?&])/, "Must contain special character")
      .required("Password Required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password Required"),
  });

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLogging(true);
      const payload = {
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        password: values.password,
      };

      try {
        const response = await dispatch(registerUser(payload));
        console.log("Hello tom y response", response);
        if (response.payload.status === "success") {
          toast.success(response.payload.msg, { position: "top-right" });
          setTimeout(() => navigate("/auth/login"), 3000);
        } else {
          toast.error(response.payload.msg, { position: "top-right" });
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Something went wrong");
        }
        // setError(err.data?.errors || "Something went wrong");
      } finally {
        setLogging(false);
      }
    },
  });

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => setError(""), 4000);
      return () => clearTimeout(timeout);
    }
  }, [error]);

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-2">Register Account</h2>
      <p className="text-gray-500 mb-6">
        Register to your Platform account to claim a task of your choice
      </p>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* First Name */}
        <div>
          <label htmlFor="firstname" className="block text-gray-700 mb-1">
            First Name
          </label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            placeholder="Enter First Name"
            className={`w-full border rounded px-3 py-2 ${
              formik.touched.firstname && formik.errors.firstname
                ? "border-red-500"
                : "border-gray-300"
            }`}
            value={formik.values.firstname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.firstname && formik.errors.firstname && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.firstname}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor="lastname" className="block text-gray-700 mb-1">
            Last Name
          </label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            placeholder="Enter Last Name"
            className={`w-full border rounded px-3 py-2 ${
              formik.touched.lastname && formik.errors.lastname
                ? "border-red-500"
                : "border-gray-300"
            }`}
            value={formik.values.lastname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.lastname && formik.errors.lastname && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.lastname}
            </p>
          )}
        </div>
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter Email"
            className={`w-full border rounded px-3 py-2 ${
              formik.touched.email && formik.errors.email
                ? "border-red-500"
                : "border-gray-300"
            }`}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
          )}
        </div>

        {/* Password */}
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
              className={`w-full border rounded px-3 py-2 pr-10 ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <span
              className="absolute right-3 top-2.5 cursor-pointer"
              onClick={toggleVisibility}
            >
              {visible ? <Visibility /> : <VisibilityOff />}
            </span>
          </div>
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.password}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirm_password"
            className="block text-gray-700 mb-1"
          >
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={visibleSec ? "text" : "password"}
              id="confirm_password"
              name="confirm_password"
              placeholder="Enter Confirm Password"
              className={`w-full border rounded px-3 py-2 pr-10 ${
                formik.touched.confirm_password &&
                formik.errors.confirm_password
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              value={formik.values.confirm_password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <span
              className="absolute right-3 top-2.5 cursor-pointer"
              onClick={toggleVisibilitySec}
            >
              {visibleSec ? <Visibility /> : <VisibilityOff />}
            </span>
          </div>
          {formik.touched.confirm_password &&
            formik.errors.confirm_password && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.confirm_password}
              </p>
            )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={logging}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {logging ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            "Register"
          )}
        </button>
      </form>

      <div className="mt-4 text-center text-sm">
        <span>Have an account? </span>
        <Link to="/auth/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Form;
