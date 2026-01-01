// src/store/tasksSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
// import axios from "axios";
import taskAPI from "../../api/task";
import { AxiosError } from "axios";

export interface Task {
  id: string;
  title: string;
  status: "OPEN" | "IN_PROGRESS" | "EXPIRED" | "COMPLETED";
  assignedTo?: string;
  claimedAt?: string;
  expiresAt: string;
  projectId: string;
  description: string;
}

export interface PaginatedResponse<T> {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  tasks: T[];
}

interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
};

// Async thunk to fetch tasks
export const fetchTasks = createAsyncThunk<
  Task[],
  void,
  { rejectValue: string }
>("tasks", async (_, thunkApi) => {
  try {
    const response = await taskAPI.getTasks(); // AxiosResponse
    const tasks: Task[] = response.data.data.tasks; // access nested tasks
    return tasks;
  } catch (error: unknown) {
    let message = "Failed to fetch tasks";
    if (error instanceof AxiosError) {
      message = error.response?.data?.message || message;
    }
    return thunkApi.rejectWithValue(message);
  }
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch tasks";
      });
  },
});

// export const { updateTask } = tasksSlice.actions;
export default tasksSlice.reducer;
