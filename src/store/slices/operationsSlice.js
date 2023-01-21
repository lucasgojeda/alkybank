/** Libraries */
import { createSlice } from "@reduxjs/toolkit";

export const operationsSlice = createSlice({
  name: "operations",
  initialState: {
    users: null,
    transactions: null,
    balance: {
      charges: null,
      expenses: null,
      total: null,
    },
  },
  reducers: {
    loadUsers: (state, action) => {
      state.users = {
        data: action.payload.data,
        nextPage: action.payload.nextPage,
        previousPage: action.payload.previousPage,
      };
    },
    loadTransactions: (state, action) => {
      state.transactions = action.payload;
    },
    addCharges: (state, action) => {
      state.balance.charges = action.payload;
    },
    addExpenses: (state, action) => {
      state.balance.expenses = action.payload;
    },
    addTotal: (state, action) => {
      state.balance.total = action.payload;
    },
  },
});

export const {
  loadUsers,
  loadTransactions,
  addCharges,
  addExpenses,
  addTotal
} = operationsSlice.actions;
