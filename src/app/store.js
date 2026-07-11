import { configureStore } from "@reduxjs/toolkit";
import incomeReducer from "../features/income/incomeSlice";
import expenseReducer from "../features/expense/expenseSlice";
import sidebarReducer from "../features/ui/sidebarSlice";

export const store = configureStore({
  reducer: {
    income: incomeReducer,
    expense: expenseReducer,
    sidebar: sidebarReducer,
  },
});
