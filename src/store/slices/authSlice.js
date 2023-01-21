/** Libraries */
import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    id: null,
    email: "",
    first_name: "",
    last_name: "",
    roleId: null,
    points: null,
    checking: true,
    transactions: [],
  },
  reducers: {
    authLogin: (state, action) => {
      state.checking = false;
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
      state.roleId = action.payload.roleId;
      state.points = action.payload.points;
    },
    authCheckingFinish: (state) => {
      state.checking = false;
    },
    authLogout: (state) => {
      state.id = null;
      state.email = "";
      state.first_name = "";
      state.last_name = "";
      state.roleId = null;
      state.points = null;
      state.checking = false;
      localStorage.clear();
    },
    getAllTransactions: (state, { payload }) => {
      state.transactions = payload;
    },
  },
});

export const {
  authLogin,
  authCheckingFinish,
  authLogout,
  getAllTransactions,
} = authSlice.actions;
