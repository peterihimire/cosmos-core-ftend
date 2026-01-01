import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState, AppDispatch } from "../../store";
import authAPI from "../../api/auth";
import {
  saveToLocalStorage,
  // loadFromLocalStorage,
  // removeFromLocalStorage,
} from "../../../utils/LocalStorage";

import { AxiosError } from "axios";
import type { UserPayloadProps, UserLoginProps } from "../../../types/types";

interface UserData {
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  accessToken: string;
}

interface UserState {
  loading: boolean;
  error: string | null;
  authenticated: boolean;
  userData: UserData | null;
}

const userDataString = localStorage.getItem("login_user");
// const userDataString = loadFromLocalStorage("ecommerce_user");

const userData: UserData | null = userDataString
  ? JSON.parse(userDataString)
  : null;

export const registerUser = createAsyncThunk<
  UserData, // Return type on success
  UserPayloadProps, // Argument type
  { rejectValue: string } // Reject payload type
>("auth/register", async (payload: UserPayloadProps, thunkApi) => {
  console.log("my reg payload: ", payload);
  try {
    const response = await authAPI.registerUser(payload);
    const data = response.data;
    return data;
  } catch (error) {
    console.log("This is error message,lets see...", error);
    let message = "Failed to register";
    if (error instanceof AxiosError) {
      message = error.response?.data?.message || message;
    }
    return thunkApi.rejectWithValue(message);
  }
});

export const loginUser = createAsyncThunk<
  UserData, // Return type
  UserLoginProps, // Argument type
  { rejectValue: string; state: RootState; dispatch: AppDispatch }
>("auth/login", async (payload: UserLoginProps, thunkApi) => {
  console.log("My login payload: ", payload);
  try {
    const response = await authAPI.loginUser(payload);
    const { status, msg, data } = response.data;

    if (status !== "success") {
      return thunkApi.rejectWithValue(msg || "Login failed");
    }

    // Save user data to localStorage
    saveToLocalStorage("login_user", data);

    // Return only the data object for Redux
    return data;
  } catch (error) {
    console.log("This is error message,lets see...", error);
    let message = "Failed to login";
    if (error instanceof AxiosError) {
      message = error.response?.data?.message || message;
    }
    return thunkApi.rejectWithValue(message);
  }
});

export const logoutUser = createAsyncThunk<
  void, // Return type
  void, // Argument type (payload)
  { rejectValue: string; dispatch: AppDispatch; state: RootState } // ThunkAPI type
>("users/logout", async (_, thunkApi) => {
  try {
    const response = await authAPI.logoutUser();
    const data = response.data;

    return data;
  } catch (error) {
    console.log("This is error message,lets see...", error);
    let message = "Failed to login";
    if (error instanceof AxiosError) {
      message = error.response?.data?.message || message;
    }
    return thunkApi.rejectWithValue(message);
  } finally {
    localStorage.removeItem("login_user");
  }
});

const initialState: UserState = {
  loading: false,
  error: null,
  authenticated: !!userData,
  userData,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<UserData>) => {
          state.loading = false;
          state.userData = action.payload;
        }
      )
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to register";
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<UserData>) => {
          state.loading = false;
          state.authenticated = true;
          state.userData = action.payload;
          state.error = null;
        }
      )
      .addCase(
        loginUser.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Failed to login";
        }
      )

      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.authenticated = false;
        // state.userData = null;
      })
      .addCase(
        logoutUser.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.authenticated = false;
          state.userData = null;
          state.error = action.payload || "Failed to logout";
        }
      );
  },
});

export default authSlice.reducer;
