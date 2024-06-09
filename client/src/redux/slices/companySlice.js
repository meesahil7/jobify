import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/company",
});

const token = sessionStorage.getItem("jobifyJwt");

axiosInstance.defaults.headers.common["Authorization"] = `${token}`;

// Async thunks for API calls
export const fetchCompanies = createAsyncThunk(
  "/getCompanies",
  async ({ messageApi, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/company/getCompanies`,
        { headers: { Authorization: token } }
      );
      if (response.status === 200) {
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

export const fetchCompany = createAsyncThunk(
  "/getCompany",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/getCompany/${id}`);
      if (response.status === 200) {
        return response.data;
      }
    } catch (err) {
      // messageApi.open({
      //   type: "error",
      //   content: err.response.data.error,
      //   duration: 3,
      // });
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const addCompany = createAsyncThunk(
  "/add",
  async ({ messageApi, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/add`, data);
      if (response.status === 200) {
        messageApi.open({
          type: "success",
          content: response.data.message,
          duration: 3,
        });
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

export const updateCompany = createAsyncThunk(
  "/update",
  async ({ id, messageApi, navigate, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`/update/${id}`, data);
      if (response.status === 200) {
        messageApi.open({
          type: "success",
          content: response.data.message,
          duration: 3,
        });
        navigate("/");
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

export const deleteCompany = createAsyncThunk(
  "/delete",
  async ({ id, messageApi }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/delete/${id}`);
      if (response.status === 200) {
        messageApi.open({
          type: "success",
          content: response.data.message,
          duration: 3,
        });
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

const companySlice = createSlice({
  name: "company",
  initialState: {
    companies: [],
    company: {},
    isLoading: false,
    error: null,
  },
  reducers: {
    deleteCompanyReducer: (state, action) => {
      state.companies = state.companies.filter(
        (item) => item._id !== action.payload.id
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.companies = action.payload.companies;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchCompany.fulfilled, (state, action) => {
        state.company = { ...action.payload.company };
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addCompany.fulfilled, (state, action) => {
        state.companies = [...state.companies, action.payload.company];
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateCompany.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteCompany.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchCompanies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCompany.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCompany.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCompany.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCompany.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCompany.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addCompany.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateCompany.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteCompany.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { deleteCompanyReducer } = companySlice.actions;

export default companySlice.reducer;
