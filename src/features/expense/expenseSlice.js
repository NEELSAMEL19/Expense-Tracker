import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addExpenseService,
  getExpenseService,
  deleteExpenseService,
  downloadExpenseService,
} from "../../Services/ExpenseService";

// ✅ Thunks
export const fetchExpenses = createAsyncThunk(
  "expense/fetchExpenses",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getExpenseService();
      return res?.data || [];
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const addExpense = createAsyncThunk(
  "expense/addExpense",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await addExpenseService(payload);
      return res?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const deleteExpense = createAsyncThunk(
  "expense/deleteExpense",
  async (id, { rejectWithValue }) => {
    try {
      await deleteExpenseService(id);
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const downloadExpense = createAsyncThunk(
  "expense/downloadExpense",
  async (_, { rejectWithValue }) => {
    try {
      const response = await downloadExpenseService();
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expenses.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    expenses: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.expenses = action.payload;
        state.loading = false;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.expenses = [];
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch expenses";
      })
      // add
      .addCase(addExpense.fulfilled, (state, action) => {
        state.expenses.push(action.payload);
      })
      .addCase(addExpense.rejected, (state, action) => {
        state.error = action.payload?.message || "Failed to add expense";
      })
      // delete
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.expenses = state.expenses.filter((e) => e._id !== action.payload);
      })
      .addCase(deleteExpense.rejected, (state, action) => {
        state.error = action.payload?.message || "Failed to delete expense";
      });
  },
});

export default expenseSlice.reducer;
