import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addIncomeService,
  getIncomeService,
  deleteIncomeService,
  downloadIncomeService,
} from "../../Services/IncomeService";

// ✅ Thunks
export const fetchIncomes = createAsyncThunk(
  "income/fetchIncomes",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getIncomeService();
      return res?.data || [];
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const addIncome = createAsyncThunk(
  "income/addIncome",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await addIncomeService(payload);
      return res?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const deleteIncome = createAsyncThunk(
  "income/deleteIncome",
  async (id, { rejectWithValue }) => {
    try {
      await deleteIncomeService(id);
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const downloadIncome = createAsyncThunk(
  "income/downloadIncome",
  async (_, { rejectWithValue }) => {
    try {
      const response = await downloadIncomeService();
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "income.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const incomeSlice = createSlice({
  name: "income",
  initialState: {
    incomes: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchIncomes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIncomes.fulfilled, (state, action) => {
        state.incomes = action.payload;
        state.loading = false;
      })
      .addCase(fetchIncomes.rejected, (state, action) => {
        state.incomes = [];
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch incomes";
      })
      // add
      .addCase(addIncome.fulfilled, (state, action) => {
        state.incomes.push(action.payload);
      })
      .addCase(addIncome.rejected, (state, action) => {
        state.error = action.payload?.message || "Failed to add income";
      })
      // delete
      .addCase(deleteIncome.fulfilled, (state, action) => {
        state.incomes = state.incomes.filter((i) => i._id !== action.payload);
      })
      .addCase(deleteIncome.rejected, (state, action) => {
        state.error = action.payload?.message || "Failed to delete income";
      });
  },
});

export default incomeSlice.reducer;
