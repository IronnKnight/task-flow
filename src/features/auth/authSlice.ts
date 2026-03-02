import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getCurrentUserRequest,
  loginRequest,
  logoutRequest,
} from "@/features/auth/authAPI";
import type { AuthState, AuthUser, LoginPayload } from "@/features/auth/types";
import { getErrorMessage } from "@/shared/utils/getErrorMessage";

const initialState: AuthState = {
  user: null,
  status: "loading",
  error: null,
};

export const login = createAsyncThunk<AuthUser, LoginPayload>(
  "auth/login",
  async (payload) => {
    return loginRequest(payload);
  },
);

export const logout = createAsyncThunk<void>("auth/logout", async () => {
  await logoutRequest();
});

export const loadCurrentUser = createAsyncThunk<AuthUser | null>(
  "auth/loadCurrentUser",
  async () => {
    return getCurrentUserRequest();
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "authenticated";
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "error";
        state.error = getErrorMessage(action.error, "Unexpected auth error");
      })
      .addCase(logout.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.status = "idle";
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "error";
        state.error = getErrorMessage(action.error, "Unexpected auth error");
      })
      .addCase(loadCurrentUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = action.payload ? "authenticated" : "idle";
        state.error = null;
      })
      .addCase(loadCurrentUser.rejected, (state, action) => {
        state.status = "error";
        state.error = getErrorMessage(action.error, "Unexpected auth error");
      });
  },
});

export const authReducer = authSlice.reducer;
