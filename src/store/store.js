/** Libraries */
import { configureStore } from "@reduxjs/toolkit";

/** Slices - Store */
import { authSlice } from "./slices/authSlice";
import { operationsSlice } from "./slices/operationsSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    operations: operationsSlice.reducer,
  },
});
