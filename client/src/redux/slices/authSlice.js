import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8080/auth"; // Replace with your API endpoint

// Async thunks for API calls
export const signup = createAsyncThunk(
  "/signup",
  async ({ value, messageApi, navigate }, { rejectWithValue }) => {
    const { password, confirmPassword } = value;
    if (password !== confirmPassword)
      return messageApi.open({
        type: "error",
        content: "Password and confirm password do not match",
        duration: 3,
      });
    try {
      const response = await axios.post(`${API_URL}/signup`, value);
      if (response.status === 200) {
        messageApi.open({
          type: "success",
          content: response.data.message,
          duration: 3,
        });
        navigate("/login");
        return response.data;
      }
    } catch (err) {
      messageApi.open({
        type: "error",
        content: err.response.data.error,
        duration: 3,
      });
      return rejectWithValue(err.response.data);
    }
  }
);

export const login = createAsyncThunk(
  "/login",
  async ({ values, messageApi }, { rejectWithValue }) => {
    const { email, password } = values;
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      if (response.status === 200) {
        messageApi.open({
          type: "success",
          content: response.data.message,
          duration: 2,
        });
        sessionStorage.setItem("jobifyJwt", response.data.token);
        return response.data;
      }
      return response.data;
    } catch (err) {
      messageApi.open({
        type: "error",
        content: err.response.data.error,
        duration: 3,
      });
      return rejectWithValue(err.response.data);
    }
  }
);

export const logout = createAsyncThunk("/logout", async () => {
  const response = await axios.get(`${API_URL}/logout`);
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: sessionStorage.getItem("jobifyJwt") || null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.fulfilled, (state) => {
        // state.user = action.payload.user;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        // state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.error = null;
      })
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signup.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export default authSlice.reducer;
