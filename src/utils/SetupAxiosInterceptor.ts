// import type { AxiosInstance } from "axios";

// export function setupAxiosInterceptors(axiosInstance: AxiosInstance) {
//   // Attach token to every request
//   axiosInstance.interceptors.request.use(
//     (config) => {
//       const userDataString = localStorage.getItem("login_user");
//       if (userDataString) {
//         const userData = JSON.parse(userDataString);
//         if (userData.accessToken) {
//           config.headers = {
//             ...config.headers,
//             Authorization: `Bearer ${userData.accessToken}`,
//           };
//         }
//       }
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );

//   // Handle 401 unauthorized globally
//   axiosInstance.interceptors.response.use(
//     (response) => response,
//     (error) => {
//       if (
//         (error.response && error.response.status === 401) ||
//         error?.response?.data?.message === "Unauthenticated."
//       ) {
//         console.log("Token expired / user unauthenticated");
//         localStorage.removeItem("login_user");
//         window.location.href = "/auth/login";
//       }
//       return Promise.reject(error);
//     }
//   );
// }

import type { AxiosInstance } from "axios";

export function setupAxiosInterceptors(axiosInstance: AxiosInstance) {
  axiosInstance.interceptors.request.use(
    (config) => {
      const userDataString = localStorage.getItem("login_user");
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        if (userData.accessToken) {
          // Use .set() method on AxiosHeaders
          config.headers?.set(
            "Authorization",
            `Bearer ${userData.accessToken}`
          );
        }
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (
        error.response?.status === 401 ||
        error?.response?.data?.message === "Unauthenticated."
      ) {
        localStorage.removeItem("login_user");
        window.location.href = "/auth/login";
      }
      return Promise.reject(error);
    }
  );
}

// import type { AxiosInstance } from "axios";
// // import { logoutUser } from "../redux/features/auth/authSlice";
// // import type { AppDispatch } from "../redux/store"; // Import your AppDispatch type

// // Utility function to add interceptors
// export function setupAxiosInterceptors(
//   axiosInstance: AxiosInstance,
//   // dispatch: AppDispatch
// ) {
//   axiosInstance.interceptors.response.use(
//     (response) => response,
//     (error) => {
//       if (
//         (error.response && error.response.status === 401) ||
//         error?.response?.data?.message === "Unauthenticated."
//       ) {
//         console.log("Action reaching here...");
//         localStorage.removeItem("login_user");

//         // dispatch(logoutUser())
//         //   .unwrap()
//         //   .catch((dispatchError) => {
//         //     console.error("Error dispatching logoutUser:", dispatchError);
//         //   });

//         // window.location.href = "/auth/login";
//       }
//       return Promise.reject(error);
//     }
//   );
// }
