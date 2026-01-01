import { configureStore } from "@reduxjs/toolkit";
import tasksSlice from "./features/task/tasksSlice";
import authSlice from "./features/auth/authSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    tasks: tasksSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
