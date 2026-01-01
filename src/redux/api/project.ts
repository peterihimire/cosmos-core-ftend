import $axios from "./config";

console.log("This is axios...", $axios);
const projectAPI = {
  async getProjects() {
    return $axios.get("/projects");
  },
};
export default projectAPI;
