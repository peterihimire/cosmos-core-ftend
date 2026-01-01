import type { AxiosInstance } from "axios";

export function setupAxiosInterceptors(axiosInstance: AxiosInstance) {
  axiosInstance.interceptors.request.use(
    (config) => {
      const userDataString = localStorage.getItem("login_user");
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        if (userData.accessToken) {
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
