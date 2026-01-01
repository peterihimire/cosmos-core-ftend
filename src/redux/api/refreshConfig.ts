import axios from "axios";

export const refreshAxios = axios.create({
  baseURL: "http://localhost:7070/api/cosmos-core/v1/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
