import axios from "axios";
import { BASE_API_URL } from "./api";

export const refreshAxios = axios.create({
  baseURL: BASE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
