import axios from "axios";
import { BASE_API_URL } from "./api";
const baseURL = BASE_API_URL;

const config = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

const $axios = axios.create({
  baseURL,
  headers: config.headers,
  withCredentials: config.withCredentials,
});

export default $axios;
