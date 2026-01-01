import $axios from "./config";
import type { TaskPayloadProps } from "../../types/types";

console.log("This is axios...", $axios);
const taskAPI = {
  async getTask(payload: TaskPayloadProps) {
    return $axios.get(`/tasks/${payload.taskId}`);
  },

  async getTasks() {
    return $axios.get("/tasks");
  },

  async getTasksFilter(query: string) {
    return $axios.get(`/tasks?${query}`);
  },
};
export default taskAPI;
