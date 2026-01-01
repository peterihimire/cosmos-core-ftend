import $axios from "./config";
import type { TaskPayloadProps, CreateTaskPayload, UpdateTaskPayload } from "../../types/types";

console.log("This is axios...", $axios);
const taskAPI = {
  async getTask(payload: TaskPayloadProps) {
    return $axios.get(`/tasks/${payload.taskId}`);
  },

  async getTasks() {
    return $axios.get("/tasks");
  },

  async createTask(payload: CreateTaskPayload) {
    return $axios.post("/tasks", payload);
  },

  async updateTask(payload: UpdateTaskPayload) {
    return $axios.patch(`/tasks/${payload.id}`,payload.data);
  },

  async deleteTask(payload: TaskPayloadProps) {
    return $axios.delete(`/tasks/${payload.taskId}`);
  },
};
export default taskAPI;
