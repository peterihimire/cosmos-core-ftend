import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import taskAPI from "../../api/task";
import { AxiosError } from "axios";
import type {
  TaskPayloadProps,
  CreateTaskPayload,
  UpdateTaskPayload,
} from "../../../types/types";

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
    const response = await taskAPI.getTasks();
    const tasks: Task[] = response.data.data.tasks;
    return tasks;
  } catch (error: unknown) {
    let message = "Failed to fetch tasks";
    if (error instanceof AxiosError) {
      message = error.response?.data?.message || message;
    }
    return thunkApi.rejectWithValue(message);
  }
});

// Create task
export const createTask = createAsyncThunk<
  Task,
  CreateTaskPayload,
  { rejectValue: string }
>("tasks/create", async (payload, thunkApi) => {
  try {
    const response = await taskAPI.createTask(payload);
    return response.data.data;
  } catch (error: unknown) {
    let message = "Failed to create tasks";
    if (error instanceof AxiosError) {
      message = error.response?.data?.message || message;
    }
    return thunkApi.rejectWithValue(message);
  }
});

// Update task
export const updateTask = createAsyncThunk<
  Task,
  UpdateTaskPayload,
  { rejectValue: string }
>("tasks/update", async ({ id, data }, thunkApi) => {
  try {
    const response = await taskAPI.updateTask({ id, data });
    return response.data.data;
  } catch (error: unknown) {
    let message = "Failed to update task";
    if (error instanceof AxiosError) {
      message = error.response?.data?.message || message;
    }
    return thunkApi.rejectWithValue(message);
  }
});

// Delete task
export const deleteTask = createAsyncThunk<
  string,
  TaskPayloadProps,
  { rejectValue: string }
>("tasks/delete", async (payload, thunkApi) => {
  try {
    await taskAPI.deleteTask(payload);
    return payload.taskId;
  } catch (error: unknown) {
    let message = "Failed to delete task";
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
      })

      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.unshift(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to create task";
      })

      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to update task";
      })

      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to delete task";
      });
  },
});

export default tasksSlice.reducer;
