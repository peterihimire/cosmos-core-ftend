import axios from "axios";

const baseURL = "http://localhost:7070/api/cosmos-core/v1/";

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
