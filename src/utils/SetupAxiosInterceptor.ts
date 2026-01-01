import type {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { refreshAxios } from "../redux/api/refreshConfig";

let isRefreshing = false;
let failedQueue: {
  resolve: (token: string) => void;
  reject: (err: AxiosError) => void;
}[] = [];

const processQueue = (
  error: AxiosError | null,
  token: string | null = null
) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token!);
  });
  failedQueue = [];
};

export function setupAxiosInterceptors(axiosInstance: AxiosInstance) {
  // REQUEST
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const stored = localStorage.getItem("login_user");
      if (stored) {
        const user = JSON.parse(stored);
        if (user.accessToken) {
          config.headers.Authorization = `Bearer ${user.accessToken}`;
        }
      }
      return config;
    }
  );

  // RESPONSE
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean;
      };

      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject: (error: AxiosError) => void) => {
            failedQueue.push({
              resolve: (token: string) => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                resolve(axiosInstance(originalRequest));
              },
              reject,
            });
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const { data } = await refreshAxios.post("/auth/refresh-token");
          console.log("resfresh token data:", data);
          const newAccessToken = data.data.accessToken;

          const user = JSON.parse(localStorage.getItem("login_user")!);
          user.accessToken = newAccessToken;
          localStorage.setItem("login_user", JSON.stringify(user));

          axiosInstance.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;

          processQueue(null, newAccessToken);

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError as AxiosError, null);
          localStorage.removeItem("login_user");
          window.location.href = "/auth/login";
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );
}

// import type { AxiosInstance } from "axios";

// export function setupAxiosInterceptors(axiosInstance: AxiosInstance) {
//   axiosInstance.interceptors.request.use(
//     (config) => {
//       const userDataString = localStorage.getItem("login_user");
//       if (userDataString) {
//         const userData = JSON.parse(userDataString);
//         if (userData.accessToken) {
//           config.headers?.set(
//             "Authorization",
//             `Bearer ${userData.accessToken}`
//           );
//         }
//       }
//       return config;
//     },
//     (error) => Promise.reject(error)
//   );

//   axiosInstance.interceptors.response.use(
//     (response) => response,
//     (error) => {
//       if (
//         error.response?.status === 401 ||
//         error?.response?.data?.message === "Unauthenticated."
//       ) {
//         localStorage.removeItem("login_user");
//         window.location.href = "/auth/login";
//       }
//       return Promise.reject(error);
//     }
//   );
// }
