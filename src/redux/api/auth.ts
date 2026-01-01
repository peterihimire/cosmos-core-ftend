import $axios from "./config";
import type { UserPayloadProps, UserLoginProps } from "../../types/types";

const authAPI = {
  async registerUser(payload: UserPayloadProps) {
    return $axios.post("/auth/signup", payload);
  },

  async loginUser(payload: UserLoginProps) {
    return $axios.post("/auth/signin", payload);
  },

  async logoutUser() {
    return $axios.post("/auth/signout");
  },
};
export default authAPI;
